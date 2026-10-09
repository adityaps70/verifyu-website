import { SITE, icons, device, checks, note, flag, sectionHead, pageHero, ctaBand, finalCta, breadcrumbLd } from '../lib.mjs';

/* ---------------------------------------------------------------------------
   Every safety capability, told the same honest way:
   the problem → what VerifyU supports → what it depends on.
   --------------------------------------------------------------------------- */
const TOPICS = [
  {
    id: 'identification', icon: 'face', cls: '', label: 'Emergency identification',
    title: 'Emergency identification',
    lead: 'The first question at any serious incident is the hardest one to answer: who is this person, and who should be told?',
    problem: 'An unconscious, injured or disoriented person cannot give a name. Wallets are lost, phones lock themselves, and arrivals get recorded as unidentified while relatives are still waiting to hear something.',
    supports: 'A VerifyU user with scanning access can check a face against registered profiles. A match opens a Verified Profile — marked “Scanned securely via VerifyU” — carrying the person’s photo, name, gender and blood group, with Personal, Emergency and Medical tabs behind it.',
    depends: 'Prior registration and completed face verification, a suitable image, a working data connection, and the helper having relevant scanning access. Profile access is logged and the registered person is notified in the app.',
    extra: '',
    shot: { src: '/images/app/face-verification.webp', w: 736, alt: 'VerifyU face verification camera screen asking the person to look into the camera and hold still' },
  },
  {
    id: 'sos', icon: 'sos', cls: 'is-sos', label: 'General SOS',
    title: 'General SOS',
    lead: 'Sometimes you are conscious, able to hold a phone, and still not able to explain anything calmly. SOS is for that moment.',
    problem: 'In an emergency, most people do not have the composure to explain a situation five times over — to a stranger, to a call handler, and then to every member of their family in turn.',
    supports: 'Hold the SOS button for five seconds and the app asks you to select an emergency type, then continues with the in-app alert flow that reaches the emergency contacts on your profile. Emergency SOS Alerts sit with your other preferences in Settings.',
    depends: 'Connectivity, notification and other app permissions, the numbers on your profile being current, and your contacts actually seeing and acting on the alert. VerifyU does not dispatch help.',
    extra: '',
    shot: { src: '/images/app/sos.webp', alt: 'VerifyU SOS screen listing the emergency types: Women Safety, Medical, Road Accident, Road Assistance and Fire' },
  },
  {
    id: 'womens-safety', icon: 'shield', cls: 'is-sos', label: 'Women’s safety',
    title: 'Women’s safety',
    lead: 'Personal-safety situations usually begin long before anyone would dial an emergency number. The first need is to reach someone you trust, quickly and without explanation.',
    problem: 'Feeling unsafe on a route home, in a cab or at an unfamiliar address rarely qualifies as an emergency to anyone else — and by the time it does, typing out an explanation is the last thing you can do.',
    supports: 'Women Safety is the first of the five emergency types in SOS, so the alert your emergency contacts receive carries the right context instead of being one more unexplained missed call.',
    depends: 'Exactly what a Women Safety alert sends, and whether location is included, is set by the app version and your permissions.',
    extra: flag(),
  },
  {
    id: 'contacts', icon: 'users', cls: '', label: 'Emergency contacts',
    title: 'Emergency contacts',
    lead: 'A phone full of numbers is useless to a stranger. Two named people, with their relationship to you, are not.',
    problem: 'Someone helping you has no way to guess which contact matters. Most phones are locked, and even an unlocked one offers four hundred names and no instructions.',
    supports: 'Two trusted contacts, each with a name, relation and phone number, are part of registration. They appear on the Emergency tab — labelled “Encrypted &amp; Private” — with a call button beside each one, and they are where your SOS alert is aimed.',
    depends: 'Keeping the numbers current, choosing people who tend to answer, and telling them they are listed — so the call is not a surprise on the worst possible day.',
    extra: '',
    shot: { src: '/images/app/profile-emergency.webp', alt: 'Verified profile Emergency tab listing two emergency contacts with relation, phone number and a call button' },
  },
  {
    id: 'medical', icon: 'medical', cls: '', label: 'Medical information',
    title: 'Medical information',
    lead: 'Blood group, allergies and current medication matter most in the minutes when you are least able to say them.',
    problem: 'Almost nobody carries medical details. The people who most need them carried — those with conditions, allergies or complex medication — are the least likely to be able to recite them under stress.',
    supports: 'Your blood group is shown on the verified-profile header, beside your name and gender. The Medical tab goes further and stays protected: the app asks the helper to verify an OTP sent to one of your emergency contacts before medical information is opened.',
    depends: 'What you record and keep accurate, one of your emergency contacts being reachable to pass on the OTP, your plan — full medical data access is part of Premium — and the app version. Clinical decisions always remain with clinicians.',
    extra: '',
    shot: { src: '/images/app/profile-medical-otp.webp', alt: 'Verified profile Medical tab with a prompt to verify an OTP from an emergency contact before medical information is shown' },
  },
  {
    id: 'family', icon: 'child', cls: 'is-teal', label: 'Family &amp; dependants',
    title: 'Family and dependants',
    lead: 'The people least able to explain who to call are usually children and elderly parents. They are the reason most families register.',
    problem: 'A separated child, or a parent living with memory loss, may not know a phone number, a surname or an address — and cannot be handed an app and asked to register themselves.',
    supports: 'Children’s and dependants’ details can be added to your profile during registration, so a dependant’s record carries the adult who should be contacted.',
    depends: 'How far a dependant’s record can be looked up by a helper depends on the app version and the access flow in use.',
    extra: flag(),
  },
  {
    id: 'community', icon: 'crowd', cls: 'is-blue', label: 'Nearby response',
    title: 'Nearby and community response',
    lead: 'The first person at the scene is almost never a responder. It is whoever happened to be standing there.',
    problem: 'Bystanders want to help and usually cannot. They do not know who the person is, whether anything is medically relevant, or who to ring — so they wait for someone official to arrive.',
    supports: 'VerifyU runs a Safety Champions programme for volunteers and works with partner organisations — communities, campuses, events and residential societies — so more people nearby know what VerifyU is and how a connection gets made.',
    depends: 'Participation, and nothing else. It depends on who nearby has registered, who has scanning access, and who is willing to step in. What Safety Champion onboarding and verification involve is defined by the programme.',
    extra: flag(),
  },
  {
    id: 'hospitals', icon: 'hospital', cls: '', label: 'Hospitals',
    title: 'Hospital integration',
    lead: 'Emergency departments lose real time on unidentified arrivals — time spent searching pockets instead of treating a patient.',
    problem: 'An unidentified arrival means no history, no blood group, no consent conversation and no family in the corridor. Everything about that first hour is harder.',
    supports: 'Where an institutional arrangement exists, an emergency team can use VerifyU to look for a registered identity, view the emergency information a patient chose to share, and contact next of kin within the permitted workflow.',
    depends: 'An arrangement being in place with the institution, staff having relevant access, connectivity, and the patient having registered beforehand.',
    extra: flag(),
    link: { t: 'VerifyU for hospitals', h: '/organisations/hospitals' },
  },
];

