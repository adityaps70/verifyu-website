import { SITE, icons, device, checks, note, flag, sectionHead, featureCard, accordion, pageHero, finalCta, breadcrumbLd } from '../lib.mjs';

/* Small, visually secondary disclaimer link — used once per section instead of paragraphs of terms. */
const terms = (label = 'Terms apply') => `<a class="rw-terms" href="/legal/rewards-terms">${label} <span aria-hidden="true">ⓘ</span><span class="sr-only">— read the VerifyU Rewards terms</span></a>`;

/* ---------- Real app screens (demo data) ---------- */
const shot = (src, alt) => `<img class="shot" src="${src}" alt="${alt}" width="722" height="1600" loading="lazy">`;
const stepsShot = shot('/images/app/steps.webp', 'VerifyU Step Counter with today’s steps, the steps left to earn a coin, distance, calories, coins, Sync Now and a weekly Steps Report');
const settingsShot = shot('/images/app/settings.webp', 'VerifyU Settings screen showing the Premium yearly benefits and Referral Rewards with the coin balance and a referral code');

const ELIGIBILITY = [
  { id: 'day', q: 'What makes a day eligible?', a: 'On an eligible day you reach the daily step goal shown in the app — currently 10,000 steps — with your step data synced to VerifyU on that day. The goal, the coin amount and the eligibility rules are set in the app and can change.' },
  { id: 'plan', q: 'Do I need Premium to earn coins?', a: `Registration is free and the Steps tracker is part of the app. Step rewards are described as subject to eligibility, so the offer that applies to you can depend on your plan, your app version and the offer running at the time. ${flag()}` },
  { id: 'limits', q: 'Do coins expire, and are there limits?', a: `Coins can carry validity periods, per-transaction caps and minimum-balance rules. The limits that apply to your account are shown in the app and set out in the rewards terms. ${flag()}` },
  { id: 'change', q: 'Can the offer change or stop?', a: 'Yes. The step goal, the number of coins, eligible categories and partner offers are current offers rather than a commitment. VerifyU can change, pause or withdraw them, as described in the rewards terms.' },
  { id: 'money', q: 'Are coins money, crypto or an investment?', a: 'No. VerifyU Coins are an in-app reward. They have no cash value, cannot be withdrawn or exchanged for money, and are not a currency, token, security or investment of any kind.' },
  { id: 'missing', q: 'My steps did not turn into coins. What now?', a: 'First check that the day synced: open the Steps tab, tap Sync Now and confirm that the activity permissions are still allowed on your phone. If a day is still missing, contact support with the date and we can look into it.' },
  { id: 'terms', q: 'Where are the full rewards terms?', a: 'The complete rules for earning, holding and spending VerifyU Coins are in the <a href="/legal/rewards-terms">VerifyU Rewards terms</a>. Recharge and utility payments are also subject to the biller’s own terms.' },
];

