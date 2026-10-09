import { SITE, icons, device, note, flag, sectionHead, ctaBand, breadcrumbLd } from '../lib.mjs';

const mail = (subject, bodyText = '') => `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}${bodyText ? `&body=${encodeURIComponent(bodyText)}` : ''}`;
const TEMPLATE = `Hi VerifyU team,

We are [hospital], in [city] — [single site / group].
I am [name], [emergency medicine / nursing leadership / administration / IT].
Our emergency department handles roughly [number] arrivals a [day / month].
We want to solve [unidentified arrivals / reaching family / both].

Best regards,
[name, role, phone]`;
const DEMO_MAIL = mail('VerifyU hospital demo request', TEMPLATE);
const DEMO_WA = `${SITE.whatsappHref}?text=${encodeURIComponent(TEMPLATE)}`;

/* Real app screens, demo data */
const S = { dash: '/images/app/home-dashboard.webp', face: '/images/app/face-verification.webp', personal: '/images/app/profile-personal.webp', contacts: '/images/app/profile-emergency.webp', otp: '/images/app/profile-medical-otp.webp' };
const shot = (src, alt) => `<img class="shot" src="${src}" alt="${alt}" width="722" height="1600" loading="lazy">`;

const PROBLEM = [
  { i: 'user', h: 'Arrivals without a name', b: 'A road-accident casualty, an unconscious patient, an older person who walked away from home. Care begins; identity does not arrive with them.' },
  { i: 'phone', h: 'Family reached late', b: 'Consent, admission and belongings all wait on one question the patient cannot answer: who should we call?' },
  { i: 'medical', h: 'Unknown clinical history', b: 'Blood group, allergies and medication have to be established from scratch while the clock runs.' },
];

/* Scroll story: the workflow, one real screen per step */
const FLOW = [
  { k: 'Step 01', h: 'Emergency arrival', b: 'A patient who cannot speak, or cannot be understood, arrives. Clinical care begins as it always does — VerifyU changes nothing about treatment.', screen: 'dash', alt: 'VerifyU dashboard with Start Verification' },
  { k: 'Step 02', h: 'Identity support', b: 'An authorised VerifyU user on your team opens the scanner and looks for a match against registered profiles. A match depends on prior registration, a suitable image and connectivity.', screen: 'face', alt: 'Face verification camera screen' },
  { k: 'Step 03', h: 'Useful emergency information', b: 'A returned profile opens marked “Scanned securely via VerifyU” — photo, name, gender and blood group on the header, with Personal, Emergency and Medical tabs behind it.', screen: 'personal', alt: 'Verified profile with name, gender and blood group' },
  { k: 'Step 04', h: 'Next of kin', b: 'The Emergency tab lists the two contacts the patient chose, with relation, number and a call button. Medical details open only after an OTP from one of those contacts.', screen: 'contacts', alt: 'Emergency contacts with call buttons' },
  { k: 'Step 05', h: 'Response coordination', b: 'The department records who was identified, who was contacted and when — the handover discipline you already run, with one fewer unknown in it.', screen: 'log', alt: '' },
];
const logUi = `
<div class="ui" style="background:var(--purple-900);color:#fff;display:flex;align-items:center;justify-content:center;text-align:center" aria-hidden="true">
  <div style="padding:24px">
    <div style="width:56px;height:56px;border-radius:999px;background:var(--teal);margin:0 auto 18px;display:flex;align-items:center;justify-content:center;color:#fff">${icons.check}</div>
    <div style="font-family:var(--font-display);font-size:22px;font-weight:700;letter-spacing:-.02em;line-height:1.15">Identified.<br>Family reached.</div>
    <div style="margin-top:12px;font-size:11px;opacity:.7">Profile access logged · Person notified in the app</div>
  </div>
</div>`;

const NOW = ['Photo and name — “Scanned securely via VerifyU”', 'Gender and blood group on the header', 'Personal details the patient recorded', 'Two emergency contacts with call buttons'];
const LATER = ['Medical details — only after an OTP from one of the patient’s own contacts', 'Nothing the person did not enter — VerifyU is not a clinical record', 'No bulk access — a lookup for the person in front of you, not a directory', 'No diagnosis — it supports your clinicians, never substitutes for them'];

