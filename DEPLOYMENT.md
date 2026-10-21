# Trevola Logistics deployment notes

## Quote request email

The website form posts to /api/request-quote. The server function sends the validated request to info@trevolalogistics.com through Resend. No API key or sender address is committed to the repository.

Before enabling it:

1. Verify the sending domain in Resend and choose a sender address on it.
2. Add RESEND_API_KEY and RESEND_FROM_EMAIL as server-side environment variables in the Vercel project settings.
3. Redeploy, submit a real test request and confirm delivery and reply-to behavior.

Until both values are configured, the endpoint returns email_not_configured and the form does not claim the message was sent. The endpoint targets Vercel Edge Runtime and uses server-side environment configuration.

## Local development

npm run dev serves the static Vite pages. The Vercel function is available after deployment or through Vercel local development tooling. Never put the Resend key in browser code or in a VITE_ variable.

## Analytics

Set the following public identifiers in the Vercel project for Production and Preview, then redeploy:

- `VITE_GA4_MEASUREMENT_ID` — GA4 web stream Measurement ID.
- `VITE_CLARITY_PROJECT_ID` — Microsoft Clarity project ID.
- `VITE_CF_WEB_ANALYTICS_TOKEN` — Cloudflare Web Analytics beacon token.

These identifiers are embedded in the client bundle and are not secrets. The site loads analytics only after a visitor accepts analytics consent. Do not add visitor contact details or quote-form values to analytics events. Search Console verification is separate; use a verified owner account and retain its meta tag or DNS record.

## International URLs

The production build generates /en/, /pt/, /fr/, /de/, /ru/, and /uk/ routes for every page and writes corresponding canonical, hreflang, and sitemap entries. Legacy root-level HTML routes remain available as canonicalized aliases.

## Legal pages

The privacy notice uses the company name, NIF, privacy email, providers, and retention periods supplied by the operator; it does not publish a postal address. Processing locations and sub-processors should be checked against the providers’ current terms. Governing-law details in the terms remain to be confirmed. Analytics scripts are built in but remain inactive until valid public provider IDs are configured and a visitor gives consent. Review the final provider and hosting setup against the privacy and cookie notices before launch.
