import { SITE, icons, note, flag, sectionHead, pageHero, ctaBand, breadcrumbLd, ORG_LD } from '../lib.mjs';

const LINKS = {
  startuppedia: 'https://startuppedia.in/tech-innovation/verifyu-was-founded-by-captain-saurabh-saraswat-a-former-merchant-navy-captain-from-lucknow-11821665',
  siliconindia: 'https://www.siliconindia.com/news/general/how-capt-saurabh-saraswat-is-addressing-indias-emergency-identification-gap-with-verifyu-nid-241681-cid-1.html',
  tribune: 'https://www.tribuneindia.com/news/business/verifyu-app-emerges-as-a-digital-safety-net-for-indian-families/',
  theprint: 'https://theprint.in/ani-press-releases/verifyu-app-emerges-as-a-digital-safety-net-for-indian-families/2703120/',
  site: 'https://verifyu.in/',
};

const COVERAGE = [
  {
    outlet: 'Startup Pedia', date: '11 May 2026', kind: 'Founder interview',
    head: 'After 16 years at sea, this captain built VerifyU, a safety app that could recognise you in a crisis',
    sum: 'The founder’s account of leaving the Merchant Navy and building an identification tool for emergencies on land.',
    href: LINKS.startuppedia,
  },
  {
    outlet: 'SiliconIndia', date: '', kind: 'Feature',
    head: 'How Capt. Saurabh Saraswat Is Addressing India’s Emergency Identification Gap with VerifyU',
    sum: 'A look at the gap VerifyU is built around: the people who cannot be identified or connected to their families when it matters.',
    href: LINKS.siliconindia,
  },
  {
    outlet: 'The Tribune', date: '26 July 2025', kind: 'ANI release',
    head: 'VerifyU App Emerges as a Digital Safety Net for Indian Families',
    sum: 'The release that introduced VerifyU publicly, describing face-based identification, emergency contacts and medical information.',
    href: LINKS.tribune,
  },
  {
    outlet: 'ThePrint', date: '26 July 2025', kind: 'ANI release',
    head: 'VerifyU App Emerges as a Digital Safety Net for Indian Families',
    sum: 'The same ANI release, carried in ThePrint’s press-release section.',
    href: LINKS.theprint,
  },
];

const SWATCHES = [
  { n: 'Purple', v: '#632899' },
  { n: 'Violet', v: '#9A4DD9' },
  { n: 'Safety Blue', v: '#3AA9DC' },
  { n: 'Trust Teal', v: '#01C4A2' },
];