const INSTITUTIONAL = [
  { i: 'building', h: 'Hospital dashboard', b: 'Authorised staff accounts, recent lookups and the department’s activity in one place.' },
  { i: 'bell', h: 'Emergency alert workflow', b: 'Alerts routed to the roles you nominate, alongside the in-app alert flow.' },
  { i: 'car', h: 'Ambulance coordination', b: 'Identification attempted before arrival, so the department knows who is coming.' },
  { i: 'doc', h: 'Institutional integration', b: 'An identified patient’s details passed into your admission or records system.' },
];

const GOVERNANCE = [
  { i: 'user', h: 'Consent-based registration', b: 'Nobody is added by the hospital. Each person registers themselves and chooses what the profile carries.' },
  { i: 'eye', h: 'Emergency-relevant first', b: 'A match returns the profile header and emergency contacts. Medical details stay behind an OTP.' },
  { i: 'log', h: 'Access logging', b: `Profile access is logged — verifyu.in describes time, IP address and location. ${flag()}` },
  { i: 'bell', h: 'The person is told', b: 'The registered user is notified in the app when their profile is accessed.' },
  { i: 'lock', h: 'Role-based access', b: `Who on your team may use VerifyU, and when, is defined in the hospital arrangement. ${flag()}` },
  { i: 'shield', h: 'Clear limits', b: 'Not a diagnostic tool, not a medical record, not a substitute for your own identification and consent procedures.' },
];

const START = [
  { i: 'play', h: 'Demo', b: 'What a match returns, what it does not, where the limits sit.' },
  { i: 'search', h: 'Workflow review', b: 'Your ED physicians, nursing leads and security map VerifyU onto the arrival workflow.' },
  { i: 'doc', h: 'Pilot scope', b: 'Departments, roles, duration and measures — agreed in writing.' },
  { i: 'users', h: 'Training', b: `Briefing for the staff who hold access: workflow, governance, limits. ${flag()}` },
  { i: 'check', h: 'Go-live', b: 'A start date, a named contact on both sides, a review at the end.' },
];

