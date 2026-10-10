// Relative-path copy of dist/ — for hosts that serve the site from a sub-folder (GitHub Pages project sites, previews).
// Usage: node preview.mjs [outDir] [--pages]   (default outDir: preview/; --pages adds .nojekyll and a root 404.html for GitHub Pages)
import { readdirSync, statSync, readFileSync, writeFileSync, cpSync, rmSync, existsSync, copyFileSync, unlinkSync } from 'node:fs';
import { join, relative, dirname, posix } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
export function relativeBuild(out = join(ROOT, 'preview'), { pages = false } = {}) {
  const src = join(ROOT, 'dist');
  if (existsSync(out)) rmSync(out, { recursive: true });
  cpSync(src, out, { recursive: true });
  const files = [];
  (function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); if (statSync(p).isDirectory()) walk(p); else if (f.endsWith('.html')) files.push(p); } })(out);
  const pageDirs = new Set(files.map(p => posix.normalize('/' + relative(out, dirname(p)).split('\\').join('/')).replace(/\/$/, '') || '/'));
  for (const p of files) {
    const dir = dirname(p); const depth = relative(out, dir).split('/').filter(Boolean).length; const up = '../'.repeat(depth);
    let html = readFileSync(p, 'utf8');
    const rel = (path) => {
      const [pth, hash] = path.split('#'); const h = hash ? '#' + hash : '';
      if (pth === '/' || pth === '') return up + 'index.html' + h;
      const clean = pth.replace(/\/$/, '');
      if (pageDirs.has(clean)) return up + clean.slice(1) + '/index.html' + h;
      return up + clean.slice(1) + h;
    };
    html = html.replace(/(href|src|poster)="(\/[^"]*)"/g, (m, a, v) => v.startsWith('//') ? m : `${a}="${rel(v)}"`);
    html = html.replace(/content="0;url=(\/[^"]*)"/g, (m, v) => `content="0;url=${rel(v)}"`);
    // GitHub Pages is a preview copy of the live site: keep the canonical pointing at the live domain and ask search
    // engines not to index the copy. Plain previews just drop the canonical.
    if (pages) html = html.replace(/<link rel="canonical"([^>]*)>/, '<link rel="canonical"$1><meta name="robots" content="noindex">');
    else html = html.replace(/<link rel="canonical"[^>]*>/, '');
    writeFileSync(p, html);
  }
  let css = readFileSync(join(out, 'site.css'), 'utf8'); css = css.replace(/url\(\/(fonts|images)\//g, 'url($1/'); writeFileSync(join(out, 'site.css'), css);
  if (pages) {
    writeFileSync(join(out, '.nojekyll'), '');
    // GitHub Pages serves /404.html for any missing URL, so its links cannot be relative to the request. Build it from the
    // root-relative original with depth-0 links and a <base> chosen at runtime (project site → /<repo>/, otherwise /).
    const orig = join(src, '404', 'index.html');
    if (existsSync(orig)) {
      let h = readFileSync(orig, 'utf8').replace(/(href|src|poster)="(\/[^"]*)"/g, (m, a, v) => v.startsWith('//') ? m : `${a}="${v === '/' ? 'index.html' : v.slice(1)}"`).replace(/<link rel="canonical"[^>]*>/, '');
      h = h.replace('<head>', `<head><script>(function(){var p=location.pathname.split('/')[1];var b=(/github\.io$/.test(location.hostname)&&p)?'/'+p+'/':'/';document.write('<base href="'+b+'">');})();</script>`);
      writeFileSync(join(out, '404.html'), h);
    }
    if (existsSync(join(out, '.htaccess'))) unlinkSync(join(out, '.htaccess'));
  }
  return files.length;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const args = process.argv.slice(2); const pages = args.includes('--pages'); const outArg = args.find(a => !a.startsWith('--'));
  const out = outArg ? join(process.cwd(), outArg) : join(ROOT, 'preview');
  console.log(`${pages ? 'pages' : 'preview'} build: ${relativeBuild(out, { pages })} pages → ${relative(process.cwd(), out) || '.'}/`);
}
