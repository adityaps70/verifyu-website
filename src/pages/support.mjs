import { SITE, icons, note, flag, sectionHead, pageHero, ctaBand, breadcrumbLd, faqLd } from '../lib.mjs';

/* Help Centre — searchable, filterable FAQ + contact routes.
   The accordion markup is written here (rather than using lib's accordion())
   so each item can carry data-faq-item / data-cat and a stable anchor id. */

const APPLE_SUB = 'https://support.apple.com/118428';
const GOOGLE_SUB = 'https://support.google.com/googleplay/answer/7018481';
const MAIL = `mailto:${SITE.email}?subject=VerifyU%20app%20support`;
const WA = `${SITE.whatsappHref}?text=Hello%20VerifyU%2C%20I%20need%20help%20with%20the%20app.%20My%20issue%20is%3A`;

const refNote = note('When you contact us, include your phone model, app version and the reference number of any transaction — never OTPs, PINs or full payment details.');

const CATS = [
  ['all', 'All'],
  ['getting-started', 'Getting started'],
  ['face-verification', 'Face verification'],
  ['emergency-contacts', 'Emergency contacts'],
  ['sos', 'SOS'],
  ['medical-profile', 'Medical profile'],
  ['steps', 'Steps'],
  ['coins', 'Coins'],
  ['recharge', 'Recharge'],
  ['referral', 'Referral'],
  ['subscription', 'Subscription'],
  ['account', 'Account'],
  ['privacy', 'Privacy'],
  ['delete-account', 'Delete account'],
];

const TOPICS = ['OTP', 'Face verification', 'SOS', 'Steps not syncing', 'Recharge pending', 'Subscription'];