const body = `
${pageHero({
  eyebrow: 'VerifyU Rewards',
  title: 'Walk. Earn. Use.',
  lead: 'A daily reason to open VerifyU. Walking keeps you moving — and it keeps the profile that matters in an emergency current, checked and ready. Eligible days earn VerifyU Coins you can put towards everyday recharges.',
  ctas: `<a class="btn btn-primary btn-lg" href="${SITE.play}" target="_blank" rel="noopener">Get VerifyU — it’s free ${icons.arrow}</a>
         <a class="btn btn-ghost btn-lg" href="#how-coins">How coins work</a>`,
})}

<!-- THE LOOP -->
<section class="section rw-loop" id="how-coins" aria-label="How VerifyU Coins work">
  <div class="container">
    ${sectionHead({
      eyebrow: 'How coins work',
      title: 'From a daily walk<br>to a real recharge.',
      lead: 'The loop is deliberately small. Reach the daily step goal, earn coins on eligible days, and put them towards bills you already pay.',
    })}
    <div class="rw-stage">
      <div class="rw-cell" data-reveal>
        <span class="num">Walk</span>
        <div class="rw-fig">
          <div class="ring" data-coins-after="#rw-coins">
            <svg viewBox="0 0 120 120" aria-hidden="true"><defs><linearGradient id="ringGrad" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#632899"/><stop offset=".6" stop-color="#9A4DD9"/><stop offset="1" stop-color="#3AA9DC"/></linearGradient></defs><circle class="bg" cx="60" cy="60" r="52"/><circle class="fg" cx="60" cy="60" r="52" pathLength="1"/></svg>
            <div class="label"><b class="tnum" data-count="10000" data-dur="1800">0</b><small>steps</small></div>
          </div>
        </div>
        <p class="body">Reach the daily walking goal with the Steps tracker in the app.</p>
      </div>
      <span class="rw-arrow" aria-hidden="true">${icons.arrow}</span>
      <div class="rw-cell" data-reveal>
        <span class="num">Earn</span>
        <div class="rw-fig rw-coinwrap"><span class="coin" id="rw-coins"><i></i>+5 VerifyU Coins</span></div>
        <p class="body">An eligible day at 10,000 steps earns 5 VerifyU Coins under the current offer.</p>
      </div>
      <span class="rw-arrow" aria-hidden="true">${icons.arrow}</span>
      <div class="rw-cell is-use" data-reveal>
        <span class="num">Use</span>
        <p class="body">Apply eligible coins to recharges and eligible offers in Recharge &amp; Utilities.</p>
        <div class="rw-fig"><div class="rw-phone">${device({ src: '/images/app/recharge.webp', alt: 'VerifyU Recharge & Utilities screen with mobile, DTH and electricity options and a Use Coins toggle', cls: 'is-sm is-flat' })}</div></div>
      </div>
    </div>
    <div class="row mt-5">${terms()}</div>
    ${note('VerifyU Coins are an in-app reward. They have no cash value, cannot be exchanged for money and are not a currency, token or investment. Goals, coin values and eligible categories are current offers and can change.')}
  </div>
</section>

<!-- STEP TRACKING -->
<section class="section is-cloud" aria-label="Step tracking">
  <div class="container split">
    <div class="col-5" data-reveal="scale">
      <div class="rw-uiphone">${device({ inner: stepsShot, cls: 'is-sm is-flat' })}</div>
      <p class="rw-uicap small">The Step Counter in the app, shown with demo data.</p>
    </div>
    <div class="col-7">
      ${sectionHead({ eyebrow: 'Step tracking', title: 'Your steps, counted in the app.', lead: 'The Step Counter is where the day is counted. It is the only place a day becomes eligible.' })}
      ${checks([
        '<b>Steps today.</b> A ring shows the day’s count and how many steps are left to earn a coin, with distance, calories and your coin balance underneath.',
        '<b>Sync Now.</b> Tap Sync Now to bring the latest step count into VerifyU before the day ends.',
        '<b>Steps Report.</b> A weekly chart shows the last seven days, so a missed sync is easy to spot.',
        `<b>Permissions.</b> Step tracking depends on the activity and fitness permissions you allow on your phone, and on the app being able to read that data. ${flag()}`,
      ])}
      <div class="row mt-4">${terms()}</div>
      ${note('If permissions are switched off, or a day never syncs, that day may not be counted as eligible.')}
    </div>
  </div>
</section>

<!-- COIN HISTORY -->
<section class="section" aria-label="Coin history">
  <div class="container split">
    <div class="col-7">
      ${sectionHead({ eyebrow: 'Your balance', title: 'See what was actually credited.', lead: 'Steps on the tracker are progress. Coins are what has been credited to your balance — and the app shows both.' })}
      ${checks([
        '<b>Check credited coins.</b> Your balance travels with you: it sits on the Step Counter, in Settings beside Referral Rewards, and at payment in Recharge &amp; Utilities.',
        '<b>Progress is not a confirmed reward.</b> A step count on the tracker does not mean coins have been credited. Only credited coins can be used.',
        '<b>Offers change.</b> The rule that applies today is the one shown in the app, not the one you remember from last month.',
      ])}
      <div class="row mt-4">${terms()}</div>
      ${note('If a day looks missing, check that it synced before the day ended, then contact <a class="link" href="/support#contact">support</a> with the date.')}
    </div>
    <div class="col-5" data-reveal="scale">
      <div class="rw-uiphone">${device({ inner: settingsShot, cls: 'is-sm is-flat' })}</div>
      <p class="rw-uicap small">Settings in the app, shown with demo data.</p>
    </div>
  </div>
</section>

<!-- RECHARGE -->
<section class="section is-cloud" aria-label="Recharge">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Recharge & utilities',
      title: 'Spend coins on things you already pay for.',
      lead: 'Recharge &amp; Utilities is built into the app. Where a category, biller and amount are eligible on the day you pay, coins can reduce what you pay.',
    })}
    <div class="grid grid-4 rw-cats" data-stagger>
      ${featureCard({ icon: 'phone', title: 'Mobile prepaid', body: 'Recharge a prepaid number and apply eligible coins at checkout.' })}
      ${featureCard({ icon: 'recharge', title: 'Mobile postpaid', body: 'Pay a postpaid bill in the same flow, with the payable amount shown first.', iconCls: 'is-blue' })}
      ${featureCard({ icon: 'play', title: 'DTH', body: 'Top up a DTH connection with the operator and subscriber details you already have.', iconCls: 'is-teal' })}
      ${featureCard({ icon: 'home', title: 'Electricity', body: 'Pay an electricity bill in the same place. Billers depend on your location and app version.', iconCls: 'is-blue' })}
    </div>
    <div class="rw-panel mt-5" data-reveal>
      <h3 class="h4">Using coins at checkout</h3>
      ${checks([
        '<b>“Use Coins” toggle.</b> Turn Use Coins on in the payment step to apply your eligible coin balance to that transaction.',
        '<b>Check eligibility first.</b> Not every operator, plan or amount is eligible. The app confirms eligibility before you pay.',
        `<b>Limits and payable balance.</b> How many coins can be applied to a single transaction, and the amount still payable after coins, are shown before you confirm. ${flag()}`,
      ])}
      <div class="row mt-4">${terms()}</div>
    </div>
    ${note('Recharges and bill payments are also subject to the operator’s or biller’s own terms, and to successful payment.')}
  </div>
</section>

<!-- REFERRAL -->
<section class="section" aria-label="Referral rewards">
  <div class="container split">
    <div class="col-6">
      ${sectionHead({ eyebrow: 'Referral', title: 'Bring the people you’d want found.', lead: 'The most useful referral is a parent, a partner or a friend who has nobody listed as an emergency contact yet.' })}
      ${checks([
        '<b>Your own code.</b> Generate a referral code in Settings, share it from the app, and regenerate it whenever you want a fresh one.',
        `<b>Qualifying actions.</b> What counts as a completed referral, and any reward for it, are shown in the app at the time you share. ${flag()}`,
        '<b>Registration stays free.</b> The person you refer can register without paying anything.',
      ])}
      <div class="row mt-4">${terms()}</div>
    </div>
    <div class="col-6" data-reveal>
      <ol class="rw-steps">
        <li><div><b>Open Settings</b><span>Go to Settings in the VerifyU app.</span></div></li>
        <li><div><b>Referral Rewards</b><span>Open the Referral Rewards section.</span></div></li>
        <li><div><b>Generate your code</b><span>Create the referral code linked to your account.</span></div></li>
        <li><div><b>Share Referral</b><span>Send it to the people you want registered — or tap Regenerate Referral Code for a new one.</span></div></li>
      </ol>
      ${note('Referral rewards, where offered, depend on the offer running at the time and on the rewards terms.')}
    </div>
  </div>
</section>

<!-- PARTNER OFFERS -->
<section class="section is-cloud is-tight" aria-label="Partner offers">
  <div class="container is-narrow">
    <div class="rw-util card is-xl" data-reveal>
      <div class="icon">${icons.handshake}</div>
      <div>
        <div class="eyebrow">Partner offers</div>
        <h2 class="h3">Eligible partner offers, where available.</h2>
        <p class="body mt-2">Alongside recharge and utilities, coins may be usable on eligible partner offers where those offers are available to you. Offers differ by location, app version and the campaign running at the time, and they are listed in the app rather than promised here. ${flag()}</p>
        <div class="row mt-3">${terms()}<a class="btn btn-ghost btn-sm" href="/partners#brands">Own a business? List an offer ${icons.arrow}</a></div>
      </div>
    </div>
    ${note('VerifyU does not publish partner names on this page. Only the offers shown in your app apply to your account.')}
  </div>
</section>

<!-- ELIGIBILITY -->
<section class="section" aria-label="Eligibility and fair use">
  <div class="container is-narrow">
    ${sectionHead({ eyebrow: 'Eligibility', title: 'What counts, and what doesn’t.', lead: 'Rewards are a daily habit, not a financial product. Here is what that means in practice.' })}
    <div class="rw-example card is-xl" data-reveal>
      <span class="pill">Illustrative example — not a credited balance</span>
      <div class="rw-math">
        <div><b class="tnum">14</b><span>eligible days</span></div>
        <span class="op" aria-hidden="true">×</span>
        <div><b class="tnum">5</b><span>coins a day</span></div>
        <span class="op" aria-hidden="true">=</span>
        <div class="is-total"><b class="tnum">70</b><span>VerifyU Coins</span></div>
      </div>
      <p class="body">Fourteen eligible days at the current offer would add up to seventy coins. It is an example of the maths, not a balance, a projection or a promise of what you will earn.</p>
      <div class="row">${terms('Rewards terms apply')}</div>
    </div>
    <div class="mt-5">${accordion(ELIGIBILITY, 'single')}</div>
    ${note('VerifyU Coins have no cash value and are not a currency, token or investment. Earning and spending coins is subject to eligibility, limits and the rewards terms.')}
  </div>
</section>

${finalCta({ headline: 'Built for emergencies.<br>Useful every day.', copy: 'Register once. Walk every day. Keep the profile that matters up to date.' })}
`;

