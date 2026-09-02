# estuarysystems.ai

Temporary public company landing for **Estuary Systems LLC**. Coming soon (2026-09-02).

One static Next.js App Router site. Production is Google Cloud Run. Vercel deploys from the **repo root** for test only (`vercel.json` pins the Next.js framework). This is not georgelu.ai, EstuaryMC, Conveyor, or intake. Do not attach the real domain to Vercel.

## Routes

- `/` — Coming-soon landing: company name, we’re building, check back later
- `/privacy` — existing Privacy copy (footer only)
- `/terms` — existing Terms copy (footer only)
- `/about`, `/alexandria`, `/connect`, `/tools`, `/tools/*` — parked; redirect to `/`
- `/pricing`, `/capabilities`, `/blog` — parked; redirect to `/`

No product nav. No Cal.com on the homepage. No `/ada`. No cookie banner. No cron. No CMS. No login.

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

Home is coming soon only. Parked product routes redirect to `/`. Keep thin Privacy and Terms. Public-safe copy only: no prices, no Covenant, no client names, no service list, no Cal.com CTA.