/* ---------------- Answers ---------------- */
const FAQ = [
  /* Getting started */
  {
    id: 'faq-before-you-start', cat: 'getting-started',
    q: 'What do I need before I register?',
    a: `<p>Keep five things within reach and registration takes a few minutes:</p>
      <ul>
        <li>The phone that holds your own mobile number, so you can receive the verification code.</li>
        <li>A clear, recent photo of your face in good light.</li>
        <li>The names, relationships and numbers of two people you trust.</li>
        <li>Your blood group and any medical information a helper should know.</li>
        <li>Details of your children or dependants, if you want to add them to your profile.</li>
      </ul>
      <p>Registration is free. <a href="/how-it-works">See the full seven-step walkthrough</a>.</p>`,
  },
  {
    id: 'faq-otp', cat: 'getting-started',
    q: 'I did not receive the OTP on my mobile number. What now?',
    a: `<p>The OTP is sent to the number you entered, so start by checking that the number is correct and that the phone has signal. Then:</p>
      <ul>
        <li>Wait a full minute before asking for a new code — messages can arrive late on busy networks.</li>
        <li>Check your blocked or spam message folders and any SMS-filtering app.</li>
        <li>Switch flight mode on and off, or restart the phone, to re-register on the network.</li>
        <li>Make sure the number is active and can receive ordinary SMS from other senders.</li>
      </ul>
      <p>If the code still does not arrive, message us with the number you are trying to register — never send us the code itself.</p>`,
  },
  {
    id: 'faq-video', cat: 'getting-started',
    q: 'Where can I watch the registration video?',
    a: `<p>The one-minute registration guide walks through all seven steps, from downloading the app to submitting your profile. <a href="/how-it-works#video">Watch the registration guide</a> — you can jump straight to the step you are stuck on.</p>`,
  },
  {
    id: 'faq-free', cat: 'getting-started',
    q: 'Is registration free?',
    a: `<p>Yes. Creating a VerifyU profile — your details, face verification, two emergency contacts and your medical information — is free.</p>
      <p>Premium is optional. The app describes it as ad-free usage, full medical data access, unlimited scans and premium upgrades for the year. Premium is ₹99 per month or ₹999 per year. Final pricing, taxes and renewal terms are confirmed in the app before you pay. <a href="/pricing">Compare free and Premium</a>.</p>`,
  },

  /* Face verification */
  {
    id: 'faq-face-stuck', cat: 'face-verification',
    q: 'Face verification gets stuck or keeps failing. What should I try?',
    a: `<p>Face verification needs a clear, steady view of your face, so most failures come down to light, the camera permission or movement. Work through this list in order:</p>
      <ul>
        <li><b>Find even light.</b> Face a window or a lamp. Avoid a bright light directly behind you.</li>
        <li><b>Remove anything covering your face</b> — mask, sunglasses, spectacles with glare, cap or scarf.</li>
        <li><b>Hold the phone steady</b> at eye level, keep your face inside the frame and follow the on-screen prompts without rushing.</li>
        <li><b>Allow camera permission.</b> If you declined it earlier, turn it on in your phone settings under the VerifyU app.</li>
        <li><b>Clean the front camera lens</b> and close other apps that may be using it.</li>
        <li><b>Retry from Start Verification</b> rather than resuming a stalled attempt, and check that you have a working internet connection.</li>
      </ul>
      <p>If it still will not complete, send us your phone model and app version and we can look into it.</p>`,
  },
  {
    id: 'faq-photo-unclear', cat: 'face-verification',
    q: 'What if my profile photo is unclear?',
    a: `<p>An unclear photo makes matching harder, so it is worth replacing. A good photo is well lit, taken straight on, shows your whole face without a filter and has nothing covering your eyes or mouth.</p>
      <p>You can update the photo from your profile in the app and complete verification again. ${flag('Owner verification')} — the exact screen for replacing a photo may differ by app version.</p>`,
  },

  /* Emergency contacts */
  {
    id: 'faq-contacts-why', cat: 'emergency-contacts',
    q: 'Why does it matter that my emergency contacts are up to date?',
    a: `<p>Your emergency contacts are the people a helper is meant to reach when you cannot speak for yourself. A number that has changed, or a person who no longer lives nearby, quietly removes the point of the profile.</p>
      <p>Check your two contacts whenever a number changes, someone moves, or your circumstances change — and tell those two people that they are listed, so an unexpected call makes sense to them.</p>`,
  },
  {
    id: 'faq-contacts-change', cat: 'emergency-contacts',
    q: 'Can I change my emergency contacts later?',
    a: `<p>Yes — emergency contacts are part of your profile and are managed inside the app, so you can update names, relationships and numbers as your circumstances change. ${flag('Owner verification')} — the exact menu path for editing contacts needs confirmation against the current app version.</p>
      <p>If you cannot find the option on your version, message us and we will point you to the right screen.</p>`,
  },

  /* SOS */
  {
    id: 'faq-sos-categories', cat: 'sos',
    q: 'What emergency types appear under SOS?',
    a: `<p>Hold the SOS button for five seconds and the app asks you to select an emergency type. There are five: <b>Women Safety</b>, <b>Medical</b>, <b>Road Accident</b>, <b>Road Assistance</b> and <b>Fire</b>. Choose one and continue, and the in-app alert flow goes to your emergency contacts.</p>
      <p>SOS depends on connectivity, the permissions you have granted and the people you have listed, so keep Emergency SOS Alerts on in Settings and keep your contacts current. <a href="/safety">More about safety and SOS</a>.</p>`,
  },
  {
    id: 'faq-sos-emergency', cat: 'sos',
    q: 'Does VerifyU replace emergency services?',
    a: `<p>No. VerifyU supports identification and communication — it helps connect a registered person to their identity information, their emergency information and the people they trust. It does not dispatch help, and it cannot guarantee that someone will be found, identified or reached.</p>
      <p>In an emergency, contact your local emergency services first. Use VerifyU alongside them, not instead of them.</p>`,
  },

  /* Medical profile */
  {
    id: 'faq-medical-what', cat: 'medical-profile',
    q: 'What should I put in my medical information?',
    a: `<p>Add what would genuinely help someone treating you in the first few minutes:</p>
      <ul>
        <li>Your blood group.</li>
        <li>Allergies, especially to medicines.</li>
        <li>Long-term conditions such as diabetes, epilepsy, asthma or a heart condition.</li>
        <li>Medicines you take regularly, and any implant or device.</li>
        <li>A short note on anything a helper should know immediately.</li>
      </ul>
      <p>Keep it short and current. This is emergency information, not a full medical record.</p>`,
  },
  {
    id: 'faq-medical-who', cat: 'medical-profile',
    q: 'Who can see my medical information?',
    a: `<p>Your blood group appears on your verified-profile header, beside your name and gender, so a helper has the detail that matters first. The Medical tab is protected: the app asks the helper to verify an OTP sent to one of your own emergency contacts before medical details open. Premium is described in the app as full medical data access.</p>
      <p>Profile access is logged and you are notified in the app when your profile is accessed. <a href="/trust">Read how access works in the Trust Centre</a>.</p>`,
  },

  /* Steps */
  {
    id: 'faq-steps-sync', cat: 'steps',
    q: 'Steps not syncing — what should I check?',
    a: `<p>The Steps tracker reads activity data from your phone, so syncing usually stops for one of four reasons:</p>
      <ul>
        <li><b>Open the app and use Sync Now</b> so today's activity is pulled in.</li>
        <li><b>Check activity permission.</b> On iPhone this is Motion &amp; Fitness; on Android it is Physical activity. Both must be allowed for VerifyU.</li>
        <li><b>Relax battery optimisation.</b> Aggressive battery saving or "restricted" background activity can stop the app counting in the background.</li>
        <li><b>Carry the phone.</b> Steps are counted by the phone you carry — a walk without it will not appear.</li>
      </ul>
      <p>Then reopen the app and sync again. If the count is still wrong the next day, send us your phone model and app version.</p>`,
  },
  {
    id: 'faq-steps-goal', cat: 'steps',
    q: 'How many coins do I get for the daily goal?',
    a: `<p>Under the current offer, 10,000 steps on an eligible day earns 5 VerifyU Coins. Eligibility depends on your activity syncing correctly, the permissions you have granted and the offer being shown in the app, and the app's confirmation is what counts.</p>
      <p>Rates and offers can change. <a href="/legal/rewards-terms">Read the Rewards Terms</a>.</p>`,
  },

  /* Coins */
  {
    id: 'faq-coins-history', cat: 'coins',
    q: 'Where can I see my VerifyU Coins?',
    a: `<p>Your balance is on the Step Counter screen — at the top and in the Coins tile — and in Settings beside Referral Rewards. It also appears at payment in Recharge &amp; Utilities, next to the Use Coins toggle. ${flag('Owner verification')} — whether the app has a separate coin history listing every credit, and where it sits, needs confirmation against the current app version.</p>
      <p>If a day's coins look wrong, check first that your steps synced for that day.</p>`,
  },
  {
    id: 'faq-coins-expiry', cat: 'coins',
    q: 'Do VerifyU Coins expire?',
    a: `<p>${flag('Owner verification')} — whether coins expire, and after how long, has not been confirmed and we will not guess. We will publish the rule here once it is confirmed by the VerifyU team.</p>
      <p>What is certain: coins have no cash value, are not a currency, security or investment, and cannot be withdrawn as cash. They can be put towards eligible payments in Recharge &amp; Utilities, subject to availability and limits.</p>`,
  },

  /* Recharge */
  {
    id: 'faq-recharge-use', cat: 'recharge',
    q: 'Where can I use my coins?',
    a: `<p>Eligible coins can be put towards payments in Recharge &amp; Utilities inside the app — mobile prepaid and postpaid, DTH and electricity — using the "Use Coins" option at payment.</p>
      <p>How much of a payment coins can cover depends on your balance, the operator and any limits shown at the time. The amount confirmed in the app is the amount that applies.</p>`,
  },
  {
    id: 'faq-recharge-pending', cat: 'recharge',
    q: 'Recharge pending — what should I do?',
    a: `<p>A pending recharge usually means the operator has not confirmed the transaction yet.</p>
      <ul>
        <li><b>Wait for the operator's confirmation</b> before trying again — repeating the payment can result in two recharges.</li>
        <li><b>Note the reference number</b> shown for the transaction in the app, and the date, time and amount.</li>
        <li><b>Check your operator balance or bill</b> directly to see whether the recharge has landed.</li>
        <li><b>Contact us with the reference number</b> if it is still unresolved and we will follow it up.</li>
      </ul>`,
  },

  /* Referral */
  {
    id: 'faq-referral', cat: 'referral',
    q: 'How do I invite someone to VerifyU?',
    a: `<p>Open Settings in the app and go to Referral Rewards. Generate your referral code, then use Share Referral to send it through WhatsApp or any other app on your phone. Your coin balance is shown in the same place, and Regenerate Referral Code replaces your code with a new one if you ever need to.</p>
      <p>The person you invite installs VerifyU, registers and enters your code. Referral rewards follow the in-app programme and can change. <a href="/legal/rewards-terms">Rewards Terms</a>.</p>`,
  },

  /* Subscription */
  {
    id: 'faq-subscription-manage', cat: 'subscription',
    q: 'Where do I manage or cancel my subscription?',
    a: `<p>If you subscribed through an app store, the subscription is managed and cancelled there — not inside VerifyU:</p>
      <ul>
        <li>iPhone and iPad: <a href="${APPLE_SUB}" target="_blank" rel="noopener">manage subscriptions on Apple</a>.</li>
        <li>Android: <a href="${GOOGLE_SUB}" target="_blank" rel="noopener">manage subscriptions on Google Play</a>.</li>
      </ul>
      <p>Cancelling stops the next renewal; access usually continues until the end of the period you have paid for, per the store's terms. Deleting the app does not cancel a subscription. <a href="/legal/billing">Subscription, billing and refunds</a>.</p>`,
  },
  {
    id: 'faq-refund', cat: 'subscription',
    q: 'Can I get a refund?',
    a: `<p>Purchases made through the Apple App Store or Google Play are handled by those stores, so refunds follow Apple's and Google's refund policies and are requested through them.</p>
      <p>For any other payment method, contact us with the transaction reference, the date and the amount and we will look into it. ${flag('Owner verification')} — VerifyU's own refund terms still need to be confirmed and published.</p>`,
  },

  /* Account */
  {
    id: 'faq-account-details', cat: 'account',
    q: 'How do I change my mobile number or personal details?',
    a: `<p>Your name, photo, personal details, contacts and medical information are edited in your profile inside the app.</p>
      <p>Changing the registered mobile number is different, because that number verifies your account. ${flag('Owner verification')} — whether the number can be changed in the app, and what proof is needed, needs confirmation. Until then, message us from your registered email with your registered number and we will tell you the current process.</p>`,
  },

  /* Privacy */
  {
    id: 'faq-privacy-use', cat: 'privacy',
    q: 'How is my information used?',
    a: `<p>VerifyU collects the information you enter — including your name, email, mobile number and facial data used for identity verification — together with usage, log, device and diagnostic information. It is used to create and manage your account, to verify identity, to provide support and to improve the app, as set out in the privacy policy.</p>
      <p>You can ask for access to your information, ask for it to be corrected, or ask for it to be deleted. <a href="/legal/privacy">Read the Privacy Policy summary</a> · <a href="/trust">Visit the Trust Centre</a>.</p>`,
  },

  /* Delete account */
  {
    id: 'faq-delete', cat: 'delete-account',
    q: 'How do I delete my account or my data?',
    a: `<p>Send a deletion request from your registered email, saying whether you want the whole account deleted or only particular information. We explain exactly what to include — and what not to include — on the deletion page.</p>
      <p><a href="/account-deletion">Request account or data deletion</a>. Remember that a paid subscription has to be cancelled separately with Apple or Google.</p>`,
  },
];

