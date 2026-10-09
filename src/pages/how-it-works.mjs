import { SITE, icons, device, checks, note, sectionHead, accordion, pageHero, finalCta, breadcrumbLd, faqLd } from '../lib.mjs';

/* ---------------- Video chapters (from the 1:01 registration guide) ---------------- */
const CHAPTERS = [
  { n: '01', t: 'Download and open the app', time: '0:00', s: 0 },
  { n: '02', t: 'Verify your mobile number', time: '0:08', s: 8 },
  { n: '03', t: 'Add your photo and personal details', time: '0:19', s: 19 },
  { n: '04', t: 'Add two emergency contacts', time: '0:24', s: 24 },
  { n: '05', t: 'Complete medical information', time: '0:31', s: 31 },
  { n: '06', t: 'Complete face verification', time: '0:35', s: 35 },
  { n: '07', t: 'Review, submit and finish', time: '0:40', s: 40 },
];

const FAQS = [
  {
    id: 'hw-free', q: 'Is registration free?',
    a: `Yes. Registering on VerifyU is free, and the safety layer — your profile, face verification, two emergency contacts, medical information and General SOS — comes with it. Premium is ₹99 per month or ₹999 per year and is described in the app as ad-free usage, full medical data access, unlimited scans and premium upgrades for the year. Final pricing, taxes and renewal terms are confirmed in the app at purchase.`,
  },
  {
    id: 'hw-register', q: 'Do I need to register before a scan can find me?',
    a: `Yes. A scan is only checked against registered VerifyU profiles. If you have not registered and completed face verification, there is nothing for a match to return — which is why registering the people you care about matters as much as registering yourself.`,
  },
  {
    id: 'hw-who', q: 'Who can scan a face?',
    a: `A VerifyU user with scanning access in the app. Scanning access depends on the plan and the app version, and every scan is carried out inside the VerifyU access flow — not from a public search. Profile access is logged, and the registered person is notified in the app when their profile is accessed.`,
  },
  {
    id: 'hw-sees', q: 'What does the helper actually see?',
    a: `A Verified Profile marked “Scanned securely via VerifyU”: your photo, name, gender and blood group, with Personal, Emergency and Medical tabs. Emergency lists the two contacts you chose, with their relation and number and a call button. Medical is protected — the helper has to verify an OTP from one of those emergency contacts before medical details open. What is shown also depends on the app version and the plan.`,
  },
  {
    id: 'hw-services', q: 'Does VerifyU replace emergency services?',
    a: `No. Call your local emergency number first, always. VerifyU supports identification and communication around an emergency — it does not dispatch help, and it cannot guarantee that a person will be found, identified or reached, or how quickly anyone will respond.`,
  },
];

