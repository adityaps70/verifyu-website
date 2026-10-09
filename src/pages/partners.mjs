import { SITE, icons, device, note, flag, sectionHead, breadcrumbLd, ORG_LD, esc } from '../lib.mjs';
import { partners as contentPartners } from '../content.mjs';
const LIVE_PARTNERS = contentPartners();   // edited in the admin panel (content/partners.json); shown only with each partner's agreement

/* Partners — one page, two tracks: brands & businesses (waitlist → WhatsApp) and community/institutional partners (note → email/WhatsApp). */
const WA_NUMBER = '918591685150';                       // +91 85916 85150 (Rewards Partner Program)
const WA_DISPLAY = '+91 85916 85150';
const WA_HELLO = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hi VerifyU, I’m interested in becoming a VerifyU Rewards Partner.')}`;

const BRAND_STEPS = [
  { n: '01', i: 'doc', h: 'Submit your offer', b: 'Tell us about your business and the reward you’d like to provide.' },
  { n: '02', i: 'star', h: 'Get featured on VerifyU', b: 'Eligible partner offers can be showcased within the VerifyU rewards ecosystem.' },
  { n: '03', i: 'coin', h: 'Users redeem', b: 'VerifyU users discover offers and use eligible VerifyU Coins to access participating rewards.' },
];

const BENEFITS = [
  { i: 'pin', h: 'Reach local users', b: 'Help more VerifyU users discover your brand where they live and walk.' },
  { i: 'tag', h: 'Promote meaningful offers', b: 'Turn discounts and benefits into an engaging reward experience.', cls: 'is-teal' },
  { i: 'eye', h: 'Increase brand visibility', b: 'Get featured where users are actively exploring rewards.', cls: 'is-blue' },
  { i: 'heart', h: 'Build community connection', b: 'Associate your brand with a growing safety- and community-focused ecosystem.' },
];

const BRAND_CATS = [
  ['utensils', 'Restaurants'], ['coffee', 'Cafés'], ['fitness', 'Fitness'], ['medical', 'Healthcare'], ['scissors', 'Salons'], ['shirt', 'Fashion'],
  ['bag', 'Retail'], ['film', 'Entertainment'], ['plane', 'Travel'], ['school', 'Education'], ['car', 'Automotive'], ['wrench', 'Local services'],
];

/* Example offers: illustrative only — generic business names, no real brands */
const EXAMPLES = [
  { v: '20% OFF', t: 'on the total bill', c: 'Café', i: 'coffee', cls: 'is-purple' },
  { v: 'Buy 1 Get 1', t: 'on a second class', c: 'Fitness studio', i: 'fitness', cls: 'is-teal' },
  { v: '₹500 OFF', t: 'on orders above ₹2,000', c: 'Fashion store', i: 'shirt', cls: 'is-blue' },
  { v: 'Free trial', t: 'for one week', c: 'Gym', i: 'fitness', cls: 'is-purple' },
  { v: 'Free consultation', t: 'first visit', c: 'Clinic', i: 'medical', cls: 'is-teal' },
];

/* Form model — the single source of truth for steps, labels and validation (also used for the WhatsApp message) */
const FORM = [
  { key: 'brand', type: 'text', required: true, q: 'What is your brand or business name?', label: 'Brand / Business', ph: 'e.g. The Fitness Lab', ac: 'organization', err: 'Please enter your brand name to continue.' },
  { key: 'contact', type: 'text', required: true, q: 'Who should we speak to?', label: 'Contact person', ph: 'Your full name', ac: 'name', err: 'Please tell us who to contact.' },
  { key: 'phone', type: 'tel', required: true, q: 'Your WhatsApp number', label: 'WhatsApp', ph: '98765 43210', err: 'Please enter a valid WhatsApp number.' },
  { key: 'city', type: 'text', required: true, q: 'Which city is your business located in?', label: 'City', ph: 'e.g. Lucknow', ac: 'address-level2', err: 'Please enter your city to continue.' },
  { key: 'category', type: 'choice', required: true, q: 'What type of business do you run?', label: 'Business category', err: 'Please choose a category (or pick Other and describe it).',
    options: ['Restaurant', 'Café', 'Gym & Fitness', 'Salon & Beauty', 'Healthcare', 'Fashion', 'Retail', 'Entertainment', 'Travel', 'Education', 'Automotive', 'Professional Services', 'Other'] },
  { key: 'online', type: 'text', required: false, q: 'Where can we find your brand online?', label: 'Website / Instagram', ph: 'https://... or @yourbrand', hint: 'Website, Instagram or any other social link. Optional.', ac: 'url' },
  { key: 'offer', type: 'text', required: true, q: 'What offer would you like to provide to VerifyU users?', label: 'Proposed offer', ph: 'e.g. 20% OFF', err: 'Please describe the offer in a few words.', chips: ['20% OFF', 'Buy 1 Get 1 Free', '₹500 OFF', 'Free Consultation', 'Free Trial'] },
  { key: 'details', type: 'textarea', required: true, q: 'Tell us a little more about your offer', label: 'Offer details', ph: 'e.g. 20% off on the total bill for VerifyU users. Valid Monday–Friday.', err: 'A line or two about the offer helps us review it faster.' },
  { key: 'notes', type: 'textarea', required: false, q: 'Anything else you’d like us to know?', label: 'Additional notes', ph: 'Locations, timing, anything at all. Optional.' },
];

const COUNTRY_CODES = [['+91', 'India'], ['+971', 'UAE'], ['+966', 'Saudi Arabia'], ['+974', 'Qatar'], ['+965', 'Kuwait'], ['+968', 'Oman'], ['+65', 'Singapore'], ['+60', 'Malaysia'], ['+44', 'United Kingdom'], ['+1', 'USA / Canada'], ['+61', 'Australia'], ['+977', 'Nepal'], ['+94', 'Sri Lanka'], ['+880', 'Bangladesh'], ['other', 'Other (type full number)']];

const field = (f, i) => {
  const id = `wl-${f.key}`;
  const n = `<span class="wl-n">${i + 1}<span aria-hidden="true"> →</span></span>`;
  const req = f.required ? '' : '<span class="wl-opt-tag">Optional</span>';
  const err = `<p class="wl-error" id="${id}-err" hidden></p>`;
  const hint = f.hint ? `<p class="wl-hint-text">${f.hint}</p>` : '';
  if (f.type === 'choice') {
    return `<section class="wl-step" data-wl-step="${f.key}" data-required="${f.required ? 1 : 0}" data-type="choice" aria-labelledby="${id}-q" hidden>
      <h2 class="wl-q" id="${id}-q">${n}${f.q}${req}</h2>
      <div class="wl-opts" role="radiogroup" aria-labelledby="${id}-q" data-wl-opts>
        ${f.options.map((o, k) => `<button type="button" class="wl-opt" role="radio" aria-checked="false" data-value="${esc(o)}" tabindex="${k === 0 ? 0 : -1}"><span class="wl-key">${String.fromCharCode(65 + k)}</span>${o}</button>`).join('')}
      </div>
      <div class="wl-other" data-wl-other hidden>
        <label class="wl-label" for="${id}-other">Tell us your category</label>
        <input class="wl-input" id="${id}-other" type="text" placeholder="e.g. Co-working space" autocomplete="off">
      </div>
      ${err}
    </section>`;
  }
  if (f.type === 'tel') {
    return `<section class="wl-step" data-wl-step="${f.key}" data-required="1" data-type="tel" aria-labelledby="${id}-q" hidden>
      <h2 class="wl-q" id="${id}-q">${n}${f.q}</h2>
      <div class="wl-tel">
        <label class="sr-only" for="${id}-cc">Country code</label>
        <select class="wl-select" id="${id}-cc" data-wl-cc>${COUNTRY_CODES.map(([c, name]) => `<option value="${c}"${c === '+91' ? ' selected' : ''}>${c === 'other' ? name : `${c} ${name}`}</option>`).join('')}</select>
        <label class="sr-only" for="${id}">WhatsApp number</label>
        <input class="wl-input" id="${id}" name="${f.key}" type="tel" inputmode="tel" autocomplete="tel-national" placeholder="${f.ph}" data-wl-input>
      </div>
      <p class="wl-hint-text">We’ll reply on this number. Include the country code if you choose “Other”.</p>
      ${err}
    </section>`;
  }
  const chips = f.chips ? `<div class="wl-chips" aria-label="Examples">${f.chips.map(c => `<button type="button" class="wl-chip" data-wl-fill="${esc(c)}">${c}</button>`).join('')}</div>` : '';
  const control = f.type === 'textarea'
    ? `<textarea class="wl-input wl-textarea" id="${id}" name="${f.key}" rows="3" placeholder="${esc(f.ph)}" data-wl-input></textarea><p class="wl-hint-text">Shift + Enter for a new line.</p>`
    : `<input class="wl-input" id="${id}" name="${f.key}" type="${f.ac === 'url' ? 'text' : 'text'}" placeholder="${esc(f.ph)}" ${f.ac ? `autocomplete="${f.ac}"` : ''} data-wl-input>`;
  return `<section class="wl-step" data-wl-step="${f.key}" data-required="${f.required ? 1 : 0}" data-type="${f.type}" aria-labelledby="${id}-q" hidden>
    <label class="wl-q" id="${id}-q" for="${id}">${n}${f.q}${req}</label>
    ${chips}${control}${hint}${err}
  </section>`;
};