const body = `
${pageHero({
  eyebrow: 'Press & Impact',
  title: 'The VerifyU story,<br>as others have told it.',
  lead: 'Coverage, recognition, community drives and a media kit — everything a journalist, partner or volunteer needs, with a link to the original source for each claim.',
  ctas: `<a class="btn btn-primary btn-lg" href="#featured">Featured coverage ${icons.arrow}</a><a class="btn btn-ghost btn-lg" href="#media-kit">Media kit</a>`,
})}

<!-- MARQUEE -->
<section class="press-strip pr-strip" aria-label="Outlets that have covered VerifyU">
  <div class="container press-strip-head"><span class="meta">Where VerifyU has appeared</span><a class="link" href="#featured">Read at source ${icons.arrow}</a></div>
  <div class="marquee" style="--marquee-dur:38s">
    <div class="marquee-track">
      <a class="press-item" href="${LINKS.startuppedia}" target="_blank" rel="noopener">Startup Pedia</a><span class="press-item"><span class="dot"></span></span>
      <a class="press-item" href="${LINKS.siliconindia}" target="_blank" rel="noopener">SiliconIndia</a><span class="press-item"><span class="dot"></span></span>
      <a class="press-item" href="${LINKS.tribune}" target="_blank" rel="noopener">The Tribune</a><span class="press-item"><span class="dot"></span></span>
      <a class="press-item" href="${LINKS.theprint}" target="_blank" rel="noopener">ThePrint</a><span class="press-item"><span class="dot"></span></span>
      <a class="press-item" href="${LINKS.theprint}" target="_blank" rel="noopener">ANI</a><span class="press-item"><span class="dot"></span></span>
    </div>
  </div>
</section>

<!-- FEATURED COVERAGE -->
<section class="section" id="featured">
  <div class="container">
    ${sectionHead({ eyebrow: 'Featured coverage', title: 'Read it at the source.', lead: 'Every story below links to the publication that ran it. We do not republish full articles here.' })}
    <div class="pr-list" data-stagger>
      ${COVERAGE.map(c => `<article class="press-card">
        <div>
          <div class="press-outlet">${c.outlet}</div>
          <div class="meta mt-1">${c.kind}${c.date ? ` · ${c.date}` : ''}</div>
        </div>
        <div>
          <h3 class="h4">${c.head}</h3>
          <p class="body">${c.sum}</p>
          <a class="link mt-2" href="${c.href}" target="_blank" rel="noopener">Read at source ${icons.arrowUpRight}</a>
        </div>
      </article>`).join('')}
    </div>
    ${note('Dates and headlines are taken from the published articles. SiliconIndia does not display a publication date on the page, so none is shown.')}
    ${note(`verifyu.in also lists a “Google Play App for Good” recognition. We have not been able to confirm it against a Google source, so no badge is shown here until it is confirmed. ${flag()} No other awards, certifications or rankings are claimed.`)}
  </div>
</section>

<!-- COMMUNITY -->
<section class="section" id="community">
  <div class="container">
    ${sectionHead({ eyebrow: 'Community', title: 'Where VerifyU has met people in person.', lead: 'Registration is easier when someone is standing next to you. These are the community activities described on verifyu.in.' })}
    <div class="grid grid-2" data-stagger>
      <article class="card is-xl is-static pr-comm">
        <div class="icon is-teal">${icons.fitness}</div>
        <h3 class="h3">Lucknow running communities</h3>
        <p class="body mt-2">Runners in Lucknow were introduced to VerifyU registration and to what emergency identity means for someone training alone, early in the morning, often without a phone or ID on them.</p>
        <p class="small mt-3">As described on <a class="link" href="${LINKS.site}" target="_blank" rel="noopener">verifyu.in</a></p>
      </article>
      <article class="card is-xl is-static pr-comm">
        <div class="icon is-blue">${icons.senior}</div>
        <h3 class="h3">Mysuru Strollathon</h3>
        <p class="body mt-2">At the Strollathon organised by Vayah Vikas, senior participants were helped with registration — profiles, emergency contacts and medical information set up with assistance rather than left as homework.</p>
        <p class="small mt-3">As described on <a class="link" href="${LINKS.site}" target="_blank" rel="noopener">verifyu.in</a></p>
      </article>
    </div>
    <figure class="band mt-5" data-reveal="scale">
      <img src="/images/volunteer-community.jpg" alt="Three young volunteers outdoors looking at a phone together" width="1400" height="933" loading="lazy">
      <figcaption class="band-copy">
        <h3 class="h3">Safety Champions do this work locally.</h3>
        <p class="body mt-2" style="color:rgba(255,255,255,.8)">Volunteers run drives, help people finish registration and explain what happens in an emergency.</p>
      </figcaption>
    </figure>
  </div>
</section>

<!-- MEDIA KIT -->
<section class="section is-cloud" id="media-kit">
  <div class="container">
    ${sectionHead({ eyebrow: 'Media kit', title: 'Logo, colours, screenshots and boilerplate.', lead: 'Please use the assets below as they are. Do not recolour the logo, stretch it or place it on a busy background.' })}
    <div class="pr-kit">
      <div class="card is-xl is-static pr-logo" data-reveal>
        <div class="meta">Logo</div>
        <div class="pr-logo-box"><img src="/images/verifyu-logo.png" alt="VerifyU logo" width="120" height="120"></div>
        <a class="btn btn-ink btn-sm" href="/images/verifyu-logo.png" download>Download PNG ${icons.arrow}</a>
      </div>
      <div class="card is-xl is-static" data-reveal>
        <div class="meta">Brand colours</div>
        <ul class="pr-swatches mt-3">
          ${SWATCHES.map(s => `<li><span class="pr-chip" style="background:${s.v}"></span><b>${s.n}</b><code>${s.v}</code></li>`).join('')}
        </ul>
        <p class="small mt-3">Red is reserved for SOS and emergency elements only.</p>
      </div>
      <div class="card is-xl is-static pr-shots" data-reveal>
        <div class="meta">Approved product screenshots</div>
        <div class="pr-shot-grid mt-3">
          <figure><img src="/images/app/home-dashboard.webp" alt="VerifyU identity dashboard screen with a demo profile" width="722" height="1600" loading="lazy"><figcaption class="small">Identity dashboard · demo data</figcaption></figure>
          <figure><img src="/images/app/recharge.webp" alt="VerifyU Recharge and Utilities screen with a Use Coins toggle" width="722" height="1600" loading="lazy"><figcaption class="small">Recharge &amp; Utilities · demo data</figcaption></figure>
        </div>
        <p class="small mt-3">Every name, number and figure in these screens is demo data, not a real user. Please credit “VerifyU” and do not add UI elements or numbers that are not in the screen.</p>
      </div>
    </div>
    <div class="grid grid-2 mt-4" data-stagger>
      <div class="card is-xl is-static">
        <div class="meta">Boilerplate</div>
        <p class="body mt-2">VerifyU is an emergency identity and safety connection platform by ${SITE.entity} When a registered person is unable to communicate, VerifyU can help connect their face to their identity information, emergency information and the people they trust, through the appropriate VerifyU access flow. Registration is free on Android and iPhone in India, with optional Premium features. VerifyU supports identification and communication; it does not replace emergency services.</p>
      </div>
      <div class="card is-xl is-static">
        <div class="meta">Founder bio</div>
        <p class="body mt-2">Capt. Saurabh Saraswat is the founder of VerifyU. A Master Mariner from Lucknow, he spent sixteen years in the Merchant Navy between 1998 and 2014 and became a captain at 31. The discipline he brought ashore is simple: identification, medical information and reachable next of kin should be prepared before an emergency, not assembled during one.</p>
        <p class="small mt-3">Portrait available on request. Please use the spelling “Capt. Saurabh Saraswat”.</p>
      </div>
    </div>
  </div>
</section>

<!-- PRESS CONTACT -->
<section class="section" id="press-contact">
  <div class="container">
    ${sectionHead({ eyebrow: 'Press contact', title: 'Talk to a human.', lead: 'Interviews, product questions, fact-checks and asset requests — we would rather you ask than guess.' })}
    <div class="grid grid-2" data-stagger>
      <div class="card is-xl is-static contact-card">
        <div class="icon">${icons.mail}</div>
        <h3 class="h4">Media enquiries</h3>
        <a class="big" href="mailto:${SITE.email}?subject=VerifyU%20media%20enquiry">${SITE.email}</a>
        <p class="small">Subject line “VerifyU media enquiry” reaches the right person fastest.</p>
      </div>
      <div class="card is-xl is-static contact-card">
        <div class="icon is-teal">${icons.chat}</div>
        <h3 class="h4">WhatsApp</h3>
        <a class="big" href="${SITE.whatsappHref}" target="_blank" rel="noopener">${SITE.whatsapp}</a>
        <p class="small">For quick fact-checks and deadline questions.</p>
      </div>
    </div>
    ${note(`Fact-checking a claim about VerifyU? Send it to us before publication. We will confirm, correct or tell you plainly that we cannot verify it.`)}
  </div>
</section>

${ctaBand({
  title: 'Have a story to tell?',
  copy: 'Journalists, community organisers and partners — we are glad to talk.',
  primary: { t: 'Contact the team', h: `mailto:${SITE.email}?subject=VerifyU%20media%20enquiry`, ext: false },
  secondary: { t: 'Become a Safety Champion', h: '/safety-champions' },
})}
`;