const body = `
${pageHero({
  eyebrow: 'How it works',
  title: 'Register once.<br>Be reachable when it matters.',
  lead: 'Registration takes one sitting: your number, your photo, two people you trust and the medical details a responder would want. After that, your face is the way back to all of it.',
  ctas: `<a class="btn btn-primary btn-lg" href="${SITE.play}" target="_blank" rel="noopener">Get VerifyU — it’s free ${icons.arrow}</a><a class="btn btn-ghost btn-lg" href="#video">${icons.play} Watch the 1-minute guide</a>`,
})}

<!-- B. THE VIDEO -->
<section class="section is-cloud" id="video" aria-labelledby="hw-video-h">
  <div class="container">
    ${sectionHead({ eyebrow: 'Watch it first', title: 'Watch the full registration guide.', lead: 'One minute, seven chapters, recorded in the app. Jump to any chapter — the video follows.' })}
    <div class="hw-video-grid">
      <div data-reveal="scale">
        <div class="video-wrap" data-video-wrap>
          <video data-video src="/videos/verifyu-registration.mp4" poster="/images/verifyu-registration-poster.jpg" playsinline preload="none" controls></video>
          <button class="play-btn" data-video-play type="button" aria-label="Play registration video"><span>${icons.play}</span></button>
        </div>
        <p class="small center mt-3">Registration guide · 1:01</p>
      </div>
      <div>
        <h3 class="h4 hw-ch-h">Chapters</h3>
        <ol class="timeline hw-ch">
          ${CHAPTERS.map(c => `<li class="tl-item">
            <span class="num">${c.n}</span>
            <button class="tl-btn" type="button" data-seek="${c.s}"><span class="h4">${c.t}<span class="time">${c.time}</span></span></button>
          </li>`).join('')}
        </ol>
      </div>
    </div>
    <div class="hw-before mt-6" data-reveal>
      <div class="hw-before-copy">
        <h3 class="h3">Before you begin</h3>
        <p class="body mt-2">Five things within reach and registration goes through in one attempt.</p>
      </div>
      ${checks([
        'The phone with your own mobile number in it, for the OTP',
        'A clear, recent photo of your face',
        'Two trusted contacts — names, relationships and numbers',
        'Your blood group and any medical information worth recording',
        'Good light and a plain background for face verification',
      ])}
    </div>
  </div>
</section>

<!-- C. HOW IDENTIFICATION WORKS -->
<section class="section is-dark on-dark hw-flow" aria-labelledby="hw-flow-h">
  <div class="glow is-purple" style="width:620px;height:620px;right:-220px;top:-180px;opacity:.35"></div>
  <div class="container">
    ${sectionHead({ eyebrow: 'On the day it matters', title: 'How emergency identification works.', lead: 'Three steps, and a short list of things they depend on. We would rather be plain about both.' })}
    <div class="grid grid-3" data-stagger>
      <div class="card is-dark is-xl">
        <div class="icon">${icons.user}</div>
        <span class="num">Step 01</span>
        <h3 class="h3 mt-2">Register</h3>
        <p class="body mt-2">You complete registration and face verification. Your profile now holds your identity, your emergency information and two contacts — and it stays yours to edit.</p>
      </div>
      <div class="card is-dark is-xl">
        <div class="icon">${icons.scan}</div>
        <span class="num">Step 02</span>
        <h3 class="h3 mt-2">Match</h3>
        <p class="body mt-2">Someone with VerifyU scanning access opens the scanner. The image is checked against registered profiles, and a match can return the profile behind that face.</p>
      </div>
      <div class="card is-dark is-xl">
        <div class="icon">${icons.phone}</div>
        <span class="num">Step 03</span>
        <h3 class="h3 mt-2">Connect</h3>
        <p class="body mt-2">The helper sees the emergency-relevant information you chose to share and can reach your next of kin through the permitted VerifyU workflow. You are notified that your profile was accessed.</p>
      </div>
    </div>
    <div class="hw-result mt-6" data-reveal>
      <figure class="hw-result-phone">
        ${device({ cls: 'is-sm is-flat', inner: `<img class="shot" src="/images/app/profile-personal.webp" alt="Verified profile screen marked “Scanned securely via VerifyU”, showing a demo photo, name, gender, blood group and the Personal, Emergency and Medical tabs" width="722" height="1600" loading="lazy">` })}
      </figure>
      <div class="hw-result-copy">
        <div class="eyebrow">What a match opens</div>
        <h3 class="h3 mt-2">A verified profile, not a file.</h3>
        <p class="body mt-3">A successful scan opens a Verified Profile marked “Scanned securely via VerifyU”: your photo, your name, your gender and your blood group, with Personal, Emergency and Medical tabs behind it.</p>
        ${checks([
          '<b>Emergency.</b> Your two contacts with their relation and number, each with a call button, labelled “Encrypted &amp; Private”.',
          '<b>Medical.</b> Protected. The helper is asked to verify an OTP from one of your emergency contacts before medical details open.',
          '<b>You are told.</b> The registered user is notified in the app when their profile is accessed.',
        ])}
      </div>
    </div>
    <div class="hw-depends mt-6">
      <h3 class="h4">What all of that depends on</h3>
      <div class="grid grid-2 mt-3">
        ${checks([
          '<b>A registered profile.</b> Face matching only works against people who have registered and completed face verification.',
          '<b>A successful match.</b> Image quality, lighting, angle and how much a face has changed all affect whether a match is returned.',
          '<b>Connectivity.</b> The scan, the match and the contact workflow all need a working data connection on the helper’s phone.',
          '<b>Relevant access.</b> The helper must be a VerifyU user with scanning access; what they can see depends on your settings, the plan and the app version.',
        ])}
      </div>
      ${note('VerifyU supports identification and communication. It does not replace emergency services, and it does not guarantee identification, assistance or any response time.')}
    </div>
  </div>
</section>

<!-- D. FAQ -->
<section class="section" aria-labelledby="hw-faq-h">
  <div class="container is-narrow">
    ${sectionHead({ eyebrow: 'Questions', title: 'Straight answers.', center: true })}
    ${accordion(FAQS, 'single')}
    <div class="row mt-5" style="justify-content:center">
      <a class="btn btn-ghost" href="/support">Visit the Help Centre ${icons.arrow}</a>
      <a class="btn btn-ghost" href="/trust">Visit the Trust Centre ${icons.arrow}</a>
    </div>
  </div>
</section>

${finalCta({ headline: 'A few minutes now.<br>For a day you can’t plan for.', copy: 'Register yourself. Then sit with your parents and register them too.' })}
`;

