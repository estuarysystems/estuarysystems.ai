# estuarysystems.ai

Public company landing for **Estuary Systems LLC**. Minimal contact page.

One static Next.js App Router site. Production is Google Cloud Run. Vercel deploys from the **repo root** for test only (`vercel.json` pins the Next.js framework). This is not georgelu.ai, EstuaryMC, Conveyor, or intake. Do not attach the real domain to Vercel.

## Routes

- `/` — Estuary Systems, “Power Your Business with Superintelligence”, a rotating use-case bar, and the intro-call panel
- `/connect` — Short trust lines, then the Cal.com schedule embed
- `/offers` — Two boxes. Recurring slider: advisory at $500/month, then a long-term retainer from 2 hours/week ($1,600/month) in 2-hour steps to 20. One-time slider: fixed-scope project, SI employee install, SI training
- `/use-cases` — Existing section headings, plus a Shops section. Each module is a title and short plain sentences
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

Home is the name, the superintelligence line, the rotating use-case bar, and the intro-call panel. `/offers` is two sliders. Advisory is $500/month. The long-term retainer starts at 2 hours a week and $1,600/month, then steps by 2 hours up to 20. Price the retainer on each weekly hour, then multiply the week by 4 for the month: hours 1–4 at $200, hours 5–10 at $175, hours 11–20 at $150. Show that calculated month price. Do not list the hour bands as static labels. Fixed-scope project, SI employee install, and SI training are the one-time slider, each a custom quote. `/use-cases` keeps its section headings, plus a Shops section for the gas-station jobs Daily close, Vendor bills, and Staff. Each module is a short title and short plain sentences, with no examples, badges, or section essays. The home bar uses those titles. Do not claim a named station. `/connect` carries a short trust strip, then the booker.

Parked product routes redirect to `/`. Do not unpark the capabilities list or the blog. No case studies, client brands, logos, or invented metrics. Keep thin Privacy and Terms. Public-safe copy only: no Covenant, no client names. Do not revive `/pricing`. Do not add prices outside that ladder.
