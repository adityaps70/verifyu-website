import { readFileSync, existsSync } from 'node:fs';
import { SITE, icons, note, flag, pageHero, ctaBand, breadcrumbLd } from '../lib.mjs';

/* The Privacy Policy and the App Terms & Conditions are VerifyU's own published texts, kept verbatim in
   content/legal/*.html (copied from the original verifyu.in). They are split into sections at their headings
   only so the on-page navigation works — the wording is never changed here. */
const original = (name) => {
  const f = new URL(`../../content/legal/${name}.html`, import.meta.url);
  return existsSync(f) ? readFileSync(f, 'utf8').replace(/<!--[\s\S]*?-->/g, '').trim() : '';
};
const slug = (t) => t.replace(/<[^>]+>/g, '').toLowerCase().replace(/&[a-z]+;/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48) || 'section';
const plain = (t) => t.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
// Short label for the on-page navigation: drop clause numbers; long headings keep their first phrase.
const navLabel = (h) => { const t = plain(h).replace(/^\d+[.)]\s*/, ''); return t.length <= 32 ? t : t.split(/[,:—–]/)[0].trim(); };
function splitOriginal(html, overview = 'Overview') {
  // Top-level headings: the highest heading level the document uses, or whole-paragraph bold lines as a fallback.
  const level = ['h1', 'h2', 'h3', 'h4'].find(h => new RegExp(`<${h}[\\s>]`, 'i').test(html));
  const re = level ? new RegExp(`<${level}[^>]*>([\\s\\S]*?)<\\/${level}>`, 'gi')
                   : /<p[^>]*>\s*<(?:strong|b)>([\s\S]*?)<\/(?:strong|b)>\s*<\/p>/gi;
  const out = []; const seen = new Set(); let last = 0; let m; let pre = '';
  const push = (h, body) => { let id = slug(plain(h).replace(/^\d+[.)]\s*/, '')).replace(/^(\d)/, 's-$1'); while (seen.has(id)) id += '-2'; seen.add(id); out.push({ id, h, nav: navLabel(h), body }); };
  const marks = [];
  while ((m = re.exec(html))) marks.push({ start: m.index, end: re.lastIndex, h: m[1].trim() });
  if (!marks.length) return [{ id: 'policy', h: overview, nav: overview, body: html }];
  pre = html.slice(0, marks[0].start).trim();
  if (plain(pre)) push(overview, pre);
  marks.forEach((k, i) => push(k.h, html.slice(k.end, i + 1 < marks.length ? marks[i + 1].start : html.length).trim()));
  return out;
}

/* Five legal pages, built from one shared shell so the layout, the "last updated"
   line and the on-page navigation stay identical across the set. */

const UPDATED = 'Last updated: 11 November 2026';
const APPLE_SUB = 'https://support.apple.com/118428';
const GOOGLE_SUB = 'https://support.google.com/googleplay/answer/7018481';

const shell = ({ path, title, description, lead, intro, sections, status = '', priority = 0.5, updated = UPDATED }) => ({
  path,
  nav: '',
  title,
  description,
  priority,
  jsonld: breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Legal', path: '/legal/terms' }, { name: title, path }]),
  body: `
${pageHero({ eyebrow: 'Legal', title, lead })}

<section class="section is-tight">
  <div class="container">
    <div class="legal-grid">
      <nav class="toc" aria-label="On this page">
        <span class="meta lg-toc-h">On this page</span>
        ${sections.map(s => `<a href="#${s.id}">${s.nav || s.h}</a>`).join('')}
      </nav>
      <div class="prose lg-prose">
        ${updated ? `<p class="meta lg-updated">${updated}</p>` : ''}
        ${status}
        ${intro ? `<p class="lg-intro">${intro}</p>` : ''}
        ${sections.map(s => `<h2 id="${s.id}">${s.h}</h2>${s.body}`).join('')}
      </div>
    </div>
  </div>
</section>

${ctaBand({
    title: 'Need help with something here?',
    primary: { t: 'Contact support', h: '/support#contact', ext: false },
    secondary: { t: 'Trust Centre', h: '/trust' },
  })}
`,
});

