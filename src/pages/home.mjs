import { SITE, icons, stores, device, note, sectionHead, finalCta, railNav, ORG_LD, APP_LD, esc } from '../lib.mjs';
import { team } from '../content.mjs';

/* Real app screens (demo data) */
const S = {
  dash: '/images/app/home-dashboard.webp', face: '/images/app/face-verification.webp', personal: '/images/app/profile-personal.webp',
  otp: '/images/app/profile-medical-otp.webp', contacts: '/images/app/profile-emergency.webp', homeContacts: '/images/app/home-emergency.webp',
  sos: '/images/app/sos.webp', steps: '/images/app/steps.webp', settings: '/images/app/settings.webp', recharge: '/images/app/recharge.webp',
};
const shot = (src, alt, extra = '') => `<img class="shot" src="${src}" alt="${alt}" width="722" height="1600" loading="lazy" ${extra}>`;
const ALT = {
  dash: 'VerifyU identity dashboard with a verified demo profile', face: 'VerifyU face verification screen', personal: 'Verified profile after a scan: name, gender and blood group',
  otp: 'Medical information is protected: OTP from an emergency contact is required', contacts: 'Emergency contacts of a matched profile with call buttons', sos: 'SOS emergency type selection: Women safety, Medical, Road accident, Road assistance, Fire',
  steps: 'Step counter at 8,420 steps with coins', settings: 'Settings with Premium membership and referral rewards', recharge: 'Recharge & Utilities: mobile, DTH and electricity with Use Coins',
};

const uiConnect = `
<div class="ui" style="background:var(--purple-900);color:#fff;display:flex;align-items:center;justify-content:center;text-align:center">
  <div style="padding:24px">
    <div style="width:56px;height:56px;border-radius:999px;background:var(--teal);margin:0 auto 18px;display:flex;align-items:center;justify-content:center;color:#fff">${icons.check}</div>
    <div style="font-family:var(--font-display);font-size:22px;font-weight:700;letter-spacing:-.02em;line-height:1.15">Scan.<br>Identify.<br>Connect.</div>
    <div style="margin-top:12px;font-size:11px;opacity:.7">Next of kin reached · Profile access logged</div>
  </div>
</div>`;
const matchOverlay = `<div class="ui-match" style="bottom:22%"><span class="dot">${icons.check}</span><div><b>MATCH FOUND</b><span>Registered VerifyU profile</span></div></div>`;

// Scroll story: one line per step, one image per step. Captions use "can / designed to" language only.
const MOMENTS = [
  { t: 'An accident.', src: '/images/moments-accident.jpg', alt: 'An ambulance with its rear doors open at a roadside', cap: 'At a roadside, a responder may need a name, a blood group and someone to call — fast.' },
  { t: 'A medical emergency.', src: '/images/moments-medical.jpg', alt: 'A nurse in scrubs pushing a hospital trolley down a corridor', cap: 'In an emergency ward, a verified profile can help staff reach the right family member.' },
  { t: 'Memory loss.', src: '/images/moments-memory.jpg', alt: 'An older woman looking calmly at the camera', cap: 'A name, a blood group, a daughter’s number — reachable when she can’t say them.' },
  { t: 'A child separated from family.', src: '/images/moments-child.jpg', alt: 'A small boy looking around in a crowd', cap: 'Separated in a crowd, a child’s registered profile is designed to help reach a parent’s number.' },
  { t: 'A journey away from home.', src: '/images/moments-journey.jpg', alt: 'A traveller with a backpack beside a train', cap: 'Far from home, a scan can help strangers reach the people who know you.' },
  { t: 'But your identity can still be connected.', src: '/images/moments-connected.jpg', alt: 'A younger hand holding an older person’s hands', cap: 'Emergency contacts, blood group, medical details — reachable by the people helping you.' },
];
const STEPS = [
  { k: 'Face', t: 'Start with a face.', b: 'A VerifyU user with scanning access opens the scanner. No card, no phone needed from the person.' },
  { k: 'Match', t: 'Match found.', b: 'The scan is checked against registered profiles. A registered person can be matched in moments.' },
  { k: 'Identity', t: 'A verified identity.', b: 'Name, gender, blood group — exactly as the registered person set it up.' },
  { k: 'Information', t: 'Medical details, protected.', b: 'Fuller medical information opens only with an OTP from an emergency contact.' },
  { k: 'People', t: 'The people they trust.', b: 'Emergency contacts with their relationship and number, one tap from a call.' },
  { k: 'Connection', t: 'Scan. Identify. Connect.', b: 'Someone who couldn’t speak for themselves is connected back to their people.' },
];

