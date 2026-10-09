# VerifyU website revamp — verification report

Prepared 13 September 2026 for the VerifyU / Beaufort IT Solutions team. Everything below is either a fact that must be confirmed before launch, or a discrepancy found between VerifyU's public channels. Items marked on the site with the amber **Owner verification** badge correspond to this list. Once an item is confirmed, delete the badge (search the page source for `flag(`) or correct the copy.

## 1. Claims that need owner confirmation before publication

### Product behaviour (confirm with engineering)
1. SOS: the five emergency types are confirmed from the app (Women Safety, Medical, Road Accident, Road Assistance, Fire). Still to confirm: exactly what an alert sends (contacts, location?) and what "Emergency SOS Alerts" notifications include.
2. Women's safety: what the personal-safety alert does and whether location is included.
3. Free-plan limits: the exact face-verification limit on Free, and whether scanning access differs by plan.
4. "Identification and SOS work on the Free plan" — the current site implies this; confirm.
5. Confirmed from the app: a successful scan shows a "Verified Profile" with photo, name, gender and blood group, Emergency contacts with call buttons, and medical details only after an OTP from an emergency contact. Still to confirm: whether the field list differs by the scanner's plan/role.
6. Scan/access logging: verifyu.in says logs include time, IP and location — confirm; confirm whether the access history is visible in-app and how long logs are kept.
7. In-app notification on profile access: delivery channels (push/SMS/email), timing, whether it can be switched off.
8. Dependant/child profiles: whether a child's face is matchable, what a scanner sees, what happens at 13/18, age checks at sign-up.
9. Whether account deletion can be started inside the app (Google Play requires a clear path; the site currently says "being confirmed" and offers the email route).
10. Coins: expiry, daily maximum, per-transaction cap, minimum balance; whether Premium is needed to earn; referral completion rule and reward; partner-offer tooling.
11. Recharge: how many coins can apply to one transaction; operator confirmation handling for pending recharges.
12. Steps: exact permissions (Motion & Fitness / Physical activity) and battery-optimisation guidance.
13. Whether the registered mobile number and emergency contacts can be changed in-app, and the menu path.
14. Coin-history screen name/location.
15. Support hours and response times (not published).
16. Hospital page — the four institutional capabilities (hospital dashboard, emergency alert workflow, ambulance coordination, institutional integration) are presented as "by arrangement" and flagged: confirm which exist today.
17. Organisations page — responder-group access, campus captain programme, security-desk access, event medical-desk access, employer reporting: all described as workflow proposals; confirm.
18. Safety Champions — training format, recognition (badges/certificates), which cities/drives run, how champion types appear in the app.
19. Partners — how partner offers are created, targeted, redeemed and measured.

### Trust Centre / privacy (confirm with engineering + legal)
20. Face data: image vs template storage; on-device vs server matching; any third-party face-recognition provider; retention after deletion.
21. Face verification: liveness/anti-spoofing; whether the capture is retained; re-verification after photo change; whether failed attempts are logged.
22. Matching: what happens to a scanned image with no match; confidence threshold; rate-limiting of bulk scanning; whether a no-match attempt creates a record.
23. Scanning access: criteria and identity checks for scanning users; agreements with hospitals/police/event teams; revocation; whether the scanner's identity is shown to the scanned person.
24. Medical information: default visibility; per-field hiding; whether anything is shown before NOK OTP; separate storage/controls.
25. Emergency contacts: consent/notification when added; what a contact can see; masking of numbers; more than two contacts on any plan.
26. Location: when collected (continuously / in-app only / during SOS or scan); whose location a scan log records; retention; whether shown to scanners.
27. Storage: AWS region (verifyu.in says India), backups outside India, encryption at rest and key management, sub-processors (hosting, SMS/OTP, analytics, crash reporting, payments).
28. Retention periods for facial data, logs, location; what is kept after deletion and why; meaning of "anonymised" for face data.
29. Correction: which fields are editable in-app; whether a photo change triggers re-verification; SLA.
30. Deletion: one-tap in-app deletion or request-only; how long it takes; confirmation; retention exceptions.
31. Security: staff access controls and logging; independent testing/pen-test; breach-notification process; certifications (none are claimed today).
32. Legal/government requests: process, legal instrument required, user notification, transparency reporting.
33. Privacy support: grievance officer / DPO designation (DPDP Act 2023), response-time commitment, escalation.
34. "Last updated" dates on every legal page (site shows 13 September 2026 as the website-version date).
35. Website Terms of Use are a draft baseline for legal review; governing law/jurisdiction to be set.
36. Rewards Terms: fraud/abuse rule, change policy for held coins, appeal process.
37. Billing: refund policy specifics, whether any payment method outside the app stores exists, access after cancellation.
38. Community & Safety Champion Guidelines: draft for owner approval.
39. A Biometric / Facial Data Notice: likely required under India's DPDP Act 2023 — legal drafting needed.