const webIntro = (what) => `This page publishes ${what} on the web so you can read it in a browser, on any device, without opening the VerifyU app or creating an account.`;

const callout = (html) => `<div class="lg-callout">${html}</div>`;

const cssShared = `
.lg-toc-h{display:block;padding:8px 12px;color:var(--ink-4)}
.lg-updated{margin:0 0 18px;color:var(--ink-3);text-transform:none;letter-spacing:.02em;font-weight:500;font-size:13.5px}
.lg-intro{font-size:18px;color:var(--ink-2);padding-bottom:6px}
.lg-prose h2{scroll-margin-top:calc(var(--nav-h) + 24px)}
.lg-prose h2:first-of-type{margin-top:32px}
.lg-callout{margin:20px 0;padding:22px;border-radius:var(--r-lg);background:var(--cloud);border:1px solid var(--line)}
.lg-callout p{margin:0}
.lg-callout p + p{margin-top:10px}
.lg-callout .btn{margin-top:14px}
.lg-callout a.btn{text-decoration:none;color:#fff}
.lg-list{list-style:none;padding:0;margin:0}
.lg-list > li{padding:18px 0;border-top:1px solid var(--line)}
.lg-list > li:last-child{border-bottom:1px solid var(--line)}
.lg-list b{color:var(--ink)}
.lg-list .lg-src{display:block;margin-top:6px;font-size:14px;color:var(--ink-3);overflow-wrap:anywhere}
.lg-prose{overflow-wrap:break-word}
.lg-prose a{overflow-wrap:anywhere}
@media (max-width:900px){
  .lg-toc-h{width:100%;padding:0 0 4px}
  .toc{gap:6px}
  .toc a{border:1px solid var(--line);font-size:13.5px;padding:8px 12px}
}
@media (max-width:640px){
  .lg-prose{font-size:16px}
  .lg-callout{padding:18px}
  .lg-callout .btn{white-space:normal;text-align:center;line-height:1.35;height:auto;padding:14px 20px;width:100%}
  .lg-callout .btn svg{flex:none}
}
`;


/* ============================================================ (a) PRIVACY — VerifyU's published policy, verbatim */
const PRIVACY = original('privacy-policy');
if (!PRIVACY) throw new Error('content/legal/privacy-policy.html is missing — the Privacy Policy page needs the published text.');
const privacy = shell({
  path: '/legal/privacy',
  title: 'Privacy Policy',
  description: 'The VerifyU Privacy Policy: what information is collected, why it is collected, how it is used and protected, and the rights you have.',
  priority: 0.6,
  lead: 'What VerifyU collects, why it is collected, and what you can ask for.',
  updated: '',
  intro: '',
  sections: splitOriginal(PRIVACY),
});