/* ---------------- Markup ---------------- */
const faqItem = (it) => `
<div class="acc-item" id="${it.id}" data-faq-item data-cat="${it.cat}">
  <h3 class="acc-h"><button class="acc-btn" type="button" aria-expanded="false" id="acc-b-${it.id}" aria-controls="acc-p-${it.id}">${it.q}<span class="plus">${icons.plus}</span></button></h3>
  <div class="acc-panel" id="acc-p-${it.id}" role="region" aria-labelledby="acc-b-${it.id}">
    <div><div class="body">
      ${it.a}
      <div class="faq-actions">
        <span>Was this helpful?</span>
        <button type="button" data-helpful="yes">Yes</button>
        <button type="button" data-helpful="no">No</button>
        <button type="button" data-share="${it.id}">Copy link</button>
      </div>
    </div></div>
  </div>
</div>`;

const search = `<div class="search">${icons.search}<input data-faq-search type="search" placeholder="Search answers — OTP, face verification, recharge…" aria-label="Search help articles"></div>`;

const body = `
${pageHero({
  eyebrow: 'Help Centre',
  title: 'How can we help?',
  lead: 'Answers to the questions people actually ask about registering, face verification, SOS, steps, coins and billing. If you cannot find it here, the team is a message away.',
  ctas: `<div class="sp-find">
    ${search}
    <div class="sp-topics">
      <span class="meta">Top topics</span>
      <div class="topics">${TOPICS.map(t => `<button type="button" data-faq-topic="${t}">${t}</button>`).join('')}</div>
    </div>
  </div>`,
})}

<section class="section is-tight sp-faq" aria-labelledby="faq-h">
  <div class="container is-narrow">
    <div class="sp-bar">
      <h2 class="h3" id="faq-h">Browse the answers</h2>
      <p class="small sp-count"><b data-faq-count>0</b> answers shown</p>
    </div>
    <div class="cats" role="group" aria-label="Filter answers by category">
      ${CATS.map(([k, label]) => `<button type="button" data-faq-cat="${k}" aria-selected="${k === 'all'}">${label}</button>`).join('')}
    </div>
    ${refNote}
    <div class="acc sp-acc mt-4" data-accordion>
      ${FAQ.map(faqItem).join('')}
    </div>
    <div class="sp-empty" data-faq-empty hidden>
      <div class="icon">${icons.search}</div>
      <h3 class="h4">No answers match that yet</h3>
      <p class="body">Try a shorter word, choose <b>All</b> above, or ask us directly — we would rather answer it than have you guess.</p>
      <div class="row mt-3"><a class="btn btn-primary btn-sm" href="#contact">Talk to the team ${icons.arrow}</a></div>
    </div>
  </div>
</section>

<section class="section is-cloud" id="contact" aria-labelledby="contact-h">
  <div class="container is-narrow">
    ${sectionHead({ eyebrow: 'Contact', title: 'Talk to the team', lead: 'Two ways to reach us. WhatsApp is usually the quickest, email is better when you need to attach something.' })}
    <div class="grid grid-2">
      <div class="card is-xl contact-card">
        <div class="icon is-teal">${icons.chat}</div>
        <h3 class="h4">WhatsApp support</h3>
        <p class="body">Message us with your question and we will pick it up from there.</p>
        <a class="big" href="${WA}" target="_blank" rel="noopener">${SITE.whatsapp}</a>
        <div class="row mt-2"><a class="btn btn-primary btn-sm" href="${WA}" target="_blank" rel="noopener">Message us on WhatsApp ${icons.arrow}</a></div>
      </div>
      <div class="card is-xl contact-card">
        <div class="icon">${icons.mail}</div>
        <h3 class="h4">Email support</h3>
        <p class="body">Write from the email address on your account so we can identify it quickly.</p>
        <a class="big" href="${MAIL}">${SITE.email}</a>
        <div class="row mt-2"><a class="btn btn-ghost btn-sm" href="${MAIL}">Email support ${icons.arrow}</a></div>
      </div>
    </div>
    <div class="sp-urgent mt-4">
      <span class="icon is-sos">${icons.sos}</span>
      <div>
        <h3 class="h4">This is app support, not an emergency channel</h3>
        <p class="body">This is app support, not an emergency response channel. Contact local emergency services if urgent assistance is needed.</p>
      </div>
    </div>
    ${refNote}
    <p class="small mt-3">Support hours and response times ${flag('Owner verification')} — these have not been confirmed, so we do not publish them yet.</p>
  </div>
</section>

${ctaBand({
  title: 'Still stuck?',
  copy: 'Send us what you were doing, your phone model and your app version — that is usually enough for us to help on the first reply.',
  primary: { t: 'Message us on WhatsApp', h: SITE.whatsappHref, ext: true },
  secondary: { t: 'Email support', h: MAIL },
})}
`;