const modal = `
<div class="wl" id="wl" role="dialog" aria-modal="true" aria-label="VerifyU Rewards Partner waitlist" hidden>
  <div class="wl-bar">
    <div class="wl-brand"><img src="/images/verifyu-logo.png" alt="" width="28" height="28"><span>Rewards Partner waitlist</span></div>
    <div class="wl-progress"><span class="wl-count" id="wl-count" aria-live="polite">1 of ${FORM.length}</span><span class="wl-track" aria-hidden="true"><i id="wl-fill" style="width:${(100 / FORM.length).toFixed(1)}%"></i></span></div>
    <button type="button" class="wl-close" data-wl-close aria-label="Close the form">${icons.close}</button>
  </div>
  <form class="wl-form" id="wl-form" novalidate data-wl-form data-wa="${WA_NUMBER}">
    <div class="wl-stage" id="wl-stage">
      ${FORM.map(field).join('')}
      <section class="wl-step wl-review" data-wl-step="review" hidden aria-labelledby="wl-review-h">
        <h2 class="wl-q" id="wl-review-h">You’re almost there.</h2>
        <p class="wl-sub">Review your details and send your partnership request to the VerifyU team on WhatsApp.</p>
        <dl class="wl-summary" id="wl-summary"></dl>
        <div class="wl-actions">
          <a class="btn btn-primary btn-lg wl-send" id="wl-send" href="${WA_HELLO}" target="_blank" rel="noopener" data-wl-send>${icons.whatsapp} Send to VerifyU on WhatsApp</a>
          <button type="button" class="btn btn-ghost btn-lg" data-wl-edit>Edit details</button>
        </div>
        <p class="wl-privacy">By submitting, you agree that VerifyU may contact you regarding the Rewards Partner Program.</p>
      </section>
    </div>
    <div class="wl-foot" id="wl-foot">
      <button type="button" class="btn btn-ghost" data-wl-back>${icons.chevronL} Back</button>
      <div class="wl-foot-right">
        <span class="wl-hint" aria-hidden="true">press <kbd>Enter ↵</kbd></span>
        <button type="submit" class="btn btn-primary" data-wl-next>Continue ${icons.arrow}</button>
      </div>
    </div>
  </form>
</div>`;

const phoneUi = `
<div class="ui rp-ui" aria-hidden="true">
  <div class="ui-top"><div class="t"><i></i>Rewards · Offers</div><div class="rp-ui-bal"><span class="coin"><i></i>120 Coins</span></div></div>
  <div class="ui-body">
    <div class="rp-ui-lbl">Example offers · illustrative</div>
    <div class="ui-list">
      ${EXAMPLES.map(e => `<div class="ui-card rp-ui-offer"><span class="rp-ui-ic ${e.cls}">${icons[e.i]}</span><div><div class="val">${e.v} <span class="rp-ui-t">${e.t}</span></div><div class="rp-ui-c">Your ${e.c.toLowerCase()} · ${e.c === 'Café' ? 'Lucknow' : 'Your city'}</div></div><span class="ui-tag is-purple">Unlock</span></div>`).join('')}
    </div>
    <div class="ui-card rp-ui-redeem"><span class="rp-ui-ic is-teal">${icons.qr}</span><div><div class="val">Redeem at the counter</div><div class="rp-ui-c">Show the unlocked offer in the app</div></div></div>
  </div>
</div>`;


const mail = (subject, bodyText = '') => `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}${bodyText ? `&body=${encodeURIComponent(bodyText)}` : ''}`;
const TEMPLATE = `Hi VerifyU team,

We are [organisation], a [category] in [city].
We reach about [number] [members / patients / residents / customers / participants].
We would like to explore [a registration drive / an offer for VerifyU users / something else].

Best regards,
[name, role, phone]`;
const PARTNER_MAIL = mail('VerifyU partnership enquiry', TEMPLATE);
const PARTNER_WA = `${SITE.whatsappHref}?text=${encodeURIComponent(TEMPLATE)}`;

/* Real app screens (demo data) */
const S = { dash: '/images/app/home-dashboard.webp', face: '/images/app/face-verification.webp', otp: '/images/app/profile-medical-otp.webp', contacts: '/images/app/profile-emergency.webp', sos: '/images/app/sos.webp', steps: '/images/app/steps.webp', settings: '/images/app/settings.webp', recharge: '/images/app/recharge.webp' };
const shot = (src, alt) => `<img class="shot" src="${src}" alt="${alt}" width="722" height="1600" loading="lazy">`;

/* One line per partner type; the rest is shown as chips + a real screen */
const PARTNER_TYPES = [
  { k: 'healthcare', icon: 'medical', t: 'Healthcare', b: 'Clinics, diagnostic centres and doctors who introduce VerifyU to the patients and families most likely to need it.', starts: ['Registration at reception', 'Medical information set-up', 'Family as next of kin'], screen: 'otp', alt: 'Medical information protected by an OTP from an emergency contact', cls: 'is-teal' },
  { k: 'brands', icon: 'star', t: 'Brands', b: 'Consumer brands that put an offer in front of VerifyU users and give people a reason to keep their profile current.', starts: ['An offer', 'A campaign period', 'Coins towards it'], screen: 'recharge', alt: 'Recharge & Utilities screen with a Use Coins option', href: '#brands', cta: 'For brands' },
  { k: 'ngos', icon: 'handshake', t: 'NGOs', b: 'Organisations already working with vulnerable groups, who can run registration where the need is clearest.', starts: ['Registration drives', 'Volunteer training', 'Field support'], screen: 'face', alt: 'Face verification during registration', href: '/safety-champions', cta: 'Safety Champions' },
  { k: 'senior', icon: 'senior', t: 'Senior care', b: 'Senior living, day-care and home-care providers who help older adults register with family listed as next of kin.', starts: ['Assisted registration', 'Family contacts', 'Medical information'], screen: 'contacts', alt: 'Emergency contacts of a matched profile with call buttons', cls: 'is-blue' },
  { k: 'events', icon: 'event', t: 'Events', b: 'Race directors and organisers who open registration to participants before the day, not after an incident.', starts: ['Pre-event registration', 'Medical-desk access', 'SOS on the day'], screen: 'sos', alt: 'SOS emergency type selection', href: '/organisations#events', cta: 'Events with VerifyU' },
  { k: 'travel', icon: 'plane', t: 'Travel', b: 'Travel and mobility businesses whose customers are routinely far from the people who know them.', starts: ['Traveller registration', 'Emergency contacts', 'Identity away from home'], screen: 'dash', alt: 'VerifyU identity dashboard with a verified demo profile', cls: 'is-blue' },
  { k: 'fitness', icon: 'fitness', t: 'Fitness', b: 'Gyms, studios and running groups whose members already walk every day and fit naturally with step rewards.', starts: ['Member drives', 'Step rewards', 'Partner offers'], screen: 'steps', alt: 'Step Counter with today’s steps and coins', cls: 'is-teal' },
  { k: 'community', icon: 'users', t: 'Community', b: 'Resident associations, clubs and city groups who host awareness sessions and registration drives in their own neighbourhood.', starts: ['Awareness sessions', 'Society drives', 'Referrals'], screen: 'settings', alt: 'Settings with referral rewards', href: '/safety-champions', cta: 'Run a drive' },
];

/* Hero orbit: partner types around the person at the centre */
const ORBIT = PARTNER_TYPES;

const FLOW = [
  { i: 'tag', h: 'Create an offer', b: 'A discount, a bundle, a trial or a service — you decide.' },
  { i: 'coin', h: 'Set the Coin requirement', b: 'How many VerifyU Coins a user puts towards it.' },
  { i: 'users', h: 'Reach VerifyU users', b: 'Eligible offers can be shown inside the rewards experience.' },
  { i: 'pin', h: 'Visits & redemptions', b: 'Users unlock the offer and walk in.' },
  { i: 'log', h: 'Measure', b: 'Visits, redemptions and repeat use — agreed before, not after.' },
];

const START = [
  { n: '01', i: 'chat', h: 'Share the context', b: 'Who you reach, how you reach them, and what you already do for their safety or wellbeing.' },
  { n: '02', i: 'search', h: 'Explore the fit', b: 'We look at whether VerifyU genuinely helps your audience — and say so if it does not.' },
  { n: '03', i: 'doc', h: 'Agree the next step', b: 'Scope, responsibilities, timelines and what success looks like, written down before anything is announced.' },
];