const css = `
.pr-strip{padding-top:0}
.pr-list{margin-top:8px}
.press-card .meta{color:var(--purple)}
.press-card .body{font-size:15.5px;margin-top:6px}
.pr-rec{display:grid;grid-template-columns:48px minmax(0,1fr);gap:24px;align-items:start;background:#fff}
.pr-rec .icon{margin:0}
.pr-rec .h4{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.pr-comm .h3{font-size:clamp(21px,2vw,26px);margin-top:4px}
.pr-comm a{text-decoration:underline;text-underline-offset:3px}
.pr-steps{display:flex;flex-direction:column;gap:0;counter-reset:pr}
.pr-steps li{display:grid;grid-template-columns:56px minmax(0,1fr);gap:20px;padding:22px 0;border-top:1px solid var(--line)}
.pr-steps li:last-child{border-bottom:1px solid var(--line)}
.pr-steps .num{color:var(--purple);padding-top:4px}
.pr-steps .h4{margin-bottom:4px}
.pr-timeline a{color:var(--purple);text-decoration:underline;text-underline-offset:3px}
.pr-timeline .tl-item .num{font-size:12px;letter-spacing:.02em}
.pr-kit{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(20px,2.4vw,32px);align-items:start}
.pr-logo{display:flex;flex-direction:column;gap:16px;align-items:flex-start}
.pr-logo-box{width:100%;display:flex;align-items:center;justify-content:center;padding:28px;border-radius:var(--r-lg);background:var(--cloud)}
.pr-logo-box img{width:96px;height:96px}
.pr-swatches{display:flex;flex-direction:column;gap:12px}
.pr-swatches li{display:grid;grid-template-columns:36px minmax(0,1fr) auto;gap:12px;align-items:center;font-size:14.5px}
.pr-chip{width:36px;height:36px;border-radius:12px;border:1px solid rgba(22,20,28,.08)}
.pr-swatches b{font-weight:600}
.pr-swatches code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:13px;color:var(--ink-3)}
.pr-shot-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.pr-shot-grid img{width:100%;border-radius:14px;border:1px solid var(--line);background:var(--cloud)}
.pr-shot-grid figcaption{margin-top:8px}
.pr-contact-note{margin-top:28px}
@media (max-width:1024px){.pr-kit{grid-template-columns:1fr 1fr}.pr-shots{grid-column:1 / -1}}
@media (max-width:640px){
  .pr-kit{grid-template-columns:1fr}
  .pr-rec{grid-template-columns:1fr;gap:16px}
  .pr-steps li{grid-template-columns:44px minmax(0,1fr);gap:14px}
}
`;

export default {
  path: '/press',
  nav: '',
  title: 'Press & Impact',
  description: 'VerifyU in the press: founder interviews, the ANI release, community registration drives, verified milestones, a downloadable media kit and press contacts.',
  body,
  css,
  priority: 0.7,
  jsonld: [breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Press & Impact', path: '/press' }]), ORG_LD],
};
