#!/usr/bin/env node
/* VerifyU Admin — a small, dependency-free content panel for the static site.
   Edits content/*.json (team, advisory board, partners, articles), stores uploads in public/images/uploads/,
   rebuilds the site (node build.mjs) and, if configured, runs a deploy command so the live site updates.

   Run:   node admin/server.mjs            → http://127.0.0.1:8790
   Env:   ADMIN_PORT, ADMIN_HOST (0.0.0.0 to expose — put it behind HTTPS), ADMIN_DEPLOY_CMD (overrides config)
   First run: the panel asks you to set the admin password (stored hashed in admin/config.json). */
import http from 'node:http';
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync, renameSync } from 'node:fs';
import { join, dirname, extname, basename, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { spawn } from 'node:child_process';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const ADMIN = join(ROOT, 'admin'), CONTENT = join(ROOT, 'content'), UPLOADS = join(ROOT, 'public', 'images', 'uploads'), DIST = join(ROOT, 'dist');
const CONFIG_FILE = join(ADMIN, 'config.json');
mkdirSync(CONTENT, { recursive: true }); mkdirSync(UPLOADS, { recursive: true });

const readJSON = (f, fallback) => { try { return JSON.parse(readFileSync(f, 'utf8')); } catch (e) { return fallback; } };
const writeJSON = (f, v) => { const tmp = f + '.tmp'; writeFileSync(tmp, JSON.stringify(v, null, 2) + '\n'); renameSync(tmp, f); };
const config = () => readJSON(CONFIG_FILE, {});
const saveConfig = (patch) => writeJSON(CONFIG_FILE, Object.assign(config(), patch));

const PORT = parseInt(process.env.ADMIN_PORT || config().port || 8790, 10);
const HOST = process.env.ADMIN_HOST || config().host || '127.0.0.1';

/* ---------- collections + validation ---------- */
const COLLECTIONS = {
  team: { fields: ['id', 'name', 'role', 'summary', 'bio', 'photo', 'linkedin', 'order', 'visible'], required: ['name', 'role'] },
  advisory: { fields: ['id', 'name', 'role', 'affiliation', 'summary', 'bio', 'photo', 'linkedin', 'order', 'visible'], required: ['name', 'role'] },
  partners: { fields: ['id', 'name', 'category', 'logo', 'website', 'description', 'order', 'visible'], required: ['name'] },
  articles: { fields: ['id', 'slug', 'title', 'excerpt', 'cover', 'author', 'date', 'updated', 'tags', 'body', 'published'], required: ['title', 'slug'] },
};
const slugify = (s = '') => String(s).toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);
const clean = (name, items) => {
  const def = COLLECTIONS[name]; if (!def) throw new Error('Unknown collection');
  if (!Array.isArray(items)) throw new Error('Expected a list');
  const out = items.map((raw, i) => {
    const it = {};
    for (const k of def.fields) if (raw[k] !== undefined) it[k] = raw[k];
    for (const k of ['name', 'role', 'summary', 'bio', 'affiliation', 'photo', 'logo', 'linkedin', 'website', 'category', 'description', 'title', 'excerpt', 'cover', 'author', 'date', 'updated', 'body', 'slug']) if (it[k] !== undefined) it[k] = String(it[k]).trim();
    if (it.tags !== undefined) it.tags = (Array.isArray(it.tags) ? it.tags : String(it.tags).split(',')).map(t => String(t).trim()).filter(Boolean).slice(0, 12);
    if (it.order !== undefined) it.order = Number(it.order) || i + 1; else it.order = i + 1;
    if (def.fields.includes('visible')) it.visible = it.visible !== false;
    if (name === 'articles') { it.published = it.published === true; it.slug = slugify(it.slug || it.title); if (!it.date) it.date = new Date().toISOString().slice(0, 10); }
    for (const k of ['photo', 'logo', 'cover']) if (it[k] && !/^(\/images\/|https?:\/\/)/.test(it[k])) throw new Error(`${k} must be an uploaded image path`);
    for (const k of ['linkedin', 'website']) if (it[k] && !/^https?:\/\//i.test(it[k])) it[k] = 'https://' + it[k];
    if (!it.id) it.id = slugify(it.name || it.title || '') || randomBytes(4).toString('hex');
    for (const k of def.required) if (!it[k]) throw new Error(`Item ${i + 1}: "${k}" is required`);
    return it;
  });
  if (name === 'articles') { const seen = new Set(); for (const a of out) { if (seen.has(a.slug)) throw new Error(`Two articles share the URL "${a.slug}" — change one title or slug`); seen.add(a.slug); } }
  return out;
};

/* ---------- auth ---------- */
const sessions = new Map();               // token → expiry
const attempts = new Map();               // ip → [timestamps]
const hash = (pw, salt = randomBytes(16).toString('hex')) => `${salt}:${scryptSync(pw, salt, 64).toString('hex')}`;
const verify = (pw, stored) => { const [salt, h] = String(stored || '').split(':'); if (!salt || !h) return false; const a = scryptSync(pw, salt, 64), b = Buffer.from(h, 'hex'); return a.length === b.length && timingSafeEqual(a, b); };
const cookie = (req) => Object.fromEntries((req.headers.cookie || '').split(';').map(c => c.trim().split('=')).filter(x => x[0]));
const authed = (req) => { const t = cookie(req).vu_admin; const exp = t && sessions.get(t); if (exp && exp > Date.now()) { sessions.set(t, Date.now() + 12 * 3600e3); return true; } if (t) sessions.delete(t); return false; };
const limited = (ip) => { const now = Date.now(); const arr = (attempts.get(ip) || []).filter(t => now - t < 60e3); attempts.set(ip, arr); return arr.length >= 8; };

/* ---------- helpers ---------- */
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.gif': 'image/gif', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.mp4': 'video/mp4', '.xml': 'application/xml', '.txt': 'text/plain' };
const send = (res, code, body, type = 'application/json; charset=utf-8', extra = {}) => { res.writeHead(code, Object.assign({ 'Content-Type': type, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'X-Frame-Options': 'DENY', 'Referrer-Policy': 'no-referrer' }, extra)); res.end(body); };
const json = (res, code, obj) => send(res, code, JSON.stringify(obj));
const body = (req, limit = 25 * 1024 * 1024) => new Promise((resolve, reject) => { let n = 0; const chunks = []; req.on('data', c => { n += c.length; if (n > limit) { reject(new Error('Too large')); req.destroy(); } else chunks.push(c); }); req.on('end', () => { try { resolve(chunks.length ? JSON.parse(Buffer.concat(chunks).toString('utf8')) : {}); } catch (e) { reject(new Error('Invalid JSON')); } }); req.on('error', reject); });
const serveFile = (res, base, rel) => {
  const safe = normalize(rel).replace(/^(\.\.[/\\])+/, ''); let f = join(base, safe);
  if (!f.startsWith(base)) return send(res, 403, 'Forbidden', 'text/plain');
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html');
  if (!existsSync(f)) return send(res, 404, 'Not found', 'text/plain');
  send(res, 200, readFileSync(f), MIME[extname(f).toLowerCase()] || 'application/octet-stream');
};
const run = (cmd, args, cwd, shell = false) => new Promise((resolve) => { let out = ''; const p = spawn(cmd, args, { cwd, shell }); p.stdout.on('data', d => out += d); p.stderr.on('data', d => out += d); p.on('close', code => resolve({ code, out })); p.on('error', e => resolve({ code: 1, out: out + '\n' + e.message })); });

