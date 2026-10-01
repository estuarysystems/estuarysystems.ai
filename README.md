# estuarysystems.ai

Public company landing for **Estuary Systems LLC**. Minimal contact page.

One static Next.js App Router site. Production is Google Cloud Run. Vercel deploys from the **repo root** for test only (`vercel.json` pins the Next.js framework). This is not georgelu.ai, EstuaryMC, Conveyor, or intake. Do not attach the real domain to Vercel.

## Routes

- `/` — Who it’s for, what SI means, flagship module chips, walk, CTA, Cal.com below the fold
- `/connect` — Short trust lines, then the Cal.com schedule embed
- `/offers` — Advisory ($500/month, not a retainer), long-term retainer ($1,600/month minimum at 2 hours a week; $200, $175, and $150 hour rates), fixed-scope project, SI employee install, and SI training
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

Home names who it’s for, what SI means here (intake, drafting, and the work around them), four flagship modules, the walk, and a path to `/connect`. The Cal.com box stays below that. `/offers` is the commercial ladder: advisory at $500/month is not a retainer; the long-term retainer floors at 2 hours a week and $1,600/month, with hour rates of $200 (under 4 hours a week), $175 (5–10), and $150 (11 or more). Fixed-scope project, SI employee install, and SI training are custom quotes. `/use-cases` stays thin. `/connect` carries a short trust strip, then the booker.

Parked product routes redirect to `/`. Do not unpark the capabilities list or the blog. No case studies, client brands, logos, or invented metrics. Keep thin Privacy and Terms. Public-safe copy only: no Covenant, no client names. Do not revive `/pricing`. Do not add prices outside that ladder.
