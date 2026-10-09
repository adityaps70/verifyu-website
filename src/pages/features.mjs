import { SITE, icons, device, checks, note, flag, pageHero, finalCta, breadcrumbLd, APP_LD } from '../lib.mjs';

/* ---------------------------------------------------------------------------
   Phone states. Real app screenshots (demo data) where they exist;
   one restrained HTML UI for the dependant view, which has no screenshot.
   --------------------------------------------------------------------------- */
const shot = (src, alt, w = 722) => `<img class="shot" src="${src}" alt="${alt}" width="${w}" height="1600" loading="lazy">`;

/* A small bottom bar so the drawn screen reads like an app screen, not a diagram */
const tabbar = (on = '') => `
<div class="ft-tabbar" aria-hidden="true">
  <span class="${on === 'home' ? 'is-on' : ''}">${icons.home}Home</span>
  <span class="${on === 'recharge' ? 'is-on' : ''}">${icons.recharge}Recharge</span>
  <span class="ft-tab-scan">${icons.scan}</span>
  <span class="${on === 'steps' ? 'is-on' : ''}">${icons.steps}Steps</span>
  <span class="${on === 'you' ? 'is-on' : ''}">${icons.user}Settings</span>
</div>`;

const dashboard = shot('/images/app/home-dashboard.webp', 'VerifyU identity dashboard with a verified demo profile, profile strength and Personal, Emergency, Medical and Biometric tabs');
const recharge = shot('/images/app/recharge.webp', 'VerifyU Recharge & Utilities screen with mobile, DTH and electricity options and a Use Coins toggle');
const settings = shot('/images/app/settings.webp', 'VerifyU Settings screen showing Premium yearly benefits, Referral Rewards with a code and the coin balance');
const steps = shot('/images/app/steps.webp', 'VerifyU Step Counter screen with today’s steps, distance, calories, coins, Sync Now and a weekly Steps Report');
const sos = shot('/images/app/sos.webp', 'VerifyU SOS screen listing the emergency types: Women Safety, Medical, Road Accident, Road Assistance and Fire');
const contacts = shot('/images/app/profile-emergency.webp', 'Verified profile Emergency tab listing two emergency contacts with relation, phone number and a call button');
const medicalOtp = shot('/images/app/profile-medical-otp.webp', 'Verified profile Medical tab with a prompt to verify an OTP from an emergency contact before medical information is shown');

const faceScan = `
<div class="ft-shotwrap">
  ${shot('/images/app/face-verification.webp', 'VerifyU face verification camera screen asking the person to look into the camera and hold still', 736)}
  <div class="ui-match"><span class="dot">${icons.check}</span><div><b>MATCH FOUND</b><span>Registered VerifyU profile</span></div></div>
</div>`;

const uiFamily = `
<div class="ui">
  <div class="ui-top"><div class="t"><i></i>Children info</div></div>
  <div class="ui-body">
    <div class="ui-card">
      <div class="ui-row"><span class="ini-lg">R</span><div><div class="lbl">Dependant</div><div class="val">Riya</div><span class="ui-tag is-purple">Daughter</span></div></div>
    </div>
    <div class="ui-card"><div class="lbl">Guardian</div><div class="val">Prakhar Pathak</div><div class="lbl" style="margin:6px 0 0">Listed as the contact for this child</div></div>
    <div class="ui-btn is-ghost">${icons.plus} Add another dependant</div>
    <p class="ft-fine">Children’s details are added during registration. Demo data.</p>
  </div>
  ${tabbar('home')}
</div>`;

/* ---------------------------------------------------------------------------
   The showcase items — one per phone state
   --------------------------------------------------------------------------- */
