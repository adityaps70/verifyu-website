import { SITE, icons, device, note, flag, sectionHead, ctaBand, breadcrumbLd } from '../lib.mjs';

const mail = (subject, bodyText = '') => `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}${bodyText ? `&body=${encodeURIComponent(bodyText)}` : ''}`;
const TEMPLATE = `Hi VerifyU team,

We are [organisation] — a [hospital / district office / campus / society / event / employer] in [city or district].
A registration drive would cover roughly [number] people.
We want to handle [the situation] better, ideally by [date].

Best regards,
[name, role, phone]`;
const PILOT_MAIL = mail('VerifyU pilot enquiry', TEMPLATE);
const PILOT_WA = `${SITE.whatsappHref}?text=${encodeURIComponent(TEMPLATE)}`;

/* Real app screens (demo data) */
const S = { dash: '/images/app/home-dashboard.webp', face: '/images/app/face-verification.webp', personal: '/images/app/profile-personal.webp', contacts: '/images/app/profile-emergency.webp', otp: '/images/app/profile-medical-otp.webp', sos: '/images/app/sos.webp', settings: '/images/app/settings.webp' };
const shot = (src, alt) => `<img class="shot" src="${src}" alt="${alt}" width="722" height="1600" loading="lazy">`;

/* Three moving parts — one line each */
const PARTS = [
  { i: 'users', h: 'Registration drive', b: 'Your people register themselves, free, with your support — their own details, contacts and the medical information they choose.' },
  { i: 'lock', h: 'Permitted access', b: `The responders, staff or volunteers you nominate use VerifyU within the arrangement agreed with your organisation. ${flag()}` },
  { i: 'sos', h: 'Emergency workflow', b: 'When a registered person cannot communicate, an authorised user looks for a match and reaches next of kin through the permitted workflow.' },
];

/* Six settings — explorer content (short) */
const TRACKS = [
  { id: 'hospitals', icon: 'hospital', t: 'Hospitals', problem: 'An unidentified or unconscious arrival — no documents, no phone, nobody to ask.', flow: ['Authorised user looks for a match', 'Emergency information on screen', 'Next of kin called through the app'], result: 'Family reached sooner, with a record of who was contacted.', screen: 'personal', alt: 'Verified profile opened by a match', cta: { t: 'For hospitals', h: '/organisations/hospitals' }, cta2: { t: 'Request a hospital demo', h: '/organisations/hospitals#demo' } },
  { id: 'government', icon: 'gov', t: 'Government', problem: 'Public emergencies where a person cannot be identified and family cannot be traced quickly.', flow: ['District registration drive', 'Defined access for nominated responder groups', 'Reporting scoped at the start'], result: 'A consented identity layer responders can check before someone is treated as unknown.', screen: 'face', alt: 'Face verification screen', flag: true, cta: { t: 'Discuss a district pilot', h: mail('VerifyU district pilot enquiry') } },
  { id: 'campuses', icon: 'school', t: 'Schools & colleges', problem: 'Staff need guardian contacts and medical information for a student who cannot answer for themselves.', flow: ['Registration during orientation', 'Guardians listed as emergency contacts', 'Student volunteers help others register'], result: 'Identity, guardian contacts and blood group travel with the student — to the ground, the hostel, the field trip.', screen: 'contacts', alt: 'Emergency contacts with call buttons', flag: true, cta: { t: 'Run a campus safety pilot', h: mail('VerifyU campus safety pilot enquiry') } },
  { id: 'communities', icon: 'home', t: 'Residential & senior communities', problem: 'A resident is found unwell or disoriented and the person helping does not know who to call.', flow: ['Society registration drive', 'Assisted registration for senior residents', 'Awareness for residents and the security desk'], result: 'Neighbours, security staff and family connected through one registered profile instead of a phone tree.', screen: 'otp', alt: 'Medical information protected by an OTP from an emergency contact', flag: true, cta: { t: 'Bring VerifyU to your community', h: mail('VerifyU community registration drive enquiry') } },
  { id: 'events', icon: 'event', t: 'Events', problem: 'Participants separated from their group, or unwell, with nothing on them but a bib number.', flow: ['Registration opened before the event', 'Briefed volunteers and medical desk', 'A named contact for the day'], result: 'A crowd in which a registered participant can be connected back to family sooner.', screen: 'sos', alt: 'SOS emergency type selection', flag: true, cta: { t: 'Bring VerifyU to your event', h: mail('VerifyU event safety enquiry') } },
  { id: 'workplaces', icon: 'work', t: 'Workplaces', problem: 'An employee has an emergency away from the office and the site team has no reliable contact information.', flow: ['Registration offered as a safety benefit', 'First-aid and security teams as VerifyU users', 'Travel-safety briefings'], result: 'Emergency contacts that travel with the employee rather than with the HR file.', screen: 'dash', alt: 'VerifyU identity dashboard', flag: true, cta: { t: 'Talk to us about workplaces', h: mail('VerifyU workplace safety enquiry') } },
];

