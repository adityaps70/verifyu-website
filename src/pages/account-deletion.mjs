import { SITE, icons, note, flag, checks, sectionHead, pageHero, ctaBand, breadcrumbLd } from '../lib.mjs';

/* Public account & data deletion route. Google Play requires a deletion request
   resource that can be reached on the web, without installing the app. */

const BODY = [
  'Registered mobile number:',
  'Registered email:',
  'Request: delete my account / delete specific data:',
  'If specific data, what should be deleted:',
  'Reason (optional):',
  '',
  'I confirm this request is made by me, the registered VerifyU user.',
].join('%0A');

const MAILTO = `mailto:${SITE.email}?subject=VerifyU%20account%20or%20data%20deletion%20request&body=${BODY}`;

const STEPS = [
  {
    n: '01',
    t: 'Identify your account',
    b: `Write to us <b>from the email address registered on your VerifyU account</b> and include your <b>registered mobile number</b> in the message. That number is how your profile is identified, so a request without it takes longer to match.`,
    list: [
      'Send it from your registered email address.',
      'Include the registered mobile number, with country code.',
      'Use one message per account — do not combine requests for several people.',
    ],
  },
  {
    n: '02',
    t: 'Say what you want deleted',
    b: `Be specific about the scope. Deleting the <b>whole account</b> removes your VerifyU profile and you will no longer be able to use the app with it: face verification, emergency contacts, medical information and rewards all go with it, and any VerifyU Coins are lost.`,
    list: [
      'Whole account — your profile is closed and the app can no longer be used with it.',
      'Particular information only — for example a medical note, a dependant’s details or an emergency contact.',
      'If you only want to correct something, ask for a correction instead of a deletion.',
    ],
  },
  {
    n: '03',
    t: 'Verification and retention',
    b: `The team will confirm that the request genuinely comes from the registered user before acting on it, and will tell you what that involves. Some information may be retained where it is required for legal or regulatory reasons, as described in the privacy policy; the rest is deleted or anonymised.`,
    list: [
      'Expect a verification step — we will explain what is needed when we reply.',
      'Some records may be retained where the law requires it.',
      'Once an account is deleted, it cannot be restored.',
    ],
  },
];

const body = `
${pageHero({
  eyebrow: 'Account & data',
  title: 'Account &amp; Data Deletion',
  lead: 'You can ask VerifyU to delete your account, or to delete particular information from it. Here is exactly how to make that request and what happens next — no app install required.',
  ctas: `<a class="btn btn-primary btn-lg" href="${MAILTO}">Start a deletion request ${icons.arrow}</a>
    <a class="btn btn-ghost btn-lg" href="#what-happens">What gets deleted</a>`,
})}

<section class="section is-tight" aria-labelledby="steps-h">
  <div class="container is-narrow">
    ${sectionHead({ eyebrow: 'How to request', title: 'Three things to include', lead: 'Send one email with all three and we can act on it without a chain of follow-up questions.' })}
    <ol class="steps3 ad-steps" data-stagger>
      ${STEPS.map(s => `<li>
        <span class="num">${s.n}</span>
        <div>
          <h3 class="h4">${s.t}</h3>
          <p class="body">${s.b}</p>
          ${checks(s.list)}
        </div>
      </li>`).join('')}
    </ol>

    <div class="ad-cta mt-5" id="request">
      <div>
        <h3 class="h3">Send your deletion request</h3>
        <p class="body mt-2">This opens your email app with the subject and a template already filled in. Complete the blanks before sending.</p>
        <div class="row mt-3">
          <a class="btn btn-primary" href="${MAILTO}">Email ${SITE.email} ${icons.arrow}</a>
          <a class="btn btn-ghost" href="/support#contact">Other ways to contact us</a>
        </div>
      </div>
      <pre class="ad-template" aria-label="Template of the deletion request email">Subject: VerifyU account or data deletion request

Registered mobile number:
Registered email:
Request: delete my account / delete specific data:
If specific data, what should be deleted:
Reason (optional):

I confirm this request is made by me,
the registered VerifyU user.</pre>
    </div>

    <p class="small mt-4">Whether deletion can be started from inside the app is being confirmed ${flag('Owner verification')} — so this page describes the email route, which works on any device and does not depend on your app version.</p>
  </div>
</section>

<section class="section is-cloud" id="what-happens" aria-labelledby="what-h">
  <div class="container is-narrow">
    ${sectionHead({ eyebrow: 'Before you send', title: 'Three things worth knowing', lead: 'Deletion is final, it does not stop a subscription, and some things should never go in the request.' })}
    <div class="grid grid-3">
      <div class="card">
        <div class="icon">${icons.recharge}</div>
        <h3 class="h4">Cancel a paid subscription separately</h3>
        <p class="body">Premium is billed by Apple or Google. Deleting your account does not cancel it — cancel with the store first, or it keeps renewing. <a class="link" href="/legal/billing">Subscription &amp; billing ${icons.arrow}</a></p>
      </div>
      <div class="card">
        <div class="icon is-sos">${icons.lock}</div>
        <h3 class="h4">Never include secrets</h3>
        <p class="body">Do not put OTPs, passwords, payment PINs, card numbers or full medical records in your request. We never need them, and email is not the place for them.</p>
      </div>
      <div class="card">
        <div class="icon is-teal">${icons.log}</div>
        <h3 class="h4">What we do with the request</h3>
        <p class="body">We confirm it is really you, action the deletion, and keep only what the law requires us to keep, as set out in the <a class="link" href="/legal/privacy">Privacy Policy</a>.</p>
      </div>
    </div>
    <p class="small mt-4">How quickly a deletion request is acknowledged and completed ${flag('Owner verification')} — we would rather publish nothing than publish a timeline the team has not committed to.</p>
    ${note('Deleting your VerifyU account removes the emergency information and contacts a helper could otherwise have reached. If the profile is for a parent or a dependant, consider updating it instead.')}
  </div>
</section>

${ctaBand({
  title: 'Changed your mind?',
  copy: 'Your profile only helps if it exists. Keep it current instead.',
  primary: { t: 'Update my details in the app', h: SITE.play, ext: true },
  secondary: { t: 'Help Centre', h: '/support' },
})}
`;

const css = `
.ad-steps > li{align-items:flex-start;padding:28px 0}
.ad-steps .checks{margin-top:16px;gap:10px}
/* .steps3 li sets a rule + padding on every descendant li — undo it inside the check lists */
.ad-steps .checks li,.ad-steps .checks li:last-child{border:0;padding:0;gap:12px;font-size:15px}
.ad-cta{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(20px,3vw,40px);align-items:center;padding:clamp(24px,3vw,36px);border-radius:var(--r-xl);background:var(--cloud)}
.ad-template{margin:0;padding:20px;border-radius:var(--r-lg);background:#fff;border:1px solid var(--line);font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:13px;line-height:1.65;color:var(--ink-2);white-space:pre-wrap;overflow-wrap:anywhere}
@media (max-width:768px){
  .ad-cta{grid-template-columns:1fr}
  .ad-cta .btn{width:100%}
  .ad-template{font-size:12.5px;padding:16px}
}
`;

export default {
  path: '/account-deletion',
  nav: '',
  title: 'Account & Data Deletion',
  description: 'How to ask VerifyU to delete your account or particular data: what to include, how the request is verified, what is kept, and cancelling a subscription.',
  body,
  css,
  jsonld: breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Account & Data Deletion', path: '/account-deletion' }]),
  priority: 0.6,
};
