import { SITE, icons, sectionHead, finalCta, breadcrumbLd, esc } from '../lib.mjs';
import { articles, md, fmtDate, readingTime } from '../content.mjs';

/* Blog: index + one page per published article. Content is edited in the admin panel (content/articles.json).
   Nothing is generated when there are no published articles, and the nav/footer links appear only then. */
const ALL = articles();

const card = (a, big = false) => `
<article class="bl-card ${big ? 'is-big' : ''}">
  <a class="bl-card-link" href="/blog/${esc(a.slug)}">
    <div class="bl-cover">${a.cover ? `<img src="${esc(a.cover)}" alt="" loading="lazy">` : `<span class="bl-cover-empty">${icons.doc}</span>`}</div>
    <div class="bl-body">
      <div class="bl-meta"><span>${esc(fmtDate(a.date))}</span><span aria-hidden="true">·</span><span>${readingTime(a.body)}</span></div>
      <h2 class="${big ? 'h2' : 'h4'}">${esc(a.title)}</h2>
      ${a.excerpt ? `<p class="body">${esc(a.excerpt)}</p>` : ''}
      ${(a.tags || []).length ? `<div class="bl-tags">${a.tags.map(t => `<span class="pill">${esc(t)}</span>`).join('')}</div>` : ''}
      <span class="link">Read the article ${icons.arrow}</span>
    </div>
  </a>
</article>`;

const index = {
  path: '/blog',
  nav: '/blog',
  title: 'Blog',
  description: 'Articles, guides and updates from the VerifyU team: registering family, emergency identity, safety drives and product news.',
  priority: 0.7,
  jsonld: breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }]),
  body: `
<section class="page-hero bl-hero" aria-labelledby="page-h">
  <div class="container">
    <div class="mask-group">
      <div class="eyebrow" data-reveal="fade">Blog</div>
      <h1 class="h1" id="page-h" data-reveal>Guides, updates and the thinking behind VerifyU.</h1>
      <p class="lead" data-reveal>Practical pieces on registering the people you care about, how emergency identity works, and what the team is building.</p>
    </div>
  </div>
</section>
<section class="section is-cloud bl-index" aria-label="Articles">
  <div class="container">
    ${ALL.length ? `<div class="bl-featured" data-reveal>${card(ALL[0], true)}</div>` : ''}
    ${ALL.length > 1 ? `<div class="bl-grid" data-stagger>${ALL.slice(1).map(a => card(a)).join('')}</div>` : ''}
  </div>
</section>
${finalCta({ headline: 'Register the people you care about.', copy: 'It takes a few minutes and it’s free.' })}
`,
  css: `
.bl-hero .h1{max-width:16ch}
.bl-card{height:100%}
.bl-card-link{display:flex;flex-direction:column;height:100%;border-radius:var(--r-xl);background:#fff;border:1px solid var(--line);overflow:hidden;color:var(--ink);transition:transform .5s var(--ease),box-shadow .5s var(--ease)}
.bl-card-link:hover{transform:translateY(-4px);box-shadow:var(--shadow-2)}
.bl-cover{aspect-ratio:16/9;background:var(--purple-50);display:flex;align-items:center;justify-content:center;overflow:hidden}
.bl-cover img{width:100%;height:100%;object-fit:cover;transition:transform 1.2s var(--ease)}
.bl-card-link:hover .bl-cover img{transform:scale(1.03)}
.bl-cover-empty{color:var(--purple)}.bl-cover-empty svg{width:40px;height:40px}
.bl-body{display:flex;flex-direction:column;gap:10px;padding:22px 24px 24px;flex:1}
.bl-body .body{font-size:15px;flex:1}
.bl-meta{display:flex;gap:8px;font-size:12.5px;color:var(--ink-4);font-weight:500}
.bl-tags{display:flex;flex-wrap:wrap;gap:6px}
.bl-tags .pill{padding:3px 9px;font-size:11px}
.bl-featured{margin-bottom:clamp(20px,2.4vw,32px)}
.bl-card.is-big .bl-card-link{flex-direction:row}
.bl-card.is-big .bl-cover{flex:0 0 52%;aspect-ratio:auto;min-height:320px}
.bl-card.is-big .bl-body{justify-content:center;padding:clamp(24px,3vw,44px)}
.bl-card.is-big .h2{font-size:clamp(26px,3vw,40px)}
.bl-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(16px,2.4vw,28px)}
@media (max-width:1024px){.bl-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.bl-card.is-big .bl-card-link{flex-direction:column}.bl-card.is-big .bl-cover{flex:none;aspect-ratio:16/9;min-height:0}}
@media (max-width:640px){.bl-grid{grid-template-columns:1fr}}
/* article */
.bl-art-hero{padding-bottom:0}
.bl-art-hero .h1{max-width:20ch;font-size:clamp(34px,5vw,60px)}
.bl-art-cover{margin:clamp(28px,4vw,48px) auto 0;max-width:960px;border-radius:var(--r-xl);overflow:hidden;aspect-ratio:16/8;background:var(--purple-50)}
.bl-art-cover img{width:100%;height:100%;object-fit:cover;display:block}
.bl-art-meta{display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center;margin-top:18px;font-size:14px;color:var(--ink-3)}
.bl-art-meta b{color:var(--ink)}
.prose{max-width:720px;margin-inline:auto;font-size:18px;line-height:1.7;color:var(--ink-2)}
.prose > *+*{margin-top:1.1em}
.prose h2{font-family:var(--font-display);font-size:clamp(24px,2.6vw,32px);letter-spacing:-.03em;line-height:1.15;color:var(--ink);margin-top:1.8em}
.prose h3{font-family:var(--font-display);font-size:clamp(20px,2vw,24px);letter-spacing:-.02em;color:var(--ink);margin-top:1.5em}
.prose p strong{color:var(--ink)}
.prose a{color:var(--purple);text-decoration:underline;text-underline-offset:3px}
.prose ul{list-style:disc;padding-left:1.4em}
.prose ol{list-style:decimal;padding-left:1.4em}
.prose li+li{margin-top:.4em}
.prose blockquote{margin:1.4em 0;padding:4px 0 4px 22px;border-left:3px solid var(--teal);font-family:var(--font-display);font-size:1.15em;font-weight:500;letter-spacing:-.015em;color:var(--ink)}
.prose img{max-width:100%;border-radius:var(--r-lg)}
.prose code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.9em;background:var(--cloud);padding:2px 6px;border-radius:6px}
.prose pre{background:var(--ink);color:#fff;padding:18px 20px;border-radius:var(--r-md);overflow:auto;font-size:14px}
.prose pre code{background:transparent;padding:0;color:inherit}
.prose hr{border:0;border-top:1px solid var(--line);margin:2em 0}
.prose table{width:100%;border-collapse:collapse;font-size:15px}
.prose th,.prose td{text-align:left;padding:10px 12px;border-bottom:1px solid var(--line)}
.bl-art-foot{max-width:720px;margin:clamp(32px,4vw,56px) auto 0;padding-top:24px;border-top:1px solid var(--line);display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between}
.bl-share{display:flex;gap:8px}
.bl-share a{display:inline-flex;align-items:center;gap:8px;min-height:40px;padding:0 14px;border-radius:999px;border:1px solid var(--line);font-size:13.5px;font-weight:600;color:var(--ink-2)}
.bl-share a svg{width:16px;height:16px}
.bl-more{margin-top:clamp(40px,5vw,64px)}
`,
};

