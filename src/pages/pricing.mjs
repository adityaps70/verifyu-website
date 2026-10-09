import { SITE, icons, stores, checks, note, flag, sectionHead, accordion, pageHero, finalCta, breadcrumbLd, faqLd, APP_LD } from '../lib.mjs';

const APPLE_CANCEL = 'https://support.apple.com/118428';
const GOOGLE_CANCEL = 'https://support.google.com/googleplay/answer/7018481';

/* ---------- Feature comparison (real features only) ---------- */
const ROWS = [
  { f: 'Registered identity profile', d: 'Name, photo and verified status on your VerifyU profile', free: 'yes', prem: 'yes' },
  { f: 'Face identification', d: 'Your registered face can be matched by a VerifyU user with scanning access', free: 'yes', prem: 'yes' },
  { f: 'Emergency contacts', d: 'The people a helper should call', free: 'Two contacts', prem: 'Two contacts' },
  { f: 'Medical information', d: 'Blood group on the profile header; medical details open after an OTP from an emergency contact', free: 'Basic', prem: 'Full medical data access' },
  { f: 'SOS', d: 'Women Safety, Medical, Road Accident, Road Assistance and Fire, with the in-app alert flow', free: 'yes', prem: 'yes' },
  { f: 'Steps &amp; VerifyU Coins', d: 'Daily step tracking and coin rewards', free: `Subject to eligibility ${flag()}`, prem: 'Subject to eligibility' },
  { f: 'Recharge &amp; utilities', d: 'Mobile prepaid/postpaid, DTH and electricity with “Use Coins”', free: `yes ${flag()}`, prem: 'yes' },
  { f: 'Referral', d: 'Generate a code in Settings and share it', free: 'yes', prem: 'yes' },
  { f: 'Face verification limit', d: 'How many face verifications you can run from your account', free: `Limited ${flag('Exact number')}`, prem: 'Unlimited scans' },
  { f: 'Ad-free usage', d: 'Using the app without in-app advertising', free: 'no', prem: 'yes' },
  { f: 'Premium upgrades', d: 'Premium upgrades included for the period you have paid for', free: 'no', prem: 'yes' },
  { f: 'Language: English &amp; Hindi', d: 'Choose the app language in Settings', free: 'yes', prem: 'yes' },
];

const cell = (v) => v === 'yes'
  ? `<span class="yes" role="img" aria-label="Included">${icons.check}</span>`
  : v === 'no' ? `<span class="no" role="img" aria-label="Not included">—</span>` : `<span class="pr-val">${v}</span>`;

const FAQ = [
  {
    id: 'found', q: 'Can free users still be identified?',
    a: `Yes. Being found by a scan depends on being registered with a completed face verification — not on paying. A VerifyU user with scanning access can attempt a match against registered profiles whether the registered person is on Free or Premium. Matching still needs a suitable image, connectivity and the appropriate VerifyU access flow. ${flag()}`,
  },
  {
    id: 'sos', q: 'Does SOS work on the Free plan?',
    a: `Yes. SOS and its emergency categories are part of free registration, as are your two emergency contacts and your medical information. Emergency features are not behind the paywall. SOS depends on connectivity, the permissions you have allowed and your contacts being reachable. ${flag()}`,
  },
  {
    id: 'limited', q: 'What is limited on the Free plan?',
    a: `Three things. The number of face verifications you can run from your account is limited, medical-data access is at the basic level rather than the full level, and the app is not ad-free. ${flag('Exact free limit')}`,
  },
  {
    id: 'premium', q: 'What does Premium unlock?',
    a: 'The app describes the yearly plan as ad-free usage, full medical data access, unlimited scans and premium upgrades for the year. Everything in free registration stays exactly as it is.',
  },
  {
    id: 'unlimited', q: 'What does “unlimited scans” mean?',
    a: 'It refers to how many times the face verification flow can be run from your account, not to the outcome. No plan guarantees that a match will be found: matching requires prior registration, a suitable image, connectivity and the appropriate access flow.',
  },
  {
    id: 'medical', q: 'What changes for medical-information access?',
    a: 'Free registration covers recording your medical information — blood group, history and notes — and your blood group is shown on your verified-profile header either way. Premium is described in the app as full medical data access. Separately from any plan, medical details on a scanned profile stay protected: the helper is asked to verify an OTP sent to one of your emergency contacts before they open.',
  },
  {
    id: 'rewards', q: 'Are rewards part of Free or Premium?',
    a: `Step tracking and VerifyU Coins are part of the app, and step rewards are described as subject to eligibility — which can depend on the offer running, your app version and your plan. Coins have no cash value. The <a href="/rewards">Rewards page</a> explains the loop, and the <a href="/legal/rewards-terms">rewards terms</a> govern it. ${flag()}`,
  },
  {
    id: 'ads', q: 'What does ad-free usage mean?',
    a: 'Premium is described in the app as ad-free usage, meaning promotional placements are not shown to you inside the app. It does not change what the app does in an emergency.',
  },
  {
    id: 'cancel', q: 'Can I cancel Premium?',
    a: `Yes. Premium is a store subscription, so you cancel it where you bought it: on iPhone through <a href="${APPLE_CANCEL}" target="_blank" rel="noopener">Apple’s subscription settings</a>, on Android through <a href="${GOOGLE_CANCEL}" target="_blank" rel="noopener">Google Play subscriptions</a>. Deleting the app, or deleting your VerifyU account, does not cancel a subscription on its own. If you bought Premium another way, contact us at <a href="mailto:${SITE.email}">${SITE.email}</a> with your transaction reference.`,
  },
];