### Recognition, press, photography
40. "Google Play App for Good" (appears on verifyu.in) — no Google source found; shown with a badge on Press & Impact until confirmed.
41. Mid-Day coverage: not found — not listed.
42. Company formation date, first release date and earlier milestones: not in any citable public source — not published.
43. Photography: the homepage "moments" scroll story uses six Unsplash photographs (Unsplash licence — free for commercial use, no attribution required): an Indian ambulance (accident), a nurse pushing a trolley (medical emergency), an older woman's portrait (memory loss), a small boy in a crowd (child separated), a traveller beside a train (journey), and a younger hand holding an older person's hands (connected). None shows VerifyU users or staff; replace with licensed/own photography if the team prefers. The About page uses three more Unsplash photographs (a cargo ship at sunset, a container ship at sea, a market street in India) under the same licence. The three existing photographs (friends walking, clinician with tablet, community with phone) are used elsewhere. Scenario cards ("If Dad gets separated…") are typographic.
44. All phone screens on the site are now real app screenshots with demo data (dashboard, face verification, verified profile, medical-OTP modal, emergency contacts, SOS types, steps, settings/referral, recharge). Only the children/dependant profile state is still drawn in HTML — supply a real "Children Info" screenshot to replace it.
45. App screens show Prakhar Pathak’s own name and photo (as requested); every other field is demo data: ID 919876543210, DOB 12 Aug 1994 / 32 yrs, contacts Sunita (Mother, 9876543210) and Rohan (Friend, 9123456780), referral code VU7K2QP9, expiry 31 Dec 2027, address "24, Demo Colony, Lucknow". The face-verification screen is the real app screenshot. The MATCH FOUND card and the scan beam over the face screen are website overlays, not app UI.
46. The app labels Medical Details "HIPAA Compliant". HIPAA is a US law; the label needs legal review (the site does not repeat the claim).
47. Partners page — brands track (/partners#brands; /rewards-partners redirects there): the waitlist flow sends enquiries to WhatsApp +91 85916 85150 (as briefed), which differs from the support WhatsApp used elsewhere on the site (+91 82990 44462). Confirm both numbers are monitored, or unify. The page describes partner offers as an early programme ("can be featured", "eligible", "subject to review") and shows only illustrative example offers with generic business names; the phone mock-up is labelled an illustrative concept. Commercial terms (listing fees, coin requirements, redemption mechanics) are not stated and should be confirmed before any are published.

## 2. Cross-channel inconsistencies found (report only — store listings were not modified)

| Item | Website | Google Play | Apple App Store | Other |
|---|---|---|---|---|
| Developer / entity name | Beaufort IT Solutions Pvt. Ltd. | BEAUFORT IT SOLUTIONS PVT LTD | Beaufort IT Solutions LLP | ANI release: Beaufort IT Solutions LLP |
| Support email | info@beaufortit.com | help@verifyu.in (+ info@beaufortit.com) | — | Privacy policy: help@verifyu.in |
| Phone numbers | WhatsApp +91 82990 44462 | +91 97681 45437 | — | verifyu.in also lists +91 85916 85150 |
| Data Safety / privacy declaration | Privacy policy: collects name, email, phone, facial data, usage data | "No data collected", "no data shared" | Location (precise & coarse) and Contact Info linked to identity; no health/biometric declared | Policy says no third-party sharing, yet OTP SMS, store payments and AWS hosting are necessarily involved |
| Terms URL | /legal/terms (website) + in-app | — | https://www.verifyu.in/terms.php | — |
| Tagline / positioning | Identity when it matters most | "powerful identity and wellness platform … rewarding them for staying active" | "exclusive app designed to address the needs of individuals with dementia… deterrent against [trafficking]…" | Align both store descriptions with the safety-first positioning; remove trafficking language |
| Premium price | ₹99/month, ₹999/year | not shown in listing text | IAP: ₹99, ₹999 | consistent |
| Privacy policy date | — | — | — | The published policy has no effective/last-updated date |

Recommended actions: pick one legal entity name and use it everywhere; pick one support email (or publish both with roles); correct the Google Play Data Safety form (it currently contradicts the policy); add health/medical and biometric categories to the Apple privacy declaration if applicable; date the privacy policy; disclose processors; rewrite both store descriptions.

## 3. What was verified as correct
- Both store links resolve to the VerifyU listings (Google Play `com.verifyu.app`, App Store id6670164958).
- Press links: Startup Pedia (11 May 2026), The Tribune and ThePrint (ANI release, 26 July 2025) fetched and verified; SiliconIndia link is live on the current site (its server blocks automated fetching, so the date is not shown).
- Prices: ₹99/month and ₹999/year match the App Store in-app purchases; "Save 16% yearly" is arithmetically correct (₹1,188 vs ₹999).
- Team names and roles match the current site exactly: Capt. Saurabh Saraswat, Prakhar Pathak, Ansarul Haque, Hemant Misra, Capt. Rahul Kr Gupta, Moona Ssahani.
- Registration video timestamps and the seven steps match the existing walkthrough.
- The current step-reward rule (10,000 steps → 5 VerifyU Coins on an eligible day) matches the current site.
