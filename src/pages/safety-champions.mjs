import { SITE, icons, checks, note, flag, sectionHead, pageHero, ctaBand, breadcrumbLd } from '../lib.mjs';

const mail = (subject) => `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`;
const APPLY_MAIL = mail('VerifyU Safety Champion application');

const TYPES = [
  { icon: 'heart', cls: 'is-teal', t: 'Blood Donor', role: 'Be ready to step forward when a donor of your blood group is needed at a community drive.', who: 'Anyone eligible to donate under the rules of the collecting centre.' },
  { icon: 'users', t: 'Community Volunteer', role: 'Help your society, neighbourhood or city group understand VerifyU and complete registration.', who: 'Anyone 18 or over who can give a few hours a month.' },
  { icon: 'medical', t: 'First-Aid Trained', role: 'Bring practical first-aid awareness to registration drives and community sessions.', who: 'People holding a current first-aid certificate from a recognised provider.' },
  { icon: 'hospital', cls: 'is-blue', t: 'Medical Professional', role: 'Explain, in your own words, why emergency identity and accurate medical information matter.', who: 'Doctors, nurses, paramedics and allied health professionals.' },
  { icon: 'school', t: 'Campus Safety Captain', role: 'Run registration and awareness on your own campus, with support from the VerifyU team.', who: 'Students and staff nominated by their college or school.' },
];