const SAFETY = [
  { img: S.face, alt: ALT.face, t: 'Face identification', b: 'Your face becomes the key to your profile.', pos: '50% 18%' },
  { img: S.homeContacts, alt: ALT.contacts, t: 'Emergency contacts', b: 'Two people who should hear first.', pos: '50% 46%' },
  { img: S.otp, alt: ALT.otp, t: 'Medical information', b: 'Blood group up front. Records behind an OTP.', pos: '50% 62%' },
  { img: S.sos, alt: ALT.sos, t: 'SOS', b: 'Five emergency types, one hold of a button.', pos: '50% 22%', sos: true },
  { img: S.sos, alt: ALT.sos, t: 'Women’s safety', b: 'A dedicated SOS category and alert flow.', pos: '50% 20%', sos: true },
  { img: S.dash, alt: ALT.dash, t: 'Family connection', b: 'Add children’s details to your own profile.', pos: '50% 60%' },
];

const ORGS = [
  { k: 'hospitals', icon: 'hospital', t: 'Hospitals', flow: ['Emergency arrival', 'Identity support', 'Emergency information', 'Next of kin', 'Response coordination'], b: 'Unidentified arrivals become reachable people — identity, shared medical information and next of kin through the permitted workflow.', cta: { t: 'Request a hospital demo', h: '/organisations/hospitals' } },
  { k: 'government', icon: 'gov', t: 'Government', flow: ['District pilot', 'Registration drives', 'Responder access', 'Missing-person support', 'Reporting'], b: 'A registration-led safety layer for districts, police and disaster-response teams.', cta: { t: 'Discuss a district pilot', h: '/organisations#government' } },
  { k: 'campuses', icon: 'school', t: 'Schools & Colleges', flow: ['Campus registration', 'Guardian contacts', 'Safety Captains', 'Event cover', 'Incident support'], b: 'Students and staff registered, guardians listed, Safety Champions trained on campus.', cta: { t: 'Run a campus safety pilot', h: '/organisations#campuses' } },
  { k: 'communities', icon: 'home', t: 'Communities', flow: ['Society drive', 'Senior residents', 'Security desk access', 'Family alerts', 'Awareness'], b: 'Residential and senior communities where neighbours and security staff can help make a connection.', cta: { t: 'Bring VerifyU to your community', h: '/organisations#communities' } },
  { k: 'events', icon: 'event', t: 'Events', flow: ['Pre-event registration', 'Help desk', 'Lost & found', 'Medical desk', 'Report'], b: 'Marathons, festivals and gatherings where separation and medical incidents are a known risk.', cta: { t: 'Bring VerifyU to your event', h: '/organisations#events' } },
  { k: 'workplaces', icon: 'work', t: 'Workplaces', flow: ['Employee registration', 'Site contacts', 'First-aid access', 'Travel safety', 'Wellness'], b: 'A practical safety benefit for employees, field teams and travelling staff.', cta: { t: 'Talk to us about workplaces', h: '/organisations#workplaces' } },
];

const LEADERS = team();   // edited in the admin panel (content/team.json)