const css = `
@media (max-width:1024px){.rw-cats{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:520px){.rw-cats{grid-template-columns:1fr}}
.rw-stage{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1fr);align-items:stretch;gap:clamp(12px,1.8vw,28px)}
.rw-cell{position:relative;display:flex;flex-direction:column;align-items:center;text-align:center;gap:18px;padding:32px 24px;border-radius:var(--r-xl);background:var(--cloud);min-height:430px}
.rw-cell .num{align-self:flex-start;color:var(--purple);font-size:12.5px;letter-spacing:.14em;text-transform:uppercase}
.rw-cell .body{max-width:26ch;font-size:15.5px}
.rw-fig{flex:1;display:flex;align-items:center;justify-content:center;width:100%;min-height:200px}
.rw-fig .ring{max-width:196px}
.rw-coinwrap .coin{font-size:20px;padding:14px 22px;opacity:0;transform:scale(.7);transition:opacity .6s var(--ease),transform .8s var(--spring)}
.rw-coinwrap .coin.is-in{opacity:1;transform:none}
.rw-coinwrap .coin i{width:26px;height:26px}
.rw-cell.is-use{padding-bottom:0;overflow:hidden}
.rw-cell.is-use .rw-fig{align-items:flex-end}
.rw-phone{width:100%;max-width:186px;margin-bottom:-64px}
.rw-arrow{align-self:center;display:flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:999px;background:#fff;border:1px solid var(--line);color:var(--purple);flex:none}
.rw-arrow svg{width:18px;height:18px}
.rw-loop .note{margin-top:14px}
.rw-terms{display:inline-flex;align-items:center;gap:6px;min-height:44px;font-size:13.5px;font-weight:600;color:var(--ink-3)}
.rw-terms span[aria-hidden]{font-size:15px;line-height:1;color:var(--ink-4)}
.rw-terms:hover{color:var(--purple)}
.rw-terms:hover span[aria-hidden]{color:var(--purple)}
.rw-uiphone{max-width:260px;margin-inline:auto}
.rw-uicap{margin-top:14px;text-align:center}
.rw-panel{padding:32px;border-radius:var(--r-xl);background:#fff;border:1px solid var(--line)}
.rw-panel .h4{margin-bottom:18px}
.rw-util{display:grid;grid-template-columns:48px minmax(0,1fr);gap:24px;align-items:start}
.rw-util .icon{margin-bottom:0}
.rw-util + .note{margin-top:18px}
.rw-steps{counter-reset:rws}
.rw-steps li{display:grid;grid-template-columns:44px minmax(0,1fr);gap:18px;align-items:center;padding:16px 0;border-top:1px solid var(--line)}
.rw-steps li:last-child{border-bottom:1px solid var(--line)}
.rw-steps li::before{counter-increment:rws;content:counter(rws,decimal-leading-zero);display:flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:999px;background:var(--purple-50);color:var(--purple);font-family:var(--font-display);font-weight:700;font-size:13px}
.rw-steps b{display:block;font-family:var(--font-display);font-size:18px;font-weight:600;letter-spacing:-.015em}
.rw-steps span{font-size:15px;color:var(--ink-2)}
.rw-steps + .note{margin-top:20px}
.rw-example{display:flex;flex-direction:column;align-items:flex-start;gap:20px}
.rw-math{display:flex;flex-wrap:wrap;align-items:flex-end;gap:clamp(14px,2.4vw,32px)}
.rw-math > div{display:flex;flex-direction:column;gap:6px}
.rw-math b{font-family:var(--font-display);font-size:clamp(36px,4.6vw,52px);font-weight:700;letter-spacing:-.04em;line-height:1}
.rw-math span{font-size:13px;color:var(--ink-3)}
.rw-math .op{font-family:var(--font-display);font-size:24px;color:var(--ink-4);padding-bottom:6px}
.rw-math .is-total b{color:var(--purple)}
.rw-example .row{margin-top:-4px}
@media (max-width:1024px){
  .rw-stage{grid-template-columns:minmax(0,1fr);justify-items:stretch}
  .rw-cell{min-height:0}
  .rw-arrow{transform:rotate(90deg)}
  .rw-cell.is-use{padding-bottom:0}
  .rw-phone{margin-bottom:-56px}
}
@media (max-width:640px){
  .rw-panel{padding:24px}
  .rw-util{grid-template-columns:1fr;gap:16px}
  .rw-math{display:grid;grid-template-columns:auto minmax(0,1fr);align-items:end;gap:12px 14px}
  .rw-math > div:first-child{grid-column:1 / -1}
  .rw-math .op{font-size:22px;justify-self:center;padding-bottom:2px}
}
`;

export default {
  path: '/rewards',
  nav: '/rewards',
  title: 'Rewards',
  description: 'Walk, earn VerifyU Coins on eligible days and use them on mobile recharge, DTH and electricity — a daily reason to keep your safety profile up to date.',
  body,
  css,
  jsonld: breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Rewards', path: '/rewards' }]),
  priority: 0.8,
};