const PILOT = [
  { n: '01', i: 'chat', h: 'Share the context', b: 'The setting, the people involved and the emergencies you are planning for.' },
  { n: '02', i: 'search', h: 'Explore the fit', b: 'We walk through registration, permitted access and the workflow — and say where VerifyU does not help.' },
  { n: '03', i: 'doc', h: 'Agree the next step', b: 'Scope, roles, availability and success measures, in writing, before launch.' },
];

const body = `
<!-- 1. HERO (dark, phone + floating cards) -->
<section class="page-hero is-dark on-dark has-media og-hero" aria-labelledby="page-h">
  <div class="glow is-purple" style="width:640px;height:640px;right:-200px;top:-200px;opacity:.4"></div>
  <div class="glow is-blue" style="width:480px;height:480px;left:-160px;bottom:-200px;opacity:.25"></div>
  <div class="container og-hero-grid" style="position:relative">
    <div class="mask-group">
      <div class="eyebrow" data-reveal="fade">For organisations</div>
      <h1 class="h1" id="page-h" data-reveal>Safety infrastructure for the people in your care.</h1>
      <p class="lead" data-reveal>A registration-led safety layer: your people register once, the responders you nominate get permitted access, and a person who cannot speak can still be connected to family.</p>
      <div class="row" data-reveal>
        <a class="btn btn-white btn-lg" href="#pilot">Request a pilot ${icons.arrow}</a>
        <a class="btn btn-ghost btn-lg" href="/organisations/hospitals">For hospitals</a>
      </div>
    </div>
    <div class="og-stage" data-reveal="scale" aria-hidden="true">
      ${device({ src: S.personal, alt: '', cls: 'is-flat', eager: true })}
      <div class="og-card og-card-1"><span class="og-card-ic is-teal">${icons.check}</span><span><b>Registered</b>Prakhar Pathak · Verified User</span></div>
      <div class="og-card og-card-2"><span class="og-card-ic">${icons.lock}</span><span><b>Permitted access</b>Nominated responder</span></div>
      <div class="og-card og-card-3"><span class="og-card-ic is-blue">${icons.phone}</span><span><b>Next of kin</b>Sunita · Mother · call</span></div>
    </div>
  </div>
</section>

<!-- 2. THREE MOVING PARTS (flow infographic) -->
<section class="section og-parts" aria-labelledby="inst-h">
  <div class="container">
    ${sectionHead({ eyebrow: 'How it works for an institution', title: 'Three moving parts.<br>Nothing exotic.', lead: 'Register people, agree who may use VerifyU on your behalf, and rehearse what happens in an emergency.' })}
    <ol class="og-flow" data-reveal>
      <svg class="og-flow-line" viewBox="0 0 1000 8" preserveAspectRatio="none" aria-hidden="true"><path d="M0 4H1000" stroke="url(#ogg)" stroke-width="2" stroke-dasharray="1000" stroke-dashoffset="1000"/><defs><linearGradient id="ogg" x1="0" x2="1"><stop offset="0" stop-color="#632899"/><stop offset="1" stop-color="#01C4A2"/></linearGradient></defs></svg>
      ${PARTS.map((p, i) => `<li class="og-flow-step" style="--i:${i}"><span class="og-flow-dot"><span class="icon">${icons[p.i]}</span></span><span class="og-flow-n">Step 0${i + 1}</span><h3 class="h4">${p.h}</h3><p class="body">${p.b}</p></li>`).join('')}
    </ol>
    ${note('VerifyU supports identification and communication. It does not replace emergency services, and it can only help where the person is registered and a match is returned.')}
  </div>
</section>

<!-- 3. SIX SETTINGS (explorer) -->
<section class="section is-cloud og-explore" id="settings" aria-labelledby="tracks-h" data-switch data-switch-interval="5200">
  <div class="container">
    ${sectionHead({ eyebrow: 'Where it fits', title: 'Six settings.<br>One registered identity.', lead: 'Each setting has a different problem and a different workflow. The identity — and the person’s control over it — stays the same.' })}
    <div class="pt-explore-grid og-explore-grid">
      <div class="pt-explore-list" role="tablist" aria-label="Organisation types">
        ${TRACKS.map((t, i) => `<button class="pt-tab ${i === 0 ? 'is-active' : ''}" role="tab" aria-selected="${i === 0}" data-switch-btn="${i}" data-key="${t.id}" id="${t.id}"><span class="pt-tab-ic">${icons[t.icon]}</span><span>${t.t}</span>${icons.chevronR}</button>`).join('')}
      </div>
      <div class="pt-explore-panel og-panel">
        <div class="pt-explore-copy og-copy">
          ${TRACKS.map((t, i) => `<div class="switch-panel pt-explore-text og-text ${i === 0 ? 'is-active' : ''}" data-switch-panel="${i}">
            <span class="pt-ex-num">0${i + 1} / 0${TRACKS.length}</span>
            <h3 class="h3">${t.t}</h3>
            <p class="og-problem"><span class="meta">The problem</span>${t.problem}</p>
            <ol class="og-mini">${t.flow.map(f => `<li>${f}</li>`).join('')}</ol>
            <p class="og-result"><span class="meta">What becomes possible</span>${t.result}${t.flag ? ` ${flag()}` : ''}</p>
            <div class="row mt-3"><a class="btn btn-primary btn-sm" href="${t.cta.h}">${t.cta.t} ${icons.arrow}</a>${t.cta2 ? `<a class="btn btn-ghost btn-sm" href="${t.cta2.h}">${t.cta2.t}</a>` : ''}</div>
          </div>`).join('')}
        </div>
        <div class="pt-explore-phone">
          ${device({ cls: 'is-flat', inner: TRACKS.map((t, i) => `<div class="switch-panel ${i === 0 ? 'is-active' : ''}" data-switch-panel="${i}">${shot(S[t.screen], t.alt)}</div>`).join('') })}
        </div>
      </div>
    </div>
    <p class="small mt-4 og-explore-note">Workflows marked <span class="flag">Owner verification</span> are proposals to be confirmed with the VerifyU team before they are relied upon.</p>
  </div>
</section>

<!-- 4. REQUEST A PILOT (three conversations + prefilled note) -->
<section class="section og-pilot" id="pilot" aria-labelledby="pilot-h">
  <div class="container">
    ${sectionHead({ eyebrow: 'Request a pilot', title: 'Three conversations before anything launches.', lead: 'No deployment starts before scope, roles, availability and success measures are agreed in writing. Tell us the setting and we will tell you honestly if it fits.' })}
    <div class="og-pilot-grid">
      <ol class="rp-steps og-pilot-steps" data-stagger>
        ${PILOT.map(s => `<li class="rp-step"><span class="rp-step-n">${s.n}</span><div class="icon">${icons[s.i]}</div><h3 class="h4">${s.h}</h3><p class="body">${s.b}</p></li>`).join('')}
      </ol>
      <div class="og-pilot-side">
        <div class="pt-note" data-reveal="scale">
          <div class="pt-note-bar"><span class="pt-note-dot"></span><span class="pt-note-dot"></span><span class="pt-note-dot"></span><span>New message · to VerifyU</span></div>
          <div class="pt-note-body">
            <p>Hi VerifyU team,</p>
            <p>We are <mark>organisation</mark> — a <mark>hospital / district office / campus / society / event / employer</mark> in <mark>city or district</mark>.</p>
            <p>A registration drive would cover roughly <mark>number</mark> people.</p>
            <p>We want to handle <mark>the situation</mark> better, ideally by <mark>date</mark>.</p>
            <p>Best regards,<br><mark>name, role, phone</mark></p>
          </div>
          <div class="pt-note-foot">Prefilled when you press Send — replace the highlighted parts. Please do not include personal or medical details of the people you want to register.</div>
        </div>
        <div class="row mt-3">
          <a class="btn btn-primary btn-lg" href="${PILOT_MAIL}">Send by email ${icons.mail}</a>
          <a class="btn btn-ghost btn-lg" href="${PILOT_WA}" target="_blank" rel="noopener">${icons.whatsapp} Send on WhatsApp</a>
        </div>
        <p class="small mt-2">${SITE.email} · ${SITE.whatsapp} · ${SITE.entity}</p>
      </div>
    </div>
    ${note('Feature access, permitted workflows and availability depend on the app version, plan, permissions and the terms agreed for your organisation.')}
  </div>
</section>

${ctaBand({
  title: 'Ready to discuss a pilot?',
  copy: 'Write to the team with your setting, your city and what you want to achieve.',
  primary: { t: 'Request a pilot', h: PILOT_MAIL, ext: false },
  secondary: { t: 'Become a partner', h: '/partners' },
  dark: true,
})}
`;

