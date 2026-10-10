// Shared layout, components and helpers for the VerifyU static build.
import { articles as contentArticles } from './content.mjs';
const HAS_BLOG = contentArticles().length > 0;
export const SITE = {
  name: 'VerifyU',
  url: 'https://verifyu.in',
  entity: 'Beaufort IT Solutions Pvt. Ltd.',
  email: 'info@beaufortit.com',
  whatsapp: '+91 82990 44462',
  whatsappHref: 'https://wa.me/918299044462',
  play: 'https://play.google.com/store/apps/details?id=com.verifyu.app&hl=en_IN',
  appstore: 'https://apps.apple.com/in/app/verifyu/id6670164958',
  instagram: 'https://www.instagram.com/verifyu.in/',
  linkedin: 'https://www.linkedin.com/company/verifyu-in/',
  privacyExternal: 'https://verifyu.in/privacy-policy/',
  year: 2026,
};

export const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ---------------- Icons (inline SVG, currentColor) ---------------- */
const I = (d, extra = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${d}</svg>`;
export const icons = {
  arrow: I('<path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>', 'class="arrow"'),
  arrowUpRight: I('<path d="M7 17L17 7"/><path d="M8 7h9v9"/>', 'class="arrow"'),
  chevron: I('<path d="M6 9l6 6 6-6"/>'),
  chevronL: I('<path d="M15 6l-6 6 6 6"/>'),
  chevronR: I('<path d="M9 6l6 6-6 6"/>'),
  check: I('<path d="M20 6L9 17l-5-5"/>'),
  plus: I('<path d="M12 5v14"/><path d="M5 12h14"/>'),
  close: I('<path d="M18 6L6 18"/><path d="M6 6l12 12"/>'),
  menu: I('<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>'),
  info: I('<circle cx="12" cy="12" r="9"/><path d="M12 8h.01"/><path d="M11 12h1v4h1"/>'),
  face: I('<path d="M4 8V6a2 2 0 012-2h2"/><path d="M16 4h2a2 2 0 012 2v2"/><path d="M20 16v2a2 2 0 01-2 2h-2"/><path d="M8 20H6a2 2 0 01-2-2v-2"/><path d="M9 10h.01"/><path d="M15 10h.01"/><path d="M9 15c.8 1 1.8 1.5 3 1.5s2.2-.5 3-1.5"/>'),
  scan: I('<path d="M3 7V5a2 2 0 012-2h2"/><path d="M17 3h2a2 2 0 012 2v2"/><path d="M21 17v2a2 2 0 01-2 2h-2"/><path d="M7 21H5a2 2 0 01-2-2v-2"/><path d="M3 12h18"/>'),
  phone: I('<path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.6a2 2 0 01-.5 2.1L8 9.7a16 16 0 006.3 6.3l1.3-1.3a2 2 0 012.1-.4c.8.3 1.7.5 2.6.7a2 2 0 011.7 2z"/>'),
  heart: I('<path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z"/>'),
  medical: I('<path d="M12 3v18"/><path d="M3 12h18"/><rect x="3" y="3" width="18" height="18" rx="4"/>'),
  sos: I('<circle cx="12" cy="12" r="9"/><path d="M12 8v4"/><path d="M12 16h.01"/>'),
  shield: I('<path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/>'),
  users: I('<path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M21 21v-2a4 4 0 00-3-3.9"/><path d="M16 3.1a4 4 0 010 7.8"/>'),
  user: I('<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>'),
  pin: I('<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z"/><circle cx="12" cy="10" r="3"/>'),
  steps: I('<path d="M13 4a1 1 0 100-2 1 1 0 000 2z"/><path d="M6 20l3-7 1.5 3 3 1v3"/><path d="M8 13l1-5 4 1 2 4 3 1"/><path d="M12 9l-1.5 4"/>'),
  coin: I('<circle cx="12" cy="12" r="9"/><path d="M12 7v10"/><path d="M15 9.5a3 3 0 00-3-1.5c-1.7 0-3 .9-3 2s1.3 2 3 2 3 .9 3 2-1.3 2-3 2a3 3 0 01-3-1.5"/>'),
  recharge: I('<rect x="5" y="2" width="14" height="20" rx="3"/><path d="M12 18h.01"/><path d="M10 6h4"/>'),
  share: I('<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4"/><path d="M15.4 6.5l-6.8 4"/>'),
  building: I('<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 8h2"/><path d="M13 8h2"/><path d="M9 12h2"/><path d="M13 12h2"/><path d="M10 21v-4h4v4"/>'),
  hospital: I('<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M12 9v6"/><path d="M9 12h6"/><path d="M9 21v-3h6v3"/>'),
  gov: I('<path d="M3 21h18"/><path d="M5 21V10"/><path d="M19 21V10"/><path d="M9 21v-7h6v7"/><path d="M2 10l10-6 10 6"/>'),
  school: I('<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11.5V17c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5"/><path d="M22 9v6"/>'),
  event: I('<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4"/><path d="M16 3v4"/><path d="M3 11h18"/><path d="M9 16l2 2 4-4"/>'),
  work: I('<rect x="3" y="7" width="18" height="13" rx="3"/><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"/><path d="M3 13h18"/>'),
  home: I('<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>'),
  senior: I('<circle cx="12" cy="6" r="3"/><path d="M8 21v-8a4 4 0 018 0v8"/><path d="M17 12l2 9"/>'),
  eye: I('<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>'),
  lock: I('<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 018 0v3"/>'),
  log: I('<path d="M4 6h16"/><path d="M4 12h10"/><path d="M4 18h7"/><circle cx="18" cy="17" r="3"/><path d="M20.5 19.5L22 21"/>'),
  bell: I('<path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 01-3.4 0"/>'),
  play: I('<path d="M6 4l14 8-14 8z" fill="currentColor" stroke="none"/>'),
  mail: I('<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 8l9 6 9-6"/>'),
  chat: I('<path d="M21 12a8 8 0 01-11.5 7.2L4 21l1.8-4.5A8 8 0 1121 12z"/>'),
  globe: I('<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c3 3.5 3 14.5 0 18"/><path d="M12 3c-3 3.5-3 14.5 0 18"/>'),
  car: I('<path d="M5 17h14"/><path d="M3 12l2-5a2 2 0 011.9-1.3h10.2A2 2 0 0119 7l2 5v5a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1H6v1a1 1 0 01-1 1H4a1 1 0 01-1-1z"/><circle cx="7.5" cy="13.5" r="1"/><circle cx="16.5" cy="13.5" r="1"/>'),
  plane: I('<path d="M2 16l20-8-8 20-2-9z"/>'),
  crowd: I('<circle cx="7" cy="8" r="2.5"/><circle cx="17" cy="8" r="2.5"/><circle cx="12" cy="6" r="2.5"/><path d="M2 20a5 5 0 0110 0"/><path d="M12 20a5 5 0 0110 0"/><path d="M7 20a5 5 0 0110 0"/>'),
  child: I('<circle cx="12" cy="7" r="3.5"/><path d="M7 21v-5a5 5 0 0110 0v5"/>'),
  memory: I('<path d="M12 3a7 7 0 00-7 7c0 2.6 1.4 4.3 2.6 5.6.9 1 1.4 1.6 1.4 2.4v1h6v-1c0-.8.5-1.4 1.4-2.4C18.6 14.3 20 12.6 20 10a7 7 0 00-8-7z"/><path d="M10 22h4"/>'),
  instagram: I('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3.5"/><path d="M17.5 6.5h.01"/>'),
  linkedin: I('<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7"/><path d="M8 7h.01"/><path d="M12 17v-4a2 2 0 014 0v4"/><path d="M12 10v7"/>'),
  qr: I('<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><path d="M14 14h3v3h-3z"/><path d="M20 14h1v1"/><path d="M14 20h1v1"/><path d="M18 18h3v3"/>'),
  search: I('<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>'),
  doc: I('<path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6"/><path d="M9 17h6"/>'),
  trash: I('<path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="M6 7l1 13h10l1-13"/>'),
  flagIcon: I('<path d="M5 21V4"/><path d="M5 4h12l-2 4 2 4H5"/>'),
  handshake: I('<path d="M2 9l4-4 5 3 3-2 3 2 5-1v8l-4 4-3-1-3 2-3-2-3 1-4-4z"/>'),
  star: I('<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9L6.6 20l1-6.1L3.2 9.5l6.1-.9z"/>'),
  fitness: I('<path d="M6 8v8"/><path d="M18 8v8"/><path d="M3 10v4"/><path d="M21 10v4"/><path d="M6 12h12"/>'),
  // Rewards-partner categories
  utensils: I('<path d="M7 3v8"/><path d="M4 3v5a3 3 0 006 0V3"/><path d="M7 11v10"/><path d="M18 3c-2.2 1.6-3.5 4.4-3.5 8h3.5v10"/>'),
  coffee: I('<path d="M4 8h12v6a4 4 0 01-4 4H8a4 4 0 01-4-4z"/><path d="M16 9h2a2 2 0 010 4h-2"/><path d="M8 4v2"/><path d="M12 4v2"/>'),
  scissors: I('<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4L8.5 15.5"/><path d="M14.5 14.5L20 20"/><path d="M8.5 8.5L12 12"/>'),
  shirt: I('<path d="M8 3l4 2 4-2 5 3-2 4-3-1v12H8V9l-3 1-2-4z"/>'),
  bag: I('<path d="M6 7h12l1 14H5z"/><path d="M9 7V6a3 3 0 016 0v1"/>'),
  film: I('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16"/><path d="M17 4v16"/><path d="M3 9h4"/><path d="M3 15h4"/><path d="M17 9h4"/><path d="M17 15h4"/>'),
  wrench: I('<path d="M14.7 6.3a4 4 0 005 5l-8.4 8.4a2.1 2.1 0 01-3-3l8.4-8.4z"/><path d="M14.7 6.3L17 4l3 3-2.3 2.3"/>'),
  tag: I('<path d="M20 12l-8 8-9-9V4h7z"/><path d="M7.5 7.5h.01"/>'),
  sparkle: I('<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 17l.8 2.2L22 20l-2.2.8L19 23l-.8-2.2L16 20l2.2-.8z"/>'),
  whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>',
};

/* ---------------- Navigation model ---------------- */
export const NAV = [
  { label: 'Product', items: [
    { href: '/features', title: 'Features', desc: 'Everything inside the VerifyU app' },
    { href: '/safety', title: 'Safety & Emergency', desc: 'Identification, SOS, contacts, medical info' },
    { href: '/pricing', title: 'Pricing', desc: 'Free registration and Premium plans' },
  ]},
  { label: 'How it works', href: '/how-it-works' },
  { label: 'For organisations', items: [
    { href: '/organisations/hospitals', title: 'Hospitals', desc: 'Identity support at emergency arrival' },
    { href: '/organisations#government', title: 'Government', desc: 'District and public-safety pilots' },
    { href: '/organisations#campuses', title: 'Schools & Colleges', desc: 'Campus safety programmes' },
    { href: '/organisations#communities', title: 'Communities', desc: 'Residential and senior communities' },
    { href: '/organisations#events', title: 'Events', desc: 'Large gatherings and crowd safety' },
    { href: '/partners', title: 'Partners', desc: 'Brands, NGOs, events, communities' },
  ], cols: 2 },
  { label: 'Rewards', href: '/rewards' },
  { label: 'About', href: '/about' },
  { label: 'Resources', items: [
    { href: '/press', title: 'Press & Impact', desc: 'Coverage, recognition and community' },
    { href: '/safety-champions', title: 'Safety Champions', desc: 'Volunteer with VerifyU' },
    { href: '/support', title: 'Help Centre', desc: 'Answers and support' },
    { href: '/trust', title: 'Trust Centre', desc: 'Your information, your control' },
    ...(HAS_BLOG ? [{ href: '/blog', title: 'Blog', desc: 'Articles, guides and updates' }] : []),
  ]},
];

const navItem = (n) => {
  if (!n.items) return `<li class="nav-item"><a class="nav-link" href="${n.href}" data-nav="${n.href}">${n.label}</a></li>`;
  const id = 'menu-' + n.label.toLowerCase().replace(/[^a-z]+/g, '-');
  return `<li class="nav-item" data-menu>
    <button class="nav-link" type="button" aria-expanded="false" aria-controls="${id}">${n.label}${icons.chevron}</button>
    <div class="menu ${n.cols === 2 ? 'is-2col' : ''}" id="${id}">
      ${n.items.map(i => `<a href="${i.href}"><b>${i.title}</b><span>${i.desc}</span></a>`).join('')}
    </div>
  </li>`;
};

const sheetItem = (n) => {
  if (!n.items) return `<div class="sheet-group"><a href="${n.href}">${n.label}${icons.arrowUpRight}</a></div>`;
  return `<div class="sheet-group" data-sheet-group>
    <button type="button" aria-expanded="false">${n.label}${icons.chevron}</button>
    <div class="sheet-sub"><div>${n.items.map(i => `<a href="${i.href}">${i.title}</a>`).join('')}</div></div>
  </div>`;
};

export const logo = (cls = '') => `<a class="brand ${cls}" href="/" aria-label="VerifyU home"><img src="/images/verifyu-logo.png" alt="VerifyU" width="44" height="44"></a>`;

export const header = () => `
<a class="skip" href="#main">Skip to content</a>
<header class="header" id="header">
  <nav class="nav" aria-label="Primary">
    ${logo()}
    <ul class="nav-links">${NAV.map(navItem).join('')}</ul>
    <div class="nav-cta">
      <a class="btn btn-primary" href="/#get-verifyu" data-get>Get VerifyU</a>
      <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="sheet" data-toggle>${icons.menu}</button>
    </div>
  </nav>
</header>
<div class="sheet" id="sheet" aria-label="Mobile menu">
  ${NAV.map(sheetItem).join('')}
  <div class="sheet-cta">
    <a class="btn btn-primary btn-lg" href="/#get-verifyu" data-get>Get VerifyU — it's free</a>
    ${stores('is-light')}
  </div>
</div>`;

export function stores(cls = '') {
  return `<div class="stores">
    <a class="store ${cls}" href="${SITE.play}" target="_blank" rel="noopener"><img src="/images/google-play-icon.png" alt="" width="26" height="26"><span><small>Get it on</small><b>Google Play</b></span></a>
    <a class="store ${cls}" href="${SITE.appstore}" target="_blank" rel="noopener"><img src="/images/apple-icon.png" alt="" width="26" height="26" ${cls.includes('light') ? 'style="filter:invert(1)"' : ''}><span><small>Download on the</small><b>App Store</b></span></a>
  </div>`;
}

export const footer = () => `
<footer class="footer" id="footer">
  <div class="container">
    <div class="footer-top">
      <div class="footer-brand">
        ${logo()}
        <p>Identity when it matters most. An emergency identity and safety connection platform.</p>
        <div class="socials mt-3">
          <a href="${SITE.instagram}" target="_blank" rel="noopener" aria-label="VerifyU on Instagram">${icons.instagram}</a>
          <a href="${SITE.linkedin}" target="_blank" rel="noopener" aria-label="VerifyU on LinkedIn">${icons.linkedin}</a>
        </div>
      </div>
      <div><h4>Product</h4><ul>
        <li><a href="/features">Features</a></li><li><a href="/how-it-works">How it works</a></li><li><a href="/safety">Safety</a></li><li><a href="/rewards">Rewards</a></li><li><a href="/pricing">Pricing</a></li></ul></div>
      <div><h4>For organisations</h4><ul>
        <li><a href="/organisations/hospitals">Hospitals</a></li><li><a href="/organisations#government">Government</a></li><li><a href="/organisations#campuses">Campuses</a></li><li><a href="/organisations#communities">Communities</a></li><li><a href="/partners">Partners</a></li><li><a href="/partners#brands">For brands</a></li></ul></div>
      <div><h4>Company</h4><ul>
        <li><a href="/about">About</a></li><li><a href="/press">Press & Impact</a></li>${HAS_BLOG ? '<li><a href="/blog">Blog</a></li>' : ''}<li><a href="/safety-champions">Safety Champions</a></li><li><a href="/care">VerifyU Care</a></li></ul></div>
      <div><h4>Support</h4><ul>
        <li><a href="/support">Help Centre</a></li><li><a href="/support#contact">Contact</a></li><li><a href="/account-deletion">Account deletion</a></li></ul></div>
      <div><h4>Legal</h4><ul>
        <li><a href="/legal/privacy">Privacy</a></li><li><a href="/legal/terms">Terms</a></li><li><a href="/legal/rewards-terms">Rewards terms</a></li><li><a href="/legal/billing">Billing & refunds</a></li></ul></div>
    </div>
    <div class="footer-mid">
      <div><div class="meta" style="color:rgba(255,255,255,.5)">Get VerifyU</div><div class="mt-2">${stores()}</div></div>
      <div class="small" style="color:rgba(255,255,255,.55);max-width:34ch">Free to register. Premium features available. Available for Android and iPhone in India.</div>
    </div>
    <div class="footer-bottom">
      <div>© ${SITE.year} ${SITE.entity} All rights reserved.</div>
      <p>VerifyU supports identification and communication. It does not replace emergency services and does not guarantee assistance, identification or response times. Feature access, rewards and availability depend on the app version, plan, permissions and applicable terms.</p>
    </div>
  </div>
</footer>
<div class="sticky-cta" id="sticky-cta" aria-hidden="true"><div><b>Get VerifyU</b><small>Free to register</small></div><a class="btn" href="/#get-verifyu" data-get>Download</a></div>`;

/* ---------------- Components ---------------- */
export const device = ({ src = '/images/app/home-dashboard.webp', alt = 'VerifyU identity dashboard with a verified demo profile', cls = '', inner = '', id = '', eager = false } = {}) => `
<div class="device ${cls}" ${id ? `id="${id}"` : ''}>
  <img class="frame" src="/images/iphone-frame.webp" alt="" width="439" height="904" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'}>
  <span class="island"></span>
  <div class="screen">${inner || `<img src="${src}" alt="${esc(alt)}" width="722" height="1600" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'}>`}</div>
</div>`;

export const check = (t) => `<li class="check">${icons.check}<span>${t}</span></li>`;
export const checks = (arr) => `<ul class="checks">${arr.map(check).join('')}</ul>`;
export const note = (t) => `<p class="note">${icons.info}<span>${t}</span></p>`;
export const flag = (t = 'Owner verification') => `<span class="flag" title="This statement needs confirmation by the VerifyU team before launch">${t}</span>`;

export const sectionHead = ({ eyebrow, title, lead, center = false, cls = '' }) => `
<div class="section-head ${center ? 'is-center' : ''} ${cls}" data-reveal>
  ${eyebrow ? `<div class="eyebrow">${eyebrow}</div>` : ''}
  <h2 class="h2">${title}</h2>
  ${lead ? `<p class="lead">${lead}</p>` : ''}
</div>`;

export const featureCard = ({ icon, title, body, iconCls = '', cls = '', href = '' }) => `
<${href ? `a href="${href}"` : 'div'} class="card ${cls}">
  <div class="icon ${iconCls}">${icons[icon] || ''}</div>
  <h3 class="h4">${title}</h3>
  <p class="body">${body}</p>
</${href ? 'a' : 'div'}>`;

export const accordion = (items, cls = '') => `
<div class="acc ${cls}" data-accordion>
  ${items.map((it, i) => `<div class="acc-item"><h3 class="acc-h"><button class="acc-btn" type="button" aria-expanded="false" id="acc-b-${it.id || i}" aria-controls="acc-p-${it.id || i}">${it.q}<span class="plus">${icons.plus}</span></button></h3>
  <div class="acc-panel" id="acc-p-${it.id || i}" role="region" aria-labelledby="acc-b-${it.id || i}"><div><div class="body">${it.a}</div></div></div></div>`).join('')}
</div>`;

export const railNav = (id) => `<div class="rail-nav"><button class="rail-btn" type="button" data-rail-prev="${id}" aria-label="Previous">${icons.chevronL}</button><button class="rail-btn" type="button" data-rail-next="${id}" aria-label="Next">${icons.chevronR}</button></div>`;

export const finalCta = ({ headline = 'Don’t wait for an emergency<br>to make your identity reachable.', copy = 'Register yourself. Register your parents. Register the people you care about.', dark = true } = {}) => `
<section class="section final ${dark ? 'is-dark on-dark' : 'is-cloud'}" id="get-verifyu" aria-labelledby="final-h">
  <div class="glow is-purple" style="width:640px;height:640px;left:-200px;top:-120px"></div>
  <div class="glow is-blue" style="width:520px;height:520px;right:-160px;bottom:-140px"></div>
  <div class="container final-inner">
    <div class="final-copy">
      <div class="eyebrow">Get VerifyU</div>
      <h2 class="h1" id="final-h">${headline}</h2>
      <p class="lead mt-3">${copy}</p>
      <div class="row mt-4">
        <a class="btn btn-lg ${dark ? 'btn-white' : 'btn-primary'}" href="${SITE.play}" target="_blank" rel="noopener">Get VerifyU — it’s free ${icons.arrow}</a>
      </div>
      <div class="mt-3">${stores(dark ? '' : 'is-light')}</div>
      <p class="small mt-4 final-whisper" data-reveal="fade"><em>I hope I never need this. But I should have it.</em></p>
    </div>
    <div class="final-device" data-reveal="scale">${device({ eager: false })}</div>
  </div>
</section>`;

export const pageHero = ({ eyebrow, title, lead, ctas = '', media = '', dark = false, cls = '' }) => `
<section class="page-hero ${dark ? 'is-dark on-dark' : ''} ${media ? 'has-media' : ''} ${cls}" aria-labelledby="page-h">
  ${dark ? '<div class="glow is-purple" style="width:640px;height:640px;right:-200px;top:-200px;opacity:.4"></div>' : ''}
  <div class="container ${media ? 'hero-split' : ''}" style="position:relative">
    <div class="mask-group">
      ${eyebrow ? `<div class="eyebrow" data-reveal="fade">${eyebrow}</div>` : ''}
      <h1 class="h1" id="page-h" data-reveal>${title}</h1>
      ${lead ? `<p class="lead" data-reveal>${lead}</p>` : ''}
      ${ctas ? `<div class="row" data-reveal>${ctas}</div>` : ''}
    </div>
    ${media ? `<div class="page-hero-media" data-reveal="scale">${media}</div>` : ''}
  </div>
</section>`;

export const ctaBand = ({ title, copy = '', primary = { t: 'Get VerifyU — it’s free', h: SITE.play, ext: true }, secondary = null, dark = false } = {}) => `
<section class="section is-tight ${dark ? 'is-dark on-dark' : 'is-cloud'}">
  <div class="container" style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:24px">
    <div data-reveal><h2 class="h3">${title}</h2>${copy ? `<p class="body mt-2">${copy}</p>` : ''}</div>
    <div class="row" data-reveal>
      <a class="btn ${dark ? 'btn-white' : 'btn-primary'}" href="${primary.h}" ${primary.ext ? 'target="_blank" rel="noopener"' : ''}>${primary.t} ${icons.arrow}</a>
      ${secondary ? `<a class="btn btn-ghost" href="${secondary.h}">${secondary.t}</a>` : ''}
    </div>
  </div>
</section>`;

/* ---------------- Page shell ---------------- */
export function page({ path, title, titleFull = '', description, body, nav = '', jsonld = null, ogImage = '/images/og-verifyu.jpg', extraHead = '' }) {
  const canonical = SITE.url + (path === '/' ? '/' : path);
  const fullTitle = titleFull || (path === '/' ? 'VerifyU — Identity when it matters most' : `${title} | VerifyU`);
  const ld = jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : '';
  return `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta name="theme-color" content="#632899">
<meta property="og:type" content="website">
<meta property="og:site_name" content="VerifyU">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE.url}${ogImage}">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(fullTitle)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${SITE.url}${ogImage}">
<link rel="icon" href="/images/icon-32.png" sizes="32x32" type="image/png">
<link rel="icon" href="/images/icon-192.png" sizes="192x192" type="image/png">
<link rel="apple-touch-icon" href="/images/icon-180.png">
<link rel="preload" href="/fonts/inter-tight-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/site.css">
<script>try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('no-motion')}catch(e){}</script>
${ld}
${extraHead}
</head>
<body data-page="${path}" data-nav="${nav}">
${header()}
<main id="main">
${body}
</main>
${footer()}
<script src="/site.js" defer></script>
</body>
</html>`;
}

export const ORG_LD = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'VerifyU', url: SITE.url,
  logo: SITE.url + '/images/verifyu-logo.png', sameAs: [SITE.instagram, SITE.linkedin, 'https://verifyu.in/'],
  parentOrganization: { '@type': 'Organization', name: SITE.entity },
  contactPoint: [{ '@type': 'ContactPoint', contactType: 'customer support', email: SITE.email, telephone: '+91-82990-44462', areaServed: 'IN', availableLanguage: ['en', 'hi'] }],
};
export const APP_LD = {
  '@context': 'https://schema.org', '@type': 'MobileApplication', name: 'VerifyU', operatingSystem: 'Android, iOS', applicationCategory: 'UtilitiesApplication',
  offers: [{ '@type': 'Offer', price: '0', priceCurrency: 'INR', description: 'Free registration' }, { '@type': 'Offer', price: '99', priceCurrency: 'INR', description: 'Premium monthly' }, { '@type': 'Offer', price: '999', priceCurrency: 'INR', description: 'Premium yearly' }],
  installUrl: [SITE.play, SITE.appstore], publisher: { '@type': 'Organization', name: SITE.entity },
};
export const breadcrumbLd = (items) => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: SITE.url + it.path })) });
export const faqLd = (items) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map(it => ({ '@type': 'Question', name: it.q.replace(/<[^>]+>/g, ''), acceptedAnswer: { '@type': 'Answer', text: it.a.replace(/<[^>]+>/g, '') } })) });