const ITEMS = [
  {
    pill: 'Start here', tone: '', kicker: 'Your profile',
    title: 'One profile, built for the worst day.',
    body: 'Everything in VerifyU sits on one registered profile: who you are, what a helper should know, and who to call. You fill it in once and keep it current.',
    list: ['Free to register on Android and iPhone in India', 'Personal, Emergency, Medical, Biometric and Children Info all live on one dashboard', 'Built safety-first — the everyday features come second'],
    panel: dashboard,
  },
  {
    pill: 'Emergency', tone: '', kicker: 'Face identification',
    title: 'Your face is the key to your profile.',
    body: 'A VerifyU user with scanning access can check a face against registered profiles. When a match is returned, the person stops being “unidentified” and becomes someone with a name and people who can be called.',
    list: ['No card, wallet or phone needed from the person being identified', 'A match opens a Verified Profile — “Scanned securely via VerifyU” — with photo, name, gender and blood group', 'Matching requires prior registration, a suitable image and connectivity'],
    panel: faceScan,
  },
  {
    pill: 'SOS', tone: 'is-sos', kicker: 'General SOS',
    title: 'Five emergency types.<br>One alert flow.',
    body: 'Hold the SOS button for five seconds, pick the emergency type that matches the situation and continue, so the people you listed know something is wrong.',
    list: ['Women Safety, Medical, Road Accident, Road Assistance and Fire', 'Raised from the “Hold SOS 5 sec” button that floats above the app', 'Alerts depend on connectivity, app permissions and your contacts taking action', 'Emergency SOS Alerts sit with your other preferences in Settings'],
    panel: sos,
  },
  {
    pill: 'Emergency', tone: '', kicker: 'Emergency contacts',
    title: 'Two people who should hear first.',
    body: 'Registration asks for two trusted contacts with their relation and number. They are who a helper is pointed to after a match — and who your SOS is aimed at.',
    list: ['Two contacts, each with a name, relation and phone number', 'Shown on the Emergency tab, labelled “Encrypted &amp; Private”, with a call button beside each one', 'Edit them whenever your circumstances change'],
    panel: contacts,
  },
  {
    pill: 'Emergency', tone: '', kicker: 'Medical profile',
    title: 'The details that help someone help you.',
    body: 'Blood group, relevant history and notes stay with your profile instead of in a wallet. What a helper needs first is visible; the rest stays locked until someone who knows you says yes.',
    list: ['Your blood group sits on the verified-profile header, next to your name and gender', 'Medical Details are protected: a helper has to verify an OTP from one of your emergency contacts to open them', 'Blood group, medical history and notes are yours to record and edit'],
    panel: medicalOtp,
  },
  {
    pill: 'Family', tone: 'is-teal', kicker: 'Children info',
    title: 'Register the people who can’t explain themselves.',
    body: 'Children and dependants can be added to your profile during registration, so a child who cannot give a phone number is still connected to the adult who should be called.',
    list: ['Children Info is one of the tabs on your dashboard', 'Your name and number travel with your dependant’s record', `How a dependant’s record can be looked up by a helper depends on the app version and access flow ${flag()}`],
    panel: uiFamily,
  },
  {
    pill: 'Every day', tone: 'is-teal', kicker: 'Steps',
    title: 'A reason to open VerifyU on an ordinary day.',
    body: 'The Step Counter counts your daily walking and syncs on demand. It exists for a practical reason: an app you open is an app whose profile stays current.',
    list: ['Steps today, distance, calories and your coin balance on one screen', 'Sync Now brings the latest count into VerifyU, and a weekly Steps Report shows the last seven days', 'Rewards are subject to eligibility and the rewards terms'],
    panel: steps,
  },
  {
    pill: 'Rewards', tone: 'is-teal', kicker: 'VerifyU Coins',
    title: 'Walk, earn coins, keep the habit.',
    body: 'The Step Counter counts down the steps left to earn a coin, and your balance follows you into Settings and the recharge screen. Coins can be put towards everyday bills.',
    list: ['10,000 steps on an eligible day = 5 VerifyU Coins (current offer)', 'Your balance shows on the Step Counter, in Settings and at payment', 'Coins have no cash value and are not a currency or an investment'],
    panel: settings,
  },
  {
    pill: 'Every day', tone: '', kicker: 'Recharge &amp; Utilities',
    title: 'Spend coins on bills you were paying anyway.',
    body: 'Recharge &amp; Utilities covers mobile prepaid and postpaid, DTH and electricity, with a Use Coins option at payment so eligible coins reduce what you pay.',
    list: ['Mobile prepaid, mobile postpaid, DTH and electricity', 'Use Coins at payment where the option is available', 'Availability depends on the operator, the app version and applicable terms'],
    panel: recharge,
  },
  {
    pill: 'Grow', tone: '', kicker: 'Referral rewards',
    title: 'The more people registered, the better this works.',
    body: 'Referral Rewards in Settings lets you generate a code and share it. Every extra registered person makes a match more likely for someone in your circle.',
    list: ['Generate your code in Settings → Referral Rewards, then Share Referral', 'Regenerate Referral Code issues a fresh one whenever you want', `What a referral earns, and when, is described in the app and the rewards terms ${flag()}`, 'Registration stays free for the people you invite'],
    panel: settings,
  },
];

const itemHtml = (it, i) => `
<article class="showcase-item ft-item" data-step-item="${i}">
  <div class="ft-kick"><span class="num">${String(i + 1).padStart(2, '0')}</span><span class="pill ${it.tone}">${it.pill}</span><span class="ft-kicker">${it.kicker}</span></div>
  <h3 class="h2">${it.title}</h3>
  <p class="body">${it.body}</p>
  ${checks(it.list)}
</article>`;