/* ============================================================ (b) WEBSITE TERMS */
const terms = shell({
  path: '/legal/terms',
  title: 'Terms of Use',
  description: 'Terms for using the VerifyU website, with a link to the full Terms and Conditions for the VerifyU app.',
  priority: 0.6,
  lead: 'The terms that apply to this website. The VerifyU app has its own Terms &amp; Conditions.',
  intro: `These terms apply to the VerifyU website. The terms for the app are shown in the app under Settings → Terms &amp; Conditions and are published in full on the <a href="/legal/app-terms">App Terms &amp; Conditions</a> page.`,
  sections: [
    {
      id: 'website', h: 'Using this website', nav: 'Using this website',
      body: `
      <p>This website describes VerifyU and the company behind it, ${SITE.entity} You may read it, link to it and share it. You may not use it to break the law, to interfere with how it works, or to collect information about other people from it.</p>
      <p>The information here is published in good faith and kept as accurate as we can make it, but it describes a product that changes. Features, plans, prices and availability depend on your app version, your plan, the permissions you have granted and the terms shown in the app at the time. Where this website and the app disagree, the app and the in-app terms apply.</p>`,
    },
    {
      id: 'no-emergency', h: 'No emergency-service guarantee', nav: 'No emergency guarantee',
      body: `
      <p>VerifyU supports identification and communication. It does not replace emergency services, and it does not guarantee that a person will be found, identified or reached, or that any particular response will follow.</p>
      <p>Face matching depends on prior registration, a suitable image, connectivity and the scanning access of the person running the check. SOS depends on connectivity, permissions and the contacts you have listed. In an emergency, contact local emergency services.</p>
      ${note('Nothing on this website should be read as a promise of rescue, response time or outcome.')}`,
    },
    {
      id: 'ip', h: 'Intellectual property', nav: 'Intellectual property',
      body: `
      <p>The VerifyU name, logo, copy, design, illustrations and photographs on this website belong to ${SITE.entity} or are used with permission. You may quote short extracts with attribution and a link. You may not copy the site wholesale, reuse the brand, or present VerifyU material as your own.</p>
      <p>Press and media may use the material on the <a href="/press">Press &amp; Impact</a> page for coverage of VerifyU.</p>`,
    },
    {
      id: 'links', h: 'Links to other sites', nav: 'Links to other sites',
      body: `
      <p>This website links to app stores, news coverage and support pages run by Apple and Google. Those sites are not under VerifyU's control, and their own terms and privacy policies apply when you visit them. A link is not an endorsement of everything a third party publishes.</p>`,
    },
    {
      id: 'law', h: 'Governing law', nav: 'Governing law',
      body: `
      <p>These website terms are governed by and construed in accordance with the laws of India, as are the <a href="/legal/app-terms">App Terms &amp; Conditions</a>.</p>`,
    },
    {
      id: 'app-terms', h: 'The VerifyU app', nav: 'App terms',
      body: callout(`<p><b>Using the app?</b> The VerifyU app is covered by its own Terms &amp; Conditions, shown in the app under Settings → Terms &amp; Conditions.</p>
        <p><a class="btn btn-primary btn-sm" href="/legal/app-terms">Read the App Terms &amp; Conditions ${icons.arrow}</a></p>`),
    },
  ],
});

/* ============================================================ (b2) APP TERMS — VerifyU's published terms, verbatim */
const APP_TERMS = original('app-terms');
if (!APP_TERMS) throw new Error('content/legal/app-terms.html is missing — the App Terms page needs the published text.');
const appTerms = shell({
  path: '/legal/app-terms',
  title: 'App Terms & Conditions',
  description: 'The Terms and Conditions for using the VerifyU app.',
  priority: 0.6,
  lead: 'The terms that apply when you use the VerifyU app. They are also shown in the app under Settings → Terms &amp; Conditions.',
  updated: '',
  intro: '',
  sections: splitOriginal(APP_TERMS, 'Terms and Conditions'),
});