const body = `
${pageHero({
  eyebrow: 'Safety Champions',
  title: 'Become a VerifyU<br>Safety Champion.',
  lead: 'A Safety Champion helps the people around them get registered — so that a neighbour, a parent or a stranger in your city can still be identified and reached when they cannot speak for themselves.',
  ctas: `<a class="btn btn-primary btn-lg" href="${APPLY_MAIL}">Become a Safety Champion ${icons.mail}</a>
         <a class="btn btn-ghost btn-lg" href="#role">What the role involves</a>`,
  media: `<div class="sc-hero-media">
    <figure class="photo is-3x2 sc-hero-photo">
      <img src="/images/volunteer-community.jpg" alt="Three young volunteers outdoors looking at a phone together" width="1400" height="933" fetchpriority="high">
      <figcaption class="cap">Most registrations happen because someone nearby offered to help.</figcaption>
    </figure>
    <ul class="sc-facts">
      <li><span class="meta">Role</span><b>Volunteer</b></li>
      <li><span class="meta">Time</span><b>A few hours a month</b></li>
      <li><span class="meta">Where</span><b>Your own city</b></li>
    </ul>
  </div>`,
})}

<!-- Champion types -->
<section class="section" aria-labelledby="types-h">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Champion types',
      title: 'Five ways to be useful.',
      lead: 'Choose the one that matches what you already do. You can start with one and add another later.',
    })}
    <div class="grid grid-3" data-stagger>
      ${TYPES.map(t => `<article class="role-card sc-type">
        <div class="icon ${t.cls || ''}">${icons[t.icon]}</div>
        <h3 class="h4">${t.t}</h3>
        <p class="body">${t.role}</p>
        <div class="sc-who"><span class="meta">Who can join</span><p class="small">${t.who}</p></div>
      </article>`).join('')}
    </div>
    <p class="small mt-4">How each champion type is listed, contacted and supported in the app is still being finalised with the VerifyU team. ${flag()}</p>
  </div>
</section>

<!-- The role & who can join -->
<section class="section is-cloud" id="role" aria-labelledby="role-h">
  <div class="container split">
    <div class="col-6">
      ${sectionHead({
        eyebrow: 'The role',
        title: 'Awareness first.<br>Registration second.',
        lead: 'A Safety Champion is a volunteer, not a responder. The work is explaining, helping and following up — patiently, in your own community.',
      })}
      ${checks([
        '<b>Explain VerifyU simply</b> — what it is for, what it is not, and who it helps.',
        '<b>Help people register</b> using the official registration guide, at their own pace.',
        '<b>Answer the easy questions</b> and pass the harder ones to the VerifyU team rather than guessing.',
        '<b>Keep showing up</b> — a drive works when someone follows up a week later.',
      ])}
    </div>
    <div class="col-6">
      <div class="card is-xl" data-reveal>
        <div class="icon">${icons.user}</div>
        <h3 class="h4">Who can join</h3>
        <p class="body mt-2">You do not need a medical background or a safety qualification. You need patience and a reason to care.</p>
        <div class="mt-3">
          ${checks([
            'You are 18 or over and living in India.',
            'You are comfortable using a smartphone and helping someone else use theirs.',
            'You can give a few hours a month, and say honestly when you cannot.',
            'You are willing to work within the code of conduct below.',
          ])}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Responsibilities & commitment -->
<section class="section" aria-labelledby="resp-h">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Responsibilities & commitment',
      title: 'What you take on — and what you don’t.',
      lead: 'The commitment is deliberately small. Consistency matters far more than hours.',
    })}
    <div class="grid grid-2 sc-resp">
      <div class="card is-xl" data-reveal>
        <h3 class="h4">Responsibilities</h3>
        <div class="mt-3">
          ${checks([
            'Represent VerifyU accurately — never promise rescue, response times or outcomes.',
            'Let every person enter their own details, their own contacts and their own OTP.',
            'Protect what you see. Do not photograph, copy or keep anyone’s personal information.',
            'Report problems, confusion or misuse to the VerifyU team quickly.',
          ])}
        </div>
      </div>
      <div class="card is-xl" data-reveal>
        <h3 class="h4">Commitment</h3>
        <div class="mt-3">
          ${checks([
            'A few hours a month is a realistic starting point.',
            'Most activity is local: your society, campus, workplace or running group.',
            'Drives and sessions are planned in advance; you opt in to the ones that suit you.',
            'You can pause or step away at any time by telling the team.',
          ])}
        </div>
        ${note(`This is a voluntary role. It is not employment, and it does not create an agency or agreement with VerifyU or ${SITE.entity}`)}
      </div>
    </div>
  </div>
</section>

<!-- Training & recognition -->
<section class="section is-cloud" aria-labelledby="train-h">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Training & recognition',
      title: 'Support before you start.',
      lead: 'Enough preparation to be useful, and a clear line about what recognition does and does not mean.',
    })}
    <div class="grid grid-2" data-stagger>
      <div class="card is-xl">
        <div class="icon">${icons.doc}</div>
        <h3 class="h4">Training</h3>
        <p class="body mt-2">Champions are briefed on the registration steps, on what VerifyU can and cannot do, and on how to talk about emergency identity without overselling it. The format, length and materials of this briefing are being finalised. ${flag()}</p>
        <p class="body mt-2">Training is about explaining the app well. It is not first-aid, medical or emergency-response training, and it does not qualify you to act as a responder.</p>
      </div>
      <div class="card is-xl">
        <div class="icon">${icons.star}</div>
        <h3 class="h4">Recognition</h3>
        <p class="body mt-2">Active champions may be recognised within the community and at VerifyU events. The specifics — badges, certificates, listings or any other form of recognition — are being confirmed and are not promised here. ${flag()}</p>
        <p class="body mt-2">There is no payment, commission or incentive attached to the role, and none should be offered or accepted in VerifyU’s name.</p>
      </div>
    </div>
  </div>
</section>

<!-- City & event participation -->
<section class="section" aria-labelledby="city-h">
  <div class="container split">
    <div class="col-7">
      ${sectionHead({
        eyebrow: 'City & event participation',
        title: 'Where champions actually turn up.',
        lead: 'Registration drives work best where people already gather. Champions join the sessions that fit their city and their schedule.',
      })}
      ${checks([
        '<b>Community runs and walks</b> — participants register before the day rather than after an incident.',
        '<b>Senior and residential communities</b> — assisted registration, with family listed as next of kin.',
        '<b>Campus sessions</b> — orientation weeks, safety weeks and hostel awareness sessions.',
        '<b>City events and public gatherings</b> — awareness desks alongside the organiser’s own arrangements.',
      ])}
      <p class="small mt-3">Which drives run, and in which cities, depends on planned community activity and on organiser arrangements. ${flag()}</p>
      <div class="row mt-4"><a class="link" href="/press#community">See recent community activity ${icons.arrow}</a></div>
    </div>
    <div class="col-5">
      <div class="card is-xl is-cloud" data-reveal>
        <div class="icon">${icons.pin}</div>
        <h3 class="h4">Start where you are</h3>
        <p class="body mt-2">You do not need an event to be useful. The people most worth registering are usually in the same building, the same family or the same running group as you.</p>
        <div class="mt-3">${checks(['Your parents and grandparents.', 'Neighbours who live alone.', 'Your running, cycling or walking group.', 'Colleagues who travel for work.'])}</div>
      </div>
    </div>
  </div>
</section>

<!-- Code of conduct -->
<section class="section is-dark on-dark sc-conduct" aria-labelledby="code-h">
  <div class="glow is-purple" style="width:560px;height:560px;left:-180px;bottom:-180px;opacity:.35"></div>
  <div class="container" style="position:relative">
    ${sectionHead({
      eyebrow: 'Code of conduct',
      title: 'Three rules that hold the whole programme up.',
      lead: 'Champions work with people’s identity, contacts and medical information. These are not suggestions.',
    })}
    <div class="grid grid-3" data-stagger>
      <div class="card is-dark sc-code"><span class="num">01</span><h3 class="h4">Let people choose</h3><p class="body">Ask before you help. Every person enters their own information and their own OTPs — you never type for them, and never ask anyone to share a code with you.</p></div>
      <div class="card is-dark sc-code"><span class="num">02</span><h3 class="h4">Make the next step easier</h3><p class="body">Use the official registration guide, keep your explanation plain, and bring product questions back to the VerifyU team instead of inventing an answer.</p></div>
      <div class="card is-dark sc-code"><span class="num">03</span><h3 class="h4">Work within your role</h3><p class="body">Awareness volunteering does not make you an emergency responder. In an emergency, call the emergency services first — always.</p></div>
    </div>
    ${note('VerifyU supports identification and communication. It does not replace emergency services and does not guarantee assistance, identification or response times.')}
  </div>
</section>

<!-- Expression of interest -->
<section class="section is-cloud" id="apply" aria-labelledby="apply-h">
  <div class="container split">
    <div class="col-6">
      ${sectionHead({
        eyebrow: 'Express your interest',
        title: 'Tell us your city and what you can give.',
        lead: 'There is no application form on this page. Write to the team or send a message, and someone will come back to you.',
      })}
      <div class="row">
        <a class="btn btn-primary btn-lg" href="${APPLY_MAIL}">Become a Safety Champion ${icons.mail}</a>
        <a class="btn btn-ghost btn-lg" href="${SITE.whatsappHref}" target="_blank" rel="noopener">${icons.chat} WhatsApp ${SITE.whatsapp}</a>
      </div>
      <p class="small mt-3">${SITE.email} · ${SITE.entity}</p>
    </div>
    <div class="col-6">
      <div class="card is-xl" data-reveal>
        <h3 class="h4">What to include</h3>
        <p class="small mt-1">Four lines. That is the whole application.</p>
        <div class="mt-3">
          ${checks([
            '<b>Your name</b>, and how you would like to be contacted.',
            '<b>Your city</b>, and the community you would work with.',
            '<b>Champion type</b> — blood donor, community volunteer, first-aid trained, medical professional or campus safety captain.',
            '<b>Availability</b> — roughly how much time you can give, and when.',
          ])}
        </div>
        ${note('This is an expression of interest only. It is not an application for employment, and no placement, payment or certificate is promised or implied.')}
      </div>
    </div>
  </div>
</section>

${ctaBand({
  title: 'Make your city easier to reach.',
  copy: 'Write to the team with your name, your city and the time you can give.',
  primary: { t: 'Become a Safety Champion', h: APPLY_MAIL, ext: false },
  secondary: { t: 'Get VerifyU', h: SITE.play },
})}
`;

