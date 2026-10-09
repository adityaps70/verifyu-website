// Content collections edited by the admin panel (content/*.json). The build reads them at build time,
// so the public site stays fully static — no runtime fetches, every page indexable.
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from './vendor/marked.esm.js';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
export const CONTENT_DIR = join(ROOT, 'content');

const read = (name) => {
  const f = join(CONTENT_DIR, `${name}.json`);
  if (!existsSync(f)) return [];
  try { const v = JSON.parse(readFileSync(f, 'utf8')); return Array.isArray(v) ? v : []; } catch (e) { console.warn(`content/${name}.json could not be parsed:`, e.message); return []; }
};
const byOrder = (a, b) => (a.order ?? 999) - (b.order ?? 999) || String(a.name || '').localeCompare(String(b.name || ''));

/* People: team and advisory board. Only `visible` entries reach the site. */
export const team = () => read('team').filter(p => p.visible !== false && p.name).sort(byOrder);
export const advisory = () => read('advisory').filter(p => p.visible !== false && p.name).sort(byOrder);
/* Partners shown publicly (only with their agreement — the admin decides). */
export const partners = () => read('partners').filter(p => p.visible !== false && p.name).sort(byOrder);
/* Articles: published only, newest first. */
export const articles = () => read('articles').filter(a => a.published === true && a.slug && a.title).sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));

/* Markdown → HTML for article bodies (owner-authored content; not sanitised, so keep the admin password private). */
marked.setOptions({ gfm: true, breaks: false });
export const md = (s = '') => marked.parse(String(s));

export const slugify = (s = '') => String(s).toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);
export const fmtDate = (iso = '') => { const d = new Date(iso); return isNaN(d) ? '' : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }); };
export const readingTime = (s = '') => `${Math.max(1, Math.round(String(s).split(/\s+/).length / 200))} min read`;