const body = `
<!-- 1. HERO (dark, phone + floating cards) -->
<section class="page-hero is-dark on-dark has-media hp-hero" aria-labelledby="page-h">
  <div class="glow is-purple" style="width:640px;height:640px;right:-200px;top:-200px;opacity:.4"></div>
  <div class="container og-hero-grid" style="position:relative">
    <div class="mask-group">
      <div class="eyebrow" data-reveal="fade">Hospitals</div>
      <h1 class="h1" id="page-h" data-reveal>When a patient arrives without a name.</h1>
      <p class="lead" data-reveal>Identity support at emergency arrival for people who are already registered: who they are, the medical information they chose to share, and who to call — through the permitted workflow.</p>
      <div class="row" data-reveal>
        <a class="btn btn-white btn-lg" href="#demo">Book a hospital demo ${icons.arrow}</a>
        <a class="btn btn-ghost btn-lg" href="#workflow">See the workflow</a>
      </div>
    </div>
    <div class="og-stage" data-reveal="scale" aria-hidden="true">
      ${device({ src: S.personal, alt: '', cls: 'is-flat', eager: true })}
      <div class="og-card og-card-1"><span class="og-card-ic is-teal">${icons.check}</span><span><b>Verified profile</b>Scanned securely via VerifyU</span></div>
      <div class="og-card og-card-2"><span class="og-card-ic is-blue">${icons.phone}</span><span><b>Next of kin</b>Sunita · Mother · call</span></div>
      <div class="og-card og-card-3"><span class="og-card-ic">${icons.lock}</span><span><b>Medical details</b>After an OTP from a contact</span></div>
    </div>
  </div>
</section>

<!-- 2. THE PROBLEM -->
<section class="section hp-problem" aria-labelledby="prob-h">
  <div class="container">
    ${sectionHead({ eyebrow: 'The problem', title: 'The first hour is spent on a question, not a treatment.', lead: 'The clinical work starts immediately; everything that depends on knowing who the patient is has to wait.' })}
    <ol class="rp-steps hp-prob-grid" data-stagger>
      ${PROBLEM.map((p, i) => `<li class="rp-step"><span class="rp-step-n">0${i + 1}</span><div class="icon is-blue">${icons[p.i]}</div><h3 class="h4">${p.h}</h3><p class="body">${p.b}</p></li>`).join('')}
    </ol>
    ${note('We do not publish statistics on unidentified arrivals. These are the situations hospital teams describe to us; your own department data is the only measure worth planning against.')}
  </div>
</section>

<!-- 3. THE WORKFLOW (scroll story, real screens) -->
<section class="story hp-story" id="workflow" data-story data-steps="${FLOW.length}" style="--steps:${FLOW.length}" aria-labelledby="flow-h">
  <div class="story-sticky">
    <div class="container story-inner">
      <div class="story-copy">
        <div class="eyebrow" data-reveal="fade">The workflow</div>
        <h2 class="h2" id="flow-h" data-reveal>Five steps, inside the workflow you already run.</h2>
        <div class="story-steps">
          ${FLOW.map((f, i) => `<div class="story-step ${i === 0 ? 'is-active' : ''}" data-step-item="${i}"><span class="story-k">${f.k}</span><h3 class="h3">${f.h}</h3><p class="body">${f.b}</p></div>`).join('')}
        </div>
        <div class="story-dots" aria-hidden="true">${FLOW.map((f, i) => `<span data-step-item="${i}" class="${i === 0 ? 'is-active' : ''}"></span>`).join('')}</div>
      </div>
      <div class="story-phone">
        ${device({ cls: 'is-flat', inner: FLOW.map((f, i) => `<div class="story-panel ${i === 0 ? 'is-active' : ''}" data-step-panel="${i}">${f.screen === 'log' ? logUi : shot(S[f.screen], f.alt)}</div>`).join('') })}
      </div>
    </div>
  </div>
</section>

<!-- 4. WHAT THE TEAM CAN SEE (two phones) -->
<section class="section is-cloud hp-see-sec" aria-labelledby="see-h">
  <div class="container">
    ${sectionHead({ eyebrow: 'What the hospital team can see', title: 'Blood group now.<br>Medical details after an OTP.', lead: 'A match returns what helps in the next ten minutes. Everything beyond that waits for permission from someone the patient chose.' })}
    <div class="hp-see" data-stagger>
      <article class="hp-see-card">
        <div class="hp-see-phone">${device({ cls: 'is-flat', inner: shot(S.personal, 'Verified profile with photo, name, gender and blood group') })}</div>
        <div class="hp-see-copy">
          <span class="pill is-teal">${icons.check} Straight away</span>
          <h3 class="h4">On the verified profile</h3>
          <ul class="hp-see-list">${NOW.map(x => `<li><span class="hp-see-ic is-teal">${icons.check}</span>${x}</li>`).join('')}</ul>
        </div>
      </article>
      <article class="hp-see-card is-locked">
        <div class="hp-see-phone">${device({ cls: 'is-flat', inner: shot(S.otp, 'Medical tab asking for an OTP from an emergency contact') })}</div>
        <div class="hp-see-copy">
          <span class="pill">${icons.lock} Only with permission</span>
          <h3 class="h4">After next-of-kin OTP</h3>
          <ul class="hp-see-list">${LATER.map(x => `<li><span class="hp-see-ic">${icons.lock}</span>${x}</li>`).join('')}</ul>
        </div>
      </article>
    </div>
    ${note('Matching requires prior registration, a suitable image and connectivity. Scanning access depends on the plan, app version and permissions in force.')}
  </div>
</section>

<!-- 5. INSTITUTIONAL CAPABILITIES -->
<section class="section hp-inst-sec" aria-labelledby="inst-h">
  <div class="container">
    <div class="hp-inst-head">
      ${sectionHead({ eyebrow: 'Institutional arrangement', title: 'Four capabilities, by arrangement.', lead: 'Hospital teams ask about these four. Each belongs to an institutional arrangement rather than the consumer app — confirm with the VerifyU team before relying on it.' })}
    </div>
    <div class="hp-inst-grid" data-stagger>
      ${INSTITUTIONAL.map(c => `<article class="hp-inst"><div class="icon">${icons[c.i]}</div><div><h3 class="h4">${c.h}</h3><p class="body">${c.b}</p><span class="flag">Owner verification</span></div></article>`).join('')}
    </div>
  </div>
</section>

<!-- 6. GOVERNANCE (tiles) -->
<section class="section is-dark on-dark hp-gov-sec" aria-labelledby="gov-h">
  <div class="glow is-purple" style="width:560px;height:560px;left:-180px;bottom:-200px;opacity:.35"></div>
  <div class="container" style="position:relative">
    ${sectionHead({ eyebrow: 'Governance', title: 'Access your board can explain.', lead: 'Facial data and emergency information are sensitive. The arrangement is built around consent, defined access and a record of what happened.' })}
    <div class="hp-gov-grid" data-stagger>
      ${GOVERNANCE.map((g, i) => `<article class="hp-gov"><span class="hp-gov-n">0${i + 1}</span><div class="icon">${icons[g.i]}</div><h3 class="h4">${g.h}</h3><p class="small">${g.b}</p></article>`).join('')}
    </div>
    <div class="row mt-5"><a class="btn btn-white" href="/trust">Visit the Trust Centre ${icons.arrow}</a><a class="btn btn-ghost" href="${SITE.privacyExternal}" target="_blank" rel="noopener">Privacy policy ${icons.arrowUpRight}</a></div>
  </div>
</section>

<!-- 7. FROM DEMO TO GO-LIVE (stepper) -->
<section class="section hp-start-sec" aria-labelledby="start-h">
  <div class="container">
    ${sectionHead({ eyebrow: 'Getting started', title: 'From a demo to go-live.', lead: 'Five steps, each with a decision point. Nothing is deployed before scope and roles are agreed.' })}
    <ol class="og-flow hp-start" data-reveal>
      <svg class="og-flow-line" viewBox="0 0 1000 8" preserveAspectRatio="none" aria-hidden="true"><path d="M0 4H1000" stroke="url(#hpg)" stroke-width="2" stroke-dasharray="1000" stroke-dashoffset="1000"/><defs><linearGradient id="hpg" x1="0" x2="1"><stop offset="0" stop-color="#632899"/><stop offset="1" stop-color="#01C4A2"/></linearGradient></defs></svg>
      ${START.map((s, i) => `<li class="og-flow-step" style="--i:${i}"><span class="og-flow-dot"><span class="icon">${icons[s.i]}</span></span><span class="og-flow-n">Step 0${i + 1}</span><h3 class="h4">${s.h}</h3><p class="body">${s.b}</p></li>`).join('')}
    </ol>
  </div>
</section>

<!-- 8. BOOK A DEMO -->
<section class="section is-cloud hp-demo" id="demo" aria-labelledby="demo-h">
  <div class="container split">
    <div class="col-6">
      ${sectionHead({ eyebrow: 'Book a demo', title: 'A walkthrough with your emergency team.', lead: 'About half an hour, against your own arrival workflow. Send the note by email or WhatsApp and we will bring the right people to the call.' })}
      <div class="row">
        <a class="btn btn-primary btn-lg" href="${DEMO_MAIL}">Send by email ${icons.mail}</a>
        <a class="btn btn-ghost btn-lg" href="${DEMO_WA}" target="_blank" rel="noopener">${icons.whatsapp} Send on WhatsApp</a>
      </div>
      <p class="small mt-3">${SITE.email} · ${SITE.whatsapp} · ${SITE.entity}</p>
      ${note('Please do not send patient information. A demo needs none of it.')}
    </div>
    <div class="col-6">
      <div class="pt-note" data-reveal="scale">
        <div class="pt-note-bar"><span class="pt-note-dot"></span><span class="pt-note-dot"></span><span class="pt-note-dot"></span><span>New message · to VerifyU</span></div>
        <div class="pt-note-body">
          <p>Hi VerifyU team,</p>
          <p>We are <mark>hospital</mark>, in <mark>city</mark> — <mark>single site / group</mark>.</p>
          <p>I am <mark>name</mark>, <mark>emergency medicine / nursing leadership / administration / IT</mark>.</p>
          <p>Our emergency department handles roughly <mark>number</mark> arrivals a <mark>day / month</mark>.</p>
          <p>We want to solve <mark>unidentified arrivals / reaching family / both</mark>.</p>
        </div>
        <div class="pt-note-foot">Prefilled when you press Send — just replace the highlighted parts.</div>
      </div>
    </div>
  </div>
</section>

${ctaBand({
  title: 'See it against your own arrival workflow.',
  copy: 'A walkthrough with your emergency team takes about half an hour.',
  primary: { t: 'Book a hospital demo', h: DEMO_MAIL, ext: false },
  secondary: { t: 'All organisation settings', h: '/organisations#settings' },
  dark: true,
})}
`;

