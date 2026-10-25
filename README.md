# TrustBridge Lanka

A bilingual, static-first Next.js App Router website for a private pilgrimage and parent care journey service accepting planning enquiries. No database, accounts, payments, analytics or API secrets.

## Run locally

Requires Node.js 20.9+ and npm (Node 22 LTS recommended).

```sh
npm install
npm run dev
```

Open http://localhost:3000/en/ (Sinhala: `/si/`). The root defaults to English. Pages: home, about, packages, vehicles, how-it-works, safety, quote, FAQ, contact, privacy, terms, booking/cancellation and image credits in both languages.

## Verify and build

```sh
npm run lint
npm run typecheck
npm run test
npm run build
```

Static export is generated in `out/`. `npm start` is not used for static hosting; preview the export with `python3 -m http.server 3000 --directory out`. Next.js dev is used during development.

## Cloudflare Pages (static export)

Create a **Pages** project, not a Worker. Use framework **Next.js Static HTML Export**, production branch **main**, build command `npm run build`, and output directory `out`. Leave the root directory at the repository root. Set `NEXT_PUBLIC_SITE_URL` to the actual production HTTPS URL before building to enable indexing, canonical/hreflang tags and the sitemap. Do not use `npx wrangler deploy`, OpenNext, or a Worker deploy command. If the existing Cloudflare project is a Worker, create a Pages project instead. No deployment was performed.

## Deployment later

Nothing has been deployed. For Vercel, import the repository, use Next.js, set the production URL environment variable, and build with `npm run build`. For other static hosting, upload the contents of `out/`, serve directory index files, and use `404.html` for unknown routes. No SPA catch-all rewrite is needed. Serve over HTTPS. Set immutable caching for `/_next/static/`; use revalidation for HTML.

Copy `.env.example` to `.env.local`. After purchasing and configuring a domain you control, set `NEXT_PUBLIC_SITE_URL=https://your-actual-domain` without a trailing slash and rebuild. Canonicals, hreflang alternates, social image URLs and sitemap use that setting. Until set, pages are noindex and robots disallows crawling; the sitemap is intentionally empty. Configure the same variable in hosting build settings, connect your domain through the host's DNS instructions, then check the generated metadata. No domain is assumed to belong to the business.

## Editing

- Business contact details, founder, WhatsApp URL/number, social link, vehicles, status, and package IDs: `src/config/business.ts`.
- English and Sinhala copy, package descriptions, form labels, FAQs and draft policies: `src/content/dictionaries.ts`. Maintain matching keys and array lengths; tests check this.
- Shared components: `src/components/`; pages use one shared renderer for both languages.
- Styling and responsive rules: `src/styles/globals.css` (Tailwind is also configured).
- Quotation validation, message formatting and URL encoding: `src/lib/quote.ts`.
- Package links use `?package=blessing`, `premium`, `sacred`, or `custom`. New package IDs need corresponding entries in both dictionaries.

## Real assets

See [ASSET-GUIDE.md](ASSET-GUIDE.md) and [IMAGE-CREDITS.md](IMAGE-CREDITS.md).

- Official logo: `public/brand/trustbridge-logo.png`. Automatically used in header, mobile header and footer at the next build. Until then a typography mark is used, not a fabricated official emblem. Replace `public/brand/favicon.svg` with an approved favicon if desired (currently an explicitly provisional letter T).
- Founder: `public/images/founder.jpg`. Automatically used at next build; otherwise a neutral, labeled icon panel appears.
- Genuine vehicle photographs: `public/images/vehicles/axio.jpg` and `public/images/vehicles/wagon-r.jpg`. No unrelated stock car is presented as the owner's vehicle.
- Temple photography: `public/images/kandy.webp`. Credit appears on the localized credits page. Retain the license when replacing/resizing the image. All imagery is destination inspiration, never represented as completed customer trips.

## Form behavior and privacy

The planner supports multiple example destinations plus a custom destination, partner-vehicle preferences, conditional overnight accommodation and a live journey summary. The browser validates required fields, traveler count, package and date. Dates may be flexible. Consent is required. A direct submit action opens an official WhatsApp URL containing the encoded enquiry. The visitor must send the message in WhatsApp; the website cannot confirm delivery. The prepared text, copy button and explicit WhatsApp link remain available if opening fails. The form does not persist in local storage and does not send to a backend. Switching language resets unsent form input. Optional mobility notes must not contain diagnoses or medical records. Contact links work independently of the form.

## Launch readiness — owner actions required

- Obtain/review all applicable registrations, operating approvals and commercial passenger insurance; none are represented as completed.
- Verify vehicle capacity, mechanical readiness, appropriate checks and available transport arrangements.
- Establish staffing and optional assistance scope, suitability checks, emergency contacts, consent and family-update procedures. This is not healthcare or medical transport.
- Finalize pricing practices, written itineraries, inclusions/exclusions and confirmed-booking workflow.
- Decide payment method/timing, cancellation, refund, rescheduling, disruption and third-party terms before accepting bookings. No financial policies are invented here.
- Obtain local legal review of the provisional privacy/terms/booking text; finalize message retention/deletion procedures and hosting privacy disclosures.
- Add official assets and confirm all image permissions; have a native Sinhala speaker review final business wording.
- Configure your actual domain, rebuild, verify metadata, test real WhatsApp handoff on iOS/Android and desktop, and check contact details before publication.

No commit, push, account creation or deployment is performed by this project.
