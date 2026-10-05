# Trevola Logistics website

Multilingual Vite + TypeScript website for Trevola Logistics, with English,
Portuguese, French and German pages, quote-request form, and localized SEO URLs.

## Requirements

- Node.js 20.19+ or 22.12+ (required by the installed Vite release)
- npm

## Install and run locally

```sh
npm ci
npm run dev
```

Vite prints the local address after startup. The localized production routes are
created by the build step; the email function is deployed as a Vercel Edge
Function and is not served by plain `vite dev`.

## Create and preview the production build

```sh
npm run build
npm run preview
```

The build runs TypeScript validation, creates the static files in `dist/`,
generates all language/page variants, and writes the localized sitemap and
hreflang metadata. Preview prints a local address for the generated site.

## Publish

The deployment configuration targets Vercel. Import this project into Vercel
with the repository root as the project root; use `npm run build` as the build
command and `dist` as the output directory. Vercel can then publish the static
site and the `api/request-quote.js` function together.

In Vercel project settings, add these **server-side** environment variables to
the intended deployment environments:

- `RESEND_API_KEY`: API key from Resend.
- `RESEND_FROM_EMAIL`: sender address on a domain verified in Resend.

The recipient is fixed in the server function as `info@trevolalogistics.com`.
Do not add the API key to a `VITE_` variable or client-side code. See
[DEPLOYMENT.md](./DEPLOYMENT.md) for the email setup and legal-page checklist.

Add `www.trevolalogistics.com` as a domain in Vercel and configure the DNS
records Vercel provides. Confirm the domain is verified and HTTPS is active
before launch. Canonical and social metadata use the `www` hostname.

See [PUBLICATION.md](./PUBLICATION.md) for the complete build, domain, DNS, SSL,
optional Cloudflare, and future-update checklist.

See [PROJECT-AUDIT.md](./PROJECT-AUDIT.md) for the latest code audit, fixes,
verification results, and remaining production constraints.

## Project structure

```text
api/                       Quote email Edge Function
public/                    Favicon, manifest, robots, sitemap, 404, headers, social image
scripts/postbuild.mjs      Localized HTML, metadata and sitemap generation
src/assets/images/         Optimized site imagery and retained originals
src/assets/logo/           Trevola logo assets
src/i18n.ts                Home-page translations and language labels
src/page-copy.ts           Page copy, legal drafts and SEO copy for each language
src/routes.ts              Localized URL helpers
src/main.ts                Home-page rendering and interactions
src/pages.ts               Shared rendering for secondary pages and form
src/style.css              Shared and home-page styles
src/pages.css              Secondary-page styles
*.html                     Vite page entry points
vercel.json                Production output and response headers
```

## Production notes

- The quote form only reports success after the email provider accepts the
  message. Without the Resend environment variables it reports that sending is
  not configured.
- Privacy, cookies and terms content are translated drafts. Confirm the legal
  entity, postal address, retention periods, providers and governing-law details
  against the real business before publication.
- No analytics or marketing scripts are included. Revisit cookie consent if
  optional tracking is introduced later.
- The build was verified in this workspace. A visual/browser acceptance pass on
  Chrome, Edge, Firefox, Safari and physical mobile devices remains a release
  check; those browsers/devices were not all available for direct testing here.