const css = `
.sp-find{display:flex;flex-direction:column;gap:20px;flex:1 1 100%;max-width:680px}
.sp-find .search{width:100%;max-width:640px}
.sp-topics{display:flex;flex-direction:column;gap:10px}
.sp-topics .meta{color:var(--ink-4)}
.sp-bar{display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:12px;margin-bottom:18px}
.sp-count b{color:var(--ink);font-weight:600}
.sp-faq .cats{margin-bottom:18px}
.sp-acc .acc-item[hidden]{display:none}
.sp-acc .body{max-width:none}
.sp-acc .acc-panel .body ul{list-style:disc;padding-left:22px;margin:0 0 14px}
.sp-acc .acc-panel .body li{margin-bottom:6px}
.sp-acc .acc-panel .body p{margin:0 0 14px}
.sp-acc .acc-panel .body p:last-of-type{margin-bottom:0}
.sp-acc .acc-panel .body a{color:var(--purple);text-decoration:underline;text-underline-offset:3px}
.sp-acc .acc-panel .body .note{margin-top:14px}
.sp-empty{padding:48px 0 8px;text-align:center}
.sp-empty .icon{margin-inline:auto}
.sp-empty .body{margin-inline:auto}
.sp-empty .row{justify-content:center}
.sp-urgent{display:flex;gap:18px;align-items:flex-start;padding:24px;border-radius:var(--r-lg);background:#fff;border:1px solid var(--sos-50)}
.sp-urgent .icon{flex:none;margin-bottom:0}
.sp-urgent .body{margin-top:6px;font-size:15.5px}
@media (max-width:640px){
  .sp-find{gap:16px}
  .search{padding:4px 4px 4px 16px;gap:10px}
  .search input{height:44px;font-size:16px}
  .topics button{padding:9px 14px;font-size:13.5px}
  .sp-faq .cats{gap:6px;overflow-x:auto;flex-wrap:nowrap;padding-bottom:6px;scrollbar-width:none;-webkit-overflow-scrolling:touch}
  .sp-faq .cats::-webkit-scrollbar{display:none}
  .sp-faq .cats button{white-space:nowrap;flex:none}
  .acc-panel .body{padding-right:0}
  .sp-urgent{flex-direction:column;gap:12px;padding:20px}
}
`;

export default {
  path: '/support',
  nav: '',
  title: 'Help Centre',
  description: 'Answers to common VerifyU questions: registration and OTP, face verification, SOS, emergency contacts, steps and coins, recharge, billing and deletion.',
  body,
  css,
  jsonld: [
    breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Help Centre', path: '/support' }]),
    faqLd(FAQ.map(f => ({
      q: f.q,
      // Structured data carries the answer text only — not the review flags or the support note.
      a: f.a.replace(/<span class="flag"[\s\S]*?<\/span>/g, '').replace(/<p class="note">[\s\S]*?<\/p>/g, '').replace(/\s+/g, ' ').trim(),
    }))),
  ],
  priority: 0.8,
};