const body = `
<!-- 1. HERO: the person at the centre, partners around -->
<section class="page-hero has-media pt-hero" aria-labelledby="page-h">
  <div class="container pt-hero-grid" style="position:relative">
    <div class="mask-group">
      <div class="eyebrow" data-reveal="fade">Partners</div>
      <h1 class="h1" id="page-h" data-reveal>Partner with VerifyU.</h1>
      <p class="lead" data-reveal>Brands list offers that VerifyU users can unlock with Coins. Clinics, NGOs, senior-care providers, event organisers and communities help more people register before the day they need it.</p>
      <div class="row" data-reveal>
        <button type="button" class="btn btn-primary btn-lg" data-wl-open>Join the brand waitlist ${icons.arrow}</button>
        <a class="btn btn-ghost btn-lg" href="#community">Community &amp; institutional partners</a>
      </div>
      <p class="small pt-hero-note" data-reveal="fade">Brands: a two-minute form, sent to us on WhatsApp. Everyone else: a short note is enough to start.</p>
    </div>
    <div class="pt-orbit" data-reveal="scale" aria-hidden="true">
      <div class="pt-ring">
        <svg class="pt-ring-svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" stroke-width=".4" stroke-dasharray="1.2 2"/><circle cx="50" cy="50" r="27" fill="none" stroke="currentColor" stroke-width=".4" stroke-dasharray="1.2 2" opacity=".6"/>${ORBIT.map((c, i) => `<line x1="50" y1="50" x2="${(50 + 42 * Math.cos((i / ORBIT.length) * Math.PI * 2 - Math.PI / 2)).toFixed(2)}" y2="${(50 + 42 * Math.sin((i / ORBIT.length) * Math.PI * 2 - Math.PI / 2)).toFixed(2)}" stroke="currentColor" stroke-width=".35" opacity=".45"/>`).join('')}</svg>
        ${ORBIT.map((c, i) => { const a = (i / ORBIT.length) * Math.PI * 2 - Math.PI / 2; return `<div class="pt-node" style="left:${(50 + 42 * Math.cos(a)).toFixed(2)}%;top:${(50 + 42 * Math.sin(a)).toFixed(2)}%;--i:${i}"><div class="pt-pop"><span class="pt-chip"><span class="pt-chip-ic ${c.cls || ''}">${icons[c.icon]}</span>${c.t}</span></div></div>`; }).join('')}
      </div>
      <div class="pt-center">
        ${device({ src: S.dash, alt: '', cls: 'is-flat', eager: true })}
      </div>
    </div>
  </div>
</section>

<!-- 2. TWO DOORS -->
<section class="section is-tight pt-doors-sec" aria-labelledby="split-h">
  <div class="container">
    <h2 class="sr-only" id="split-h">Two ways to partner with VerifyU</h2>
    <div class="pt-doors" data-stagger>
      <a class="pt-door" href="#brands">
        <span class="icon">${icons.tag}</span>
        <span class="pt-door-body"><span class="eyebrow">Brands &amp; businesses</span><b>List an offer VerifyU users can unlock</b><span>Restaurants, cafés, fitness, salons, retail, healthcare and more.</span></span>
        <span class="pt-door-arrow">${icons.arrow}</span>
      </a>
      <a class="pt-door" href="#community">
        <span class="icon is-teal">${icons.handshake}</span>
        <span class="pt-door-body"><span class="eyebrow">Community &amp; institutional partners</span><b>Help more people register</b><span>Clinics, NGOs, senior care, events, travel, fitness and community groups.</span></span>
        <span class="pt-door-arrow">${icons.arrow}</span>
      </a>
    </div>
    <p class="small mt-3 pt-doors-note">Deploying VerifyU for the people in your care — a hospital, campus, society or event? <a class="ab-ext" href="/organisations">See VerifyU for organisations</a>.</p>
  </div>
</section>

${LIVE_PARTNERS.length ? `<!-- LIVE PARTNERS (admin-managed) -->
<section class="section is-tight pt-live" id="our-partners" aria-labelledby="live-h">
  <div class="container">
    ${sectionHead({ eyebrow: 'Partners we work with', title: 'Organisations already working with VerifyU.', lead: 'Listed with each partner’s agreement.' })}
    <ul class="pt-live-grid" data-stagger>
      ${LIVE_PARTNERS.map(p => `<li class="pt-live-card">
        ${p.website ? `<a href="${esc(p.website)}" target="_blank" rel="noopener" class="pt-live-link" aria-label="${esc(p.name)} website">` : '<div class="pt-live-link">'}
          <span class="pt-live-logo">${p.logo ? `<img src="${esc(p.logo)}" alt="${esc(p.name)} logo" loading="lazy">` : `<span class="pt-live-initial">${esc(String(p.name).trim().charAt(0).toUpperCase())}</span>`}</span>
          <span class="pt-live-body"><b>${esc(p.name)}</b>${p.category ? `<span class="pill">${esc(p.category)}</span>` : ''}${p.description ? `<span class="pt-live-desc">${esc(p.description)}</span>` : ''}</span>
        ${p.website ? '</a>' : '</div>'}
      </li>`).join('')}
    </ul>
  </div>
