# estuarysystems.ai

Temporary public company landing for **Estuary Systems LLC**. Spec: 00.11.02.

One static Next.js App Router site. Vercel deploys from the **repo root**. This is not georgelu.ai, EstuaryMC, Conveyor, or intake.

## Routes

- `/` — Me / landing
- `/capabilities` — three primary cards, then the 00.11.01 list under And much more
- `/pricing` — Tools, Medium, Heavy, Custom
- `/tools` — labeled slot only
- `/blog` — empty index

No `/privacy`. No backend. No cron. No CMS. No login.

## Deploy on Vercel

1. Import this GitHub repository in Vercel.
2. Framework Preset: **Next.js**
3. Root Directory: `.` (repo root)
4. Build Command: `npm run build` (default)
5. Install Command: `npm install` (default)
6. Attach the domain `estuarysystems.ai`

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
- Schedule URL: `https://cal.com/george-lu-ouzdmq/15min`
- Custom card CTA: Need custom availability? Let’s have a chat!

Still empty (do not invent):

- `[PRICE]` on the Tools pricing card (no dollar amount until George pastes one)
- `[TOOLS FROM GEORGE]`
- Extra stances beyond the locked line
- Blog posts

Real photos are in `public/george-hero.jpg` (Me / hero) and `public/george-about.jpg` (About).

## Locked

Do not rewrite the capabilities intro or the 00.11.01 list. Do not invent bio, prices, products, posts, photos, or a booking URL. No Covenant, client names, dollars, Conveyor/intake, case studies, named projects, AI-generated pictures, testimonials, or social icons.
