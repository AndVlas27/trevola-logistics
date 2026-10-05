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

## International URLs

The production build generates /en/, /pt/, /fr/, and /de/ routes for every page and writes corresponding canonical, hreflang, and sitemap entries. Legacy root-level HTML routes remain available as canonicalized aliases.

## Legal pages

Privacy, cookie, and terms pages are translated drafts. Before publication, verify the registered entity, postal address, retention period, hosting/email providers, and governing-law details against actual company practices. Add consent management before enabling non-essential analytics or marketing storage.
