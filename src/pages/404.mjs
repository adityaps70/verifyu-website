import { icons, breadcrumbLd } from '../lib.mjs';

export default {
  path: '/404',
  nav: '',
  title: 'Page not found',
  description: 'That page does not exist on the VerifyU website.',
  priority: 0.1,
  sitemap: false,
  extraHead: '<meta name="robots" content="noindex">',
  body: `
<section class="page-hero nf" aria-labelledby="page-h">
  <div class="container">
    <div class="mask-group" style="max-width:640px">
      <div class="eyebrow" data-reveal="fade">404</div>
      <h1 class="h1" id="page-h" data-reveal>That page isn’t here.</h1>
      <p class="lead" data-reveal>The link may be old, or the address may have a typo. The pages people look for most are below.</p>
      <div class="row" data-reveal>
        <a class="btn btn-primary btn-lg" href="/">Go to the homepage ${icons.arrow}</a>
        <a class="btn btn-ghost btn-lg" href="/support">Help Centre</a>
      </div>
      <ul class="nf-links" data-stagger>
        <li><a href="/how-it-works">How VerifyU works</a></li><li><a href="/features">Features</a></li><li><a href="/pricing">Pricing</a></li><li><a href="/organisations">For organisations</a></li><li><a href="/partners">Partners</a></li><li><a href="/legal/privacy">Privacy</a></li><li><a href="/account-deletion">Account deletion</a></li>
      </ul>
    </div>
  </div>
</section>`,
  css: `.nf{min-height:70vh;display:flex;align-items:center}.nf-links{margin-top:32px;display:flex;flex-wrap:wrap;gap:8px}.nf-links a{display:inline-flex;align-items:center;min-height:40px;padding:0 14px;border-radius:999px;border:1px solid var(--line);background:#fff;font-size:14px;font-weight:500;color:var(--ink-2)}.nf-links a:hover{border-color:var(--purple);color:var(--purple)}`,
};