</section>` : ''}

<!-- BRANDS TRACK -->
<section class="section is-cloud rp-brands" id="brands" aria-labelledby="brands-h">
  <div class="container rp-hero-grid" style="position:relative">
    <div class="rp-hero-copy">
      <div class="eyebrow" data-reveal="fade">For brands &amp; businesses</div>
      <h2 class="h1" id="brands-h" data-reveal>Turn your offers into customer engagement.</h2>
      <p class="lead" data-reveal>List exclusive offers for the VerifyU community. Users can discover participating brands and redeem eligible offers using VerifyU Coins.</p>
      <div class="row rp-hero-cta" data-reveal>
        <button type="button" class="btn btn-primary btn-lg" data-wl-open>Join the waitlist ${icons.arrow}</button>
        <a class="btn btn-ghost btn-lg" href="${WA_HELLO}" target="_blank" rel="noopener" data-wl-wa>${icons.whatsapp} Talk to us on WhatsApp</a>
      </div>
      <p class="small rp-hero-note" data-reveal="fade">Early partner programme · Free to join the waitlist · Offers reviewed before they appear</p>
    </div>
    <div class="rp-hero-media" data-reveal="scale">
      <div class="rp-stage">
        ${device({ inner: phoneUi, cls: 'is-lg is-flat', eager: true })}
        <div class="rp-float rp-float-1"><span class="coin"><i></i>+5 VerifyU Coins</span></div>
        <div class="rp-float rp-float-2"><span class="rp-redeem">${icons.check}<span><b>Offer unlocked</b>Your café · 20% OFF</span></span></div>
      </div>
      <p class="rp-stage-cap">Illustrative concept — offer placement and format are being finalised.</p>
    </div>
  </div>
</section>

<!-- 2. HOW IT WORKS -->
<section class="section rp-how" aria-labelledby="how-h">
  <div class="container">
    ${sectionHead({ eyebrow: 'How it works', title: 'Simple for brands. Valuable for users.', lead: 'Three steps from a good offer to a customer walking in.' })}
    <ol class="rp-steps" data-stagger>
      ${BRAND_STEPS.map(s => `<li class="rp-step"><span class="rp-step-n">${s.n}</span><div class="icon">${icons[s.i]}</div><h3 class="h4">${s.h}</h3><p class="body">${s.b}</p></li>`).join('')}
    </ol>
  </div>
</section>

<!-- 3. WHY PARTNER -->
<section class="section is-cloud rp-why" aria-labelledby="why-h">
  <div class="container">
    ${sectionHead({ eyebrow: 'Why partner with VerifyU', title: 'A rewards audience that opens the app anyway.', lead: 'VerifyU users open the app to keep their safety profile current and to track their steps. Partner offers give that habit a destination — and give your brand a place in it.' })}
    <div class="grid grid-4 rp-benefits" data-stagger>
      ${BENEFITS.map(b => `<article class="card rp-benefit"><div class="icon ${b.cls || ''}">${icons[b.i]}</div><h3 class="h4">${b.h}</h3><p class="body">${b.b}</p></article>`).join('')}
    </div>
    <p class="note mt-4">${icons.info}<span>Placement depends on review, category fit and the offers running at the time. VerifyU does not guarantee sales, footfall or redemptions.</span></p>
  </div>
</section>

<!-- 4. CATEGORIES -->
<section class="section rp-cats" aria-labelledby="cats-h">
  <div class="container">
    ${sectionHead({ eyebrow: 'Categories', title: 'Built for businesses people use every day.', center: true })}
    <ul class="rp-cat-grid" data-stagger>
      ${BRAND_CATS.map(([i, t]) => `<li class="rp-cat"><span class="rp-cat-ic">${icons[i]}</span><span>${t}</span></li>`).join('')}
    </ul>
  </div>
</section>

<!-- 5. EXAMPLE OFFERS -->
<section class="section is-cloud rp-examples" aria-labelledby="ex-h">
  <div class="container">
    <div class="rp-ex-head">
      ${sectionHead({ eyebrow: 'Example offers', title: 'The kind of offers that work well.', lead: 'Simple, easy to understand, easy to honour at the counter. These are illustrative examples, not live partner offers.' })}
      <span class="pill is-ink rp-ex-pill">${icons.info} Example offers — illustrative only</span>
    </div>
    <ul class="rp-ex-grid" data-stagger>
      ${EXAMPLES.map(e => `<li class="rp-ex"><span class="rp-ex-ic ${e.cls}">${icons[e.i]}</span><b class="rp-ex-v">${e.v}</b><span class="rp-ex-t">${e.t}</span><span class="rp-ex-c">${e.c} · example</span><span class="rp-ex-coin"><span class="coin"><i></i>Unlock with Coins</span></span></li>`).join('')}
    </ul>
  </div>
</section>

<!-- 4. HOW PARTNER OFFERS WORK (infographic) -->
<section class="section is-dark on-dark pt-offers" aria-labelledby="offers-h">
  <div class="glow is-purple" style="width:560px;height:560px;right:-180px;top:-160px;opacity:.35"></div>
  <div class="container">
    ${sectionHead({ eyebrow: 'Offers & VerifyU Coins', title: 'How partner offers<br>are designed to work.', lead: 'VerifyU users earn Coins by walking on eligible days. A partner offer gives those Coins a destination.' })}
    <ol class="pt-flow" data-reveal>
      <svg class="pt-flow-line" viewBox="0 0 1000 8" preserveAspectRatio="none" aria-hidden="true"><path d="M0 4H1000" stroke="url(#ptg)" stroke-width="2" stroke-dasharray="1000" stroke-dashoffset="1000"/><defs><linearGradient id="ptg" x1="0" x2="1"><stop offset="0" stop-color="#9A4DD9"/><stop offset="1" stop-color="#01C4A2"/></linearGradient></defs></svg>
      ${FLOW.map((f, i) => `<li class="pt-flow-step" style="--i:${i}"><span class="pt-flow-dot"><span class="icon">${icons[f.i]}</span></span><span class="pt-flow-n">0${i + 1}</span><h3 class="h4">${f.h}</h3><p class="small">${f.b}</p></li>`).join('')}
    </ol>
    <div class="pt-offer-demo" data-reveal="scale" aria-hidden="true">
      <div class="pt-demo-card"><span class="rp-ex-ic is-purple">${icons.coffee}</span><div><b>20% OFF</b><span>Your café · example</span></div><span class="coin"><i></i>Unlock</span></div>
      <span class="pt-demo-arrow">${icons.arrow}</span>
      <div class="pt-demo-card is-on"><span class="rp-ex-ic is-teal">${icons.check}</span><div><b>Offer unlocked</b><span>Show at the counter</span></div></div>
      <span class="pt-demo-arrow">${icons.arrow}</span>
      <div class="pt-demo-card"><span class="rp-ex-ic is-blue">${icons.log}</span><div><b>Visit logged</b><span>Agreed measures, reported</span></div></div>
    </div>
    <div class="rp-coins-grid pt-coins" data-reveal>
      <div class="rp-coin-visual" data-reveal="scale" aria-hidden="true">
        <div class="rp-coin"><span class="rp-coin-face"><img src="/images/verifyu-logo.png" alt="" width="64" height="64"></span></div>
        <div class="rp-coin-orbit rp-coin-orbit-1"><span class="coin"><i></i>+5 Coins</span></div>
        <div class="rp-coin-orbit rp-coin-orbit-2"><span class="coin"><i></i>Recharge</span></div>
        <div class="rp-coin-orbit rp-coin-orbit-3"><span class="coin"><i></i>Partner offer</span></div>
      </div>
      <div class="rp-coins-copy">
        <div class="eyebrow">VerifyU Coins</div>
        <h3 class="h2">One reward, more reasons to open the app.</h3>
        <ul class="rp-coin-list" data-stagger>
          <li><span class="rp-coin-k">Earn</span><span>Walking on eligible days earns VerifyU Coins — under the current offer, 10,000 steps earn 5 Coins.</span></li>
          <li><span class="rp-coin-k">Use</span><span>Today, eligible Coins go towards mobile recharges, DTH and electricity inside the app.</span></li>
          <li><span class="rp-coin-k">Discover</span><span>Partner offers can become another place Coins lead — a reason to notice a brand and walk in.</span></li>
        </ul>
        <p class="small rp-coins-note">VerifyU Coins are an in-app reward with no cash value. Partner offers are subject to review, eligibility and the <a class="ab-ext" href="/legal/rewards-terms">Rewards terms</a>.</p>
      </div>
    </div>
    <p class="small mt-4 pt-offers-note">Illustrative flow. Tooling for partner offers — how an offer is created, targeted, redeemed and reported — is being confirmed with the VerifyU team. ${flag()}</p>
    <div class="row mt-4"><button type="button" class="btn btn-white" data-wl-open>Join the Rewards Partner waitlist ${icons.arrow}</button><a class="btn btn-ghost" href="/rewards">How VerifyU Rewards work</a></div>
  </div>
</section>

<!-- 3. CATEGORY EXPLORER -->
<section class="section pt-explore" id="community" aria-labelledby="cat-h" data-switch data-switch-interval="5000">
  <div class="container">
    ${sectionHead({ eyebrow: 'Community & institutional partners', title: 'Eight kinds of partner.<br>One shared job.', lead: 'Every partnership answers the same question: how do more people get registered before the day they need it?' })}
    <div class="pt-explore-grid">
      <div class="pt-explore-list" role="tablist" aria-label="Partner categories">
        ${PARTNER_TYPES.map((c, i) => `<button class="pt-tab ${i === 0 ? 'is-active' : ''}" role="tab" aria-selected="${i === 0}" data-switch-btn="${i}"><span class="pt-tab-ic ${c.cls || ''}">${icons[c.icon]}</span><span>${c.t}</span>${icons.chevronR}</button>`).join('')}
      </div>
      <div class="pt-explore-panel">
        <div class="pt-explore-copy">
          ${PARTNER_TYPES.map((c, i) => `<div class="switch-panel pt-explore-text ${i === 0 ? 'is-active' : ''}" data-switch-panel="${i}">
            <span class="pt-ex-num">0${i + 1} / 0${PARTNER_TYPES.length}</span>
            <h3 class="h3">${c.t}</h3>
            <p class="lead">${c.b}</p>
            <div class="meta mt-3">How it usually starts</div>
            <ul class="pt-starts">${c.starts.map(s => `<li>${s}</li>`).join('')}</ul>
            <div class="row mt-3"><a class="btn ${c.href ? 'btn-ghost' : 'btn-primary'} btn-sm" href="${PARTNER_MAIL}">Talk to us ${icons.arrow}</a>${c.href ? `<a class="btn btn-primary btn-sm" href="${c.href}">${c.cta} ${icons.arrow}</a>` : ''}</div>
          </div>`).join('')}
        </div>
        <div class="pt-explore-phone">
          ${device({ cls: 'is-flat', inner: PARTNER_TYPES.map((c, i) => `<div class="switch-panel ${i === 0 ? 'is-active' : ''}" data-switch-panel="${i}">${shot(S[c.screen], c.alt)}</div>`).join('') })}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- 6. HOW WE START -->
<section class="section pt-start" aria-labelledby="start-h">
  <div class="container">
    ${sectionHead({ eyebrow: 'How we start', title: 'Three steps. No long proposal.', lead: 'We would rather understand your audience properly than send you a deck about ours.' })}
    <ol class="rp-steps" data-stagger>
      ${START.map(s => `<li class="rp-step"><span class="rp-step-n">${s.n}</span><div class="icon">${icons[s.i]}</div><h3 class="h4">${s.h}</h3><p class="body">${s.b}</p></li>`).join('')}
    </ol>
  </div>
</section>

<!-- 7. ENQUIRY -->
<section class="section is-cloud pt-enquire" id="enquire" aria-labelledby="enq-h">
  <div class="container split">
    <div class="col-6">
      ${sectionHead({ eyebrow: 'Become a partner', title: 'Community partners: a short note is enough.', lead: 'There is no application form. Send this note by email or WhatsApp — we will come back to you with the next step.' })}
      <div class="row">
        <a class="btn btn-primary btn-lg" href="${PARTNER_MAIL}">Send by email ${icons.mail}</a>
        <a class="btn btn-ghost btn-lg" href="${PARTNER_WA}" target="_blank" rel="noopener">${icons.whatsapp} Send on WhatsApp</a>
      </div>
      <p class="small mt-3">${SITE.email} · ${SITE.whatsapp} · ${SITE.entity}</p>
      ${note('Partnerships are agreed in writing. Nothing on this page is an offer, and no partner is listed publicly without their agreement.')}
    </div>
    <div class="col-6">
      <div class="pt-note" data-reveal="scale">
        <div class="pt-note-bar"><span class="pt-note-dot"></span><span class="pt-note-dot"></span><span class="pt-note-dot"></span><span>New message · to VerifyU</span></div>
        <div class="pt-note-body">
          <p>Hi VerifyU team,</p>
          <p>We are <mark>organisation</mark>, a <mark>category</mark> in <mark>city</mark>.</p>
          <p>We reach about <mark>number</mark> <mark>members / patients / residents / customers / participants</mark>.</p>
          <p>We would like to explore <mark>a registration drive / an offer for VerifyU users / something else</mark>.</p>
          <p>Best regards,<br><mark>name, role, phone</mark></p>
        </div>
        <div class="pt-note-foot">Prefilled when you press Send — just replace the highlighted parts.</div>
      </div>
    </div>
  </div>
</section>

<!-- FINAL CTA -->
<section class="section rp-final" aria-labelledby="final-h">
  <div class="container rp-final-inner">
    <div class="eyebrow" data-reveal="fade">Early partner waitlist</div>
    <h2 class="h1" id="final-h" data-reveal>Your next customer could discover you on VerifyU.</h2>
    <p class="lead" data-reveal>Join the early partner waitlist and tell us what you’d like to offer the VerifyU community.</p>
    <div class="row rp-final-cta" data-reveal>
      <button type="button" class="btn btn-primary btn-lg" data-wl-open>Join the waitlist ${icons.arrow}</button>
      <a class="btn btn-ghost btn-lg" href="${PARTNER_MAIL}">Become a community partner ${icons.mail}</a>
    </div>
    <p class="small mt-3" data-reveal="fade">Brands on WhatsApp: <a class="ab-ext" href="${WA_HELLO}" target="_blank" rel="noopener">${WA_DISPLAY}</a> · Everyone else: <a class="ab-ext" href="mailto:${SITE.email}">${SITE.email}</a></p>
  </div>
</section>

<!-- Mobile sticky CTA for this page (replaces the app-download bar) -->
<div class="rp-sticky" id="rp-sticky" aria-hidden="true"><div><b>Partner with VerifyU</b><small>Early partner waitlist</small></div><button type="button" class="btn" data-wl-open>Join the waitlist</button></div>

${modal}
<script src="/waitlist.js" defer></script>
`;


