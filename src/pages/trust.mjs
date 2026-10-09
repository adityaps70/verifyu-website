import { SITE, icons, note, flag, pageHero, ctaBand, breadcrumbLd, ORG_LD } from '../lib.mjs';

const REVIEWED = 'September 2026';
const POLICY = 'https://verifyu.in/privacy-policy/';
const SITEURL = 'https://verifyu.in/';

/* ---------- small builders ---------- */
const kv = (rows) => `<dl class="trust-kv">${rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>`;
const src = (t) => `<p class="tc-src">${icons.doc}<span>${t}</span></p>`;
const unknowns = (items) => `<div class="tc-unknown">
  <b class="tc-unknown-h">Not confirmed by the VerifyU team yet</b>
  <ul>${items.map(i => `<li>${i} ${flag()}</li>`).join('')}</ul>
</div>`;

/* ---------- sections ---------- */
const SECTIONS = [
  {
    id: 'face-biometrics', nav: 'Your face & biometrics', h: 'Your face &amp; biometrics',
    body: `
      <p class="body">Facial data is one of the categories the privacy policy says VerifyU collects, along with your name, email address, phone number and usage, log and device data. It is collected for identity verification — that is the purpose the policy states.</p>
      <p class="body">The privacy policy also states that your data is not shared with third-party service providers. VerifyU does not publish facial data, and verifyu.in states that your data is never publicly visible.</p>
      ${kv([
        ['What', 'A face image captured at registration and the facial data derived from it, as described in the privacy policy.'],
        ['Why', 'So a registered person can be identified in an emergency by a VerifyU user with scanning access.'],
        ['Who sees it', 'Not the public. A successful match shows emergency-relevant profile information to the scanning user — see “What a successful match may reveal”.'],
        ['Your control', 'You choose to register. You can request access, correction or deletion through the app settings or by contacting support, as the privacy policy describes.'],
      ])}
      ${src(`Per the privacy policy at <a href="${POLICY}" target="_blank" rel="noopener">verifyu.in</a>; “never publicly visible” as described on verifyu.in.`)}
      ${unknowns([
        'Whether VerifyU stores the face image, a mathematical face template, or both',
        'Whether face matching happens on the device or on VerifyU servers',
        'Whether any external face-recognition software or model provider is involved in processing',
        'How long facial data is kept after an account is deleted',
      ])}`,
  },
  {
    id: 'face-verification', nav: 'Face verification', h: 'Face verification',
    body: `
      <p class="body">Face verification is a step you complete yourself during registration. The app asks for camera access and guides you through on-screen prompts, after your mobile number, photo, personal details, emergency contacts and medical information have been added.</p>
      <p class="body">It is what links your face to the profile you created. Registration cannot be completed for someone without their participation in this step.</p>
      ${kv([
        ['What', 'A guided camera capture during registration, using the prompts shown in the app.'],
        ['Why', 'To confirm that the face on the profile belongs to the person registering it.'],
        ['Who sees it', 'VerifyU, for identity verification as stated in the privacy policy.'],
        ['Your control', 'You complete the step yourself, and you can stop at any point before submitting.'],
      ])}
      ${src('Per the in-app registration flow shown in the official VerifyU registration guide.')}
      ${unknowns([
        'Whether a liveness or anti-spoofing check is performed during verification',
        'Whether the verification capture is stored separately from your profile photo, or discarded after the check',
        'Whether re-verification is required after you change your profile photo',
        'Whether failed verification attempts are recorded, and for how long',
      ])}`,
  },
  {
    id: 'facial-matching', nav: 'Facial matching', h: 'Facial matching',
    body: `
      <p class="body">Matching is the emergency path: a VerifyU user with scanning access opens the scanner, and the capture is checked against registered VerifyU profiles. It works only where the person has already registered, the image is suitable and there is connectivity.</p>
      <p class="body">A match is a possibility, not a promise. VerifyU supports identification and communication — it does not replace emergency services and cannot guarantee that a person will be identified.</p>
      ${kv([
        ['What', 'A check of a captured face against registered profiles, initiated by a user with scanning access.'],
        ['Why', 'To connect a person who cannot communicate to their identity, emergency information and next of kin.'],
        ['Who sees it', 'The scanning user sees the result. The registered person is alerted in the app when their profile is accessed, as described on verifyu.in.'],
        ['Your control', 'Only registered profiles can be matched, and medical details on the profile that opens require an OTP verified from one of your own emergency contacts.'],
      ])}
      ${src(`Feature behaviour as described on <a href="${SITEURL}" target="_blank" rel="noopener">verifyu.in</a> and in the app store listings.`)}
      ${unknowns([
        'What happens to a scanned image when there is no match — whether it is stored, and for how long',
        'What accuracy or confidence threshold is used to declare a match, and how near-matches are handled',
        'Whether a match attempt against an unregistered face creates any record',
        'Whether repeated or bulk scanning by one account is rate-limited or blocked',
      ])}`,
  },
  {
    id: 'who-can-scan', nav: 'Who can scan', h: 'Who can scan',
    body: `
      <p class="body">Scanning is not open to the public and it is not a feature of the website. It is available inside the app to a VerifyU user with scanning access, and access depends on the plan.</p>
      <p class="body">That is the extent of what is publicly documented today. The rules that decide who is granted scanning access — and how that is checked — are not published, so we are not going to describe them as though they were.</p>
      ${kv([
        ['What', 'The ability to open the scanner in the VerifyU app and attempt a match.'],
        ['Why', 'So that a helper, responder or family member can identify someone who cannot speak for themselves.'],
        ['Who sees it', 'The scanning user sees only what a successful match is permitted to show.'],
        ['Your control', 'Profile access is logged and you are alerted in the app when your profile is accessed, as described on verifyu.in.'],
      ])}
      ${src('Per the current app store listings and the feature description on verifyu.in.')}
      ${unknowns([
        'The exact criteria for granting scanning access, and whether identity checks are performed on scanning users',
        'Whether organisations such as hospitals, police or event teams receive scanning access, and under what agreement',
        'Whether scanning access can be suspended or revoked, and who decides',
        'Whether a scanning user’s own identity is shown to the person whose profile was accessed',
      ])}`,
  },
  {
    id: 'successful-match', nav: 'What a successful match may reveal', h: 'What a successful match may reveal',
    body: `
      <p class="body">A successful scan opens a screen headed <b>Verified Profile</b>, marked “Scanned securely via VerifyU”. The header carries your photo, your name, your gender and your blood group, and behind it sit three tabs: Personal, Emergency and Medical.</p>
      <p class="body">Personal shows the details you entered, such as date of birth and age. Emergency lists the two contacts you chose — name, relation and phone number, each with a call button, under the label “Encrypted &amp; Private”. Medical does not open on its own: the app asks the person scanning to verify an OTP sent to one of your emergency contacts first. verifyu.in also states that your data is never publicly visible.</p>
      ${kv([
        ['What', 'A verified-profile header — photo, name, gender, blood group — plus Personal and Emergency tabs. Medical details are gated behind an OTP verified from one of your emergency contacts.'],
        ['Why', 'To help a stranger act correctly and contact the right people quickly, without handing over your whole medical history to do it.'],
        ['Who sees it', 'The VerifyU user with scanning access who made the match.'],
        ['Your control', 'What you put in your profile, and who you list as emergency contacts — because they are the people whose OTP unlocks the medical tab.'],
      ])}
      ${src(`Screen behaviour observed in the current app (demo account); “never publicly visible” as described on <a href="${SITEURL}" target="_blank" rel="noopener">verifyu.in</a>.`)}
      ${unknowns([
        'Whether the field list differs by the scanning user’s plan, role or organisation',
      ])}`,
  },
  {
    id: 'medical-information', nav: 'Medical information', h: 'Medical information',
    body: `
      <p class="body">Your profile can hold your blood group, relevant medical history and notes. You enter it during registration and can change it later. Premium is described in the app as full medical data access.</p>
      <p class="body">Two different things happen to it. Your <b>blood group</b> is shown up front on the verified-profile header, because it is the detail that changes what a helper does in the first few minutes. Everything under <b>Medical Details</b> is protected: when someone scans you, the app tells them “Medical information is protected” and asks them to verify an OTP sent to one of the emergency contacts you listed. The people you trust are the gate.</p>
      ${kv([
        ['What', 'Blood group, medical history and notes that you choose to add.'],
        ['Why', 'So a helper or clinician has useful information when you cannot give it yourself.'],
        ['Who sees it', 'Blood group: the scanning user, on the profile header. Medical details: only after an OTP from one of your emergency contacts is verified.'],
        ['Your control', 'You decide what to add, what to leave out, and who your emergency contacts are — they hold the key to the medical tab.'],
      ])}
      ${src('Blood-group display and the OTP gate observed in the current app (demo account); plan descriptions per the app and the store listings.')}
      ${unknowns([
        'The default visibility of medical information on a newly created profile',
        'Whether individual medical fields can be hidden separately, or only the section as a whole',
        'Whether medical information is stored separately from the rest of the profile, with tighter access controls',
      ])}`,
  },
  {
    id: 'emergency-contacts', nav: 'Emergency contacts', h: 'Emergency contacts',
    body: `
      <p class="body">Registration asks for two emergency contacts — their names, relation to you and phone numbers. They are the people a helper is meant to reach when you cannot make the call yourself, and they are also the people whose OTP unlocks your medical details.</p>
      <p class="body">In the app they sit under Emergency Contacts, marked “Encrypted &amp; Private”, each with their relation, their number and a call button beside it. Please tell the people you list that you have listed them, and check the numbers once a year. A contact who has changed their number is the most common way this quietly stops working.</p>
      ${kv([
        ['What', 'Two contacts: name, relation and phone number.'],
        ['Why', 'So the people who know you can be reached quickly in an emergency — and so someone who knows you can authorise access to your medical details.'],
        ['Who sees it', 'A scanning user, who sees the number in full with a call button, within the permitted VerifyU workflow; and the SOS alert flow when you trigger it.'],
        ['Your control', 'You choose the contacts and can change them in the app at any time.'],
      ])}
      ${src('Per the registration flow and the Emergency Contacts screen in the current app (demo account).')}
      ${unknowns([
        'Whether a person is notified or asked to consent when they are added as your emergency contact',
        'Whether an emergency contact can view any part of your profile',
        'Whether more than two contacts can be added on any plan',
      ])}`,
  },
  {
    id: 'location', nav: 'Location', h: 'Location',
    body: `
      <p class="body">The App Store privacy declaration for VerifyU lists Location — both precise and coarse — and Contact info as data linked to your identity. verifyu.in also states that scan logs include time, IP and location.</p>
      <p class="body">Location matters in two very different situations: an SOS you trigger, where sharing where you are is the point, and a scan of your profile, where the log records where the access happened.</p>
      ${kv([
        ['What', 'Precise and coarse location, as declared on the App Store listing, and location recorded in scan logs per verifyu.in.'],
        ['Why', 'To support emergency alerts and to record where a profile access took place.'],
        ['Who sees it', 'VerifyU; and your emergency contacts through the SOS and share-location actions you trigger.'],
        ['Your control', 'Location permission is granted, limited or withdrawn in your phone’s settings.'],
      ])}
      ${src(`Per the App Store privacy declaration for VerifyU and scan-log details as described on <a href="${SITEURL}" target="_blank" rel="noopener">verifyu.in</a>.`)}
      ${unknowns([
        'When location is actually collected — continuously, only in the app, or only during an SOS or a scan',
        'Whose location a scan log records: the scanning user’s device, the person being scanned, or both',
        'How long location data is retained, and whether it is separated from the rest of the profile',
        'Whether your location is ever shown to a scanning user',
      ])}`,
  },
  {
    id: 'scan-logging', nav: 'Scan / access logging', h: 'Scan / access logging',
    body: `
      <p class="body">verifyu.in states that scan logs include the time, IP address and location of the access. Logging is what makes access to your profile reviewable rather than invisible.</p>
      <p class="body">Usage, log and device data are also listed in the privacy policy among the categories VerifyU collects, for account management, support and improving the service.</p>
      ${kv([
        ['What', 'A record of profile access, including time, IP address and location, as described on verifyu.in.'],
        ['Why', 'Accountability: so an access to your profile can be examined afterwards.'],
        ['Who sees it', 'VerifyU. You are alerted in the app when your profile is accessed.'],
        ['Your control', 'You can ask VerifyU what has been recorded about your profile through privacy support.'],
      ])}
      ${src(`Scan-log contents as described on <a href="${SITEURL}" target="_blank" rel="noopener">verifyu.in</a>; log and device data per the privacy policy.`)}
      ${unknowns([
        'Whether the full access history is visible to you inside the app, and how far back it goes',
        'How long scan and access logs are retained',
        'Whether the log shows you who scanned your profile, or only that an access occurred',
        'Whether you can dispute or report an access you believe was improper, and what happens then',
      ])}`,
  },
  {
    id: 'notifications', nav: 'User notifications', h: 'User notifications',
    body: `
      <p class="body">verifyu.in states that you receive an in-app alert when your profile is accessed. The app also has push notifications and SOS alert preferences in its settings.</p>
      <p class="body">An alert is how you find out that the system did something on your behalf. We are not going to describe it as instant or guaranteed, because delivery depends on connectivity, permissions and your device.</p>
      ${kv([
        ['What', 'An in-app alert when your profile is accessed, plus notification and SOS alert settings.'],
        ['Why', 'So access to your identity is not silent.'],
        ['Who sees it', 'You, on your registered device.'],
        ['Your control', 'Notification preferences in the app and permissions on your phone.'],
      ])}
      ${src(`In-app access alert as described on <a href="${SITEURL}" target="_blank" rel="noopener">verifyu.in</a>; notification settings per the current app.`)}
      ${unknowns([
        'Whether the access alert is also delivered as a push notification, an SMS or an email',
        'Whether the access alert can be switched off, and whether emergency access can suppress it',
        'How quickly the alert is sent after an access, and what happens if your device is offline',
        'Whether your emergency contacts are notified when your profile is accessed',
      ])}`,
  },
  {
    id: 'children', nav: 'Children & guardian profiles', h: 'Children &amp; guardian profiles',
    body: `
      <p class="body">The privacy policy states that the service is intended for people aged 13 and over, and that children under 13 are covered through a parent’s or guardian’s account. Registration lets a parent add children’s details to their own profile.</p>
      <p class="body">A child who cannot explain who to call is exactly the person this is for — and also the person whose information most needs an adult in charge of it.</p>
      ${kv([
        ['What', 'Children’s details added by a parent or guardian to their own VerifyU profile.'],
        ['Why', 'So a separated or distressed child can be connected back to their family.'],
        ['Who sees it', 'A scanning user, within the permitted VerifyU workflow.'],
        ['Your control', 'The parent or guardian manages the dependant’s details and can change or remove them.'],
      ])}
      ${src(`Ages 13+ and parental accounts per the privacy policy at <a href="${POLICY}" target="_blank" rel="noopener">verifyu.in</a>; dependant details per the registration flow.`)}
      ${unknowns([
        'Whether a child’s face is registered and matchable, or only their details are stored',
        'What a scanning user sees when a child’s profile is matched',
        'What happens to a dependant profile when the child turns 13 or 18',
        'How age is checked at sign-up, and what happens if an under-13 registers independently',
      ])}`,
  },
  {
    id: 'data-storage', nav: 'Data storage', h: 'Data storage',
    body: `
      <p class="body">verifyu.in states that VerifyU’s servers are in India, on AWS. The privacy policy states that your data is not shared with third-party service providers.</p>
      <p class="body">Hosting location is a fair question to ask of any identity product, and it is the one infrastructure detail currently stated publicly. The rest of the picture is not published, so it is listed below as unconfirmed rather than described.</p>
      ${kv([
        ['What', 'Profile, facial, medical, contact, location and log data held by VerifyU.'],
        ['Why', 'To run the service described in the privacy policy: your account, support, improvement and identity verification.'],
        ['Who sees it', 'VerifyU. The privacy policy states data is not shared with third-party service providers.'],
        ['Your control', 'Access, correction and deletion requests through the app settings or privacy support.'],
      ])}
      ${src(`Servers in India on AWS as described on <a href="${SITEURL}" target="_blank" rel="noopener">verifyu.in</a>; sharing statement per the privacy policy.`)}
      ${unknowns([
        'The AWS region used, and whether any data is stored or backed up outside India',
        'Whether data is encrypted at rest, and with what key management',
        'Which sub-processors, if any, are used for hosting, analytics, messaging or crash reporting',
        'Whether any processing takes place outside India, for example by support staff or contractors',
      ])}`,
  },
  {
    id: 'retention', nav: 'Retention', h: 'Retention',
    body: `
      <p class="body">The privacy policy states that data is kept for as long as necessary for the purposes described, or as required by law, and is then deleted or anonymised.</p>
      <p class="body">That is the legal shape of the answer, not the operational one. No fixed retention period is published for any category of data, and we are not going to invent one here.</p>
      ${kv([
        ['What', 'Every category: account details, facial data, medical information, contacts, location and logs.'],
        ['Why', 'To provide the service and to meet legal obligations, per the privacy policy.'],
        ['Who sees it', 'VerifyU, for as long as the data is held.'],
        ['Your control', 'You can request deletion — see “Deletion” below.'],
      ])}
      ${src(`Retention language per the privacy policy at <a href="${POLICY}" target="_blank" rel="noopener">verifyu.in</a>.`)}
      ${unknowns([
        'The exact retention period for facial data',
        'The exact retention period for scan and access logs, and for location data',
        'What is retained after an account is deleted, and for how long',
        'What “anonymised” means in practice for face data, and whether anonymised records are kept indefinitely',
      ])}`,
  },
  {
    id: 'correction', nav: 'Correction', h: 'Correction',
    body: `
      <p class="body">The privacy policy states that you can access and correct your information through the app settings, or by contacting VerifyU.</p>
      <p class="body">Correction is not a formality on a safety product. An old phone number for a next of kin, or a blood group typed in a hurry, is the failure nobody notices until the day it matters.</p>
      ${kv([
        ['What', 'Your name, contact details, emergency contacts, medical information and dependants.'],
        ['Why', 'Because out-of-date emergency information is worse than none: it sends a helper in the wrong direction.'],
        ['Who sees it', 'You, in the app. Corrections apply to what a future match can show.'],
        ['Your control', 'Edit in the app settings, or write to privacy support if a field cannot be changed there.'],
      ])}
      ${src(`Access and correction rights per the privacy policy at <a href="${POLICY}" target="_blank" rel="noopener">verifyu.in</a>.`)}
      ${unknowns([
        'Which fields can be edited in the app and which require a support request',
        'Whether changing your profile photo requires face verification again',
        'How long a correction request takes to be actioned',
        'Whether a history of previous values is kept after a correction',
      ])}`,
  },
  {
    id: 'deletion', nav: 'Deletion', h: 'Deletion',
    body: `
      <p class="body">The Google Play data safety section states that users can request that their data be deleted. The privacy policy states that deletion can be requested through the app settings or by contacting VerifyU.</p>
      <p class="body">If you want to leave, you should be able to leave. Start at the account deletion page, which sets out the request route.</p>
      ${kv([
        ['What', 'Your account and the data held with it, including facial data.'],
        ['Why', 'Because registering was your choice, and so is stopping.'],
        ['Who sees it', 'Your privacy support request is handled by VerifyU.'],
        ['Your control', '<a class="link" href="/account-deletion">Request account deletion</a>, or write to <a class="link" href="mailto:' + SITE.email + '?subject=VerifyU%20deletion%20request">' + SITE.email + '</a>.'],
      ])}
      ${src(`Deletion request route per the Google Play data safety section and the privacy policy at <a href="${POLICY}" target="_blank" rel="noopener">verifyu.in</a>.`)}
      ${unknowns([
        'Whether a one-tap account deletion exists inside the app, or whether deletion is request-based only',
        'How long deletion takes once requested, and whether you receive confirmation when it is done',
        'Whether facial data is deleted immediately, or on the same schedule as the rest of the account',
        'What is retained after deletion for legal or log-keeping reasons',
      ])}`,
  },
  {
    id: 'security', nav: 'Security', h: 'Security',
    body: `
      <p class="body">The Google Play data safety section states that data is encrypted in transit. That is the only security property currently stated in a public source, and it is the only one we will state here.</p>
      <p class="body">VerifyU does not claim to be unhackable, 100% secure or end-to-end encrypted, and no security certification is claimed — we hold none that we can point to. Anyone telling you otherwise about this product is not speaking for us.</p>
      <p class="body">One label in the app needs saying out loud: the Medical Details card is marked “HIPAA Compliant”. HIPAA is a United States health-privacy law and is not the framework that governs an Indian service, so that label is with our legal team for review rather than offered here as a compliance claim. ${flag('Legal review')}</p>
      ${kv([
        ['What', 'The protection applied to your data in transit and at rest.'],
        ['Why', 'Because facial and medical data deserve serious handling.'],
        ['Who sees it', 'VerifyU staff access is not described in a public source; see below.'],
        ['Your control', 'Keep your device locked, your app updated and your emergency information current.'],
      ])}
      ${src('Encryption in transit per the Google Play data safety section for com.verifyu.app.')}
      ${unknowns([
        'Whether data is encrypted at rest, and how encryption keys are managed',
        'Which VerifyU staff can access profile, facial or medical data, and under what controls and logging',
        'Whether independent security testing or a penetration test has been carried out',
        'Whether a breach notification process exists, and how users would be informed',
        'Whether any security or privacy certification is held (none is claimed today)',
      ])}`,
  },
  {
    id: 'legal-requests', nav: 'Legal / government requests', h: 'Legal / government requests',
    body: `
      <p class="body">The privacy policy states that data may be retained where required by law. Beyond that, VerifyU does not currently publish a process for handling requests from police, courts or government bodies, and no transparency report is published.</p>
      <p class="body">We are saying that plainly rather than describing a process that we cannot show you.</p>
      ${kv([
        ['What', 'Requests from law enforcement, courts or government authorities for user data.'],
        ['Why', 'Legal obligations that apply to any company operating in India.'],
        ['Who sees it', 'Not published today.'],
        ['Your control', 'You can ask privacy support what has been disclosed about you.'],
      ])}
      ${src(`Legal retention language per the privacy policy at <a href="${POLICY}" target="_blank" rel="noopener">verifyu.in</a>.`)}
      ${unknowns([
        'Whether a formal process exists for receiving and reviewing government or police requests, and who reviews them',
        'Whether VerifyU requires a warrant, court order or other legal instrument before disclosing data',
        'Whether users are notified when their data is requested or disclosed, where the law permits',
        'Whether a transparency report will be published, and how often',
      ])}`,
  },
  {
    id: 'privacy-support', nav: 'Privacy support', h: 'Privacy support',
    body: `
      <p class="body">Ask us. Questions about your information, an access you did not expect, a correction, or a deletion request all go to the same place, and a person answers them.</p>
      ${kv([
        ['What', 'Privacy questions, access and correction requests, deletion requests and complaints.'],
        ['Why', 'Because a rights page that does not end in a working contact is decoration.'],
        ['Who sees it', `The VerifyU team at ${SITE.entity}.`],
        ['Your control', `Email <a class="link" href="mailto:${SITE.email}?subject=VerifyU%20privacy%20question">${SITE.email}</a> or message <a class="link" href="${SITE.whatsappHref}" target="_blank" rel="noopener">${SITE.whatsapp}</a> on WhatsApp.`],
      ])}
      ${src(`Contact details per the current site; rights per the privacy policy at <a href="${POLICY}" target="_blank" rel="noopener">verifyu.in</a>.`)}
      ${unknowns([
        'Whether a grievance officer or data protection officer is formally designated, and their name and contact',
        'The response time VerifyU commits to for privacy and deletion requests',
        'The escalation route if you are not satisfied with the response',
      ])}`,
  },
];

