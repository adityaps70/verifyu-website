import { SITE, icons, note, flag, sectionHead, finalCta, breadcrumbLd, ORG_LD, esc } from '../lib.mjs';
import { team, advisory } from '../content.mjs';

const LEADERS = team();   // edited in the admin panel (content/team.json)
const ADVISORS = advisory();

const ext = (h, t) => `<a class="ab-ext" href="${h}" target="_blank" rel="noopener">${t}</a>`;
const TIMELINE = [
  { t: 'July 2025', h: 'VerifyU is introduced publicly', b: `An ANI release, carried by ${ext('https://www.tribuneindia.com/news/business/verifyu-app-emerges-as-a-digital-safety-net-for-indian-families/', 'The Tribune')} and ${ext('https://theprint.in/ani-press-releases/verifyu-app-emerges-as-a-digital-safety-net-for-indian-families/2703120/', 'ThePrint')}, presents VerifyU as a digital safety net for Indian families.` },
  { t: 'May 2026', h: 'The founder’s story is published', b: `Startup Pedia interviews Capt. Saurabh Saraswat about the identification gap he set out to close — ${ext('https://startuppedia.in/tech-innovation/verifyu-was-founded-by-captain-saurabh-saraswat-a-former-merchant-navy-captain-from-lucknow-11821665', 'read the interview')}.` },
  { t: '2026', h: 'Registration drives in the community', b: `Running communities in Lucknow are introduced to emergency identity, and senior participants are registered at the Mysuru Strollathon organised by Vayah Vikas — as described on ${ext('https://verifyu.in/', 'verifyu.in')}.` },
  { t: '2026', h: 'The app keeps changing', b: `Recent updates listed on Google Play include Hindi language support, a redesigned medical-information experience and a revamped interface.` },
];

const ROUTINE = [
  { i: 'user', h: 'Identification', b: 'Every person on board is documented and accounted for.' },
  { i: 'medical', h: 'Medical fitness', b: 'Health information is recorded before it is ever needed.', cls: 'is-teal' },
  { i: 'shield', h: 'Emergency preparedness', b: 'Drills are repeated so the response is already known.', cls: 'is-blue' },
  { i: 'users', h: 'Reachable next of kin', b: 'The people to inform are listed in advance, with numbers that work.' },
];

const PRINCIPLES = [
  { n: '01', i: 'check', h: 'Consent first', b: 'Nothing works unless a person has registered and set up their own profile. There is no scanning of people who never opted in.' },
  { n: '02', i: 'shield', h: 'Emergency purpose', b: 'The point is identification and connection in a crisis — not surveillance, and not public search.', cls: 'is-teal' },
  { n: '03', i: 'users', h: 'A person on the other side', b: 'A match is only useful if it reaches a human being who can act — a helper, a responder, a family member.', cls: 'is-blue' },
];

const VALUES = [
  { i: 'users', h: 'People at the centre', b: 'Every decision starts with the person in the emergency and the family waiting for news — not with the technology.' },
  { i: 'eye', h: 'Clarity in the experience', b: 'Registration you can finish in one sitting. Plain language about what is stored, what is shown and who can see it.', cls: 'is-blue' },
  { i: 'heart', h: 'Useful beyond one moment', b: 'Steps, rewards and everyday utilities give people a reason to keep their profile current for the day it matters.', cls: 'is-teal' },
];

const AIMS = [
  { n: '01', h: 'More registered families', b: 'Reach the people most likely to need it — older parents, children, and anyone who travels or lives alone.' },
  { n: '02', h: 'Institutional programmes', b: `Work with hospitals, campuses, communities and public-safety teams on programmes built around consented, registered identities. ${flag()}` },
  { n: '03', h: 'Safety Champions in more cities', b: 'Volunteers who run registration drives and awareness sessions locally, so the network grows through people rather than advertising.' },
];