const planFree = `
<div class="plan" data-reveal>
  <div>
    <div class="eyebrow is-plain">Free registration</div>
    <div class="price">₹0 <small>to register</small></div>
    <p class="body mt-2">Everything a registered profile needs to be useful in an emergency.</p>
  </div>
  ${checks([
    '<b>Registered identity profile</b> with your photo and verified status',
    '<b>Two emergency contacts</b> with relationship and number',
    '<b>Medical information</b> including blood group and notes',
    '<b>Face verification</b> to link your face to your profile',
    '<b>SOS</b> with all five emergency types and the in-app alert flow',
    '<b>Steps &amp; VerifyU Coins</b>, subject to eligibility',
  ])}
  <div class="pr-foot">
    <a class="btn btn-primary" href="${SITE.play}" target="_blank" rel="noopener">Register for free ${icons.arrow}</a>
    <p class="small mt-2">Android &amp; iPhone · India</p>
  </div>
</div>`;

const planPremium = `
<div class="plan is-featured" data-reveal>
  <div>
    <div class="eyebrow is-plain">Premium</div>
    <div class="price"><span data-price data-monthly="₹99" data-yearly="₹999">₹99</span> <small data-price-period>/ month</small></div>
    <div class="save" data-price-save hidden>Save about 16% against 12 monthly payments</div>
    <p class="body mt-2">For people who use VerifyU often, and want more of it.</p>
  </div>
  ${checks([
    '<b>Unlimited scans</b> — unlimited face verifications from your account',
    '<b>Full medical data access</b>',
    '<b>Ad-free usage</b> across the app',
    '<b>Premium upgrades</b> for the period you have paid for',
    'Everything in free registration stays included',
  ])}
  <div class="pr-foot">
    <div class="pr-inapp">
      <span class="meta">View this plan in the app</span>
      ${stores()}
    </div>
    <p class="small mt-2">Premium is purchased inside the app through Google Play or the App Store.</p>
  </div>
</div>`;

const body = `
${pageHero({
  eyebrow: 'Pricing',
  title: 'Free to register.<br>Premium when you want more.',
  lead: 'Registering yourself costs nothing, and the emergency parts of VerifyU come with it. Premium adds unlimited scans, full medical data access and an ad-free app.',
  ctas: `<a class="btn btn-primary btn-lg" href="${SITE.play}" target="_blank" rel="noopener">Register for free ${icons.arrow}</a>
         <a class="btn btn-ghost btn-lg" href="#compare">Compare the plans</a>`,
})}

<!-- PLANS -->
<section class="section is-cloud" aria-label="Plans">
  <div class="container">
    <div class="pr-toggle" data-reveal>
      <div class="tabs" data-tabs data-price-toggle role="tablist" aria-label="Billing period">
        <span class="ind"></span>
        <button role="tab" aria-selected="true" aria-controls="pp-m" id="pt-m">Monthly</button>
        <button role="tab" aria-selected="false" aria-controls="pp-y" id="pt-y">Yearly <span class="pill is-teal" style="margin-left:6px">Save 16%</span></button>
      </div>
      <div class="sr-only" id="pp-m" role="tabpanel" aria-labelledby="pt-m">Premium prices are shown per month.</div>
      <div class="sr-only" id="pp-y" role="tabpanel" aria-labelledby="pt-y" hidden>Premium prices are shown per year.</div>
    </div>
    <div class="plans mt-5">
      ${planFree}
      ${planPremium}
    </div>
    <div class="pr-callout mt-5" data-reveal>
      <div class="icon is-sos">${icons.sos}</div>
      <div>
        <h2 class="h4">Emergency features are not behind the paywall.</h2>
        <p class="body mt-2">Being identified by a scan, your emergency contacts, your medical information and SOS all work on the free plan. What they depend on is registration, a completed face verification, connectivity and the permissions you allow — not your plan. ${flag()}</p>
      </div>
    </div>
    ${note('VerifyU supports identification and communication. It does not replace emergency services and cannot guarantee that a person will be found, identified or reached.')}
  </div>
</section>

<!-- COMPARISON -->
<section class="section" id="compare" aria-label="Plan comparison">
  <div class="container">
    ${sectionHead({ eyebrow: 'Compare', title: 'What you get on each plan.', lead: 'The same registered profile powers both plans. Premium changes how much you can use it, not what it is for.' })}
    <p class="small hide-d mb-2">Swipe the table sideways to compare →</p>
    <div class="table-wrap pr-wrap" data-reveal>
      <table class="table pr-table">
        <caption>VerifyU feature comparison: free registration and Premium</caption>
        <thead>
          <tr><th scope="col">Feature</th><th scope="col">Free registration</th><th scope="col">Premium</th></tr>
        </thead>
        <tbody>
          ${ROWS.map(r => `<tr>
            <th scope="row"><b>${r.f}</b><span class="pr-desc">${r.d}</span></th>
            <td>${cell(r.free)}</td>
            <td>${cell(r.prem)}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
    ${note('Feature availability depends on your app version, your permissions and the plan active on your account. Rewards are subject to eligibility and the rewards terms.')}
  </div>
