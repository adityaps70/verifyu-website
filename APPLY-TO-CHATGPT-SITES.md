# Applying the revamp to the existing ChatGPT Site (same URL)

The live site (verifyu-reimagined.seaandshore.chatgpt.site) is a Next.js app that ChatGPT Sites builds and hosts. It has no code editor, upload or API — the only way to change it is to instruct ChatGPT in the chat that owns the Site. This package is built so that hand-over is mechanical: `dist/` is the complete finished site as static HTML/CSS/JS, and the Next.js port is a copy-paste job.

## What's in the package
- `dist/` — the finished website. 21 pages (`index.html` + one folder per route), `site.css`, `site.js`, `images/`, `fonts/`, `sitemap.xml`, `robots.txt`, redirect stubs for old routes (`/impact`, `/volunteer`, `/terms`, `/legal`).
- `src/` + `build.mjs` — the source: `src/pages/*.mjs` (one module per page, plain HTML strings), `src/lib.mjs` (nav, footer, components), `src/styles/*.css`, `src/js/site.js`. `node build.mjs` regenerates `dist/`.
- `public/videos/` is intentionally empty: the registration video already lives on the Site at `/videos/verifyu-registration.mp4` and the new pages reference that path.
- `VERIFICATION-REPORT.md` — claims to confirm before launch; `BUILD-GUIDE.md` — design system reference.

## Step-by-step in the ChatGPT Sites chat

Open the chat/project that owns the VerifyU Site and attach `verifyu-revamp-dist.zip`. Send these instructions, one message at a time, waiting for each deployment to finish.

**Message 1 — assets and global files**
> Replace the site with the static build in the attached zip. First: copy `dist/images/*` to `public/images/` (overwrite), `dist/fonts/*` to `public/fonts/`, `dist/site.css` to `public/site.css`, `dist/site.js` to `public/site.js`, `dist/sitemap.xml` and `dist/robots.txt` to `public/`. Keep `public/videos/verifyu-registration.mp4` exactly where it is. Do not remove anything else yet.

**Message 2 — layout**
> Rewrite `app/layout.tsx` so that it renders only: `<html lang="en-IN"><head>` with the tags from `dist/index.html`'s `<head>` that are common to all pages (charset, viewport, theme-color, icons, font preloads, `<link rel="stylesheet" href="/site.css">`, the inline reduced-motion script), then `<body>{children}<script src="/site.js" defer></script></body>`. Remove any existing global CSS imports, providers, header and footer components — the new pages carry their own header and footer markup.

**Message 3 — pages (repeat per route, or ask ChatGPT to loop over all of them)**
> For every folder in `dist/` that contains an `index.html` (and `dist/index.html` itself for `/`), create/replace the App Router page at the same route (`app/page.tsx`, `app/features/page.tsx`, `app/organisations/hospitals/page.tsx`, `app/legal/privacy/page.tsx`, …). Each page must: (1) export `metadata` with the `<title>`, `<meta name="description">`, canonical and Open Graph values taken from that file's `<head>`; (2) render the file's `<body>` inner HTML verbatim via `dangerouslySetInnerHTML` (keep the JSON-LD `<script type="application/ld+json">` from the head inside the page too). Do not rewrite, "improve", reformat or summarise any of the HTML; do not change class names, attributes or copy. Delete the old page components and any old routes that no longer exist (`/impact`, `/volunteer`, `/terms`).

**Message 4 — redirects and checks**
> In `next.config`, add permanent redirects: `/impact` → `/press`, `/volunteer` → `/safety-champions`, `/terms` → `/legal/terms`, `/legal` → `/legal/terms`. Then confirm: every route in `dist/sitemap.xml` returns 200, `/site.css`, `/site.js`, `/images/iphone-frame.webp` and `/fonts/inter-latin.woff2` are served, and `/videos/verifyu-registration.mp4` still plays on `/how-it-works`.

**Message 5 — optional, only if ChatGPT Sites can install packages**
> The motion layer is self-contained in `/site.js` (no dependencies). Do not add framer-motion unless asked; nothing depends on it.

## After it deploys
1. Open the live URL on desktop and phone; scroll the homepage story, open the mobile menu, play the video on How it works, run a search on the Help Centre.
2. Work through `VERIFICATION-REPORT.md` and remove the amber badges as items are confirmed (search page modules for `flag(` and rebuild, or ask ChatGPT to remove the `<span class="flag">…</span>` elements on the pages concerned).
3. Update the Google Play and App Store listings per section 2 of the report (developer name, support email, data-safety declarations, descriptions).


## Addendum — Partners page (/partners, with the brand waitlist at /partners#brands)

The build now merges brands and community partners into one `/partners` page. The brands track (`#brands`) carries a native Typeform-style waitlist form that ends in a prefilled WhatsApp message to +91 85916 85150; it depends on `waitlist.js` (loaded by that page only). `/rewards-partners` is kept as a redirect to `/partners#brands` for ad links. If the Site's builder cannot run custom JavaScript, the page still renders and the two "Talk to us on WhatsApp" links work; the "Join the waitlist" buttons need the script.
