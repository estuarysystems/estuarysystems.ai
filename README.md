# estuarysystems.ai

Public site for **Estuary Systems LLC**. Estuary Systems is an AI firm for law firms. It helps small law firms with intake and documents. Personal injury and immigration come first.

One static Next.js App Router site. Production is Google Cloud Run. Vercel deploys from the **repo root** for preview only (`vercel.json` pins the Next.js framework). This is not georgelu.ai, EstuaryMC, Conveyor, or a separate intake product. Do not attach the real domain to Vercel.

## Routes

- `/` — Name, “AI for law firm intake”, use-case bar, service list, guide link, demo phone line, and the book-a-call panel
- `/connect` — Short lines, the demo phone line, and the Cal.com schedule embed
- `/offers` — Services: AI receptionist, intake data, intake portal, follow-up, and document work. No prices
- `/use-cases` — Law-firm intake modules. Each module is a title and one sentence. The home bar uses those titles
- `/industries` — Law firms only: small law firms, personal injury, and immigration. No retail
- `/guides` — Index of public guides
- `/guides/converting-inbound-into-cases` — Numbered method: converting inbound calls into signed cases
- `/audit` — Intake time worksheet. It adds the hours the visitor enters. It does not show a savings claim
- `/privacy` — Privacy copy, including the Phone demo section
- `/terms` — Terms copy
- `/fabricators` — Removed. Redirects to `/offers`
- `/about`, `/alexandria`, `/tools`, `/tools/*`, `/pricing`, `/capabilities`, `/blog` — parked; redirect to `/`

No `/ada`. No cookie banner. No cron. No CMS. No login.

## Nav

Services, Use cases, Law firms, Guides, and Intake time. The wordmark links home. Guides, Privacy, and Terms are in the footer.

The tap-to-call control says “Call our automated line” and uses `tel:+16506292311` on `/` and `/connect`. The guide also links that number.

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

Public copy is for law firms. Write it in short sentences, one idea each, with simple words and active voice. Use one term for each concept. Do not use idioms or marketing claims.

Do not invent clients, results, metrics, testimonials, or prices. You may say that Estuary Systems works with a law firm on its intake. Do not name that client.

Keep the Cal.com path on `/connect`: `cal.com/george-lu-ouzdmq/15min`. Keep the Phone demo section on `/privacy`. Do not unpark `/capabilities`, `/blog`, or `/tools`. Do not revive `/pricing` or Fabricators. Do not change DNS, domains, or deploy config for a copy change.
