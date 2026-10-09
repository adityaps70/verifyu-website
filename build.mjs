// Static build: assembles every page from src/pages/*.mjs into dist/
import { readdirSync, mkdirSync, writeFileSync, cpSync, readFileSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { page, SITE } from './src/lib.mjs';
import { relativeBuild } from './preview.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, 'dist');
if (existsSync(dist)) rmSync(dist, { recursive: true });
mkdirSync(dist, { recursive: true });
cpSync(join(root, 'public'), dist, { recursive: true });
const css = ['site.css', 'pages.css'].filter(f => existsSync(join(root, 'src/styles', f))).map(f => readFileSync(join(root, 'src/styles', f), 'utf8')).join('\n');
writeFileSync(join(dist, 'site.css'), css);
for (const js of readdirSync(join(root, 'src/js')).filter(f => f.endsWith('.js'))) writeFileSync(join(dist, js), readFileSync(join(root, 'src/js', js), 'utf8'));

const pagesDir = join(root, 'src/pages');
const files = readdirSync(pagesDir).filter(f => f.endsWith('.mjs')).sort();
const urls = []; const pageCss = [];
for (const f of files) {
  const mod = await import(pathToFileURL(join(pagesDir, f)).href + `?t=${Date.now()}`);
  const defs = Array.isArray(mod.default) ? mod.default : [mod.default];
  for (const def of defs) {
    if (def.css) pageCss.push(`/* ---- ${def.path} ---- */\n` + def.css);
    const html = page(def);
    const out = def.path === '/' ? join(dist, 'index.html') : join(dist, def.path, 'index.html');
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, html);
    if (def.sitemap !== false) urls.push({ loc: SITE.url + (def.path === '/' ? '/' : def.path), priority: def.priority ?? (def.path === '/' ? 1 : 0.7) });
    console.log('built', def.path);
  }
}
const minify = (c) => c.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s*\n\s*/g, '\n').replace(/\n+/g, '\n').replace(/\s*([{}:;,>])\s*/g, '$1').replace(/;}/g, '}').trim();
writeFileSync(join(dist, 'site.css'), minify(css + '\n' + pageCss.join('\n')));
writeFileSync(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${u.loc}</loc><changefreq>monthly</changefreq><priority>${u.priority}</priority></url>`).join('\n')}\n</urlset>\n`);
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE.url}/sitemap.xml\n`);
// Redirect stubs for retired routes (meta refresh + canonical) — the host should use real 301s where supported.
const redirects = { '/rewards-partners': '/partners#brands', '/impact': '/press', '/volunteer': '/safety-champions', '/terms': '/legal/terms', '/legal': '/legal/terms', '/organisations/index': '/organisations' };
for (const [from, to] of Object.entries(redirects)) {
  const out = join(dist, from, 'index.html'); mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Redirecting…</title><meta http-equiv="refresh" content="0;url=${to}"><link rel="canonical" href="${SITE.url}${to}"><meta name="robots" content="noindex"></head><body><a href="${to}">Continue to ${to}</a></body></html>`);
}
writeFileSync(join(dist, '_redirects.json'), JSON.stringify(redirects, null, 2));
console.log(`\n${urls.length} pages → dist/`);
// GitHub Pages copy (relative links, .nojekyll, root 404.html) — the repo publishes from /docs
if (!process.argv.includes('--no-pages')) { relativeBuild(join(root, 'docs'), { pages: true }); console.log('GitHub Pages copy → docs/'); }
