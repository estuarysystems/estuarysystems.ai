# estuarysystems.ai

Temporary public company landing for **Estuary Systems LLC**. Spec: 00.11.02.

One static Next.js App Router site. Vercel deploys from the **repo root**. This is not georgelu.ai, EstuaryMC, Conveyor, or intake. Do not attach the real domain to Vercel.

## Routes

- `/` — Me / landing
- `/capabilities` — three primary cards, then the 00.11.01 list under And much more
- `/alexandria` — search plus four empty shelves
- `/connect` — scheduling only, Cal.com 15min embed
- `/tools` — labeled slot only
- `/blog` — empty index
- `/privacy` — locked Privacy copy
- `/terms` — locked Terms copy
- `/pricing` — redirects to `/connect`

No `/ada`. No cookie banner. No backend. No cron. No CMS. No login.

## Deploy on Vercel

1. Import this GitHub repository in Vercel.
2. Framework Preset: **Next.js**
3. Root Directory: `.` (repo root)
4. Build Command: `npm run build` (default)
5. Install Command: `npm install` (default)

No environment variables are required.

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

- About / Me bio
- Schedule URL: `https://cal.com/george-lu-ouzdmq/15min` (embedded on `/connect`)

Still empty (do not invent):

- `[TOOLS FROM GEORGE]`
- Extra stances beyond the locked line
- Blog posts
- Alexandria prompts

Real photos are in `public/george-hero.jpg` (Me / hero) and `public/george-about.jpg` (About).

## Locked

Do not rewrite the capabilities intro or the 00.11.01 list. Do not invent bio, prices, products, posts, photos, or a booking URL. No Covenant, client names, dollars, Conveyor/intake, case studies, named projects, AI-generated pictures, testimonials, or social icons. No Pricing tab. Dollar amounts stay off Connect.
