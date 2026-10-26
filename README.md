# Mohnish Sivakumar — Portfolio

A lightweight, dependency-free portfolio ready for GitHub Pages and Railway.

## Run locally

```bash
npm start
```

Open `http://localhost:3000`.

## Deploy on GitHub Pages

The site (everything in `public/`) deploys automatically via the
`.github/workflows/pages.yml` workflow on every push to `main`.

One-time setup: in the repo's **Settings → Pages**, set **Source** to
**GitHub Actions**. The site will be published at
`https://mohnish-sivakumar.github.io/Portfolio_Website/`.

Note: the `mohnish-sivakumar.github.io` account repo has a custom
domain (`ftc.whitneyrobotics.org`) attached, and GitHub Pages applies
that custom domain to *all* Pages sites on the account — so
`mohnish-sivakumar.github.io/Portfolio_Website/` 301-redirects to
`ftc.whitneyrobotics.org/Portfolio_Website/`, which is where this site
actually resolves. Remove that custom domain (or give it a dedicated
one) if that's not the intended public URL.

All page/asset links resolve relative to a `<base>` tag that's set at
runtime (see the inline script at the top of `public/index.html`): it
points at `/Portfolio_Website/` whenever the URL path starts with
`/Portfolio_Website`, and at `/` otherwise (Railway, localhost). This
is path-based rather than hostname-based so it keeps working even
behind the redirect above. If this repo is ever renamed, update the
path in that script to match.

## Deploy on Railway

1. Push this folder to a GitHub repository.
2. In Railway, choose **New Project → Deploy from GitHub repo**.
3. Select the repository. Railway uses `railway.json` and runs `npm start` automatically.

## Update links

Edit the social links near the top and bottom of `public/index.html` if your GitHub username differs from `mohnishsivakumar`.
