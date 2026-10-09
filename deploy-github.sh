#!/usr/bin/env bash
# One-time: create the GitHub repo, push this folder, and turn on GitHub Pages (publishing from /docs on main).
# Needs: git, and the GitHub CLI (gh) signed in — run `gh auth login` first if `gh auth status` fails.
# Usage: ./deploy-github.sh [owner/repo]   (default: adityaps70/verifyu-website)
set -euo pipefail
REPO="${1:-adityaps70/verifyu-website}"
OWNER="${REPO%%/*}"; NAME="${REPO##*/}"
cd "$(dirname "$0")"

command -v git >/dev/null || { echo "git is not installed"; exit 1; }
command -v gh  >/dev/null || { echo "GitHub CLI (gh) is not installed — https://cli.github.com"; exit 1; }
gh auth status >/dev/null 2>&1 || { echo "Not signed in to GitHub. Run: gh auth login"; exit 1; }

# Fresh build so docs/ matches the source
if command -v node >/dev/null; then node build.mjs; fi

# git identity (uses the GitHub no-reply address so no personal email is committed)
LOGIN="$(gh api user -q .login)"; ID="$(gh api user -q .id)"
git config --global user.name  >/dev/null 2>&1 || git config --global user.name "$LOGIN"
git config --global user.email >/dev/null 2>&1 || git config --global user.email "${ID}+${LOGIN}@users.noreply.github.com"

if [ ! -d .git ]; then git init -b main >/dev/null; fi
git add -A
git commit -m "VerifyU website" >/dev/null 2>&1 || echo "(nothing new to commit)"

if gh repo view "$REPO" >/dev/null 2>&1; then
  echo "Repo $REPO already exists — pushing to it."
  git remote get-url origin >/dev/null 2>&1 || git remote add origin "https://github.com/$REPO.git"
else
  gh repo create "$REPO" --public --source=. --remote=origin --description "VerifyU website — emergency identity and safety platform" >/dev/null
  echo "Created https://github.com/$REPO"
fi
git push -u origin main

# GitHub Pages from /docs on main (create, or update if it already exists)
if gh api "repos/$REPO/pages" >/dev/null 2>&1; then
  gh api -X PUT "repos/$REPO/pages" -f build_type=legacy -f 'source[branch]=main' -f 'source[path]=/docs' >/dev/null
else
  gh api -X POST "repos/$REPO/pages" -f build_type=legacy -f 'source[branch]=main' -f 'source[path]=/docs' >/dev/null
fi
URL="$(gh api "repos/$REPO/pages" -q .html_url)"
echo "GitHub Pages is on. It takes a minute or two for the first build; the site will be at: $URL"