</section>

<!-- FAQ -->
<section class="section is-cloud" aria-label="Pricing questions">
  <div class="container is-narrow">
    ${sectionHead({ eyebrow: 'Questions', title: 'Straight answers about plans.', lead: 'The questions people ask before paying — and before deciding not to.' })}
    ${accordion(FAQ, 'single')}
    <div class="pr-fine mt-5">
      ${note(`Prices shown are as published on the website and in the store listings: ₹99 and ₹999 are confirmed in the App Store in-app purchase list. Confirm the final price, applicable taxes and renewal terms in the app before you subscribe.`)}
      ${note(`Cancelling: manage or cancel your subscription through <a href="${APPLE_CANCEL}" target="_blank" rel="noopener">Apple</a> or <a href="${GOOGLE_CANCEL}" target="_blank" rel="noopener">Google Play</a>. Deleting the app or your VerifyU account does not cancel a store subscription. For anything else, email <a href="mailto:${SITE.email}">${SITE.email}</a> with your transaction reference.`)}
    </div>
  </div>
</section>

${finalCta({ headline: 'Free to register.<br>Ready when it matters.', copy: 'Register yourself today. Decide about Premium later — the emergency parts are already yours.' })}
`;

const css = `
.pr-toggle{display:flex;justify-content:center}
.pr-toggle .tabs button{height:40px;white-space:nowrap}
.pr-toggle .pill{padding:4px 8px;font-size:11.5px}
.plan .eyebrow{margin-bottom:14px}
.plan .price{margin-top:4px}
.plan .checks{flex:1}
.pr-foot{margin-top:4px}
.pr-inapp{display:flex;flex-direction:column;gap:10px}
.pr-inapp .meta{color:var(--ink-3)}
.pr-callout{display:grid;grid-template-columns:48px minmax(0,1fr);gap:24px;align-items:start;max-width:900px;margin-inline:auto;padding:28px;border-radius:var(--r-xl);background:#fff;border:1px solid var(--line)}
.pr-callout .icon{margin-bottom:0}
.pr-callout + .note{max-width:900px;margin-inline:auto;margin-top:18px}
.pr-wrap{position:relative;border-radius:var(--r-md)}
.pr-wrap caption{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;text-align:left}
.pr-table{min-width:620px}
.pr-table th[scope="row"]{width:38%;font-weight:600;color:var(--ink);font-size:15px;letter-spacing:0;text-transform:none}
.pr-table th[scope="row"] b{display:block;font-weight:600}
.pr-desc{display:block;margin-top:4px;font-size:13px;font-weight:400;color:var(--ink-3);letter-spacing:0;text-transform:none;line-height:1.45}
.pr-table td{font-size:15px;color:var(--ink-2)}
.pr-table .yes{display:inline-flex;align-items:center}
.pr-table .yes svg{width:20px;height:20px}
.pr-table .no{font-size:18px}
.pr-val{display:inline-block;line-height:1.4}
.pr-table tbody tr:hover{background:var(--cloud)}
.pr-fine .note + .note{margin-top:12px}
.pr-fine a{color:var(--purple);text-decoration:underline;text-underline-offset:3px}
.acc .body a{color:var(--purple);text-decoration:underline;text-underline-offset:3px}
@media (max-width:768px){
  .pr-callout{grid-template-columns:1fr;gap:16px;padding:24px}
  .plan{padding:28px}
}
`;

export default {
  path: '/pricing',
  nav: '',
  title: 'Pricing',
  description: 'VerifyU pricing: free registration covers identity, emergency contacts, medical information and SOS. Premium is ₹99 a month or ₹999 a year, bought in the app.',
  body,
  css,
  jsonld: [breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Pricing', path: '/pricing' }]), faqLd(FAQ), APP_LD],
  priority: 0.8,
};