/* ============================================================ (c) REWARDS TERMS */
const rewards = shell({
  path: '/legal/rewards-terms',
  title: 'Rewards Terms',
  description: 'How VerifyU Coins work: 5 coins for 10,000 steps on an eligible day, eligibility, use in Recharge and Utilities, referral rewards and what coins are not.',
  priority: 0.6,
  lead: 'How VerifyU Coins are earned, what they can be used for, and what they are not.',
  intro: `${webIntro('the terms of the VerifyU rewards programme')} Rewards are a secondary part of VerifyU: they exist to give you a reason to open the app on an ordinary day, so your profile is current on the day it matters.`,
  sections: [
    {
      id: 'earning', h: 'Earning coins', nav: 'Earning coins',
      body: `
      <p>Under the current offer, reaching <b>10,000 steps on an eligible day earns 5 VerifyU Coins</b>. Steps are counted from the activity data on the phone you carry, synced through the Steps tracker in the app.</p>
      <p>This is the rate in effect today, not a permanent entitlement. The rate shown and confirmed in the app at the time is the rate that applies.</p>`,
    },
    {
      id: 'eligibility', h: 'Eligibility', nav: 'Eligibility',
      body: `
      <p>A day counts towards rewards only when all of the following are true:</p>
      <ul>
        <li>Your activity for that day has synced successfully in the app.</li>
        <li>The permissions the tracker needs are granted — Motion &amp; Fitness on iPhone, Physical activity on Android — and background activity is not blocked.</li>
        <li>The step-reward offer is shown as active in the app for your account and plan. Step rewards are subject to eligibility and may be tied to a Premium plan.</li>
      </ul>
      <p>Steps recorded while the app cannot sync, or activity that does not come from the phone you carry, may not count.</p>`,
    },
    {
      id: 'nature', h: 'What coins are — and are not', nav: 'What coins are not',
      body: `
      <p>VerifyU Coins are a loyalty balance inside the app. They:</p>
      <ul>
        <li>have <b>no cash value</b>;</li>
        <li>are <b>not a currency</b>, a security, a financial instrument or an investment;</li>
        <li>are <b>not cryptocurrency</b>, and are not tradable;</li>
        <li><b>cannot be withdrawn as cash</b>, transferred to another account or exchanged outside the app.</li>
      </ul>
      <p>Coins are not your property and confer no ownership right. They are a promotional benefit that VerifyU may change or end.</p>`,
    },
    {
      id: 'redemption', h: 'Using coins', nav: 'Using coins',
      body: `
      <p>Eligible coins can be put towards payments in <b>Recharge &amp; Utilities</b> inside the app — mobile prepaid and postpaid, DTH and electricity — using the "Use Coins" option at payment.</p>
      <p>Redemption is subject to availability of the service or operator, to any minimum or maximum shown at the time, and to the payable balance of the transaction. Coins may cover part of a payment rather than all of it. The amount confirmed in the app at the moment of payment governs.</p>
      <p>Recharges and utility payments are fulfilled by the operator or biller. Delays or failures at the operator's end are handled with the transaction reference — see <a href="/support#faq-recharge-pending">recharge pending</a> in the Help Centre.</p>`,
    },
    {
      id: 'referral', h: 'Referral rewards', nav: 'Referral rewards',
      body: `
      <p>Referral rewards follow the in-app programme found under Settings → Referral Rewards, where you can generate a code and share it. Rewards depend on the invited person installing VerifyU, registering and entering your code, and on the terms shown in the app when the referral is made.</p>
      <p>The referral rate, any cap on referrals, and the point at which a referral is treated as complete are set in the app and can change. ${flag('Owner verification')}</p>`,
    },
    {
      id: 'changes', h: 'Changes to the programme', nav: 'Changes',
      body: `
      <p>Rates, offers, eligibility rules and the list of ways to use coins can change, and the programme can be suspended or ended. Where a change materially affects coins you already hold, VerifyU will aim to make that clear in the app. ${flag('Owner verification')}</p>`,
    },
    {
      id: 'abuse', h: 'Misuse and fraud', nav: 'Misuse and fraud',
      body: `
      <p>Rewards are for genuine activity by a genuine registered user. Simulated or artificially generated step data, automation, multiple or fake accounts, tampering with the app, and abuse of the referral programme may lead to coins being voided or withheld and to the account being suspended. ${flag('Legal review')}</p>
      <p>Where coins have been earned or redeemed through such activity, VerifyU may reverse the balance.</p>`,
    },
    {
      id: 'limits', h: 'Validity and limits', nav: 'Validity and limits',
      body: `
      <p>Any validity period for coins, and any daily, monthly or per-account limit on earning or using them, is shown in the app. Coins may also be usable on eligible partner offers where those offers appear in the app for your account.</p>
      ${note('Where this page and the app differ, the confirmation shown in the app at the time of earning or redemption governs.')}`,
    },
  ],
});