const css = `
/* live partners (admin-managed) */
.pt-live-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:clamp(12px,1.6vw,20px)}
.pt-live-link{display:flex;flex-direction:column;gap:12px;height:100%;padding:20px;border-radius:var(--r-lg);background:#fff;border:1px solid var(--line);color:var(--ink);transition:transform .5s var(--ease),box-shadow .5s var(--ease),border-color .3s}
a.pt-live-link:hover{transform:translateY(-3px);box-shadow:var(--shadow-2);border-color:var(--purple-100)}
.pt-live-logo{display:flex;align-items:center;justify-content:center;height:72px;border-radius:12px;background:var(--cloud);padding:12px}
.pt-live-logo img{max-width:100%;max-height:100%;object-fit:contain}
.pt-live-initial{font-family:var(--font-display);font-size:28px;font-weight:700;color:var(--purple)}
.pt-live-body{display:flex;flex-direction:column;gap:6px;align-items:flex-start}
.pt-live-body b{font-family:var(--font-display);font-size:17px;letter-spacing:-.02em}
.pt-live-body .pill{padding:3px 9px;font-size:11px}
.pt-live-desc{font-size:13.5px;color:var(--ink-3);line-height:1.45}
@media (max-width:1024px){.pt-live-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:520px){.pt-live-grid{grid-template-columns:1fr}}
/* ---------- Partners: hero + orbit ---------- */
.pt-hero{background:radial-gradient(900px 520px at 85% -10%,#F4ECFB 0%,#fff 60%)}
.pt-hero-grid{display:grid;grid-template-columns:minmax(0,6fr) minmax(0,6fr);gap:clamp(24px,4vw,64px);align-items:center}
.pt-hero .h1{max-width:13ch}
.pt-hero .lead{max-width:46ch}
.pt-hero-note{margin-top:16px;color:var(--ink-4)}
.pt-orbit{position:relative;width:100%;max-width:560px;aspect-ratio:1;margin:0 auto;padding-bottom:0}
.pt-ring{position:absolute;inset:0;color:var(--purple);animation:ptSpin 90s linear infinite}
.pt-ring-svg{position:absolute;inset:0;width:100%;height:100%}
.pt-node{position:absolute;width:0;height:0}
.pt-pop{position:absolute;left:0;top:0;transform:translate(-50%,-50%);animation:ptPop .9s var(--spring) both;animation-delay:calc(.5s + var(--i) * .09s)}
.pt-chip{display:inline-flex;align-items:center;gap:8px;padding:8px 14px 8px 8px;border-radius:999px;background:rgba(255,255,255,.96);border:1px solid var(--line);box-shadow:var(--shadow-2);font-size:13px;font-weight:600;color:var(--ink);white-space:nowrap;animation:ptSpin 90s linear infinite reverse}
.pt-chip-ic{width:26px;height:26px;border-radius:999px;background:var(--purple-50);color:var(--purple);display:inline-flex;align-items:center;justify-content:center;flex:none}
.pt-chip-ic svg{width:14px;height:14px}
.pt-chip-ic.is-teal{background:var(--teal-50);color:var(--teal-700)}
.pt-chip-ic.is-blue{background:var(--blue-50);color:#1F7FAE}
.pt-center{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:32%}
.pt-center .device{max-width:160px;margin:0 auto}
@keyframes ptSpin{to{transform:rotate(360deg)}}
@keyframes ptPop{from{opacity:0;transform:translate(-50%,-50%) scale(.6)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}

/* ---------- Two doors ---------- */
.pt-doors{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(16px,2vw,24px)}
.pt-door{display:flex;align-items:center;gap:20px;padding:22px 24px;border-radius:var(--r-xl);border:1px solid var(--line);background:#fff;color:var(--ink);transition:transform .5s var(--ease),box-shadow .5s var(--ease),border-color .3s}
a.pt-door:hover{transform:translateY(-3px);box-shadow:var(--shadow-2);border-color:var(--purple-100)}
.pt-door .icon{margin:0;flex:none}
.pt-door-body{display:flex;flex-direction:column;gap:2px;min-width:0}
.pt-door-body .eyebrow{margin-bottom:4px;gap:8px}
.pt-door-body b{font-family:var(--font-display);font-size:18px;font-weight:600;letter-spacing:-.02em}
.pt-door-body > span:last-child{font-size:14px;color:var(--ink-3)}
.pt-door-arrow{margin-left:auto;flex:none;width:40px;height:40px;border-radius:999px;background:var(--cloud);display:inline-flex;align-items:center;justify-content:center;transition:background .3s,transform .4s var(--spring)}
.pt-door-arrow svg{width:18px;height:18px}
a.pt-door:hover .pt-door-arrow{background:var(--purple);color:#fff;transform:translateX(4px)}
.pt-door.is-current{background:var(--cloud);border-color:transparent}
.pt-door .pill{padding:3px 9px;font-size:11px}

/* ---------- Category explorer ---------- */
.pt-explore-grid{display:grid;grid-template-columns:minmax(0,4fr) minmax(0,8fr);gap:clamp(20px,3vw,40px);align-items:start}
.pt-explore-list{display:flex;flex-direction:column;gap:4px}
.pt-tab{display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:14px;text-align:left;font-size:15.5px;font-weight:500;color:var(--ink-3);transition:background .3s,color .3s}
.pt-tab-ic{width:36px;height:36px;border-radius:11px;background:#fff;border:1px solid var(--line);color:var(--purple);display:inline-flex;align-items:center;justify-content:center;flex:none;transition:border-color .3s}
.pt-tab-ic svg{width:17px;height:17px}
.pt-tab-ic.is-teal{color:var(--teal-700)}.pt-tab-ic.is-blue{color:#1F7FAE}
.pt-tab > svg{margin-left:auto;width:16px;height:16px;opacity:0;transform:translateX(-6px);transition:opacity .3s,transform .4s var(--ease)}
.pt-tab:hover,.pt-tab.is-active{background:#fff;color:var(--ink);box-shadow:var(--shadow-1)}
.pt-tab.is-active .pt-tab-ic{border-color:var(--purple)}
.pt-tab.is-active > svg{opacity:1;transform:none}
.pt-explore-panel{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:clamp(24px,3vw,40px);align-items:center;padding:clamp(24px,3vw,40px);border-radius:var(--r-xl);background:#fff;border:1px solid var(--line);min-height:560px}
.pt-explore-copy{position:relative;display:grid;align-items:center}
.pt-explore-text{position:relative;inset:auto;grid-area:1 / 1;display:flex;flex-direction:column;justify-content:center}
.pt-explore-text .lead{font-size:17px}
.pt-ex-num{font-family:var(--font-mono,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:12px;letter-spacing:.14em;color:var(--purple);margin-bottom:12px}
.pt-explore-text .h3{margin-bottom:10px}
.pt-explore-text .meta{color:var(--purple)}
.pt-starts{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
.pt-starts li{padding:7px 12px;border-radius:999px;background:var(--cloud);font-size:13.5px;font-weight:500;color:var(--ink-2)}
.pt-explore-phone{position:relative}
.pt-explore-phone .device{max-width:280px;margin:0 auto}
.pt-explore-phone .device .switch-panel{position:absolute;inset:0}

/* ---------- Offer flow infographic ---------- */
.pt-offers{position:relative;overflow:hidden}
.pt-flow{position:relative;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:16px;padding-top:0;margin-top:8px}
.pt-flow-line{position:absolute;left:0;right:0;top:28px;height:8px;width:100%}
.pt-flow.is-in .pt-flow-line path{animation:ptDraw 1.8s var(--ease) forwards}
@keyframes ptDraw{to{stroke-dashoffset:0}}
.pt-flow-step{position:relative;padding-top:0}
.pt-flow-dot{display:flex;align-items:center;justify-content:center;width:56px;height:56px;border-radius:999px;background:#221D2C;border:1px solid rgba(255,255,255,.14);margin-bottom:18px;position:relative;z-index:1;opacity:0;transform:scale(.6)}
.pt-flow.is-in .pt-flow-dot{animation:ptPopIn .7s var(--spring) forwards;animation-delay:calc(.3s + var(--i) * .3s)}
@keyframes ptPopIn{to{opacity:1;transform:none}}
.pt-flow-dot .icon{width:auto;height:auto;margin:0;background:transparent;color:#D9BDF7}
.pt-flow-dot .icon svg{width:22px;height:22px}
.pt-flow-n{display:block;font-family:var(--font-mono,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:11px;letter-spacing:.14em;color:var(--teal);margin-bottom:6px}
.pt-flow-step .h4{font-size:17px;margin-bottom:6px}
.pt-flow-step .small{color:rgba(255,255,255,.6);line-height:1.5}
.pt-offer-demo{margin-top:clamp(32px,4vw,48px);display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap}
.pt-demo-card{display:flex;align-items:center;gap:12px;padding:12px 16px 12px 12px;border-radius:16px;background:#fff;color:var(--ink);box-shadow:0 20px 40px -20px rgba(0,0,0,.6);min-width:240px}
.pt-demo-card b{display:block;font-family:var(--font-display);font-size:15px;letter-spacing:-.02em}
.pt-demo-card span:last-child{font-size:12.5px;color:var(--ink-3)}
.pt-demo-card .coin{margin-left:auto;font-size:12px;padding:5px 10px}
.pt-demo-card .coin i{width:14px;height:14px}
.pt-demo-card.is-on{background:var(--teal-50)}
.pt-demo-arrow{color:rgba(255,255,255,.4)}
.pt-demo-arrow svg{width:22px;height:22px}
.pt-offers-note{color:rgba(255,255,255,.55);max-width:72ch}

/* ---------- Band / enquiry ---------- */
.pt-band{margin:0}
.pt-band .band-copy .body{margin-top:8px;font-size:15.5px}
.pt-enquire .note{margin-top:24px}
.pt-enquire .row .btn svg:not(.arrow){width:20px;height:20px}
.pt-note{border-radius:var(--r-xl);background:#fff;border:1px solid var(--line);box-shadow:var(--shadow-2);overflow:hidden;max-width:520px;margin-left:auto}
.pt-note-bar{display:flex;align-items:center;gap:6px;padding:12px 16px;background:var(--cloud);border-bottom:1px solid var(--line);font-size:12.5px;color:var(--ink-3)}
.pt-note-bar > span:last-child{margin-left:8px}
.pt-note-dot{width:10px;height:10px;border-radius:999px;background:var(--line)}
.pt-note-dot:nth-child(1){background:#F0A9A2}.pt-note-dot:nth-child(2){background:#F5D58E}.pt-note-dot:nth-child(3){background:#9ED9B5}
.pt-note-body{padding:22px 24px;font-size:15px;line-height:1.6;color:var(--ink-2)}
.pt-note-body p + p{margin-top:12px}
.pt-note-body mark{background:var(--purple-50);color:var(--purple);padding:1px 6px;border-radius:6px;font-weight:600}
.pt-note-foot{padding:12px 24px;border-top:1px dashed var(--line);font-size:12.5px;color:var(--ink-4)}

@media (prefers-reduced-motion:reduce){.pt-ring,.pt-chip,.pt-pop,.pt-flow-dot{animation:none!important;opacity:1!important;transform:none!important}.pt-pop{transform:translate(-50%,-50%)!important}.pt-flow-line path{stroke-dashoffset:0}}
html.no-motion .pt-ring,html.no-motion .pt-chip{animation:none!important}

@media (max-width:1024px){
  .pt-hero-grid{grid-template-columns:1fr;gap:24px}
  .pt-hero .h1{max-width:none}
  .pt-orbit{max-width:440px}
  .pt-explore-grid{grid-template-columns:1fr}
  .pt-explore-list{flex-direction:row;overflow-x:auto;gap:6px;padding-bottom:6px;scrollbar-width:none;margin-inline:calc(var(--gutter) * -1);padding-inline:var(--gutter)}
  .pt-explore-list::-webkit-scrollbar{display:none}
  .pt-tab{white-space:nowrap;flex:none;padding:9px 14px 9px 9px}
  .pt-tab > svg{display:none}
  .pt-explore-panel{min-height:0}
  .pt-flow{grid-template-columns:repeat(5,minmax(0,1fr));gap:10px}
  .pt-flow-step .h4{font-size:15px}
}
@media (max-width:640px){
  .pt-orbit{max-width:340px}
  .pt-chip{font-size:11.5px;padding:6px 10px 6px 6px;gap:6px}
  .pt-chip-ic{width:22px;height:22px}.pt-chip-ic svg{width:12px;height:12px}
  .pt-center .device{max-width:108px}
  .pt-doors{grid-template-columns:1fr}
  .pt-door{padding:18px}
  .pt-explore-panel{grid-template-columns:1fr;padding:22px}
  .pt-explore-phone .device{max-width:220px}
  .pt-flow{grid-template-columns:1fr;gap:0;padding-left:0}
  .pt-flow-line{display:none}
  .pt-flow-step{display:grid;grid-template-columns:48px minmax(0,1fr);gap:4px 14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,.1)}
  .pt-flow-dot{width:44px;height:44px;margin:0;grid-row:1 / span 3}
  .pt-flow-dot .icon svg{width:18px;height:18px}
  .pt-flow-n{margin:0}
  .pt-flow-step .h4{margin:0}
  .pt-offer-demo{flex-direction:column;align-items:stretch}
  .pt-demo-card{min-width:0}
  .pt-demo-arrow{transform:rotate(90deg);align-self:center}
  .pt-note{max-width:none}
  .pt-enquire .row .btn{width:100%;justify-content:center}
}
/* ---------- Rewards partners: hero ---------- */
.rp-brands{scroll-margin-top:72px;background:radial-gradient(900px 520px at 85% 0%,#F4ECFB 0%,var(--cloud) 60%)}
.rp-hero-grid{position:relative;display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:clamp(24px,4vw,64px);align-items:center}
.rp-brands .h1{max-width:13ch}
.rp-brands .lead{max-width:48ch;margin-top:20px}
.rp-hero-cta{margin-top:32px}
.rp-hero-cta .btn svg:not(.arrow){width:20px;height:20px}
.rp-hero-note{margin-top:18px;color:var(--ink-4)}
.rp-hero-media{position:relative;padding-bottom:clamp(24px,4vw,48px)}
.rp-stage{position:relative;display:flex;justify-content:center;padding:24px 0}
.rp-stage .device{max-width:340px;width:100%}
.rp-float{position:absolute;z-index:4;animation:rpFloat 6s ease-in-out infinite}
.rp-float-1{left:-6%;top:28%}
.rp-float-2{right:0;bottom:22%;animation-delay:-3s}
.rp-float .coin{box-shadow:var(--shadow-2);font-size:13px}
.rp-redeem{display:inline-flex;align-items:center;gap:10px;padding:10px 14px 10px 10px;border-radius:14px;background:rgba(255,255,255,.96);border:1px solid var(--line);box-shadow:var(--shadow-2);font-size:12.5px;color:var(--ink-3)}
.rp-redeem > svg{width:22px;height:22px;padding:4px;border-radius:999px;background:var(--teal);color:#fff;flex:none}
.rp-redeem b{display:block;color:var(--ink);font-size:13.5px}
.rp-stage-cap{text-align:center;font-size:12.5px;color:var(--ink-4);margin-top:4px}
@keyframes rpFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
/* phone UI (illustrative) */
.rp-ui .ui-top{display:flex;align-items:center;justify-content:space-between;gap:8px}
.rp-ui .ui-top .t{white-space:nowrap}
.rp-ui .ui-top .coin{white-space:nowrap;padding:4px 9px;font-size:10px;background:rgba(255,255,255,.14);border-color:rgba(255,255,255,.2);color:#fff}
.rp-ui .ui-top .coin i{width:12px;height:12px}
.rp-ui-lbl{font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-4);font-weight:600;margin:2px 0 8px}
.rp-ui-offer{display:flex;align-items:center;gap:10px;margin-bottom:0}
.rp-ui-offer .val{font-size:12px}
.rp-ui-t{font-weight:500;color:var(--ink-3);font-size:10.5px}
.rp-ui-c{font-size:10px;color:var(--ink-4);margin-top:2px}
.rp-ui-ic{flex:none;width:34px;height:34px;border-radius:10px;display:inline-flex;align-items:center;justify-content:center;background:var(--purple-50);color:var(--purple)}
.rp-ui-ic svg{width:16px;height:16px}
.rp-ui-ic.is-teal{background:var(--teal-50);color:var(--teal-700)}
.rp-ui-ic.is-blue{background:var(--blue-50);color:#1F7FAE}
.rp-ui-offer .ui-tag{margin-left:auto}
.rp-ui-redeem{display:flex;align-items:center;gap:10px;margin:8px 0 0;background:var(--teal-50);box-shadow:none}
.rp-ui-redeem .val{font-size:11.5px}

/* ---------- How it works ---------- */
.rp-steps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(20px,2.4vw,32px);position:relative}
.rp-step{position:relative;padding:clamp(24px,3vw,36px);border:1px solid var(--line);border-radius:var(--r-xl);background:#fff;transition:transform .5s var(--ease),box-shadow .5s var(--ease)}
.rp-step:hover{transform:translateY(-4px);box-shadow:var(--shadow-2)}
.rp-step-n{position:absolute;right:24px;top:20px;font-family:var(--font-display);font-size:44px;font-weight:700;letter-spacing:-.04em;line-height:1;color:var(--purple-100)}
.rp-step .h4{margin-bottom:8px}
.rp-step .body{font-size:15.5px}

/* ---------- Why ---------- */
.rp-benefit .h4{margin-bottom:8px}
.rp-benefit .body{font-size:15px}
.rp-why .note{max-width:72ch}

/* ---------- Categories ---------- */
.rp-cat-grid{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:12px;max-width:1000px;margin-inline:auto}
.rp-cat{display:flex;align-items:center;gap:12px;padding:14px 16px;border:1px solid var(--line);border-radius:999px;background:#fff;font-weight:600;font-size:14.5px;color:var(--ink);transition:transform .4s var(--spring),border-color .3s,box-shadow .4s}
.rp-cat:hover{transform:translateY(-2px);border-color:var(--purple-100);box-shadow:var(--shadow-1)}
.rp-cat-ic{flex:none;width:32px;height:32px;border-radius:999px;background:var(--purple-50);color:var(--purple);display:inline-flex;align-items:center;justify-content:center}
.rp-cat-ic svg{width:16px;height:16px}

/* ---------- Example offers ---------- */
.rp-ex-head{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;flex-wrap:wrap}
.rp-ex-pill{margin-bottom:clamp(40px,5vw,64px)}
.rp-ex-pill svg{width:14px;height:14px}
.rp-ex-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:clamp(12px,1.6vw,20px)}
.rp-ex{position:relative;display:flex;flex-direction:column;gap:4px;padding:22px 20px;border-radius:var(--r-lg);background:#fff;border:1px dashed var(--ink-4);transition:transform .5s var(--ease),border-color .3s}
.rp-ex:hover{transform:translateY(-3px);border-color:var(--purple)}
.rp-ex-ic{width:38px;height:38px;border-radius:12px;display:inline-flex;align-items:center;justify-content:center;background:var(--purple-50);color:var(--purple);margin-bottom:12px}
.rp-ex-ic svg{width:18px;height:18px}
.rp-ex-ic.is-teal{background:var(--teal-50);color:var(--teal-700)}
.rp-ex-ic.is-blue{background:var(--blue-50);color:#1F7FAE}
.rp-ex-v{font-family:var(--font-display);font-size:22px;font-weight:700;letter-spacing:-.03em;line-height:1.1;color:var(--ink)}
.rp-ex-t{font-size:13.5px;color:var(--ink-3)}
.rp-ex-c{font-size:12px;color:var(--ink-4);margin-top:6px}
.rp-ex-coin{margin-top:14px}
.rp-ex-coin .coin{font-size:12px;padding:6px 10px;white-space:nowrap}
.rp-ex-coin .coin i{width:14px;height:14px}

/* ---------- Coins ---------- */
.rp-coins{position:relative;overflow:hidden}
.rp-coins-grid{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(32px,6vw,96px);align-items:center;position:relative}
.rp-coin-visual{position:relative;width:100%;aspect-ratio:1;max-width:440px;margin-inline:auto;display:flex;align-items:center;justify-content:center}
.rp-coin{width:min(300px,66%);aspect-ratio:1;border-radius:999px;background:linear-gradient(135deg,#F7D774,#D9A621);box-shadow:inset 0 0 0 10px #FFF1BF,inset 0 0 0 12px #E2B534,0 30px 60px -20px rgba(0,0,0,.6),0 0 0 1px rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;animation:rpFloat 7s ease-in-out infinite;position:relative}
.rp-coin::after{content:"";position:absolute;inset:0;border-radius:999px;background:linear-gradient(120deg,rgba(255,255,255,0) 30%,rgba(255,255,255,.35) 50%,rgba(255,255,255,0) 70%);background-size:200% 100%;animation:rpShine 6s linear infinite;pointer-events:none}
.rp-coin-face{width:52%;aspect-ratio:1;border-radius:999px;background:#FFF7E0;display:flex;align-items:center;justify-content:center;box-shadow:inset 0 2px 6px rgba(122,90,0,.25)}
.rp-coin-face img{width:58%;height:auto;display:block}
@keyframes rpShine{0%{background-position:200% 0}100%{background-position:-200% 0}}
.rp-coin-orbit{position:absolute;animation:rpFloat 6s ease-in-out infinite}
.rp-coin-orbit .coin{box-shadow:0 12px 30px -10px rgba(0,0,0,.5)}
.rp-coin-orbit-1{left:0;top:12%;animation-delay:-1s}
.rp-coin-orbit-2{right:0;top:44%;animation-delay:-3s}
.rp-coin-orbit-3{left:6%;bottom:10%;animation-delay:-5s}
.rp-coins .h2{max-width:16ch}
.rp-coins .lead{color:rgba(255,255,255,.78)}
.rp-coin-list{margin-top:28px;display:flex;flex-direction:column;border-top:1px solid rgba(255,255,255,.14)}
.rp-coin-list li{display:grid;grid-template-columns:96px minmax(0,1fr);gap:16px;padding:16px 0;border-bottom:1px solid rgba(255,255,255,.14);font-size:15.5px;color:rgba(255,255,255,.82)}
.rp-coin-k{font-family:var(--font-display);font-weight:700;letter-spacing:-.02em;color:#F7D774}
.rp-coins-note{margin-top:20px;color:rgba(255,255,255,.55)}
.rp-coins-note a{color:#fff}

/* ---------- Final ---------- */
.rp-final{background:radial-gradient(800px 400px at 50% 100%,#F4ECFB 0%,#fff 70%)}
.rp-final-inner{text-align:center;display:flex;flex-direction:column;align-items:center}
.rp-final .h1{max-width:16ch}
.rp-final .lead{max-width:44ch;margin-top:20px}
.rp-final-cta{margin-top:32px;justify-content:center}
.rp-final-cta .btn svg:not(.arrow){width:20px;height:20px}

/* ---------- Page-level sticky CTA (mobile) ---------- */
body[data-page="/partners"] .sticky-cta{display:none!important}
.rp-sticky{position:fixed;left:12px;right:12px;bottom:12px;z-index:90;display:none;align-items:center;justify-content:space-between;gap:12px;padding:10px 10px 10px 16px;background:rgba(22,20,28,.94);color:#fff;border-radius:999px;box-shadow:0 20px 40px -18px rgba(0,0,0,.6);transform:translateY(120%);transition:transform .5s var(--ease)}
.rp-sticky.is-visible{transform:none}
.rp-sticky b{font-size:14px;font-weight:600;display:block}
.rp-sticky small{display:block;font-size:12px;opacity:.7}
.rp-sticky .btn{min-height:42px;padding:0 18px;font-size:14px;background:#fff;color:var(--ink)}
@media (max-width:768px){.rp-sticky{display:flex}}

/* ---------- Waitlist flow (Typeform-style) ---------- */
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.wl{position:fixed;inset:0;z-index:200;display:flex;flex-direction:column;background:#fff;height:100vh;height:100dvh;opacity:0;transform:translateY(12px) scale(.995);transition:opacity .35s var(--ease),transform .5s var(--ease)}
.wl.is-open{opacity:1;transform:none}
.wl[hidden]{display:none}
.wl-bar{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:16px;padding:14px var(--gutter);border-bottom:1px solid var(--line-2);flex:none}
.wl-brand{display:flex;align-items:center;gap:10px;font-weight:600;font-size:14px;color:var(--ink-2)}
.wl-brand img{width:28px;height:28px;border-radius:8px}
.wl-progress{display:flex;align-items:center;gap:12px;justify-self:center}
.wl-count{font-size:13px;font-weight:600;color:var(--ink-3);font-variant-numeric:tabular-nums;white-space:nowrap}
.wl-track{width:min(220px,30vw);height:4px;border-radius:4px;background:var(--line);overflow:hidden;display:block}
.wl-track i{display:block;height:100%;background:var(--grad);border-radius:4px;transition:width .5s var(--ease)}
.wl-close{justify-self:end;width:44px;height:44px;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;color:var(--ink);transition:background .25s}
.wl-close:hover{background:var(--cloud)}
.wl-close svg{width:22px;height:22px}
.wl-form{flex:1;display:flex;flex-direction:column;min-height:0}
.wl-stage{flex:1;overflow:auto;-webkit-overflow-scrolling:touch;display:flex;align-items:center;justify-content:center;padding:clamp(24px,5vh,48px) var(--gutter)}
.wl-step{width:100%;max-width:720px;margin:auto}
.wl-step.is-active{animation:wlIn .5s var(--ease) both}
.wl-step.is-active.is-back{animation-name:wlInBack}
@keyframes wlIn{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
@keyframes wlInBack{from{opacity:0;transform:translateY(-28px)}to{opacity:1;transform:none}}
.wl-q{display:block;font-family:var(--font-display);font-size:clamp(24px,3vw,36px);font-weight:600;letter-spacing:-.03em;line-height:1.15;color:var(--ink);margin-bottom:22px;text-wrap:pretty}
.wl-n{display:inline-block;margin-right:12px;font-family:var(--font-mono,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:14px;letter-spacing:.06em;color:var(--purple);vertical-align:middle;transform:translateY(-4px)}
.wl-opt-tag{display:inline-block;margin-left:12px;padding:4px 10px;border-radius:999px;background:var(--cloud);color:var(--ink-3);font-family:var(--font-body);font-size:12px;font-weight:600;letter-spacing:.02em;vertical-align:middle;transform:translateY(-4px)}
.wl-label{display:block;font-size:14px;font-weight:600;color:var(--ink-2);margin:20px 0 8px}
.wl-input{display:block;width:100%;font:inherit;font-size:clamp(20px,2.2vw,26px);font-weight:500;color:var(--ink);background:transparent;border:0;border-bottom:2px solid var(--line);padding:12px 0;border-radius:0;outline:none;transition:border-color .25s;-webkit-appearance:none;appearance:none;min-height:56px}
.wl-input::placeholder{color:var(--ink-4);font-weight:400}
.wl-input:focus{border-bottom-color:var(--purple)}
.wl-input[aria-invalid="true"]{border-bottom-color:var(--sos)}
.wl-textarea{resize:vertical;min-height:120px;line-height:1.4;font-size:clamp(18px,1.8vw,22px)}
.wl-hint-text{margin-top:12px;font-size:13.5px;color:var(--ink-4)}
.wl-error{margin-top:12px;display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:12px;background:var(--sos-50);color:var(--sos);font-size:14px;font-weight:600}
.wl-error[hidden]{display:none}
.wl-tel{display:grid;grid-template-columns:minmax(150px,auto) minmax(0,1fr);gap:16px;align-items:end}
.wl-select{font:inherit;font-size:18px;font-weight:500;color:var(--ink);background:var(--cloud) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2316141C' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right 14px center/16px;border:1px solid var(--line);border-radius:14px;padding:0 42px 0 16px;min-height:56px;-webkit-appearance:none;appearance:none;outline:none;max-width:260px}
.wl-select:focus{border-color:var(--purple);box-shadow:0 0 0 4px var(--purple-50)}
.wl-opts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.wl-opt{display:flex;align-items:center;gap:12px;min-height:56px;padding:10px 14px;border:1px solid var(--line);border-radius:14px;background:#fff;font:inherit;font-size:16px;font-weight:600;color:var(--ink);text-align:left;cursor:pointer;transition:border-color .2s,background .2s,transform .35s var(--spring)}
.wl-opt:hover{border-color:var(--purple-100);background:var(--purple-50)}
.wl-opt:focus-visible{outline:2px solid var(--purple);outline-offset:2px}
.wl-opt[aria-checked="true"]{border-color:var(--purple);background:var(--purple-50);color:var(--purple)}
.wl-key{flex:none;width:26px;height:26px;border-radius:7px;border:1px solid var(--line);display:inline-flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:var(--ink-3);background:#fff}
.wl-opt[aria-checked="true"] .wl-key{background:var(--purple);border-color:var(--purple);color:#fff}
.wl-other{margin-top:16px}
.wl-chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px}
.wl-chip{padding:8px 14px;border-radius:999px;border:1px solid var(--line);background:#fff;font:inherit;font-size:13.5px;font-weight:600;color:var(--ink-2);cursor:pointer;transition:border-color .2s,background .2s,color .2s}
.wl-chip:hover,.wl-chip:focus-visible{border-color:var(--purple);color:var(--purple);background:var(--purple-50);outline:none}
.wl-foot{flex:none;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px var(--gutter);border-top:1px solid var(--line-2);background:#fff;padding-bottom:max(14px,env(safe-area-inset-bottom))}
.wl-foot-right{display:flex;align-items:center;gap:14px}
.wl-hint{font-size:13px;color:var(--ink-4)}
.wl-hint kbd{font:inherit;padding:2px 6px;border:1px solid var(--line);border-radius:6px;background:var(--cloud);color:var(--ink-3)}
.wl-foot .btn svg{width:18px;height:18px}
.wl-foot [data-wl-back][disabled]{opacity:.4;pointer-events:none}
.wl.is-review .wl-foot-right{display:none}
/* review */
.wl-review .wl-q{margin-bottom:10px}
.wl-sub{font-size:17px;color:var(--ink-3);max-width:52ch}
.wl-summary{margin-top:24px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0 24px;border-top:1px solid var(--line)}
.wl-summary div{display:flex;flex-direction:column;gap:3px;padding:12px 0;border-bottom:1px solid var(--line);min-width:0}
.wl-summary div.is-wide{grid-column:1 / -1}
.wl-summary dt{font-size:12px;letter-spacing:.08em;text-transform:uppercase;font-weight:600;color:var(--ink-4)}
.wl-summary dd{font-size:15.5px;font-weight:500;color:var(--ink);white-space:pre-line;overflow-wrap:anywhere}
.wl-summary dd.is-empty{color:var(--ink-4);font-weight:400}
.wl-actions{margin-top:28px;display:flex;flex-wrap:wrap;gap:12px;align-items:center}
.wl-send{background:#25D366;color:#0B3D1F;box-shadow:0 12px 30px -12px rgba(37,211,102,.6)}
.wl-send:hover{background:#1FBF5B}
.wl-send svg{width:22px;height:22px}
.wl-privacy{margin-top:18px;font-size:13px;color:var(--ink-4);max-width:52ch}
@media (prefers-reduced-motion:reduce){
  .rp-float,.rp-coin,.rp-coin-orbit,.rp-coin::after{animation:none!important}
  .wl,.wl-step.is-active{transition:none!important;animation:none!important}
}
html.no-motion .rp-float,html.no-motion .rp-coin,html.no-motion .rp-coin-orbit,html.no-motion .rp-coin::after{animation:none!important}

@media (max-width:1024px){
  .rp-hero-grid{position:relative;grid-template-columns:1fr;gap:16px}
  .rp-brands .h1{max-width:none}
  .rp-stage .device{max-width:280px}
  .rp-steps{grid-template-columns:1fr}
  .rp-cat-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
  .rp-ex-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
  .rp-coins-grid{grid-template-columns:1fr;gap:32px}
  .rp-coin-visual{max-width:320px}
  .wl-summary{grid-template-columns:1fr}
}
@media (max-width:640px){
  .rp-hero-cta .btn{width:100%;justify-content:center}
  .rp-hero-note{font-size:12.5px}
  .rp-stage{padding:12px 0}
  .rp-stage .device{max-width:250px}
  .rp-ui{font-size:10px}.rp-ui .ui-top{padding:28px 12px 10px}.rp-ui .ui-top .t{font-size:11.5px}.rp-ui .ui-body{padding:10px}.rp-ui-offer{padding:9px 10px;gap:8px}.rp-ui-offer .val{font-size:11px}.rp-ui-t{display:none}.rp-ui-offer .ui-tag{display:none}.rp-ui-ic{width:28px;height:28px}.rp-ui-ic svg{width:14px;height:14px}
  .rp-ex-coin .coin{font-size:11px;padding:5px 8px;white-space:normal}
  .rp-float-1{display:none}.rp-float-2{right:-4px;bottom:16%}
  .rp-cat-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .rp-cat{padding:12px 14px;font-size:14px}
  .rp-ex-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .rp-ex{min-width:0;padding:18px 16px}
  .rp-ex:last-child{grid-column:1 / -1}
  .rp-ex-pill{margin-bottom:24px}
  .rp-coin-list li{grid-template-columns:72px minmax(0,1fr);font-size:14.5px}
  .rp-final-cta .btn{width:100%;justify-content:center}
  .wl-bar{grid-template-columns:auto 1fr auto;padding:10px 16px}
  .wl-brand span{display:none}
  .wl-track{width:100%;max-width:none}
  .wl-progress{width:100%;justify-self:stretch}
  .wl-stage{align-items:flex-start;padding:24px 20px}
  .wl-step{margin:0}
  .wl-q{font-size:24px}
  .wl-input{font-size:19px}
  .wl-tel{grid-template-columns:1fr;gap:10px}
  .wl-select{max-width:none}
  .wl-opts{grid-template-columns:1fr;gap:8px}
  .wl-opt{min-height:52px}
  .wl-hint{display:none}
  .wl-foot{padding:10px 16px;padding-bottom:max(10px,env(safe-area-inset-bottom))}
  .wl-foot .btn{min-height:48px}
  .wl-actions .btn{width:100%;justify-content:center}
}
.pt-coins{margin-top:clamp(40px,5vw,64px);padding-top:clamp(32px,4vw,48px);border-top:1px solid rgba(255,255,255,.12)}
.pt-coins .rp-coin-visual{max-width:360px}
.pt-coins .h2{max-width:16ch;margin-top:0}
.pt-doors-note{color:var(--ink-4)}
#community{scroll-margin-top:72px}
`;

export default {
  path: '/partners',
  nav: '',
  title: 'Partner with VerifyU',
  titleFull: 'Partner With VerifyU | Brands, Businesses & Community Partners',
  description: 'Partner with VerifyU: brands and local businesses can list offers that users unlock with VerifyU Coins; clinics, NGOs, senior care, events and communities help more people register.',
  body,
  css,
  priority: 0.8,
  jsonld: [breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Partners', path: '/partners' }]), ORG_LD],
};