const toc = `<nav class="toc tc-toc" aria-label="Trust Centre sections">
  <div class="meta tc-toc-h">On this page</div>
  ${SECTIONS.map(s => `<a href="#${s.id}">${s.nav}</a>`).join('')}
</nav>`;

const body = `
${pageHero({
  dark: true,
  eyebrow: 'Trust Centre',
  title: 'What we know about <br>your information — and <br>what we don’t.',
  lead: 'Facial data, medical information and emergency contacts are as sensitive as personal data gets. This page states what is documented in VerifyU’s own sources, and marks every statement that still needs confirmation from our team.',
  ctas: `<a class="btn btn-white btn-lg" href="#face-biometrics">Start reading ${icons.arrow}</a><a class="btn btn-ghost btn-lg" href="/legal/privacy">Privacy policy</a>`,
})}

<section class="section is-tight tc-intro" aria-labelledby="how-read-h">
  <div class="container">
    <div class="tc-legend" data-reveal>
      <div class="tc-legend-col">
        <h2 class="h4" id="how-read-h">How to read this page</h2>
        <p class="body mt-2">Each section says what is known, where that knowledge comes from, and what has not been confirmed. Anything carrying an amber ${flag()} badge is a statement our engineering team has not yet verified — it is listed as an open question, not presented as fact.</p>
        <p class="body mt-3">VerifyU supports identification and communication. It does not replace emergency services, and it cannot guarantee that a person will be found, identified or reached.</p>
      </div>
      <div class="tc-legend-col">
        <div class="meta">Sources used on this page</div>
        <ul class="tc-sources mt-2">
          <li>${icons.doc}<span>The VerifyU privacy policy at <a href="${POLICY}" target="_blank" rel="noopener">verifyu.in</a></span></li>
          <li>${icons.doc}<span>Feature descriptions published on <a href="${SITEURL}" target="_blank" rel="noopener">verifyu.in</a></span></li>
          <li>${icons.doc}<span>The App Store privacy declaration for VerifyU</span></li>
          <li>${icons.doc}<span>The Google Play data safety section for com.verifyu.app</span></li>
        </ul>
        <p class="tc-reviewed meta mt-3">Last reviewed: ${REVIEWED}</p>
      </div>
    </div>
  </div>
</section>

<section class="section tc-main" aria-labelledby="tc-main-h">
  <div class="container">
    <h2 class="sr-only" id="tc-main-h">Your information, section by section</h2>
    <div class="trust-grid">
      ${toc}
      <div class="tc-body">
        ${SECTIONS.map(s => `<section class="trust-section" id="${s.id}" aria-labelledby="${s.id}-h">
          <h2 class="h3" id="${s.id}-h">${s.h}</h2>
          ${s.body}
        </section>`).join('')}
        <div class="tc-foot">
          ${note(`This page describes what is published today. Where a section is marked as unconfirmed, the honest answer is that we do not yet have it in writing from the people who build the system — and we would rather show the gap than fill it with reassuring language.`)}
          <p class="meta mt-3">Last reviewed: ${REVIEWED}</p>
          <div class="row mt-3">
            <a class="btn btn-ghost btn-sm" href="/legal/privacy">Privacy policy</a>
            <a class="btn btn-ghost btn-sm" href="/account-deletion">Account deletion</a>
            <a class="btn btn-ghost btn-sm" href="/support">Help Centre</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

${ctaBand({
  title: 'Questions about your information?',
  copy: 'A person reads these. Ask about an access you did not expect, a correction, or deletion.',
  primary: { t: 'Contact privacy support', h: `mailto:${SITE.email}?subject=VerifyU%20privacy%20question`, ext: false },
  secondary: { t: 'Request account deletion', h: '/account-deletion' },
})}
`;