const article = (a, i) => {
  const url = `${SITE.url}/blog/${a.slug}`;
  const more = ALL.filter(x => x.slug !== a.slug).slice(0, 3);
  const share = encodeURIComponent(`${a.title} — ${url}`);
  return {
    path: `/blog/${a.slug}`,
    nav: '/blog',
    title: a.title,
    description: a.excerpt || `${a.title} — an article from the VerifyU team.`,
    ogImage: a.cover || '/images/og-verifyu.jpg',
    priority: 0.6,
    jsonld: [breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: a.title, path: `/blog/${a.slug}` }]), {
      '@context': 'https://schema.org', '@type': 'Article', headline: a.title, description: a.excerpt || '', datePublished: a.date || '', dateModified: a.updated || a.date || '',
      image: a.cover ? [SITE.url + a.cover] : undefined, author: { '@type': 'Organization', name: a.author || 'VerifyU' }, publisher: { '@type': 'Organization', name: SITE.entity, logo: { '@type': 'ImageObject', url: SITE.url + '/images/verifyu-logo.png' } }, mainEntityOfPage: url,
    }],
    body: `
<article>
<section class="page-hero bl-art-hero" aria-labelledby="page-h">
  <div class="container">
    <div class="mask-group" style="max-width:820px">
      <div class="eyebrow" data-reveal="fade"><a href="/blog" style="color:inherit">Blog</a>${(a.tags || []).length ? ` · ${esc(a.tags[0])}` : ''}</div>
      <h1 class="h1" id="page-h" data-reveal>${esc(a.title)}</h1>
      ${a.excerpt ? `<p class="lead" data-reveal>${esc(a.excerpt)}</p>` : ''}
      <div class="bl-art-meta" data-reveal="fade"><b>${esc(a.author || 'VerifyU team')}</b><span>${esc(fmtDate(a.date))}</span><span>${readingTime(a.body)}</span></div>
    </div>
    ${a.cover ? `<figure class="bl-art-cover" data-reveal="scale"><img src="${esc(a.cover)}" alt="" width="1600" height="800" fetchpriority="high"></figure>` : ''}
  </div>
</section>
<section class="section" aria-label="Article body">
  <div class="container">
    <div class="prose">${md(a.body)}</div>
    <div class="bl-art-foot">
      <div class="bl-tags">${(a.tags || []).map(t => `<span class="pill">${esc(t)}</span>`).join('')}</div>
      <div class="bl-share">
        <a href="https://wa.me/?text=${share}" target="_blank" rel="noopener">${icons.whatsapp} Share on WhatsApp</a>
        <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}" target="_blank" rel="noopener">${icons.linkedin} Share on LinkedIn</a>
      </div>
    </div>
    ${more.length ? `<div class="bl-more">${sectionHead({ eyebrow: 'More from the blog', title: 'Keep reading.' })}<div class="bl-grid" data-stagger>${more.map(x => card(x)).join('')}</div></div>` : ''}
  </div>
</section>
</article>
${finalCta({ headline: 'Register the people you care about.', copy: 'It takes a few minutes and it’s free.' })}
`,
  };
};

export default ALL.length ? [index, ...ALL.map(article)] : [];