/* ============================================================ (d) BILLING */
const billing = shell({
  path: '/legal/billing',
  title: 'Subscription, Billing, Cancellation & Refunds',
  description: 'VerifyU Premium is Rs 99 a month or Rs 999 a year. How store subscriptions renew, how to cancel with Apple or Google, and how refunds are handled.',
  priority: 0.6,
  lead: 'What Premium costs, how it renews, where to cancel it, and how refunds work.',
  intro: `${webIntro('the subscription, billing and cancellation terms')} Registration on VerifyU is free; Premium is optional.`,
  sections: [
    {
      id: 'plans', h: 'Plans and prices', nav: 'Plans and prices',
      body: `
      <p>VerifyU Premium is <b>₹99 per month</b> or <b>₹999 per year</b>. The yearly plan is cheaper than twelve monthly payments.</p>
      <p>Premium adds unlimited face verifications, full medical data access, step rewards subject to eligibility and ad-free usage. Registration and a basic profile remain free.</p>
      <p>Final pricing, applicable taxes and renewal terms are shown and confirmed in the app or by the app store before you pay. The figure confirmed at purchase governs. <a href="/pricing">Compare the plans</a>.</p>`,
    },
    {
      id: 'stores', h: 'Purchases are made through the app stores', nav: 'Where you bought it',
      body: `
      <p>Premium is bought as an in-app purchase through the Apple App Store or Google Play. Those stores take the payment, hold the payment method and issue the receipt. VerifyU does not see or store your card details.</p>
      <p>This also means the store — not VerifyU — is where the subscription is managed.</p>`,
    },
    {
      id: 'renewal', h: 'Auto-renewal', nav: 'Auto-renewal',
      body: `
      <p>Store subscriptions renew automatically at the end of each period unless you cancel, in line with the terms of the store you bought from. The store charges the payment method on file and notifies you according to its own policy.</p>
      <p>Cancelling stops the next renewal. Access normally continues to the end of the period you have already paid for. ${flag('Owner verification')}</p>`,
    },
    {
      id: 'cancel', h: 'How to cancel', nav: 'How to cancel',
      body: callout(`<p><b>Cancel where you bought it.</b> A subscription cannot be cancelled by deleting the app.</p>
        <p><a href="${APPLE_SUB}" target="_blank" rel="noopener">Manage or cancel subscriptions on Apple ${icons.arrowUpRight}</a></p>
        <p><a href="${GOOGLE_SUB}" target="_blank" rel="noopener">Manage or cancel subscriptions on Google Play ${icons.arrowUpRight}</a></p>`) + `
      <p>Cancel at least a day before the renewal date, as stores usually stop processing a cancellation shortly before renewal.</p>`,
    },
    {
      id: 'deletion', h: 'Deleting the app or your account does not cancel billing', nav: 'Deleting your account',
      body: `
      <p>This catches people out, so it is worth stating plainly: <b>removing the VerifyU app from your phone does not cancel a subscription, and neither does requesting account deletion.</b> The subscription lives with Apple or Google and continues to renew until you cancel it there.</p>
      <p>If you are closing your account, cancel the subscription with the store first, then <a href="/account-deletion">send your deletion request</a>.</p>`,
    },
    {
      id: 'refunds', h: 'Refunds', nav: 'Refunds',
      body: `
      <p><b>Purchases through the stores.</b> Refunds for App Store and Google Play purchases follow Apple's and Google's refund policies and are requested through the store that took the payment. VerifyU cannot issue a refund for a purchase it did not process.</p>
      <p><b>Other payment methods.</b> If you paid VerifyU by any other method, contact the team with the transaction reference, the date and the amount and we will look into it. ${flag('Owner verification')}</p>`,
    },
    {
      id: 'help', h: 'Getting billing help', nav: 'Getting help',
      body: `
      <p>Write to <a href="mailto:${SITE.email}?subject=VerifyU%20billing%20query">${SITE.email}</a> or message <a href="${SITE.whatsappHref}" target="_blank" rel="noopener">${SITE.whatsapp}</a> on WhatsApp.</p>
      ${note('Include your registered mobile number, the store you bought from and the transaction reference — never card numbers, CVV, UPI PINs or one-time passwords.')}`,
    },
  ],
});