let publishing = null, lastPublish = readJSON(join(ADMIN, '.last-publish.json'), null);

/* ---------- server ---------- */
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x'); const path = url.pathname; const ip = req.socket.remoteAddress;
  try {
    // static admin UI
    if (path === '/' || path === '/index.html') return send(res, 200, readFileSync(join(ADMIN, 'ui.html')), 'text/html; charset=utf-8');
    if (path.startsWith('/vendor/')) return serveFile(res, join(ADMIN, 'vendor'), path.slice(8));
    if (path.startsWith('/images/')) { return serveFile(res, join(ROOT, 'public'), path); }

    // ----- API -----
    if (path === '/api/state') { const c = config(); return json(res, 200, { needsSetup: !c.passwordHash, loggedIn: authed(req), lastPublish, previewUrl: `http://${req.headers.host.split(':')[0]}:${PORT + 1}/`, deployConfigured: Boolean(process.env.ADMIN_DEPLOY_CMD || c.deployCommand), siteUrl: c.siteUrl || '', publishing: Boolean(publishing), counts: Object.fromEntries(Object.keys(COLLECTIONS).map(k => [k, readJSON(join(CONTENT, `${k}.json`), []).length])) }); }
    if (path === '/api/setup' && req.method === 'POST') { if (config().passwordHash) return json(res, 400, { error: 'Already set up' }); const { password } = await body(req); if (!password || password.length < 8) return json(res, 400, { error: 'Use at least 8 characters' }); saveConfig({ passwordHash: hash(password), port: PORT }); return json(res, 200, { ok: true }); }
    if (path === '/api/login' && req.method === 'POST') {
      if (limited(ip)) return json(res, 429, { error: 'Too many attempts — wait a minute' });
      const { password } = await body(req); attempts.get(ip).push(Date.now());
      if (!verify(password || '', config().passwordHash)) return json(res, 401, { error: 'Wrong password' });
      const t = randomBytes(32).toString('hex'); sessions.set(t, Date.now() + 12 * 3600e3);
      return send(res, 200, JSON.stringify({ ok: true }), 'application/json; charset=utf-8', { 'Set-Cookie': `vu_admin=${t}; HttpOnly; SameSite=Strict; Path=/; Max-Age=43200` });
    }
    if (path === '/api/logout' && req.method === 'POST') { const t = cookie(req).vu_admin; sessions.delete(t); return send(res, 200, '{"ok":true}', 'application/json', { 'Set-Cookie': 'vu_admin=; Path=/; Max-Age=0' }); }
    if (!authed(req)) return json(res, 401, { error: 'Not signed in' });
    if (req.method !== 'GET' && req.headers['content-type'] && !/application\/json/.test(req.headers['content-type'])) return json(res, 415, { error: 'JSON only' });

    const m = path.match(/^\/api\/content\/([a-z]+)$/);
    if (m) {
      const name = m[1]; if (!COLLECTIONS[name]) return json(res, 404, { error: 'Unknown collection' });
      const f = join(CONTENT, `${name}.json`);
      if (req.method === 'GET') return json(res, 200, { items: readJSON(f, []) });
      if (req.method === 'PUT') { const { items } = await body(req); let out; try { out = clean(name, items); } catch (e) { return json(res, 400, { error: e.message }); } writeJSON(f, out); return json(res, 200, { ok: true, items: out }); }
    }
    if (path === '/api/upload' && req.method === 'POST') {
      const { name, dataUrl } = await body(req);
      const mm = /^data:(image\/(png|jpeg|jpg|webp|gif|svg\+xml));base64,(.+)$/.exec(dataUrl || ''); if (!mm) return json(res, 400, { error: 'Only PNG, JPG, WEBP, GIF or SVG images' });
      const ext = { png: '.png', jpeg: '.jpg', jpg: '.jpg', webp: '.webp', gif: '.gif', 'svg+xml': '.svg' }[mm[2]];
      const buf = Buffer.from(mm[3], 'base64'); if (buf.length > 8 * 1024 * 1024) return json(res, 400, { error: 'Keep images under 8 MB' });
      const base = slugify(basename(String(name || 'image'), extname(String(name || '')))) || 'image'; let file = base + ext, n = 1; while (existsSync(join(UPLOADS, file))) file = `${base}-${++n}${ext}`;
      writeFileSync(join(UPLOADS, file), buf); return json(res, 200, { path: `/images/uploads/${file}` });
    }
    if (path === '/api/media' && req.method === 'GET') {
      const list = (dir, prefix) => existsSync(dir) ? readdirSync(dir).filter(f => /\.(png|jpe?g|webp|gif|svg)$/i.test(f)).map(f => ({ path: `${prefix}/${f}`, size: statSync(join(dir, f)).size, mtime: statSync(join(dir, f)).mtimeMs })) : [];
      return json(res, 200, { items: [...list(UPLOADS, '/images/uploads'), ...list(join(ROOT, 'public', 'images', 'team'), '/images/team'), ...list(join(ROOT, 'public', 'images'), '/images')].sort((a, b) => b.mtime - a.mtime) });
    }
    if (path === '/api/settings' && req.method === 'PUT') { const { siteUrl, deployCommand, newPassword } = await body(req); const patch = {}; if (siteUrl !== undefined) patch.siteUrl = String(siteUrl).trim(); if (deployCommand !== undefined) patch.deployCommand = String(deployCommand).trim(); if (newPassword) { if (newPassword.length < 8) return json(res, 400, { error: 'Use at least 8 characters' }); patch.passwordHash = hash(newPassword); } saveConfig(patch); return json(res, 200, { ok: true }); }
    if (path === '/api/publish' && req.method === 'POST') {
      if (publishing) return json(res, 409, { error: 'A publish is already running' });
      publishing = (async () => {
        const started = Date.now(); let log = `▶ Building the site…\n`;
        const b = await run(process.execPath, [join(ROOT, 'build.mjs')], ROOT); log += b.out; if (b.code !== 0) return { ok: false, log: log + '\n✖ Build failed', ms: Date.now() - started };
        const deploy = process.env.ADMIN_DEPLOY_CMD || config().deployCommand;
        if (deploy) { log += `\n▶ Deploying: ${deploy}\n`; const d = await run(deploy, [], ROOT, true); log += d.out; if (d.code !== 0) return { ok: false, log: log + '\n✖ Deploy command failed', ms: Date.now() - started }; log += '\n✔ Deployed'; }
        else log += '\n✔ Built into dist/. No deploy command is set — upload the dist folder to your host (or set a deploy command in Settings) to make it live.';
        return { ok: true, log, ms: Date.now() - started, deployed: Boolean(deploy) };
      })();
      const result = await publishing; publishing = null;
      lastPublish = { at: new Date().toISOString(), ok: result.ok, deployed: Boolean(result.deployed) }; writeJSON(join(ADMIN, '.last-publish.json'), lastPublish);
      return json(res, result.ok ? 200 : 500, result);
    }
    return json(res, 404, { error: 'Not found' });
  } catch (e) { return json(res, 500, { error: e.message }); }
});
server.listen(PORT, HOST, () => console.log(`VerifyU Admin → http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}  (content: ${CONTENT})`));

/* Preview of the built site on the next port (signed-in admins only). Root-relative links work because the site is served from "/". */
http.createServer((req, res) => {
  if (!authed(req)) return send(res, 401, 'Sign in to the VerifyU admin first, then reload this page.', 'text/plain; charset=utf-8');
  if (!existsSync(DIST)) return send(res, 404, 'Nothing built yet — press Publish in the admin.', 'text/plain; charset=utf-8');
  serveFile(res, DIST, decodeURIComponent(new URL(req.url, 'http://x').pathname));
}).listen(PORT + 1, HOST, () => console.log(`Site preview → http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT + 1}`));
