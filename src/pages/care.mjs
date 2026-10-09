import { SITE, icons, checks, note, flag, sectionHead, pageHero, ctaBand, breadcrumbLd } from '../lib.mjs';

/* Existing WhatsApp enquiry links, kept exactly as they are today. */
const wa = (topic) => `${SITE.whatsappHref}?text=Hello%20VerifyU%2C%20I%20would%20like%20to%20enquire%20about%20${topic}.%20Please%20share%20availability%20and%20pricing.`;

const SERVICES = [
  {
    icon: 'chat', iconCls: '', title: 'Tele-consultation',
    body: 'Speak to a doctor by phone or video, where that service is available in your area. Enquire and we will come back with what can be arranged and what it costs.',
    label: 'Tele-consultation', href: wa('Tele-consultation'),
  },
  {
    icon: 'home', iconCls: 'is-teal', title: 'Care at home',
    body: 'Nursing visits, attendant support and recovery care delivered at home. Availability, timings and fees depend on the providers working in your city.',
    label: 'Care at home', href: wa('Care%20at%20home'),
  },
  {
    icon: 'medical', iconCls: 'is-blue', title: 'Equipment & care plans',
    body: 'Medical equipment and longer-term care arrangements for an ageing parent or someone recovering at home. Tell us the situation and we will share the options.',
    label: 'Equipment & care plans', href: wa('Equipment%20%26%20care%20plans'),
  },
];

const body = `
${pageHero({
  eyebrow: 'VerifyU Care',
  title: 'Care beyond the app.',
  lead: 'VerifyU Care is a separate, enquiry-based service line: tele-consultation, care at home, and equipment and care plans. Nothing is booked on this page. You send an enquiry, and we come back with what can be arranged for you — providers, availability and fees vary by location.',
  ctas: `<a class="btn btn-primary btn-lg" href="${SITE.whatsappHref}" target="_blank" rel="noopener">${icons.chat} Enquire on WhatsApp</a>
         <a class="btn btn-ghost btn-lg" href="#services">See the services</a>`,
  media: `<figure class="photo is-4x5 cr-hero-photo">
    <img src="/images/partner-collaboration.jpg" alt="A doctor and a man reviewing information together on a tablet" width="1400" height="933" loading="lazy">
    <figcaption class="cap">Care arranged by enquiry, not booked automatically.</figcaption>
  </figure>`,
})}

<!-- NOT AN EMERGENCY CHANNEL -->
<section class="section is-tight" aria-label="Important notice about emergencies">
  <div class="container is-narrow">
    <div class="cr-notice" data-reveal>
      <span class="pill is-sos">Not an emergency service</span>
      <h2 class="h3 mt-3">VerifyU Care is not part of the emergency identification service.</h2>
      <p class="body mt-2">Care enquiries are answered during working hours and are not monitored as an emergency channel. In a medical emergency, contact your local emergency services or go to the nearest hospital. The VerifyU app’s identification and SOS features are described on the <a href="/safety">Safety &amp; Emergency</a> page.</p>
    </div>
  </div>
</section>

<!-- SERVICES -->
<section class="section is-cloud" id="services" aria-label="Care services">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Services',
      title: 'Three things people ask us for.',
      lead: 'Each one starts the same way — a WhatsApp message telling us who the care is for and where you are.',
    })}
    <div class="grid grid-3" data-stagger>
      ${SERVICES.map(s => `<article class="card is-xl cr-card">
        <div class="icon ${s.iconCls}">${icons[s.icon]}</div>
        <h3 class="h4">${s.title}</h3>
        <p class="body">${s.body}</p>
        <a class="btn btn-ink btn-sm cr-cta" href="${s.href}" target="_blank" rel="noopener">${icons.chat} Enquire about ${s.label}</a>
      </article>`).join('')}
    </div>
    ${note(`Services are arranged through care providers, and what is available depends on your city, the provider and the timing. Fees are quoted to you before anything is arranged. ${flag()}`)}
  </div>
</section>

<!-- HOW AN ENQUIRY WORKS -->
<section class="section" aria-label="How an enquiry works">
  <div class="container split">
    <div class="col-6">
      ${sectionHead({ eyebrow: 'How it works', title: 'Send one message. We take it from there.', lead: 'No account, no form and no payment on this page. An enquiry is a conversation.' })}
      <ol class="cr-steps">
        <li><div><b>Send your enquiry</b><span>Tap one of the buttons above. The message opens ready to send on WhatsApp.</span></div></li>
        <li><div><b>Tell us the situation</b><span>Who the care is for, which city, and what you think is needed.</span></div></li>
        <li><div><b>We come back with options</b><span>What can be arranged near you, what it involves and what it costs. ${flag()}</span></div></li>
      </ol>
    </div>
    <div class="col-6" data-reveal>
      <div class="card is-xl cr-panel">
        <h3 class="h4">What to include</h3>
        <p class="body mt-1">The more of this you send in the first message, the faster we can answer usefully.</p>
        <div class="mt-3">
          ${checks([
            '<b>City or area</b> — availability differs by location',
            '<b>Who the care is for</b> — you, a parent, a dependant',
            '<b>What is needed</b> — a consultation, a home visit, equipment, an ongoing plan',
            '<b>Preferred timing</b> — how soon, and which days or hours suit you',
          ])}
        </div>
        <div class="cr-alt mt-4">
          <span class="meta">Prefer not to use WhatsApp?</span>
          <a class="link" href="mailto:${SITE.email}">${icons.mail} ${SITE.email}</a>
          <span class="small">WhatsApp ${SITE.whatsapp}</span>
        </div>
      </div>
    </div>
  </div>
</section>

${ctaBand({
  title: 'Looking for the safety app?',
  copy: 'Care is a separate enquiry service — no VerifyU account needed, and nothing changes on a profile. The app is for emergency identification and safety.',
  primary: { t: 'Get VerifyU — it’s free', h: SITE.play, ext: true },
  secondary: { t: 'Explore features', h: '/features' },
})}
`;