const css = `
body[data-page="/trust"] .page-hero{position:relative;overflow:hidden}
body[data-page="/trust"] .page-hero .h1{max-width:18ch}
@media (max-width:640px){body[data-page="/trust"] .page-hero .h1 br{display:none}}
/* header sits over a dark hero on this page until it condenses into its white pill */
body[data-page="/trust"] .header:not(.is-compact) .brand{color:#fff}
body[data-page="/trust"] .header:not(.is-compact) .nav-link{color:rgba(255,255,255,.78)}
body[data-page="/trust"] .header:not(.is-compact) .nav-link:hover,
body[data-page="/trust"] .header:not(.is-compact) .nav-item.is-open > .nav-link{background:rgba(255,255,255,.1);color:#fff}
body[data-page="/trust"] .header:not(.is-compact) .nav-cta .btn-ghost{color:#fff;border-color:rgba(255,255,255,.3)}
body[data-page="/trust"] .header:not(.is-compact) .nav-toggle{color:#fff}
.tc-intro{padding-bottom:0}
.tc-legend{display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:clamp(24px,4vw,64px);padding:32px;border-radius:var(--r-xl);background:var(--cloud)}
.tc-legend .body{max-width:60ch}
.tc-sources{display:flex;flex-direction:column;gap:10px;font-size:14.5px;color:var(--ink-2)}
.tc-sources li{display:grid;grid-template-columns:18px minmax(0,1fr);gap:10px;align-items:start}
.tc-sources svg{width:16px;height:16px;color:var(--ink-4);margin-top:3px}
.tc-sources a{color:var(--purple);text-decoration:underline;text-underline-offset:3px}
.tc-reviewed{color:var(--ink-4)}
.tc-toc-h{margin:0 12px 8px;color:var(--ink-4)}
.tc-toc a{line-height:1.35}
.trust-section:first-child{border-top:0;padding-top:0}
.trust-section .trust-kv{padding:18px 20px;border-radius:var(--r-md);background:var(--cloud);margin-top:20px}
.trust-section .trust-kv a{color:var(--purple);text-decoration:underline;text-underline-offset:3px}
.tc-src{display:flex;gap:10px;align-items:flex-start;margin-top:16px;font-size:13.5px;color:var(--ink-3);line-height:1.5;max-width:70ch}
.tc-src svg{flex:none;width:15px;height:15px;margin-top:3px;color:var(--ink-4)}
.tc-src a{color:var(--ink-3);text-decoration:underline;text-underline-offset:3px}
.tc-unknown{margin-top:18px;padding:18px 20px;border-radius:var(--r-md);background:#FFFBF4;border:1px solid #F3E3CB;max-width:70ch}
.tc-unknown-h{display:block;font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#8A4B00;margin-bottom:10px}
.tc-unknown ul{display:flex;flex-direction:column;gap:10px}
.tc-unknown li{font-size:15px;color:var(--ink-2);line-height:1.5}
.tc-unknown .flag{margin-left:4px;padding:2px 7px;font-size:10.5px}
.tc-foot{margin-top:40px;padding-top:28px;border-top:1px solid var(--line)}
@media (max-width:900px){
  .tc-legend{grid-template-columns:1fr;padding:24px}
  .tc-toc{gap:8px;padding:16px;border-radius:var(--r-lg);background:var(--cloud);margin-bottom:8px}
  .tc-toc-h{width:100%;margin:0 0 2px}
  .tc-toc a{padding:8px 12px;border-radius:999px;background:#fff;border:1px solid var(--line);font-size:13px;min-height:36px;display:inline-flex;align-items:center}
  .tc-toc a:hover,.tc-toc a.is-active{background:var(--ink);border-color:var(--ink);color:#fff}
}
@media (max-width:640px){
  .trust-section{padding:28px 0}
  .tc-unknown,.trust-section .trust-kv{padding:16px}
}
`;

export default {
  path: '/trust',
  nav: '',
  title: 'Trust Centre',
  description: 'What VerifyU knows about your face, medical information, contacts, location and logs — what is documented, what you control, and what still needs confirmation.',
  body,
  css,
  priority: 0.8,
  jsonld: [breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Trust Centre', path: '/trust' }]), ORG_LD],
};