const body = `
${pageHero({
  eyebrow: 'Product',
  title: 'Everything VerifyU does,<br>in one app.',
  lead: 'Emergency identification, SOS, contacts, medical information and family profiles — plus the everyday features that keep you opening the app. Here is the whole product, capability by capability.',
  ctas: `<a class="btn btn-primary btn-lg" href="${SITE.play}" target="_blank" rel="noopener">Get VerifyU — it’s free ${icons.arrow}</a><a class="btn btn-ghost btn-lg" href="/pricing">See pricing</a>`,
  media: device({ alt: 'VerifyU identity dashboard with a verified demo profile, Start Verification and the profile tabs', eager: true }),
  cls: 'ft-hero',
})}

<!-- SHOWCASE: pinned phone, ten capabilities -->
<section class="ft-story" id="capabilities" data-story data-steps="10" aria-labelledby="ft-cap-h">
  <div class="container">
    <div class="ft-head" data-reveal>
      <div class="eyebrow">Capabilities</div>
      <h2 class="h2" id="ft-cap-h">Ten things your registered profile can do.</h2>
      <p class="lead">Scroll once and watch the app change beside you. Safety first, then the everyday features that keep the profile current.</p>
    </div>
    <div class="showcase ft-showcase">
      <div class="showcase-phone ft-phone">
        ${device({
          id: 'ft-device', alt: 'VerifyU app screens for each capability', inner: ITEMS.map((it, i) =>
            `<div class="story-panel ${i === 0 ? 'is-active' : ''}" data-step-panel="${i}">${it.panel}</div>`).join(''),
        })}
        <div class="ft-dots" aria-hidden="true">${ITEMS.map((_, i) => `<span data-step-item="${i}" class="${i === 0 ? 'is-active' : ''}"></span>`).join('')}</div>
      </div>
      <div class="showcase-list ft-list">
        ${ITEMS.map(itemHtml).join('')}
        <div class="ft-outro">
          <h3 class="h3">All of it from one registration.</h3>
          <p class="body mt-2">Registration is free. Premium adds a few things on top — the comparison is below.</p>
          <div class="row mt-3">
            <a class="btn btn-primary" href="${SITE.play}" target="_blank" rel="noopener">Get VerifyU — it’s free ${icons.arrow}</a>
            <a class="link" href="/how-it-works">See how registration works ${icons.arrow}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- PLAN STRIP -->
<section class="section is-cloud" aria-labelledby="ft-plan-h">
  <div class="container">
    <div class="ft-planhead">
      <div data-reveal>
        <div class="eyebrow">Free and Premium</div>
        <h2 class="h2" id="ft-plan-h">Which plan unlocks what.</h2>
      </div>
      <a class="btn btn-ghost" href="/pricing" data-reveal>See full pricing ${icons.arrow}</a>
    </div>
    <div class="grid grid-2 mt-5" data-stagger>
      <div class="card is-xl">
        <span class="pill">Free</span>
        <h3 class="h3 mt-3">Registration and the safety layer</h3>
        <p class="body mt-2">Everything you need to be identifiable and reachable in an emergency.</p>
        ${checks([
          'Registered profile with photo and face verification',
          'Two emergency contacts',
          'Medical information, including blood group',
          'SOS with all five emergency types',
          'Children and dependant details',
          'Steps tracker, VerifyU Coins and Recharge &amp; Utilities, subject to eligibility',
          'Referral Rewards in Settings',
        ])}
      </div>
      <div class="card is-xl ft-plan-premium">
        <span class="pill is-teal">Premium · ₹99 / month · ₹999 / year</span>
        <h3 class="h3 mt-3">More verification, fewer limits</h3>
        <p class="body mt-2">For people who use identification often, and for families who want the fuller medical layer.</p>
        ${checks([
          'Unlimited scans — unlimited face verifications from your account',
          'Full medical data access',
          'Ad-free usage',
          'Premium upgrades for the year, on the yearly plan',
          `Free-plan limits on face verification and scanning access are set in the app ${flag('Exact free limit')}`,
        ])}
        <p class="small mt-3">Yearly works out at ₹999 against ₹1,188 for twelve monthly payments — a saving of about 16%.</p>
      </div>
    </div>
    ${note('Plan names, inclusions, final pricing, taxes and renewal terms are confirmed in the app at purchase. Feature availability depends on your app version, permissions and applicable terms.')}
  </div>
</section>

${finalCta({ headline: 'One registration.<br>Every capability above.', copy: 'Register yourself, then the people who would struggle to speak for themselves.' })}
`;