const css = `
.sc-hero-media{max-width:520px;margin-left:auto}
.sc-hero-photo{margin:0}
.sc-facts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:16px}
.sc-facts li{padding:16px;border-radius:var(--r-md);background:var(--cloud)}
.sc-facts .meta{display:block;color:var(--purple);font-size:11.5px;margin-bottom:6px}
.sc-facts b{font-family:var(--font-display);font-size:15px;font-weight:600;letter-spacing:-.01em;line-height:1.2;display:block}
.sc-type{gap:8px}
.sc-type .body{font-size:15.5px;flex:1}
.sc-who{margin-top:6px;padding-top:14px;border-top:1px solid var(--line)}
.sc-who .meta{display:block;color:var(--purple);margin-bottom:4px}
.sc-resp{gap:clamp(20px,2.4vw,32px);align-items:start}
.sc-resp .checks{gap:14px}
.sc-resp .note{margin-top:20px}
.sc-code{display:flex;flex-direction:column;gap:8px}
.sc-code .num{color:#C9A6F2}
.sc-code .body{font-size:15px}
.sc-conduct{position:relative;overflow:hidden}
.sc-conduct .note{color:rgba(255,255,255,.6);margin-top:32px}
.sc-conduct .note svg{color:rgba(255,255,255,.45)}
@media (max-width:1024px){.sc-hero-media{max-width:100%;margin-left:0;margin-top:8px}}
@media (max-width:400px){.sc-facts{grid-template-columns:1fr 1fr}.sc-facts li:last-child{grid-column:1 / -1}}
`;

export default {
  path: '/safety-champions',
  nav: '',
  title: 'VerifyU Safety Champions',
  description: 'VerifyU Safety Champions: volunteer to help your city register, understand emergency identity and make more people reachable when they cannot communicate.',
  body,
  css,
  jsonld: breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Safety Champions', path: '/safety-champions' }]),
  priority: 0.7,
};