const topicHtml = (t) => `
<article class="track sf-topic ${t.shot ? 'has-shot' : ''}" id="${t.id}" aria-labelledby="sf-h-${t.id}">
  ${t.shot ? `<figure class="sf-shot" data-reveal="scale">
    ${device({ cls: 'is-sm is-flat', inner: `<img class="shot" src="${t.shot.src}" alt="${t.shot.alt}" width="${t.shot.w || 722}" height="1600" loading="lazy">` })}
    <figcaption class="small">In-app screen, shown with demo data.</figcaption>
  </figure>` : ''}
  <div class="sf-topic-head" data-reveal>
    <div class="sf-topic-title">
      <div class="icon ${t.cls}">${icons[t.icon]}</div>
      <h3 class="h3" id="sf-h-${t.id}">${t.title}</h3>
    </div>
    <p class="lead">${t.lead}</p>
    ${t.link ? `<a class="link" href="${t.link.h}">${t.link.t} ${icons.arrow}</a>` : ''}
  </div>
  <div class="track-cols" data-stagger>
    <div class="track-col"><div class="meta">The problem</div><p>${t.problem}</p></div>
    <div class="track-col is-support"><div class="meta">What VerifyU supports</div><p>${t.supports}</p>
      ${t.id === 'sos' ? `<div class="sf-cats">${['Women Safety', 'Medical', 'Road Accident', 'Road Assistance', 'Fire'].map(c => `<span class="pill is-sos">${c}</span>`).join('')}</div>` : ''}
    </div>
    <div class="track-col"><div class="meta">What it depends on</div><p>${t.depends} ${t.extra}</p></div>
  </div>
</article>`;

