# estuarysystems.ai

Public company landing for **Estuary Systems LLC**. Minimal contact page.

One static Next.js App Router site. Production is Google Cloud Run. Vercel deploys from the **repo root** for test only (`vercel.json` pins the Next.js framework). This is not georgelu.ai, EstuaryMC, Conveyor, or intake. Do not attach the real domain to Vercel.

## Routes

- `/` — Estuary Systems, “Power Your Business with Superintelligence”, a rotating use-case bar, and the intro-call panel
- `/connect` — Short trust lines, then the Cal.com schedule embed
- `/offers` — Three items: fixed-scope project, SI employee install, and SI training. No prices, rates, or retainers. One “Book a call” link goes to `/connect`. Phone and email stay on the page.
- `/use-cases` — Existing section headings. Each module is a title and one sentence
- `/industries` — Industry sections for specific businesses. Retail: shift scheduling, invoice monitor, sales tally, and accounting. Legal firm: document intake routing, records management, review coordination, and email intake. Each item is a title and one sentence. Not part of the generic use-case modules, and not on the home bar. No client names
- `/privacy` — existing Privacy copy (footer only)
- `/terms` — existing Terms copy (footer only)
- `/about`, `/alexandria`, `/tools`, `/tools/*`, `/fabricators`, `/capabilities`, `/blog` — parked; redirect to `/`
- `/pricing` — parked; redirect to `/connect`

No product nav. No `/ada`. No cookie banner. No cron. No CMS. No login.

## Nav

Wordmark only. Privacy and Terms stay in the footer.

## Deploy on Vercel

1. Import this GitHub repository in Vercel.
2. Framework Preset: **Next.js**
3. Root Directory: `.` (repo root)
4. Build Command: `npm run build` (default)
5. Install Command: `npm install` (default)

No environment variables are required. Do not attach estuarysystems.ai.

## Cloud Run

The app builds with `output: "standalone"` and the `Dockerfile` listens on `PORT` (default `8080`) at `0.0.0.0`.

```bash
gcloud run deploy estuarysystems-ai \
  --source . \
  --region us-west1 \
  --allow-unauthenticated \
  --port 8080
```

That `--source` deploy works without Artifact Registry first. Optional `cloudbuild.yaml` builds and deploys the same service (`estuarysystems-ai`, `us-west1`) after you create the Artifact Registry Docker repo named `estuarysystems-ai` in that region.

### Domain (GoDaddy)

GoDaddy holds `estuarysystems.ai`. After you map the domain in Cloud Run, add the **exact** records Cloud Run shows for the apex and for `www`. Do not invent IPs or CNAMEs, and do not assume `www` is already mapped.

Turn off Website Builder / Launching Soon first so GoDaddy stops serving its parked page. Leave MX records alone.

## Local

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Locked

Public frame is SI (systems intelligence), not AI.

Home is the name, the superintelligence line, the rotating use-case bar, and the intro-call panel. Do not show a price on that panel. `/offers` lists fixed-scope project, SI employee install, and SI training. Do not show prices, rates, retainers, or dollar amounts. One “Book a call” link goes to `/connect`. Phone and email stay on the page. `/use-cases` keeps its section headings. Each module is a short title and one sentence, with no examples, badges, or section essays. The home bar uses those titles. `/industries` is a separate list of business sections: Retail (shift scheduling, invoice monitor, sales tally, accounting) and Legal firm (document intake routing, records management, review coordination, email intake). Do not add those items to the generic use-case modules or the home bar. Do not name a client. `/connect` carries a short trust strip, then the booker. The trust strip includes “Start with a 20-minute call about your workflow.” Do not name a price there. Every booking duration in site copy says 20 minutes. Do not change the Cal.com event `cal.com/george-lu-ouzdmq/15min`.

Parked product routes redirect to `/`, except `/pricing`, which redirects to `/connect`. `/fabricators` redirects to `/`. Do not restore the Fabricators nav item or page. Do not unpark the capabilities list or the blog. No case studies, client brands, logos, or invented metrics. Keep thin Privacy and Terms. Public-safe copy only: no Covenant, no client names. Do not show prices, rates, retainers, or dollar amounts on the site. Do not claim a live card charge.