const body = `
<!-- 1. HERO (editorial) -->
<section class="page-hero ab-hero" aria-labelledby="page-h">
  <div class="container">
    <div class="ab-hero-top">
      <div class="mask-group">
        <div class="eyebrow" data-reveal="fade">About VerifyU</div>
        <h1 class="display ab-title" id="page-h"><span class="mask"><span>From safety <em>at sea</em></span></span><span class="mask"><span>to safety on land.</span></span></h1>
      </div>
      <div class="ab-hero-aside" data-reveal>
        <p class="lead">VerifyU was founded by Capt. Saurabh Saraswat, a Master Mariner from Lucknow who spent sixteen years in the Merchant Navy and became a captain at 31. He brought one habit ashore: know who a person is, and know who to call.</p>
        <div class="row"><a class="btn btn-primary" href="#story">Read the story ${icons.arrow}</a><a class="btn btn-ghost" href="#team">Meet the team</a></div>
      </div>
    </div>
    <figure class="ab-hero-media" data-reveal="scale">
      <img src="/images/about-hero-sea.jpg" alt="A cargo ship on the horizon at sunset" width="2000" height="900" fetchpriority="high">
      <figcaption class="ab-chip"><span class="dot"></span><span><b>Sixteen years at sea</b>Merchant Navy, 1998–2014</span></figcaption>
    </figure>
  </div>
</section>

<!-- 2. AT A GLANCE -->
<div class="facts ab-facts" aria-label="VerifyU at a glance">
  <div class="container">
    <ul class="facts-grid ab-facts-grid" data-stagger>
      <li><b>16</b><span>years at sea</span></li>
      <li><b>31</b><span>a captain at</span></li>
      <li><b>6</b><span>on the leadership team</span></li>
      <li><b>2</b><span>platforms: Android &amp; iPhone</span></li>
      <li><b>2</b><span>languages: English &amp; Hindi</span></li>
      <li><b>₹0</b><span>to register</span></li>
    </ul>
  </div>
</div>

<!-- 3. THE FOUNDER'S STORY -->
<section class="section ab-story" id="story">
  <div class="container ab-story-grid">
    <div class="ab-story-media">
      <figure class="photo is-4x5 ab-portrait" data-reveal="scale">
        <img src="/images/team/saurabh-saraswat.jpg" alt="Portrait of Capt. Saurabh Saraswat" width="800" height="1000" loading="lazy">
        <figcaption class="cap"><b>Capt. Saurabh Saraswat</b> · Founder, Master Mariner</figcaption>
      </figure>
    </div>
    <div class="ab-story-copy">
      ${sectionHead({ eyebrow: 'The founder', title: 'At sea, being known is part of the safety routine.', lead: 'On a merchant ship, safety is not a feeling. It is paperwork, drills and lists that are kept current because nobody can improvise them in the middle of the night.' })}
      <p class="body" data-reveal>Every person on board is documented before the ship sails: who they are, their medical fitness, and who should be informed if something happens to them. Emergency procedures are rehearsed until they stop needing thought. When an incident occurs, the crew is not searching for a name or a phone number — those answers are already in place.</p>
      <p class="body mt-3" data-reveal>Sixteen years of that discipline is what Capt. Saraswat brought to VerifyU. Not the technology — the expectation that identification and next of kin are prepared in advance, not assembled in a crisis.</p>
      <ol class="ab-routine" data-stagger>
        ${ROUTINE.map((r, i) => `<li><span class="icon ${r.cls || ''}">${icons[r.i]}</span><div><span class="ab-num">0${i + 1}</span><b>${r.h}</b><p>${r.b}</p></div></li>`).join('')}
      </ol>
    </div>
  </div>
</section>

<!-- 4. SEA vs LAND -->
<section class="section is-cloud ab-contrast" aria-labelledby="gap-h">
  <div class="container">
    ${sectionHead({ eyebrow: 'The information gap', title: 'On land, the same person is a stranger.', lead: 'Step off a ship and that preparation disappears. In a public emergency, the people trying to help usually know nothing about the person in front of them.' })}
    <div class="ab-scenes" data-stagger>
      <figure class="ab-scene">
        <img src="/images/about-at-sea.jpg" alt="A container ship at sea with mountains behind" width="1200" height="900" loading="lazy">
        <figcaption><span class="pill is-ghost">At sea</span><h3>A name, a medical record and a next-of-kin contact exist for every person before anything goes wrong.</h3><p>Helping someone starts with information.</p></figcaption>
      </figure>
      <figure class="ab-scene">
        <img src="/images/about-on-land.jpg" alt="A busy market street in India at dusk" width="1200" height="900" loading="lazy">
        <figcaption><span class="pill is-ghost">On land</span><h3>A bystander, a first responder or a hospital desk begins with pockets, a locked phone and guesswork.</h3><p>Helping someone starts with a search.</p></figcaption>
      </figure>
    </div>
    <p class="ab-statement" data-reveal>A wallet can be left at home. A phone can be locked or out of battery. A card proves a number, not a person — <em>and none of it speaks when the person cannot.</em></p>
  </div>
</section>

<!-- 5. THE QUESTION -->
<section class="section is-dark on-dark ab-question" aria-labelledby="q-h">
  <div class="glow is-purple" style="width:620px;height:620px;left:-180px;top:-160px;opacity:.4"></div>
  <div class="glow is-blue" style="width:520px;height:520px;right:-160px;bottom:-200px;opacity:.3"></div>
  <div class="container ab-q-grid" style="position:relative">
    <div>
      <div class="eyebrow" data-reveal="fade">The question</div>
      <h2 class="h1" id="q-h" data-reveal>What happens when someone cannot speak for themselves?</h2>
    </div>
    <div>
      <ol class="ab-q-list" data-stagger>
        <li><span>01</span>They are unconscious after an accident.</li>
        <li><span>02</span>They are in shock, in pain, or in a language nobody around them speaks.</li>
        <li><span>03</span>They are living with memory loss and cannot recall a number.</li>
        <li><span>04</span>They are a child who has been separated from a parent.</li>
      </ol>
      <p class="lead ab-q-lead" data-reveal>In each of those moments the person is still exactly who they were an hour earlier. Only the connection is missing — between them, their information and the people waiting to hear from them.</p>
    </div>
  </div>
</section>

<!-- 6. THE IDEA -->
<section class="section ab-idea" aria-labelledby="idea-h">
  <div class="container">
    <div class="ab-idea-grid">
      <div>
        ${sectionHead({ eyebrow: 'The idea', title: 'Your face is the one ID you always carry.', lead: 'You cannot forget it at home. You cannot lock it. It does not run out of battery. If a person has chosen to register, their face can become the starting point for a connection back to them.' })}
        <p class="body" data-reveal>That question became a product decision: build registration an ordinary family can finish in a few minutes, and make the emergency path as short as possible.</p>
      </div>
      <figure class="photo is-4x5 ab-idea-photo" data-reveal="scale">
        <img src="/images/verifyu-everyday-friends.jpg" alt="Three friends walking together on a city street" width="1040" height="1300" loading="lazy">
        <figcaption class="cap">Ordinary days are when preparation quietly matters.</figcaption>
      </figure>
    </div>
    <div class="ab-principles" data-stagger>
      ${PRINCIPLES.map(p => `<article class="ab-principle"><span class="ab-num">${p.n}</span><div class="icon ${p.cls || ''}">${icons[p.i]}</div><h3 class="h4">${p.h}</h3><p class="body">${p.b}</p></article>`).join('')}
    </div>
  </div>
</section>

<!-- 7. MISSION + VALUES -->
<section class="section is-cloud ab-mission-sec" aria-labelledby="mission-h">
  <div class="container">
    <div class="ab-mission" data-reveal="scale">
      <div class="glow is-blue" style="width:520px;height:520px;right:-140px;top:-200px;opacity:.5"></div>
      <div class="eyebrow">Our mission</div>
      <h2 class="h1" id="mission-h">Help people be known — and connected to those who care.</h2>
      <p class="lead">VerifyU is an emergency identity and safety connection platform. A registered person’s face can help connect them to their identity, their emergency information and the people they trust — through the appropriate VerifyU access flow.</p>
    </div>
    <div class="ab-values" data-stagger>
      ${VALUES.map(v => `<article class="ab-value"><div class="icon ${v.cls || ''}">${icons[v.i]}</div><h3 class="h4">${v.h}</h3><p class="body">${v.b}</p></article>`).join('')}
    </div>
  </div>
</section>

<!-- 8. MILESTONES -->
<section class="section ab-journey" aria-labelledby="ms-h">
  <div class="container">
    <div class="ab-journey-head">
      ${sectionHead({ eyebrow: 'Milestones', title: 'What we can point to.', lead: 'Only what is published and verifiable. Where a date is not confirmed in a public source, we say so instead of filling the gap.' })}
    </div>
    <ol class="ab-tl" data-stagger>
      ${TIMELINE.map(t => `<li class="ab-tl-item"><span class="ab-tl-dot"></span><div class="meta">${t.t}</div><h3 class="h4">${t.h}</h3><p class="small">${t.b}</p></li>`).join('')}
    </ol>
    <div class="ab-journey-note">${note(`Company formation, first release and user milestones are not published here because they are not confirmed in a public source we can cite. When we have figures we can stand behind and attribute, they will appear here. ${flag()}`)}</div>
  </div>
</section>

<!-- 9. TEAM -->
<section class="section is-cloud ab-team" id="team" aria-labelledby="team-h">
  <div class="container">
    <div class="ab-team-head">
      ${sectionHead({ eyebrow: 'Leadership', title: 'The people behind VerifyU.', lead: 'A team drawn from maritime safety, engineering, technology and finance — people used to systems where preparation is the whole job.' })}
    </div>
    <div class="ab-team-grid" data-stagger>
      ${LEADERS.map(l => `<article class="ab-member">
        <div class="ab-member-photo"><img src="${esc(l.photo || '/images/verifyu-logo.png')}" alt="Portrait of ${esc(l.name)}" width="800" height="1000" loading="lazy"></div>
        <h3 class="h4">${esc(l.name)}</h3>
        <div class="meta">${esc(l.role || '')}</div>
        <p class="small">${esc(l.bio || l.summary || '')}</p>
        ${l.linkedin ? `<a class="ab-member-link" href="${esc(l.linkedin)}" target="_blank" rel="noopener" aria-label="${esc(l.name)} on LinkedIn">${icons.linkedin}</a>` : ''}
      </article>`).join('')}
    </div>
  </div>
</section>

${ADVISORS.length ? `<!-- 9b. ADVISORY BOARD -->
<section class="section ab-advisory" id="advisory" aria-labelledby="adv-h">
  <div class="container">
    <div class="ab-team-head">
      ${sectionHead({ eyebrow: 'Advisory board', title: 'The people who advise us.', lead: 'Advisers who lend their experience to VerifyU — in medicine, public safety, technology and community work.' })}
    </div>
    <div class="ab-team-grid ab-adv-grid" data-stagger>
      ${ADVISORS.map(l => `<article class="ab-member">
        <div class="ab-member-photo"><img src="${esc(l.photo || '/images/verifyu-logo.png')}" alt="Portrait of ${esc(l.name)}" width="800" height="1000" loading="lazy"></div>
        <h3 class="h4">${esc(l.name)}</h3>
        <div class="meta">${esc(l.role || '')}${l.affiliation ? ` · ${esc(l.affiliation)}` : ''}</div>
        <p class="small">${esc(l.bio || l.summary || '')}</p>
        ${l.linkedin ? `<a class="ab-member-link" href="${esc(l.linkedin)}" target="_blank" rel="noopener" aria-label="${esc(l.name)} on LinkedIn">${icons.linkedin}</a>` : ''}
      </article>`).join('')}
    </div>
  </div>