const body = `
${pageHero({
  eyebrow: 'Safety &amp; emergency',
  title: 'If you could not speak,<br>who would speak for you?',
  lead: 'VerifyU is built safety-first. This page explains every emergency capability in the app, what each one is designed to support — and, just as plainly, what each one depends on.',
  ctas: `<a class="btn btn-white btn-lg" href="${SITE.play}" target="_blank" rel="noopener">Get VerifyU — it’s free ${icons.arrow}</a><a class="btn btn-ghost btn-lg" href="#not">What VerifyU is not</a>`,
  media: device({ alt: 'VerifyU identity dashboard with a verified demo profile, Start Verification and the Personal, Emergency, Medical and Biometric tabs', eager: true }),
  dark: true, cls: 'sf-hero',
})}

<!-- JUMP NAV -->
<nav class="sf-jump" aria-label="Sections on this page">
  <div class="container">
    <span class="meta">On this page</span>
    <div class="sf-jump-links">
      ${TOPICS.map(t => `<a href="#${t.id}">${t.label}</a>`).join('')}
    </div>
  </div>
</nav>

<!-- THE CAPABILITIES -->
<section class="section sf-layers" aria-labelledby="sf-layers-h">
  <div class="container">
    ${sectionHead({ eyebrow: 'The safety layer', title: 'Eight capabilities. One registered profile.', lead: 'Each of these works from the same registration. None of them is a promise of rescue — they are ways to make identification and contact more likely than they would otherwise be.' })}
    ${TOPICS.map(topicHtml).join('')}
  </div>
</section>

<!-- AFTER A MATCH -->
<section class="section is-cloud" aria-labelledby="sf-after-h">
  <div class="container">
    ${sectionHead({ eyebrow: 'After a match', title: 'You still know what happened to your profile.', lead: 'Identification is only acceptable if the person being identified keeps visibility and control.' })}
    <div class="grid grid-3" data-stagger>
      <div class="card">
        <div class="icon">${icons.bell}</div>
        <h3 class="h4">You are notified</h3>
        <p class="body">VerifyU sends an in-app alert to the registered user when their profile is accessed.</p>
      </div>
      <div class="card">
        <div class="icon is-blue">${icons.log}</div>
        <h3 class="h4">Access is logged</h3>
        <p class="body">Scans are logged. Logs are described on verifyu.in as including the time, IP address and location of the scan. ${flag()}</p>
      </div>
      <div class="card">
        <div class="icon is-teal">${icons.eye}</div>
        <h3 class="h4">Emergency-relevant first</h3>
        <p class="body">A match opens a verified profile with photo, name, gender and blood group. Medical information stays protected behind an OTP sent to one of your emergency contacts.</p>
      </div>
    </div>
    <div class="row mt-5"><a class="btn btn-ink" href="/trust">Visit the Trust Centre ${icons.arrow}</a><a class="link" href="/how-it-works">See how identification works ${icons.arrow}</a></div>
  </div>
</section>

<!-- WHAT VERIFYU IS NOT -->
<section class="section is-tight" id="not" aria-labelledby="sf-not-h">
  <div class="container">
    <div class="sf-not" data-reveal>
      <div class="sf-not-head">
        <span class="pill is-sos">${icons.info} Read this part</span>
        <h2 class="h2 mt-3" id="sf-not-h">What VerifyU is not.</h2>
        <p class="body mt-3">A safety product that oversells itself is dangerous. These are the limits, in plain words.</p>
      </div>
      <ul class="sf-not-list">
        <li><b>Not an emergency service.</b> Call your local emergency number first, every time. VerifyU does not dispatch ambulances, police or fire services.</li>
        <li><b>Not guaranteed identification.</b> A match depends on prior registration, image suitability, connectivity and access. It can fail, and sometimes it will.</li>
        <li><b>No guaranteed assistance or response time.</b> Nothing in the app obliges anyone — a bystander, a contact or an institution — to act, or to act quickly.</li>
        <li><b>Not a continuous location-tracking service.</b> VerifyU is built around emergency identification and alerting, not around following where you are. ${flag()}</li>
        <li><b>Not a medical record system.</b> The medical information in your profile is what you chose to record for an emergency — it is not a clinical history, and clinical judgement stays with clinicians.</li>
        <li><b>Not money.</b> VerifyU Coins are a reward inside the app. They have no cash value and are not a currency or an investment.</li>
      </ul>
    </div>
    ${note('VerifyU supports identification and communication. Feature availability depends on the app version, plan, permissions and applicable terms.')}
  </div>
</section>



${finalCta({ headline: 'The safest version of this<br>is the one you set up early.', copy: 'Register yourself. Register your parents. Register the people who could not explain themselves.' })}
`;

