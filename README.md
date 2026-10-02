# ONYX Tattoo Studio

Premium immersive tattoo-studio website and studio-management platform foundation for ONYX Tattoo Studio, Indore.

## Stack

- Next.js + TypeScript + React
- PostgreSQL + Prisma
- Zod validation
- GSAP + ScrollTrigger
- Lenis smooth scrolling
- Responsive editorial motion system
- Render + Vercel deployment configuration

## Public experience

The redesigned experience includes a cinematic hero, editorial manifesto, scroll-driven statement, desktop horizontal portfolio archive, native mobile swipe archive, signature style index, pinned five-stage process, artist presentation, studio presentation, trust/aftercare links, contact CTA, loading and 404 experiences, plus dedicated portfolio, artist, style and studio routes.

Demo artists and portfolio imagery are explicitly demonstration content until real ONYX CMS data is supplied.

## Booking

The booking experience is a multi-step session builder covering service, style, artist preference, placement, preferred date/time, customer details and confirmation. The existing booking API validates with Zod and persists through Prisma/PostgreSQL.

## Admin

`/admin` is a premium operating-console foundation with searchable modules, booking/customer/portfolio/artist/enquiry summaries, a conversion pipeline, and an operations panel. The Prisma schema already contains User, Artist, Customer, Booking, Payment, Portfolio and AuditLog foundations. Protected authentication/RBAC and expanded CMS modules should be connected before using it as a production control plane.

## Local setup

```bash
npm install
cp .env.example .env.local
# configure DATABASE_URL, DIRECT_URL and AUTH_SECRET
npx prisma generate
npx prisma db push
npm run dev
```

## Production

```bash
npm run build
npm start
```

## Render

`render.yaml` uses a standard Next.js Node web service with `npm install`, Prisma generation, `npm run build`, `npm start`, and `/api/health`. Render auto-deploy is enabled from the `main` branch for the existing ONYX service.

Required environment variables:

```env
DATABASE_URL=
DIRECT_URL=
AUTH_SECRET=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_APP_NAME=ONYX TATTOO STUDIO
```

## Vercel

Import this GitHub repository as a Next.js project and set the same environment variables. `vercel.json` declares the Next.js framework.

## Media

The redesign uses remote demonstration imagery for visual direction. Production ONYX photography and customer references should be moved to managed object/image storage and exposed through the CMS.

## Motion architecture

The page uses a shared Lenis + GSAP ticker, ScrollTrigger scrub/pin/snap where appropriate, responsive animation branches, native touch scrolling for mobile horizontal galleries, and reduced-motion handling. The system deliberately avoids making animation necessary to understand content.

## Smoke test routes

- `/`
- `/portfolio`
- `/portfolio/01`
- `/artists`
- `/artists/01`
- `/styles`
- `/styles/fine-line`
- `/studio`
- `/contact`
- `/booking`
- `/admin`
- `/api/health`

Never commit production credentials or secret keys.
