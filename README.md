# estuarysystems.ai

Temporary public company landing for **Estuary Systems LLC**. Spec: 00.11.02.

One static Next.js App Router site. Vercel deploys from the **repo root**. This is not georgelu.ai, EstuaryMC, Conveyor, or intake.

## Routes

- `/` — Me / landing
- `/capabilities` — locked capability copy from 00.11.01
- `/pricing` — labeled slot only
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

Do not invent these. Replace the labeled placeholders on the page:

- `[BIO FROM GEORGE]`
- `[STANCES FROM GEORGE]`
- `[BOOKING URL]`
- `[PRICING FROM GEORGE]`
- `[TOOLS FROM GEORGE]`
- `PHOTO: George - hero (working at a computer)`
- `PHOTO: George - about`

Until a booking URL exists, the schedule CTA jumps to `/#schedule` and the page shows **Booking link coming**. Do not add Cal.com or Calendly unless George pastes a URL.

## Locked

Do not rewrite the capabilities intro or the 00.11.01 list. Do not invent bio, prices, products, posts, photos, or a booking URL. No Covenant, client names, dollars, Conveyor/intake, case studies, named projects, AI-generated pictures, testimonials, or social icons.