</section>` : ''}

<!-- 10. WHERE WE ARE GOING -->
<section class="section ab-aims-sec" aria-labelledby="aims-h">
  <div class="container ab-aims-grid">
    <div>
      ${sectionHead({ eyebrow: 'Where we are going', title: 'Aims, stated plainly.', lead: 'These are intentions, not announcements. Nothing here is a commitment on a date, and none of it is in place until we can show it.' })}
    </div>
    <ol class="ab-aims" data-stagger>
      ${AIMS.map(a => `<li><span class="ab-aim-num">${a.n}</span><div><h3 class="h4">${a.h}</h3><p class="body">${a.b}</p></div></li>`).join('')}
    </ol>
  </div>
</section>

<!-- 11. COMPANY + LINKS -->
<section class="section is-tight is-cloud ab-company-sec" aria-labelledby="co-h">
  <div class="container">
    <div class="ab-company" data-reveal>
      <div class="icon">${icons.building}</div>
      <div>
        <h2 class="h3" id="co-h">A product of ${SITE.entity}</h2>
        <p class="body mt-2">${SITE.entity} builds and operates VerifyU. For company, media or partnership enquiries, write to <a class="ab-ext" href="mailto:${SITE.email}">${SITE.email}</a> or message us on <a class="ab-ext" href="${SITE.whatsappHref}" target="_blank" rel="noopener">WhatsApp at ${SITE.whatsapp}</a>.</p>
      </div>
    </div>
    <div class="grid grid-3 ab-links" data-stagger>
      <a class="card ab-link-card" href="/press"><div class="icon">${icons.doc}</div><h3 class="h4">Press &amp; Impact</h3><p class="body">Coverage, community drives and the media kit.</p><span class="link">Read the stories ${icons.arrow}</span></a>
      <a class="card ab-link-card" href="/safety-champions"><div class="icon is-teal">${icons.handshake}</div><h3 class="h4">Safety Champions</h3><p class="body">Volunteer, run a drive and register your community.</p><span class="link">Get involved ${icons.arrow}</span></a>
      <a class="card ab-link-card" href="/partners"><div class="icon is-blue">${icons.globe}</div><h3 class="h4">Partners</h3><p class="body">Build and grow VerifyU with us across India.</p><span class="link">Explore partnerships ${icons.arrow}</span></a>
    </div>
  </div>
</section>

${finalCta({ headline: 'Register the people you care about.', copy: 'It takes a few minutes and it’s free.' })}
`;

