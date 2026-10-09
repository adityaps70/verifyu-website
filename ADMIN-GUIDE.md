# VerifyU website admin — how to use it

The admin is a small panel that lets you add or change **articles**, **team members**, **advisory board members** and **partners** on the VerifyU website without touching any code. You edit, press **Publish changes**, and the website is rebuilt from what you saved.

## 1. What you need

- The `verifyu-revamp` folder (the source package) on the computer or server where you will run the admin.
- **Node.js 18 or newer** — a free download from https://nodejs.org (choose the LTS version). Nothing else is installed.

## 2. Starting the admin

- **Mac:** double-click `start-admin.command` in the folder. (If macOS blocks it the first time, right-click → Open.)
- **Windows:** double-click `start-admin.bat`.
- **Any terminal:** `node admin/server.mjs` from inside the folder.

Your browser opens **http://127.0.0.1:8790**. The first time, you are asked to **set the admin password** (at least 8 characters). After that, the same address always asks you to sign in.

A live preview of the site runs beside it at **http://127.0.0.1:8791** (visible only while you are signed in).

## 3. The screens

**Dashboard** — counts, when the site was last published, and the three steps.

**Articles** — blog posts. Each has a title, URL slug (made from the title if you leave it blank), date, author, tags, an excerpt, a cover image and the article body. The body is written in Markdown with a live preview on the right:

- `## Heading` and `### Sub-heading`
- `**bold**`, `*italic*`
- `- item` for bullet lists, `1. item` for numbered lists
- `> quote` for a pull-quote
- `[text](https://link)` for links; **Insert image** places a picture where the cursor is

An article is a **draft** until you switch **Published** on. The Blog appears in the site menu automatically once at least one article is published, and disappears if none are.

**Team** — the people on the About page and in the homepage carousel, in the order shown. Each has a name, role, a one-line summary (used on the homepage), a bio (About page), a portrait (4:5 works best, e.g. 800×1000) and an optional LinkedIn link. Use the arrows to reorder, then **Save order**.

**Advisory board** — the same fields plus an affiliation. The "Advisory board" section on the About page appears only when at least one adviser is visible.

**Partners** — name, category (Healthcare, Brand, NGO, Event…), website, one line about the partnership and a logo. They appear on the Partners page under "Partners we work with" — list a partner only with their written agreement.

**Media** — every image on the site. Upload here or from any form; click an image to copy its path.

**Settings** — the live site URL, an optional deploy command, and a new admin password.

Every list entry has a **Visible** switch, so you can hide something without deleting it.

## 4. Publishing

Saving a form only stores your content. To change the website, press **Publish changes** (left sidebar or the dashboard). This rebuilds every page in a few seconds, then:

- **If you host the site yourself** (you upload files to a web host): after publishing, upload the contents of the `dist` folder to the server, replacing what is there. That is the live site.
- **If the admin runs on the server itself**, put a deploy command in **Settings** — for example `rsync -az --delete dist/ /var/www/verifyu/` — and every publish updates the live site by itself. Your hosting provider or developer can tell you the right command for your server.

The publish log shows exactly what was built, and **Open preview** shows the result before you upload anything.

## 5. Keeping it safe

- The password is stored only as a hash in `admin/config.json`. If you forget it, delete that file and the admin will ask you to set a new one.
- By default the admin only answers on the computer it runs on. If it is placed on a server, it must sit behind HTTPS (your provider's reverse proxy) — never expose it on plain HTTP.
- Only the four content types above are editable here. Page copy, design and the waitlist form are in the source files, as before.

## 6. Where things live (for a developer)

- `content/team.json`, `content/advisory.json`, `content/partners.json`, `content/articles.json` — what the admin edits
- `public/images/uploads/` — uploaded images
- `admin/server.mjs`, `admin/ui.html` — the admin itself (no dependencies)
- `src/content.mjs` — how the build reads the content; `src/pages/blog.mjs` — the blog pages