const css = `
/* Dark hero: keep the shared header legible until it compacts into its white pill */
body[data-page="/safety"] .header:not(.is-compact) .brand{color:#fff}
body[data-page="/safety"] .header:not(.is-compact) .nav-link{color:rgba(255,255,255,.76)}
body[data-page="/safety"] .header:not(.is-compact) .nav-link:hover,
body[data-page="/safety"] .header:not(.is-compact) .nav-item.is-open > .nav-link{background:rgba(255,255,255,.1);color:#fff}
body[data-page="/safety"] .header:not(.is-compact) .nav-cta .btn-ghost{color:#fff;border-color:rgba(255,255,255,.3)}
body[data-page="/safety"] .header:not(.is-compact) .nav-toggle{color:#fff}
.sf-hero{position:relative;overflow:hidden}
.sf-hero .h1{font-size:clamp(34px,4.4vw,58px);max-width:20ch}
.sf-hero .lead{max-width:48ch}
/* Jump nav */
.sf-jump{position:relative;z-index:2;border-bottom:1px solid var(--line);background:#fff;padding:18px 0}
.sf-jump .container{display:flex;align-items:center;gap:20px}
.sf-jump .meta{flex:none;color:var(--ink-4)}
.sf-jump-links{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;padding-bottom:2px}
.sf-jump-links::-webkit-scrollbar{display:none}
.sf-jump-links a{flex:none;padding:9px 14px;border-radius:999px;background:var(--cloud);font-size:14px;font-weight:500;color:var(--ink-2);white-space:nowrap;transition:background .25s,color .25s}
.sf-jump-links a:hover{background:var(--purple-50);color:var(--purple)}
@media (max-width:768px){.sf-jump .container{flex-direction:column;align-items:flex-start;gap:10px}.sf-jump-links{width:100%}}
/* Topics */
.sf-topic{scroll-margin-top:28px}
.sf-topic:first-of-type{border-top:0;padding-top:0}
.sf-topic-head{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(20px,3vw,48px);align-items:start;margin-bottom:clamp(24px,3vw,36px)}
.sf-topic-title{display:flex;align-items:center;gap:16px}
.sf-topic-head .icon{margin:0;flex:none}
.sf-topic-head .lead{max-width:52ch;font-size:clamp(17px,1.35vw,19px)}
.sf-topic-head .link{grid-column:2;margin-top:-6px}
.sf-topic.has-shot{display:grid;grid-template-columns:minmax(0,1fr) 200px;gap:clamp(20px,2.6vw,40px);align-items:start}
.sf-topic.has-shot > .sf-topic-head,.sf-topic.has-shot > .track-cols{grid-column:1}
.sf-shot{grid-column:2;grid-row:1 / span 2;display:flex;flex-direction:column;align-items:center;gap:14px}
.sf-shot .device{max-width:200px}
.sf-shot figcaption{text-align:center;max-width:22ch;color:var(--ink-3)}
.sf-topic .track-col{display:flex;flex-direction:column}
.sf-topic .track-col.is-support{background:var(--purple-50)}
.sf-topic .track-col .meta{color:var(--purple)}
.sf-topic .track-col.is-support .meta{color:var(--purple-700)}
.sf-cats{display:flex;flex-wrap:wrap;gap:6px;margin-top:14px}
.sf-cats .pill{font-size:11.5px;padding:5px 10px}
.sf-layers .section-head .h2{max-width:20ch}
/* What VerifyU is not */
.sf-not{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(28px,4vw,64px);padding:clamp(28px,4vw,48px);border-radius:var(--r-xl);background:var(--warm);border:1px solid var(--line)}
.sf-not-head .pill svg{width:15px;height:15px;flex:none}
.sf-not-head .h2{font-size:clamp(28px,3.4vw,42px);max-width:14ch}
.sf-not-list{display:flex;flex-direction:column;gap:16px}
.sf-not-list li{position:relative;padding-left:30px;font-size:16px;color:var(--ink-2);line-height:1.5}
.sf-not-list li::before{content:"";position:absolute;left:0;top:9px;width:16px;height:3px;border-radius:3px;background:var(--sos);opacity:.7}
.sf-not-list b{color:var(--ink)}
.sf-not + .note{margin-top:24px}
@media (max-width:1024px){
  .sf-not{grid-template-columns:1fr}
  .sf-topic-head{grid-template-columns:1fr;gap:14px}
  .sf-topic-head .link{grid-column:1;margin-top:0}
  .sf-topic.has-shot{grid-template-columns:1fr;gap:20px}
  .sf-topic.has-shot > .sf-topic-head,.sf-topic.has-shot > .track-cols,.sf-shot{grid-column:1}
  .sf-shot{grid-row:auto;order:2;margin:4px 0}
  .sf-topic.has-shot > .sf-topic-head{order:1}
  .sf-topic.has-shot > .track-cols{order:3}
  .sf-shot .device{max-width:180px}
}
`;

export default {
  path: '/safety',
  nav: '',
  title: 'Safety & Emergency',
  description: 'How VerifyU supports emergency identification, SOS, emergency contacts, medical information and family safety — and what each capability depends on.',
  body, css, priority: 0.9,
  jsonld: breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Safety & Emergency', path: '/safety' }]),
};