const css = `
/* Hero */
.ab-hero{padding-bottom:0;background:radial-gradient(900px 500px at 80% -10%,#F4ECFB 0%,#fff 60%)}
.ab-hero-top{display:grid;grid-template-columns:minmax(0,8fr) minmax(0,4fr);gap:clamp(24px,4vw,64px);align-items:end}
.ab-title{font-size:clamp(42px,6vw,82px);letter-spacing:-.045em;line-height:.98}
.ab-title em{font-style:normal;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
.ab-hero-aside .lead{margin-top:0;max-width:44ch}
.ab-hero-aside .row{margin-top:24px}
.ab-hero-media{position:relative;margin:clamp(40px,5vw,64px) 0 0;border-radius:var(--r-xl) var(--r-xl) 0 0;overflow:hidden;aspect-ratio:2.2/1;background:var(--ink)}
.ab-hero-media img{width:100%;height:100%;object-fit:cover;object-position:50% 45%;display:block}
.ab-chip{position:absolute;left:clamp(16px,3vw,32px);bottom:clamp(16px,3vw,32px);display:inline-flex;align-items:center;gap:12px;padding:12px 18px 12px 14px;border-radius:16px;background:rgba(255,255,255,.92);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);box-shadow:var(--shadow-2);font-size:13px;color:var(--ink-3)}
.ab-chip .dot{width:10px;height:10px;border-radius:999px;background:var(--teal);box-shadow:0 0 0 4px var(--teal-50);flex:none}
.ab-chip b{display:block;color:var(--ink);font-size:14px}
.ab-facts{border-top:0}
.ab-facts-grid{grid-template-columns:repeat(6,minmax(0,1fr))}
.ab-facts-grid span{max-width:14ch}
.ab-ext{color:var(--purple);font-weight:600;text-decoration:underline;text-underline-offset:3px;text-decoration-thickness:1px}
.ab-num{display:block;font-family:var(--font-mono,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:12px;letter-spacing:.14em;color:var(--purple);margin-bottom:8px}

/* Founder story */
.ab-story-grid{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(32px,6vw,96px);align-items:start}
.ab-story-media{position:sticky;top:calc(var(--nav-h) + 24px)}
.ab-portrait{max-width:460px}
.ab-portrait .cap b{color:#fff}
.ab-story-copy .section-head{margin-bottom:28px}
.ab-routine{margin-top:40px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}
.ab-routine li{display:grid;grid-template-columns:44px minmax(0,1fr);gap:16px;align-items:start;padding:22px;border:1px solid var(--line);border-radius:var(--r-lg);background:#fff}
.ab-routine .icon{width:44px;height:44px;margin:0;border-radius:13px}
.ab-routine .icon svg{width:20px;height:20px}
.ab-routine .ab-num{margin-bottom:4px}
.ab-routine b{display:block;font-family:var(--font-display);font-size:17px;font-weight:600;letter-spacing:-.015em;color:var(--ink)}
.ab-routine p{font-size:14.5px;color:var(--ink-3);margin-top:4px;line-height:1.5}

/* Sea vs land */
.ab-scenes{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(16px,2.4vw,28px)}
.ab-scene{position:relative;margin:0;border-radius:var(--r-xl);overflow:hidden;aspect-ratio:4/3.4;background:var(--ink);color:#fff}
.ab-scene img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform 1.4s var(--ease)}
.ab-scene:hover img{transform:scale(1.04)}
.ab-scene figcaption{position:absolute;inset:auto 0 0 0;padding:clamp(24px,4vw,40px);background:linear-gradient(180deg,rgba(13,11,18,0) 0%,rgba(13,11,18,.55) 35%,rgba(13,11,18,.9) 100%)}
.ab-scene .pill{margin-bottom:14px}
.ab-scene h3{font-family:var(--font-display);font-size:clamp(20px,1.9vw,26px);font-weight:600;letter-spacing:-.025em;line-height:1.2;max-width:24ch}
.ab-scene p{margin-top:10px;font-size:14.5px;color:rgba(255,255,255,.7)}
.ab-statement{margin:clamp(40px,6vw,72px) auto 0;max-width:30ch;text-align:center;font-family:var(--font-display);font-size:clamp(24px,3vw,40px);font-weight:600;letter-spacing:-.03em;line-height:1.15;color:var(--ink)}
.ab-statement em{font-style:normal;color:var(--purple)}

/* The question */
.ab-question{position:relative;overflow:hidden}
.ab-q-grid{display:grid;grid-template-columns:minmax(0,6fr) minmax(0,6fr);gap:clamp(32px,6vw,96px);align-items:start}
.ab-question .h1{max-width:14ch}
.ab-q-list{display:flex;flex-direction:column;border-top:1px solid rgba(255,255,255,.14)}
.ab-q-list li{display:grid;grid-template-columns:40px minmax(0,1fr);gap:16px;align-items:baseline;padding:20px 0;border-bottom:1px solid rgba(255,255,255,.14);font-family:var(--font-display);font-size:clamp(19px,1.9vw,24px);font-weight:600;letter-spacing:-.02em;line-height:1.25;color:rgba(255,255,255,.88)}
.ab-q-list li span{font-family:var(--font-mono,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:12px;letter-spacing:.14em;color:var(--teal);font-weight:500}
.ab-q-lead{margin-top:28px;color:rgba(255,255,255,.7)}

/* The idea */
.ab-idea-grid{display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:clamp(32px,5vw,80px);align-items:center}
.ab-idea-grid .h2{max-width:16ch}
.ab-idea-photo{max-width:400px;margin-left:auto}
.ab-principles{margin-top:clamp(40px,5vw,64px);display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0;border:1px solid var(--line);border-radius:var(--r-xl);overflow:hidden;background:#fff}
.ab-principle{padding:clamp(24px,3vw,36px);border-right:1px solid var(--line)}
.ab-principle:last-child{border-right:0}
.ab-principle .icon{margin-bottom:18px}
.ab-principle .h4{margin-bottom:8px}
.ab-principle .body{font-size:15.5px}

/* Mission + values */
.ab-mission{position:relative;overflow:hidden;padding:clamp(40px,6vw,80px);border-radius:var(--r-xl);background:var(--purple-900);color:#fff;background-image:radial-gradient(800px 400px at 0% 100%,rgba(154,77,217,.55),transparent 60%)}
.ab-mission .eyebrow{color:#C9A6F2}
.ab-mission .h1{max-width:16ch;position:relative}
.ab-mission .lead{margin-top:24px;color:rgba(255,255,255,.78);max-width:56ch;position:relative}
.ab-values{margin-top:clamp(24px,3vw,32px);display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(16px,2.4vw,28px)}
.ab-value{padding:clamp(24px,3vw,32px);border-radius:var(--r-lg);background:#fff;border:1px solid var(--line)}
.ab-value .h4{margin-bottom:8px}
.ab-value .body{font-size:15.5px}

/* Milestones (horizontal timeline) */
.ab-journey-head .section-head{margin-bottom:clamp(32px,4vw,56px)}
.ab-tl{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:clamp(20px,3vw,40px);position:relative;padding-top:28px}
.ab-tl::before{content:"";position:absolute;left:0;right:0;top:7px;height:2px;background:var(--line)}
.ab-tl-item{position:relative}
.ab-tl-dot{position:absolute;left:0;top:-28px;width:16px;height:16px;border-radius:999px;background:#fff;border:3px solid var(--purple);box-shadow:0 0 0 4px #fff}
.ab-tl-item:first-child .ab-tl-dot{background:var(--purple)}
.ab-tl-item .meta{color:var(--purple)}
.ab-tl-item .h4{margin:10px 0 8px;font-size:19px}
.ab-tl-item .small{line-height:1.55}
.ab-journey-note{margin-top:clamp(32px,4vw,48px);padding-top:24px;border-top:1px solid var(--line-2);max-width:72ch}

/* Team */
.ab-team-head .section-head{margin-bottom:clamp(32px,4vw,48px)}
.ab-team-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(24px,3vw,40px) clamp(20px,2.4vw,28px)}
.ab-member-photo{position:relative;aspect-ratio:4/5;border-radius:var(--r-lg);overflow:hidden;background:#EDEBF3}
.ab-member-photo img{width:100%;height:100%;object-fit:cover;display:block;transition:transform 1.2s var(--ease),filter .8s var(--ease)}
.ab-member:hover .ab-member-photo img{transform:scale(1.04)}
.ab-member .h4{margin-top:18px;font-size:21px}
.ab-member .meta{margin-top:4px;color:var(--purple)}
.ab-member .small{margin-top:8px;line-height:1.55;max-width:34ch}
.ab-member{position:relative}
.ab-member-link{position:absolute;right:12px;top:12px;width:36px;height:36px;border-radius:999px;background:rgba(255,255,255,.92);color:var(--ink);display:inline-flex;align-items:center;justify-content:center;opacity:0;transform:translateY(-4px);transition:opacity .3s,transform .4s var(--ease)}
.ab-member:hover .ab-member-link,.ab-member-link:focus-visible{opacity:1;transform:none}
.ab-member-link svg{width:18px;height:18px}
.ab-adv-grid{grid-template-columns:repeat(4,minmax(0,1fr))}
@media (max-width:1024px){.ab-adv-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:640px){.ab-adv-grid{grid-template-columns:1fr}}

/* Aims */
.ab-aims-grid{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(32px,5vw,80px);align-items:start}
.ab-aims-grid .section-head{margin-bottom:0}
.ab-aims{display:flex;flex-direction:column;border-top:1px solid var(--line)}
.ab-aims li{display:grid;grid-template-columns:72px minmax(0,1fr);gap:20px;padding:28px 0;border-bottom:1px solid var(--line)}
.ab-aim-num{font-family:var(--font-display);font-size:clamp(28px,3vw,40px);font-weight:700;letter-spacing:-.04em;line-height:1;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
.ab-aims .h4{margin-bottom:6px}
.ab-aims .body{font-size:15.5px}

/* Company + links */
.ab-company{display:grid;grid-template-columns:48px minmax(0,1fr);gap:24px;align-items:start;padding:clamp(24px,3vw,36px);border-radius:var(--r-xl);background:#fff;border:1px solid var(--line)}
.ab-company .icon{margin:0}
.ab-links{margin-top:clamp(20px,2.4vw,28px)}
.ab-link-card{display:flex;flex-direction:column;gap:8px}
.ab-link-card .body{flex:1;font-size:15px}
.ab-link-card .link{margin-top:4px}

@media (max-width:1024px){
  .ab-hero-top{grid-template-columns:1fr;gap:28px;align-items:start}
  .ab-hero-media{aspect-ratio:16/10}
  .ab-facts-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
  .ab-story-grid{grid-template-columns:1fr;gap:32px}
  .ab-story-media{position:static}
  .ab-portrait{max-width:360px}
  .ab-q-grid{grid-template-columns:1fr;gap:32px}
  .ab-idea-grid{grid-template-columns:1fr;gap:32px}
  .ab-idea-photo{max-width:360px;margin-left:0}
  .ab-principles{grid-template-columns:1fr}
  .ab-principle{border-right:0;border-bottom:1px solid var(--line)}
  .ab-principle:last-child{border-bottom:0}
  .ab-values{grid-template-columns:1fr}
  .ab-tl{grid-template-columns:1fr;gap:0;padding-top:0;padding-left:32px}
  .ab-tl::before{left:7px;right:auto;top:8px;bottom:8px;width:2px;height:auto}
  .ab-tl-item{padding:0 0 32px}
  .ab-tl-item:last-child{padding-bottom:0}
  .ab-tl-dot{left:-32px;top:2px}
  .ab-team-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .ab-aims-grid{grid-template-columns:1fr;gap:28px}
}
@media (max-width:640px){
  .ab-hero-media{aspect-ratio:4/3;border-radius:var(--r-lg) var(--r-lg) 0 0}
  .ab-chip{left:12px;bottom:12px;padding:10px 14px 10px 12px;font-size:12px}
  .ab-facts-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .ab-routine{grid-template-columns:1fr;gap:12px}
  .ab-scenes{grid-template-columns:1fr}
  .ab-scene{aspect-ratio:4/3.6}
  .ab-scene h3{font-size:19px}
  .ab-statement{font-size:24px}
  .ab-q-list li{font-size:18px;grid-template-columns:32px minmax(0,1fr);padding:16px 0}
  .ab-mission{padding:28px 22px}
  .ab-team-grid{grid-template-columns:1fr}
  .ab-member .small{max-width:none}
  .ab-aims li{grid-template-columns:48px minmax(0,1fr);gap:14px;padding:22px 0}
  .ab-company{grid-template-columns:1fr;gap:16px}
}
`;

export default {
  path: '/about',
  nav: '/about',
  title: 'About VerifyU',
  description: 'VerifyU was founded by Capt. Saurabh Saraswat, a Master Mariner who spent 16 years at sea. Read the story, the mission and the team behind the safety platform.',
  body,
  css,
  priority: 0.8,
  jsonld: [breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }]), ORG_LD],
};