const css = `
.hp-hero{position:relative;overflow:hidden}
.hp-hero .h1{max-width:13ch}
.hp-hero .lead{max-width:48ch;color:rgba(255,255,255,.78)}
.hp-problem .note{margin-top:32px;max-width:72ch}
.hp-prob-grid .rp-step .icon{margin-bottom:16px}

/* workflow story */
.hp-story{background:#fff}
.hp-story .story-phone .device{max-width:300px}
.hp-story .story-step .body{max-width:44ch}
.hp-story .story-copy .h2{max-width:16ch}

/* what the team can see */
.hp-see{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(16px,2.4vw,28px)}
.hp-see-card{display:grid;grid-template-columns:150px minmax(0,1fr);gap:clamp(16px,2vw,28px);align-items:center;padding:clamp(20px,2.4vw,28px);border-radius:var(--r-xl);background:#fff;border:1px solid var(--line);transition:transform .5s var(--ease),box-shadow .5s var(--ease)}
.hp-see-card:hover{transform:translateY(-3px);box-shadow:var(--shadow-2)}
.hp-see-card.is-locked{background:var(--purple-50);border-color:var(--purple-100)}
.hp-see-phone .device{max-width:150px}
.hp-see-copy .pill{margin-bottom:12px}
.hp-see-copy .pill svg{width:13px;height:13px}
.hp-see-copy .h4{margin-bottom:10px}
.hp-see-list{display:flex;flex-direction:column;gap:8px}
.hp-see-list li{display:flex;gap:10px;align-items:flex-start;font-size:14.5px;color:var(--ink-2);line-height:1.45}
.hp-see-ic{flex:none;width:22px;height:22px;border-radius:999px;background:var(--purple-100);color:var(--purple);display:inline-flex;align-items:center;justify-content:center;margin-top:1px}
.hp-see-ic svg{width:12px;height:12px}
.hp-see-ic.is-teal{background:var(--teal-50);color:var(--teal-700)}
.hp-see-sec .note{margin-top:28px;max-width:72ch}

/* institutional */
.hp-inst-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(12px,1.6vw,20px)}
.hp-inst{display:flex;gap:18px;align-items:flex-start;padding:22px 24px;border-radius:var(--r-lg);border:1px dashed var(--ink-4);background:#fff;transition:border-color .3s,transform .5s var(--ease)}
.hp-inst:hover{border-color:var(--purple);transform:translateY(-2px)}
.hp-inst .icon{margin:0;flex:none}
.hp-inst .h4{margin-bottom:4px;font-size:18px}
.hp-inst .body{font-size:14.5px;margin-bottom:10px}

/* governance tiles */
.hp-gov-sec{position:relative;overflow:hidden}
.hp-gov-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(12px,1.6vw,20px)}
.hp-gov{position:relative;padding:24px;border-radius:var(--r-lg);background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);transition:background .3s,transform .5s var(--ease)}
.hp-gov:hover{background:rgba(255,255,255,.08);transform:translateY(-2px)}
.hp-gov-n{position:absolute;right:20px;top:18px;font-family:var(--font-mono,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:11px;letter-spacing:.14em;color:var(--teal)}
.hp-gov .icon{background:rgba(255,255,255,.08);color:#D9BDF7;margin-bottom:16px}
.hp-gov .h4{margin-bottom:6px;font-size:18px}
.hp-gov .small{color:rgba(255,255,255,.65);line-height:1.5}
.hp-gov .flag{background:rgba(255,244,229,.15);color:#F5D58E}

/* stepper */
.og-flow.hp-start{grid-template-columns:repeat(5,minmax(0,1fr))}
.hp-start .h4{font-size:17px}
.hp-start .body{font-size:14.5px}
.hp-story .story-steps{min-height:300px}
.hp-demo .note{margin-top:24px}
.hp-demo .row .btn svg:not(.arrow){width:20px;height:20px}

@media (max-width:1024px){
  .hp-hero .h1{max-width:none}
  .hp-prob-grid{grid-template-columns:1fr}
  .hp-see{grid-template-columns:1fr}
  .hp-gov-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .og-flow.hp-start{grid-template-columns:1fr}
}
@media (max-width:640px){
  .hp-see-card{grid-template-columns:110px minmax(0,1fr);padding:16px;gap:14px}
  .hp-see-phone .device{max-width:110px}
  .hp-see-list li{font-size:13.5px}
  .hp-inst-grid,.hp-gov-grid{grid-template-columns:1fr}
  .hp-demo .row .btn{width:100%;justify-content:center}
}
`;

export default {
  path: '/organisations/hospitals',
  nav: '',
  title: 'VerifyU for hospitals',
  description: 'VerifyU for hospitals: identity support at emergency arrival — registered identity, shared medical information and next of kin, through the permitted workflow.',
  body,
  css,
  jsonld: breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'For organisations', path: '/organisations' }, { name: 'Hospitals', path: '/organisations/hospitals' }]),
  priority: 0.8,
};