const body = `
<!-- 1. HERO -->
<section class="hero" aria-labelledby="hero-h">
  <div class="glow is-purple" style="width:900px;height:900px;left:50%;top:-320px;transform:translateX(-50%)"></div>
  <div class="glow is-blue" style="width:600px;height:600px;left:60%;top:480px;opacity:.35"></div>
  <div class="container hero-inner">
    <div class="hero-copy mask-group">
      <div class="hero-eyebrow" data-reveal="fade"><span class="dot"></span>Identity when it matters most</div>
      <h1 class="display" id="hero-h"><span class="mask"><span>Your face.</span></span><span class="mask"><span>Your <em class="grad-text">lifeline.</em></span></span></h1>
      <p class="hero-sub" data-reveal>If you couldn’t speak for yourself, VerifyU can connect your face to your identity, your emergency information and the people you trust.</p>
      <div class="row hero-cta" data-reveal>
        <a class="btn btn-primary btn-lg" href="${SITE.play}" target="_blank" rel="noopener">Get VerifyU — it’s free ${icons.arrow}</a>
        <a class="btn btn-ghost btn-lg" href="#how">See how it works</a>
      </div>
      <div class="hero-stores" data-reveal>${stores()}<span class="small hero-free">${icons.check} Free to register · Android &amp; iPhone</span></div>
    </div>
    <div class="hero-stage" data-hero-stage>
      <div class="hero-phone hero-phone-l" data-hero-phone="l">${device({ src: S.face, alt: ALT.face, cls: 'is-flat' })}</div>
      <div class="hero-phone hero-phone-c" data-hero-phone="c">${device({ src: S.dash, alt: ALT.dash, cls: 'is-lg', eager: true })}</div>
      <div class="hero-phone hero-phone-r" data-hero-phone="r">${device({ src: S.contacts, alt: ALT.contacts, cls: 'is-flat' })}</div>
      <div class="hero-chip hero-chip-1" data-reveal="left"><span class="dot is-teal"></span><b>Match found</b><span>Registered profile · 2 seconds</span></div>
      <div class="hero-chip hero-chip-2" data-reveal="right"><span class="dot"></span><b>Next of kin reached</b><span>Sunita · Mother</span></div>
      <div class="hero-chip hero-chip-3" data-reveal="fade"><span class="dot is-sos"></span><b>SOS</b><span>5 emergency types</span></div>
      <div class="hero-fade"></div>
    </div>
  </div>
</section>

<!-- 2. PRESS MARQUEE -->
<section class="press-strip" aria-label="Press coverage">
  <div class="container press-strip-head"><span class="meta">The VerifyU story, in the press</span><a class="link" href="/press">Read the stories ${icons.arrow}</a></div>
  <div class="marquee" style="--marquee-dur:38s">
    <div class="marquee-track">
      <a class="press-item" href="https://startuppedia.in/tech-innovation/verifyu-was-founded-by-captain-saurabh-saraswat-a-former-merchant-navy-captain-from-lucknow-11821665" target="_blank" rel="noopener">Startup Pedia</a><span class="press-item"><span class="dot"></span></span>
      <a class="press-item" href="https://www.siliconindia.com/news/general/how-capt-saurabh-saraswat-is-addressing-indias-emergency-identification-gap-with-verifyu-nid-241681-cid-1.html" target="_blank" rel="noopener">SiliconIndia</a><span class="press-item"><span class="dot"></span></span>
      <a class="press-item" href="https://www.tribuneindia.com/news/business/verifyu-app-emerges-as-a-digital-safety-net-for-indian-families/" target="_blank" rel="noopener">The Tribune</a><span class="press-item"><span class="dot"></span></span>
      <a class="press-item" href="https://theprint.in/ani-press-releases/verifyu-app-emerges-as-a-digital-safety-net-for-indian-families/2703120/" target="_blank" rel="noopener">ThePrint</a><span class="press-item"><span class="dot"></span></span>
      <a class="press-item" href="https://theprint.in/ani-press-releases/verifyu-app-emerges-as-a-digital-safety-net-for-indian-families/2703120/" target="_blank" rel="noopener">ANI</a><span class="press-item"><span class="dot"></span></span>
    </div>
  </div>
</section>

<!-- 3. MOMENTS -->
<section class="is-dark on-dark moments" aria-labelledby="moments-h" data-story data-steps="${MOMENTS.length}" style="--steps:${MOMENTS.length}">
  <div class="moments-sticky">
    <div class="container split moments-grid">
      <div class="col-7">
        <div class="eyebrow" data-reveal="fade">Why it matters</div>
        <h2 class="h1" id="moments-h" data-reveal>There are moments when you may not be able to say your name.</h2>
        <ul class="moments-list">
          ${MOMENTS.slice(0, -1).map((m, i) => `<li data-step-item="${i}"${i === 0 ? ' class="is-active"' : ''}><span class="n">0${i + 1}</span>${m.t}</li>`).join('')}
        </ul>
        <p class="moments-turn" data-step-item="${MOMENTS.length - 1}"><span class="turn-line"></span>${MOMENTS[MOMENTS.length - 1].t}</p>
      </div>
      <div class="col-5">
        <div class="moments-photo" data-reveal="scale">
          ${MOMENTS.map((m, i) => `<figure class="story-panel${i === 0 ? ' is-active' : ''}" data-step-panel="${i}">
            <img src="${m.src}" alt="${m.alt}" width="1040" height="1300" loading="lazy" decoding="async">
            <figcaption class="mcap">${m.cap}</figcaption>
          </figure>`).join('')}
          <div class="moments-count" aria-hidden="true">${MOMENTS.map((m, i) => `<span data-step-item="${i}"${i === 0 ? ' class="is-active"' : ''}>0${i + 1}</span>`).join('')}<i>/ 0${MOMENTS.length}</i></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- 4. ONE IDENTITY. THREE CONNECTIONS. -->
<section class="section three" aria-labelledby="three-h" data-switch data-switch-interval="3600">
  <div class="container">
    ${sectionHead({ eyebrow: 'One identity. Three connections.', title: 'One profile. Everything a helper needs.' })}
    <div class="three-grid">
      <div class="three-items" role="tablist" aria-label="Connections">
        <button class="three-item is-active" role="tab" aria-selected="true" data-switch-btn="0"><span class="num">01</span><span class="h3">You</span><span class="body">Your verified identity.</span></button>
        <button class="three-item" role="tab" aria-selected="false" data-switch-btn="1"><span class="num">02</span><span class="h3">Your information</span><span class="body">Blood group and protected medical details.</span></button>
        <button class="three-item" role="tab" aria-selected="false" data-switch-btn="2"><span class="num">03</span><span class="h3">Your people</span><span class="body">Emergency contacts, one tap from a call.</span></button>
      </div>
      <div class="three-phone" data-reveal="scale">
        ${device({ inner: `<div class="switch-panel is-active" data-switch-panel="0">${shot(S.personal, ALT.personal)}</div><div class="switch-panel" data-switch-panel="1">${shot(S.otp, ALT.otp)}</div><div class="switch-panel" data-switch-panel="2">${shot(S.contacts, ALT.contacts)}</div>` })}
      </div>
    </div>
  </div>
</section>

<!-- 5. HOW THE CONNECTION WORKS -->
<section class="story" id="how" data-story data-steps="6" aria-labelledby="how-h">
  <div class="story-sticky">
    <div class="container story-inner">
      <div class="story-copy">
        <div class="eyebrow">How the connection works</div>
        <h2 class="h2" id="how-h">From a face to the people who matter.</h2>
        <ol class="story-steps">
          ${STEPS.map((s, i) => `<li class="story-step ${i === 0 ? 'is-active' : ''}" data-step-item="${i}"><span class="story-k">Step 0${i + 1} · ${s.k}</span><h3 class="h3">${s.t}</h3><p class="body">${s.b}</p></li>`).join('')}
        </ol>
        <div class="story-dots" aria-hidden="true">${STEPS.map((_, i) => `<span data-step-item="${i}" class="${i === 0 ? 'is-active' : ''}"></span>`).join('')}</div>
      </div>
      <div class="story-phone">
        ${device({ id: 'story-device', cls: 'is-lg', inner: `
          <div class="story-panel is-active" data-step-panel="0">${shot(S.face, ALT.face)}<span class="scan-beam"></span></div>
          <div class="story-panel" data-step-panel="1">${shot(S.face, ALT.face)}${matchOverlay}</div>
          <div class="story-panel" data-step-panel="2">${shot(S.personal, ALT.personal)}</div>
          <div class="story-panel" data-step-panel="3">${shot(S.otp, ALT.otp)}</div>
          <div class="story-panel" data-step-panel="4">${shot(S.contacts, ALT.contacts)}</div>
          <div class="story-panel" data-step-panel="5">${uiConnect}</div>` })}
      </div>
    </div>
  </div>
</section>

<!-- 6. FACTS STRIP -->
<section class="facts" aria-label="VerifyU at a glance">
  <div class="container">
    <ul class="facts-grid" data-stagger>
      <li><b>1</b><span>registered face</span></li>
      <li><b>2</b><span>emergency contacts</span></li>
      <li><b>5</b><span>SOS emergency types</span></li>
      <li><b>10k</b><span>steps = 5 VerifyU Coins</span></li>
      <li><b>₹0</b><span>to register</span></li>
    </ul>
  </div>
</section>

<!-- 7. REGISTER IN MINUTES (video) -->
<section class="section is-cloud register" aria-labelledby="reg-h">
  <div class="container split">
    <div class="col-5" data-reveal="scale">
      <div class="reg-media">
        <div class="video-wrap" data-video-wrap>
          <video data-video src="/videos/verifyu-registration.mp4" poster="/images/verifyu-registration-poster.jpg" playsinline preload="none" controls width="478" height="850"></video>
          <button class="play-btn" data-video-play type="button" aria-label="Play the 1-minute registration guide"><span>${icons.play}</span></button>
        </div>
        <div class="small center mt-2">1-minute registration guide</div>
      </div>
    </div>
    <div class="col-7">
      ${sectionHead({ eyebrow: 'Register in minutes', title: 'Three steps. Then it’s done.' })}
      <ol class="steps3" data-stagger>
        <li><span class="num">01</span><div><h3 class="h4">Add your details</h3><p class="body">Verify your number, add a clear photo.</p></div></li>
        <li><span class="num">02</span><div><h3 class="h4">Add emergency contacts</h3><p class="body">Two people you trust.</p></div></li>
        <li><span class="num">03</span><div><h3 class="h4">Complete face verification</h3><p class="body">Look into the camera. Done.</p></div></li>
      </ol>
      <div class="row mt-4"><a class="btn btn-primary" href="${SITE.play}" target="_blank" rel="noopener">Get VerifyU — it’s free ${icons.arrow}</a><a class="link" href="/how-it-works">Full walkthrough ${icons.arrow}</a></div>
    </div>
  </div>
</section>

<!-- 8. CORE SAFETY -->
<section class="safety-rail" data-rail-story aria-labelledby="safety-h">
  <div class="safety-sticky">
    <div class="container safety-head">
      <div>${sectionHead({ eyebrow: 'Core safety', title: 'One profile.<br>Multiple layers of protection.' })}</div>
      ${railNav('safety')}
    </div>
    <div class="rail safety-cards" data-rail="safety" aria-label="Safety features">
      ${SAFETY.map((s, i) => `<a class="safety-card ${s.sos ? 'is-sos' : ''}" href="/safety"><div class="safety-shot"><img src="${s.img}" alt="${s.alt}" width="722" height="1600" loading="lazy" style="object-position:${s.pos}"></div><div class="safety-body"><span class="num">0${i + 1}</span><h3 class="h3">${s.t}</h3><p class="body">${s.b}</p></div></a>`).join('')}
    </div>
  </div>
</section>

<!-- 10. WHY DIFFERENT -->
<section class="section is-cloud why" aria-labelledby="why-h">
  <div class="container split">
    <div class="col-6">
      ${sectionHead({ eyebrow: 'Why VerifyU is different', title: 'Your identity shouldn’t depend on what’s in your pocket.', lead: 'Wallets, cards and phones get lost or left behind. Your face doesn’t — and your emergency information stays connected to it.' })}
      <div class="row"><a class="link" href="/safety">How identification works ${icons.arrow}</a></div>
    </div>
    <div class="col-6" data-reveal="scale">
      <div class="why-visual">
        <div class="why-card why-card-1"><span class="pill is-ink">ID card</span><span class="why-x">Left at home</span></div>
        <div class="why-card why-card-2"><span class="pill is-ink">Phone</span><span class="why-x">Locked · 3% battery</span></div>
        <div class="why-card why-card-3 is-face"><div class="ui-avatar"><img src="/images/app/demo-avatar.jpg" alt="" loading="lazy" width="120" height="150"></div><div><b>Your face</b><span class="pill is-teal">${icons.check} Always with you</span></div></div>
      </div>
    </div>
  </div>
</section>

<!-- 11. REWARDS -->
<section class="section rewards-intro" aria-labelledby="rew-h">
  <div class="container">
    ${sectionHead({ eyebrow: 'Daily engagement', title: 'Built for emergencies.<br>Useful every day.', lead: 'A reason to open VerifyU on ordinary days keeps your profile current for the day it matters.' })}
    <div class="rew-grid">
      <div class="rew-step" data-reveal>
        <span class="num">Walk</span>
        <div class="rew-phone">${device({ src: S.steps, alt: ALT.steps, cls: 'is-sm is-flat' })}</div>
        <p class="body"><b class="tnum" data-count="10000" data-dur="1800">0</b> steps a day with the Steps tracker.</p>
      </div>
      <div class="rew-step" data-reveal>
        <span class="num">Earn</span>
        <div class="rew-coin"><span class="coin" id="coins-chip"><i></i>+5 VerifyU Coins</span></div>
        <p class="body">Every eligible day at the goal.<sup><a href="/legal/rewards-terms" aria-label="Rewards terms apply">ⓘ</a></sup></p>
      </div>
      <div class="rew-step" data-reveal>
        <span class="num">Use</span>
        <div class="rew-phone">${device({ src: S.recharge, alt: ALT.recharge, cls: 'is-sm is-flat' })}</div>
        <p class="body">Mobile recharge, DTH and electricity.</p>
      </div>
    </div>
    <div class="row mt-5"><a class="btn btn-ink" href="/rewards">Explore VerifyU Rewards ${icons.arrow}</a><span class="small">Terms apply. Coins have no cash value.</span></div>
  </div>
</section>

<!-- 12. ORGANISATIONS -->
<section class="section is-dark on-dark orgs" aria-labelledby="orgs-h" data-tracks>
  <div class="glow is-purple" style="width:600px;height:600px;left:-200px;bottom:-200px;opacity:.35"></div>
  <div class="container">
    ${sectionHead({ eyebrow: 'For organisations', title: 'One safety layer.<br>Many communities.' })}
    <div class="orgs-grid">
      <div class="orgs-list" role="tablist" aria-label="Organisation types">
        ${ORGS.map((o, i) => `<button class="orgs-btn" role="tab" data-track="${o.k}" aria-selected="${i === 0}"><span class="icon">${icons[o.icon]}</span><span>${o.t}</span>${icons.chevronR}</button>`).join('')}
      </div>
      <div class="orgs-panel">
        ${ORGS.map((o) => `<div class="orgs-detail" data-track-panel="${o.k}" hidden>
          <h3 class="h3">${o.t}</h3>
          <p class="lead">${o.b}</p>
          <ol class="flow">${o.flow.map(f => `<li>${f}</li>`).join('')}</ol>
          <div class="row mt-4"><a class="btn btn-white" href="${o.cta.h}">${o.cta.t} ${icons.arrow}</a></div>
        </div>`).join('')}
      </div>
    </div>
    <div class="row mt-5"><a class="btn btn-ghost" href="/organisations">Explore VerifyU for organisations</a><a class="btn btn-primary" href="/organisations#pilot">Request a pilot ${icons.arrow}</a></div>
  </div>
</section>

<!-- 13. LEADERSHIP -->
<section class="section is-cloud leaders" aria-labelledby="lead-h">
  <div class="container">
    <div class="leaders-head">
      ${sectionHead({ eyebrow: 'Leadership', title: 'From safety at sea to safety on land.' })}
      <a class="btn btn-ghost leaders-cta" href="/about#team">Meet the VerifyU team ${icons.arrow}</a>
    </div>
  </div>
  <div class="marquee team-marquee" style="--marquee-dur:${Math.max(4, LEADERS.length) * 7}s" data-reveal="fade" aria-label="VerifyU leadership team">
    <div class="marquee-track">
      ${LEADERS.map(l => `<article class="leader"><div class="photo is-4x5"><img src="${esc(l.photo || '/images/verifyu-logo.png')}" alt="Portrait of ${esc(l.name)}" width="800" height="1000" loading="lazy" draggable="false"></div><h3 class="h4 mt-3">${esc(l.name)}</h3><div class="meta">${esc(l.role || '')}</div><p class="small mt-1">${esc(l.summary || '')}</p></article>`).join('')}
    </div>
  </div>
</section>

<!-- 14. TRUST -->
<section class="section trust" aria-labelledby="trust-h">
  <div class="container">
    ${sectionHead({ eyebrow: 'Trust', title: 'Your identity deserves serious protection.', center: true })}
    <div class="trust-flow" data-reveal="scale" role="img" aria-label="How access to a profile works: registered face, authorised scan, emergency-relevant information, OTP from an emergency contact for medical records, access logged and the user notified">
      <div class="tf-node"><div class="icon">${icons.face}</div><b>Registered face</b><span>You register. You choose what goes in.</span></div>
      <div class="tf-arrow"></div>
      <div class="tf-node"><div class="icon is-blue">${icons.scan}</div><b>Authorised scan</b><span>Only VerifyU users with scanning access.</span></div>
      <div class="tf-arrow"></div>
      <div class="tf-node"><div class="icon is-teal">${icons.user}</div><b>Emergency-relevant first</b><span>Identity, blood group, contacts.</span></div>
      <div class="tf-arrow"></div>
      <div class="tf-node"><div class="icon is-sos">${icons.lock}</div><b>Medical behind OTP</b><span>Unlocked by an emergency contact.</span></div>
      <div class="tf-arrow"></div>
      <div class="tf-node"><div class="icon">${icons.bell}</div><b>Logged &amp; notified</b><span>You’re alerted when your profile is accessed.</span></div>
    </div>
    <div class="row mt-5" style="justify-content:center"><a class="btn btn-ink" href="/trust">Visit the Trust Centre ${icons.arrow}</a></div>
  </div>
</section>

${finalCta()}
`;

export default {
  path: '/', nav: '/', title: 'VerifyU — Identity when it matters most',
  description: 'VerifyU is an emergency identity and safety platform: when a registered person can’t communicate, their face can connect them to their identity, emergency information and trusted people.',
  body, priority: 1,
  jsonld: [ORG_LD, APP_LD],
};
