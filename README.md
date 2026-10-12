# estuarysystems.ai

Public company landing for **Estuary Systems LLC**. Minimal contact page.

One static Next.js App Router site. Production is Google Cloud Run. Vercel deploys from the **repo root** for test only (`vercel.json` pins the Next.js framework). This is not georgelu.ai, EstuaryMC, Conveyor, or intake. Do not attach the real domain to Vercel.

## Routes

- `/` — Estuary Systems, “Power Your Business with Superintelligence”, a rotating use-case bar, and the intro-call panel
- `/connect` — Short trust lines, then the Cal.com schedule embed
- `/offers` — Two boxes. Above them: “Engagements start at $2,000/month. Custom solutions are scoped to your business.” Recurring slider keeps the long-term retainer from 4 hours/week ($3,200/month) in 2-hour steps to 20 hours/week ($13,400/month). No advisory tier and no recurring price under $2,000/month. One-time slider: fixed-scope project, SI employee install, SI training, each a custom quote. Phone and email stay on both boxes.
- `/use-cases` — Existing section headings. Each module is a title and one sentence
- `/fabricators` — Fabricators. The only subtext under the heading is “Schedule a demo”. Two solutions in the same card format, with no description paragraphs: custom site-embedded text fabricator at $5,000, and Connect to Estuary-Fabricate at $500 setup and onboarding, plus a token fee equal to what OpenAI charges (pass-through, no markup), plus 10% of sales each month.
- `/industries` — Industry sections for specific businesses. Retail: shift scheduling, invoice monitor, sales tally, and accounting. Legal firm: document intake routing, records management, review coordination, and email intake. Each item is a title and one sentence. Not part of Fabricators or the generic use-case modules, and not on the home bar. No client names
- `/privacy` — existing Privacy copy (footer only)
- `/terms` — existing Terms copy (footer only)
- `/about`, `/alexandria`, `/tools`, `/tools/*` — parked; redirect to `/`
- `/pricing`, `/capabilities`, `/blog` — parked; redirect to `/`

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

Home is the name, the superintelligence line, the rotating use-case bar, and the intro-call panel. Near that panel, show “Engagements start at $2,000/month. Custom solutions are scoped to your business.” `/offers` is two boxes. Above the boxes, show that same line. The recurring slider keeps every existing long-term retainer tier at or above $2,000/month, from 4 hours a week ($3,200/month) in 2-hour steps to 20 hours a week ($13,400/month). Do not offer advisory at $500/month or the 2-hour stop at $1,600/month. Do not add a $2,000 tier, hours, or deliverables. Price the retainer on each weekly hour, then multiply the week by 4 for the month: hours 1–4 at $200, hours 5–10 at $175, hours 11–20 at $150. Show that calculated month price. Do not list the hour bands as static labels. Fixed-scope project, SI employee install, and SI training are the one-time slider, each a custom quote. `/use-cases` keeps its section headings. Each module is a short title and one sentence, with no examples, badges, or section essays. The home bar uses those titles. `/industries` is a separate list of business sections: Retail (shift scheduling, invoice monitor, sales tally, accounting) and Legal firm (document intake routing, records management, review coordination, email intake). Do not add those items to the generic use-case modules, the home bar, or Fabricators. Do not name a client. Industry cards have no prices. `/connect` carries a short trust strip, then the booker. The trust strip includes “Start with a 20-minute call about your workflow. Engagements start at $2,000/month. Custom solutions are scoped to your business.” Every booking duration in site copy says 20 minutes. Do not change the Cal.com event `cal.com/george-lu-ouzdmq/15min`.

Parked product routes redirect to `/`. Do not unpark the capabilities list or the blog. No case studies, client brands, logos, or invented metrics. Keep thin Privacy and Terms. Public-safe copy only: no Covenant, no client names. Do not revive `/pricing`. Do not add prices outside the $2,000/month engagement minimum line, the long-term retainer ladder, and the two Fabricators solutions. Fabricators lists $5,000 for the custom site-embedded text fabricator. Connect to Estuary-Fabricate is $500 setup and onboarding, plus a token fee equal to what OpenAI charges (pass-through, no markup), plus 10% of sales each month. Do not invent a dollar rate for the token fee. Do not claim a live card charge.