const css = `
.cr-hero-photo{max-width:420px;margin-left:auto}
@media (max-width:1024px){.cr-hero-photo{max-width:560px;aspect-ratio:3/2;margin-left:0}}
.cr-notice{padding:32px;border-radius:var(--r-xl);background:#fff;border:1px solid var(--line);box-shadow:var(--shadow-1)}
.cr-notice .h3{max-width:22ch}
.cr-notice .body{max-width:62ch}
.cr-notice a{color:var(--purple);text-decoration:underline;text-underline-offset:3px}
.cr-notice.is-plain{box-shadow:none}
.cr-notice .note{margin-top:18px}
.cr-notice .note a{text-decoration:none}
.cr-card{display:flex;flex-direction:column;gap:12px}
.cr-card .body{flex:1;font-size:15.5px}
.cr-cta{align-self:flex-start;margin-top:6px;white-space:normal;text-align:left;padding:10px 18px;min-height:48px}
.cr-steps{counter-reset:crs;margin-top:8px}
.cr-steps li{display:grid;grid-template-columns:44px minmax(0,1fr);gap:18px;align-items:start;padding:18px 0;border-top:1px solid var(--line)}
.cr-steps li:last-child{border-bottom:1px solid var(--line)}
.cr-steps li::before{counter-increment:crs;content:counter(crs,decimal-leading-zero);display:flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:999px;background:var(--purple-50);color:var(--purple);font-family:var(--font-display);font-weight:700;font-size:13px}
.cr-steps b{display:block;font-family:var(--font-display);font-size:18px;font-weight:600;letter-spacing:-.015em;margin-bottom:2px}
.cr-steps span{font-size:15px;color:var(--ink-2)}
.cr-panel{display:flex;flex-direction:column}
.cr-alt{display:flex;flex-direction:column;gap:6px;align-items:flex-start;padding-top:20px;border-top:1px solid var(--line)}
.cr-alt .meta{color:var(--ink-3)}
@media (max-width:640px){
  .cr-notice{padding:24px}
  .cr-cta{width:100%;justify-content:center;text-align:center}
}
`;

export default {
  path: '/care',
  nav: '',
  title: 'VerifyU Care',
  description: 'VerifyU Care: enquiry-based tele-consultation, care at home, and equipment and care plans. Providers, availability and fees vary by location. Enquire on WhatsApp.',
  body,
  css,
  jsonld: breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'VerifyU Care', path: '/care' }]),
  priority: 0.5,
};