const css = `
/* ---------- Organisations: hero ---------- */
.og-hero{position:relative;overflow:hidden}
.og-hero-grid{display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:clamp(24px,4vw,64px);align-items:center}
.og-hero .h1{max-width:14ch}
.og-hero .lead{max-width:48ch;color:rgba(255,255,255,.78)}
.og-stage{position:relative;display:flex;justify-content:center;padding:24px 0 clamp(24px,4vw,48px)}
.og-stage .device{max-width:300px;width:100%}
.og-card{position:absolute;z-index:4;display:inline-flex;align-items:center;gap:10px;padding:10px 14px 10px 10px;border-radius:14px;background:rgba(255,255,255,.96);border:1px solid var(--line);box-shadow:var(--shadow-2);font-size:12.5px;color:var(--ink-3);opacity:0;animation:ogIn .9s var(--spring) both,rpFloat 6s ease-in-out infinite}
.og-card b{display:block;color:var(--ink);font-size:13.5px}
.og-card-ic{width:28px;height:28px;border-radius:999px;background:var(--purple-50);color:var(--purple);display:inline-flex;align-items:center;justify-content:center;flex:none}
.og-card-ic svg{width:14px;height:14px}
.og-card-ic.is-teal{background:var(--teal-50);color:var(--teal-700)}
.og-card-ic.is-blue{background:var(--blue-50);color:#1F7FAE}
.og-card-1{left:0;top:14%;animation-delay:.5s,-1s}
.og-card-2{right:0;top:42%;animation-delay:.7s,-3s}
.og-card-3{left:4%;bottom:14%;animation-delay:.9s,-5s}
@keyframes ogIn{from{opacity:0;transform:translateY(16px) scale(.9)}to{opacity:1;transform:none}}

/* ---------- Three moving parts (light flow) ---------- */
.og-flow{position:relative;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(20px,3vw,40px)}
.og-flow-line{position:absolute;left:0;right:0;top:28px;height:8px;width:100%}
.og-flow.is-in .og-flow-line path{animation:ptDraw 1.6s var(--ease) forwards}
.og-flow-step{position:relative}
.og-flow-dot{display:flex;align-items:center;justify-content:center;width:56px;height:56px;border-radius:999px;background:var(--purple-50);border:1px solid var(--purple-100);box-shadow:0 0 0 6px #fff;margin-bottom:18px;position:relative;z-index:1;opacity:0;transform:scale(.6)}
.og-flow.is-in .og-flow-dot{animation:ptPopIn .7s var(--spring) forwards;animation-delay:calc(.3s + var(--i) * .35s)}
.og-flow-dot .icon{width:auto;height:auto;margin:0;background:transparent;color:var(--purple)}
.og-flow-dot .icon svg{width:22px;height:22px}
.og-flow-n{display:block;font-family:var(--font-mono,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:11px;letter-spacing:.14em;color:var(--purple);margin-bottom:6px}
.og-flow-step .h4{margin-bottom:6px}
.og-flow-step .body{font-size:15px;max-width:34ch}
.og-parts .note{margin-top:32px;max-width:72ch}

/* ---------- Six settings explorer ---------- */
.og-explore .pt-explore-grid{grid-template-columns:minmax(0,4fr) minmax(0,8fr)}
.og-explore .pt-explore-panel{min-height:600px}
.og-problem,.og-result{font-size:15.5px;color:var(--ink-2);line-height:1.5}
.og-problem .meta,.og-result .meta{display:block;color:var(--purple);margin-bottom:4px}
.og-mini{margin:16px 0;display:flex;flex-direction:column;gap:0;counter-reset:og;border-top:1px solid var(--line)}
.og-mini li{position:relative;padding:9px 0 9px 36px;border-bottom:1px solid var(--line);font-size:14.5px;font-weight:500;color:var(--ink)}
.og-mini li::before{counter-increment:og;content:counter(og);position:absolute;left:0;top:8px;width:24px;height:24px;border-radius:999px;background:var(--purple);color:#fff;font-size:11px;font-weight:700;display:inline-flex;align-items:center;justify-content:center}
.og-text .h3{margin-bottom:12px}
.og-explore-note{color:var(--ink-4);max-width:72ch}
.pt-tab{scroll-margin-top:96px}

/* ---------- Pilot ---------- */
.og-pilot-grid{display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:clamp(24px,4vw,56px);align-items:start}
.rp-steps.og-pilot-steps{grid-template-columns:1fr;gap:16px}
.og-pilot-steps .rp-step{padding:22px 24px}
.og-pilot-steps .rp-step .icon{margin-bottom:14px}
.og-pilot-side .pt-note{max-width:none;margin-left:0}
.og-pilot .note{margin-top:32px;max-width:72ch}
.og-pilot-side .btn svg:not(.arrow){width:20px;height:20px}

@media (prefers-reduced-motion:reduce){.og-card{animation:none!important;opacity:1!important}.og-flow-dot{opacity:1!important;transform:none!important}.og-flow-line path{stroke-dashoffset:0}}
@media (max-width:1024px){
  .og-hero-grid{grid-template-columns:1fr;gap:16px}
  .og-hero .h1{max-width:none}
  .og-stage .device{max-width:260px}
  .og-flow{grid-template-columns:1fr;gap:0}
  .og-flow-line{display:none}
  .og-flow-step{display:grid;grid-template-columns:56px minmax(0,1fr);gap:2px 16px;padding:16px 0;border-bottom:1px solid var(--line)}
  .og-flow-dot{grid-row:1 / span 3;margin:0}
  .og-flow-step .h4{margin:0}
  .og-flow-step .body{max-width:none}
  .og-explore .pt-explore-grid{grid-template-columns:1fr}
  .og-explore .pt-explore-panel{min-height:0}
  .og-pilot-grid{grid-template-columns:1fr}
}
@media (max-width:640px){
  .og-stage{padding:8px 0 16px}
  .og-stage .device{max-width:220px}
  .og-card{font-size:11.5px;padding:8px 10px 8px 8px}
  .og-card-1{left:-4px;top:8%}.og-card-2{right:-4px;top:44%}.og-card-3{left:0;bottom:8%}
  .og-pilot-side .row .btn{width:100%;justify-content:center}
}
`;

export default {
  path: '/organisations',
  nav: '',
  title: 'For organisations',
  description: 'VerifyU for hospitals, government, campuses, communities, events and workplaces: a registration-led safety layer for people who cannot communicate.',
  body,
  css,
  jsonld: breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'For organisations', path: '/organisations' }]),
  priority: 0.9,
};
