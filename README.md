# estuarysystems.ai

Temporary public company landing for **Estuary Systems LLC**. Spec: 00.11.09.

One static Next.js App Router site. Production is Google Cloud Run. Vercel deploys from the **repo root** for test only (`vercel.json` pins the Next.js framework). This is not georgelu.ai, EstuaryMC, Conveyor, or intake. Do not attach the real domain to Vercel.

## Routes

- `/` — Home: opening line, the walk, first two weeks, conversation CTA
- `/about` — the only profile page: agency line, bio, stance, suit photo
- `/alexandria` — search plus four shelves (Operations, Writing, Code, Research) and the first public prompt cards
- `/connect` — scheduling only, Cal.com 15min embed
- `/privacy` — locked Privacy copy
- `/terms` — locked Terms copy
- `/pricing` — redirects to `/connect`
- `/capabilities`, `/tools`, `/blog` — unlinked routes; inventory stays off the homepage

No `/ada`. No cookie banner. No backend. No cron. No CMS. No login.

## Nav

Home | About | Alexandria | Connect

Tools and Blog stay off the nav. There is no Me, Capabilities, or Pricing tab.

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

## George fill-in slots

Do not invent these. Filled slots use George’s exact words:

- About bio
- Schedule URL: `https://cal.com/george-lu-ouzdmq/15min` (embedded on `/connect`)

Still empty (do not invent):

- `[TOOLS FROM GEORGE]`
- Extra stances beyond the locked line
- Blog posts

The about suit photo is `public/george-about.jpg` and appears on `/about` only. Home has no photos.

## Locked

Do not invent bio, prices, products, posts, photos, or a booking URL. No Covenant, client names, dollars, Conveyor/intake, case studies, named projects, AI-generated pictures, testimonials, or social icons. No Me, Capabilities, Pricing, Tools, or Blog in the nav. No homepage profile, service list, five-layer stack, or priced 14-day offer. Dollar amounts stay off Connect.