const css = `
/* Journey */
@media (min-width:1025px){
  .hw-stage{opacity:.5;transition:opacity .55s var(--ease)}
  .hw-stage.is-active{opacity:1}
}
html.no-motion .hw-stage{opacity:1}
@media (max-width:1024px){
  .hw-grid{grid-template-columns:1fr;gap:0}
  .hw-aside{display:none}
  .hw-stage{min-height:34vh;padding-top:10vh}
}
@media (max-width:640px){
  .hw-stage{min-height:42vh}
  .hw-timeline .tl-item{grid-template-columns:40px minmax(0,1fr);gap:16px}
  .hw-timeline::before{left:19px}
  .hw-stage .num{width:40px;height:40px}
}
/* Video + chapters */
.hw-video-grid{display:grid;grid-template-columns:minmax(0,380px) minmax(0,1fr);gap:clamp(28px,5vw,72px);align-items:start}
.hw-ch-h{margin-bottom:8px}
.hw-ch .tl-item{padding:8px 0}
.hw-ch .tl-btn .h4{display:block;font-family:var(--font-display);font-size:17px;font-weight:600;letter-spacing:-.015em}
.hw-ch .tl-btn{display:flex;align-items:center;min-height:48px}
.hw-ch .tl-btn.is-active{background:var(--purple-50)}
.hw-ch .tl-item:has(.tl-btn.is-active) .num{border-color:var(--purple);background:var(--purple);color:#fff}
.hw-ch::before{top:20px;bottom:20px}
.hw-before{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(24px,4vw,56px);padding:clamp(28px,4vw,44px);border-radius:var(--r-xl);background:#fff;border:1px solid var(--line)}
@media (max-width:1024px){
  .hw-video-grid{grid-template-columns:1fr;gap:32px}
  .hw-before{grid-template-columns:1fr;gap:20px}
}
/* Identification flow */
.hw-flow{position:relative;overflow:hidden}
.hw-flow .card .num{color:#B98BE6}
.hw-result{display:grid;grid-template-columns:240px minmax(0,1fr);gap:clamp(24px,4vw,56px);align-items:center;padding:clamp(24px,3vw,36px);border-radius:var(--r-xl);background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1)}
.hw-result-phone .device{max-width:240px}
.hw-result-copy .h3{max-width:18ch}
.hw-result-copy .body{max-width:56ch}
.hw-result-copy .checks{margin-top:20px;gap:12px}
.hw-result-copy .check{font-size:15.5px}
@media (max-width:768px){.hw-result{grid-template-columns:1fr;gap:24px}.hw-result-phone .device{max-width:190px}}
.hw-depends{padding:clamp(28px,4vw,40px);border-radius:var(--r-xl);background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1)}
.hw-depends .note{margin-top:24px;color:rgba(255,255,255,.55)}
.hw-depends .note svg{color:rgba(255,255,255,.45)}
.hw-depends .grid{gap:16px 40px}
@media (max-width:768px){.hw-depends .grid{grid-template-columns:1fr}}
`;

export default {
  path: '/how-it-works',
  nav: '/how-it-works',
  title: 'How VerifyU works',
  description: 'Watch the one-minute VerifyU registration guide, chapter by chapter, and understand how emergency identification connects a registered face to next of kin.',
  body, css, priority: 0.9,
  // Strip the visible owner-verification badges out of the structured-data copy.
  jsonld: [breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'How it works', path: '/how-it-works' }]),
    faqLd(FAQS.map(f => ({ q: f.q, a: f.a.replace(/<span class="flag"[\s\S]*?<\/span>/g, '').replace(/\s+/g, ' ').trim() })))],
};