/* ============================================================ (e) COMMUNITY GUIDELINES */
const community = shell({
  path: '/legal/community-guidelines',
  title: 'Community & Safety Champion Guidelines',
  description: 'How VerifyU Safety Champions and volunteers are asked to behave: let people choose, work within your role, protect other people’s information.',
  priority: 0.5,
  lead: 'How we ask Safety Champions, volunteers and community partners to behave when they represent VerifyU.',
  intro: `${webIntro('the guidelines for VerifyU Safety Champions and community volunteers')} They apply at registration drives, community events, campus programmes and anywhere someone is helping another person register.`,
  sections: [
    {
      id: 'principles', h: 'Three principles', nav: 'Three principles',
      body: `
      <h3>Let people choose</h3>
      <p>Registering is a decision about someone's face, their medical information and the people they trust. Explain what VerifyU does, answer the question, and accept "no" the first time it is said. Never pressure anyone, never register someone who has not understood what they are agreeing to, and never complete a registration on someone's behalf without their clear, present agreement.</p>
      <h3>Make the next step easier</h3>
      <p>Your job is to remove friction, not to sell. Help someone find good light for their photo, explain what a blood group field is for, remind them to tell the two people they list. Leave a person able to use the app on their own afterwards.</p>
      <h3>Work within your role</h3>
      <p>You are a volunteer helping people register and understand VerifyU. You are not emergency services, not a medical professional, not a police officer and not a VerifyU employee unless you are one. If a situation needs real help, call the people whose job it is.</p>`,
    },
    {
      id: 'conduct', h: 'Respectful conduct', nav: 'Respectful conduct',
      body: `
      <p>Treat everyone you meet through VerifyU — participants, families, partner staff and fellow volunteers — with courtesy and patience. Older people, people with disabilities and people who are unwell may need more time; give it to them.</p>
      <p>Harassment, discrimination, intimidation and unwanted physical contact have no place in this programme. Follow the rules of the venue or organisation hosting you. If you are asked to stop an activity, stop.</p>`,
    },
    {
      id: 'data', h: 'Other people’s information', nav: 'Other people’s information',
      body: `
      <p>When you help someone register, you are near sensitive information. Keep it that way — near them, not with you.</p>
      <ul>
        <li><b>Never ask for or note down someone's OTP, password or PIN.</b> A one-time password is for the person receiving it and nobody else. VerifyU will never ask you to collect one.</li>
        <li><b>Do not keep personal details.</b> No private lists of names, numbers, photographs, medical notes or emergency contacts on your own phone, paper or spreadsheet.</li>
        <li><b>Do not photograph anyone's screen or profile</b> and do not share images of a registration in progress.</li>
        <li><b>Hand the phone back.</b> The person's own device, in their own hands, for anything involving their data.</li>
      </ul>`,
    },
    {
      id: 'representing', h: 'Representing VerifyU accurately', nav: 'Representing VerifyU',
      body: `
      <p>Describe VerifyU as it is. It helps connect a registered person to their identity information, their emergency information and the people they trust, where the conditions allow — registration, a suitable image, connectivity, permissions and appropriate access.</p>
      <p>Do not promise rescue, response times, guaranteed identification or that the app "always works". Do not claim partnerships, hospital or government adoption, certifications or approvals. Do not invent statistics or cases. If someone asks a question you cannot answer accurately, say so and bring it to the team.</p>
      ${note('VerifyU supports identification and communication. It does not replace emergency services.')}`,
    },
    {
      id: 'report', h: 'Report concerns', nav: 'Report concerns',
      body: `
      <p>If you see something that worries you — pressure to register, data being collected outside the app, someone impersonating VerifyU, or conduct that breaks these guidelines — tell the team. Reporting is expected, not disloyal.</p>
      <p>Message <a href="${SITE.whatsappHref}" target="_blank" rel="noopener">${SITE.whatsapp}</a> or email <a href="mailto:${SITE.email}?subject=VerifyU%20community%20concern">${SITE.email}</a>. Describe what happened, where and when. Do not include anyone else's personal information in the report.</p>
      <p>Serious or repeated breaches may end a volunteer's participation in the programme.</p>
      <p><a href="/safety-champions">More about the Safety Champions programme</a>.</p>`,
    },
  ],
});

const pages = [privacy, terms, appTerms, rewards, billing, community];
pages[0].css = cssShared;

export default pages;