const css = `
.ft-hero .h1{font-size:clamp(36px,4.3vw,56px);max-width:19ch}
.ft-hero .lead{max-width:50ch}
.ft-story{padding-top:clamp(72px,10vw,140px);padding-bottom:clamp(220px,34vh,420px);background:#fff}
.ft-head{max-width:760px;margin-bottom:clamp(32px,4vw,56px)}
.ft-head .lead{margin-top:18px}
.ft-showcase{grid-template-columns:minmax(0,1fr) 400px}
.ft-showcase .showcase-phone{grid-column:2;grid-row:1;flex-direction:column;gap:20px;align-items:center;top:calc(var(--nav-h) + 34px)}
.ft-showcase .showcase-list{grid-column:1;grid-row:1}
.ft-showcase .device{max-width:min(340px,38vh)}
.ft-dots{display:flex;gap:6px;flex-wrap:wrap;justify-content:center}
.ft-dots span{width:18px;height:4px;border-radius:4px;background:var(--line);transition:background .4s,width .4s var(--ease)}
.ft-dots span.is-active{background:var(--purple);width:30px}
.ft-item{min-height:68vh;padding-block:0;justify-content:center}
.ft-item .h2{font-size:clamp(26px,3.1vw,40px);max-width:17ch;margin:16px 0 14px}
.ft-kick{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.ft-kicker{font-size:13px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-4)}
.ft-outro{padding:40px 0 0;border-top:1px solid var(--line)}
@media (min-width:1025px){
  .ft-item{opacity:.5;transition:opacity .55s var(--ease)}
  .ft-item.is-active{opacity:1}
}
html.no-motion .ft-item{opacity:1}
@media (max-width:1024px){
  .ft-story{padding-top:clamp(56px,8vw,96px);padding-bottom:28px}
  .ft-head{margin-bottom:16px}
  .ft-showcase{display:block}
  .ft-dots{display:none}
  .ft-showcase .showcase-phone{position:sticky;top:calc(var(--nav-h) + 2px);z-index:5;display:flex;background:linear-gradient(180deg,#fff 90%,rgba(255,255,255,0));padding:8px 0 30px;margin-bottom:-150px}
  .ft-showcase .device{max-width:min(160px,22vh)}
  .ft-shotwrap .ui-match{display:none}
  .ft-item{min-height:78vh;justify-content:flex-start;padding:21vh 0 0}
  .ft-item .h2{margin-top:12px}
  .ft-item .body{font-size:16px}
  .ft-item .checks{margin-top:18px}
  .ft-outro{padding-top:20px}
}
@media (min-width:641px) and (max-width:1024px){
  .ft-item{padding-top:23vh}
}
@media (max-width:640px){
  .ft-showcase .device{max-width:min(150px,22vh)}
  .ft-item{min-height:78vh;padding-top:23vh}
  .ft-item .check{font-size:15px}
}
/* Real screenshots inside the pinned phone */
.ft-phone .story-panel > .shot,.ft-shotwrap > .shot{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 0}
.ft-shotwrap{position:absolute;inset:0}
.ft-shotwrap .ui-match{bottom:9%;left:10px;right:10px;padding:10px 12px}
.ft-shotwrap .ui-match .dot{width:26px;height:26px}
.ft-shotwrap .ui-match b{font-size:11px}
/* Phone UI extras (children-info screen) */
.ft-fine{margin-top:10px;font-size:9.5px;line-height:1.4;color:var(--ink-3)}
.ini-lg{width:40px;height:40px;border-radius:12px;background:var(--purple-50);color:var(--purple);display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-weight:700;font-size:18px;flex:none}
/* Drawn app screen: bottom bar */
.ft-tabbar{position:absolute;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:space-around;height:56px;padding:0 6px 10px;background:#fff;border-top:1px solid var(--line-2)}
.ft-tabbar span{display:flex;flex-direction:column;align-items:center;gap:3px;font-size:8px;font-weight:600;letter-spacing:.02em;color:var(--ink-4)}
.ft-tabbar span.is-on{color:var(--purple)}
.ft-tabbar svg{width:17px;height:17px}
.ft-tabbar .ft-tab-scan{width:38px;height:38px;margin-top:-14px;border-radius:999px;background:var(--purple);color:#fff;justify-content:center;box-shadow:0 10px 20px -10px rgba(99,40,153,.9)}
.ft-tabbar .ft-tab-scan svg{width:18px;height:18px}
#ft-device .ui-body{padding-bottom:64px}
/* On a small pinned phone the tab labels have no room — keep the icons only */
@media (max-width:1024px){.ft-tabbar span{font-size:0;gap:0}.ft-tabbar{height:48px;padding-bottom:8px}}
/* Plan strip */
.ft-planhead{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:20px}
.ft-plan-premium{border-color:var(--purple-100)}
.ft-planhead .h2{max-width:18ch}
`;

export default {
  path: '/features',
  nav: '',
  title: 'Features',
  description: 'Face identification, SOS, emergency contacts, medical information, family profiles, steps, coins, recharge and referrals — every VerifyU feature explained.',
  body, css, priority: 0.9,
  jsonld: [breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Features', path: '/features' }]), APP_LD],
};
