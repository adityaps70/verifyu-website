# VerifyU website

Static website for [VerifyU](https://verifyu.in) — emergency identity and safety platform by Beaufort IT Solutions Pvt. Ltd.

- `src/` — page modules, styles and scripts; `content/` — team, advisory board, partners and articles (edited with the admin panel)
- `node build.mjs` — builds `dist/` (root-relative, for Hostinger/any host) and `docs/` (relative links, for GitHub Pages)
- `node admin/server.mjs` — local content admin at http://127.0.0.1:8790 (see ADMIN-GUIDE)
- GitHub Pages publishes from the `docs/` folder on `main`.

Requires Node.js 18+. No other dependencies.
