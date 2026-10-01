# ONYX Tattoo Studio

Production-ready Next.js foundation for the ONYX Tattoo Studio website and studio-management platform.

## Stack

- Next.js + TypeScript
- React
- PostgreSQL
- Prisma
- Zod
- Vercel or Render

## Local setup

```bash
git clone https://github.com/SanFlash/onyxtattoo.git
cd onyxtattoo
npm ci
cp .env.example .env.local
# fill DATABASE_URL and AUTH_SECRET
npx prisma generate
npx prisma db push
npm run dev
```

Open http://localhost:3000.

Health check: http://localhost:3000/api/health

## Vercel

1. Import the GitHub repository into Vercel.
2. Framework preset: Next.js.
3. Build command: `npm run build`.
4. Add the variables from `.env.example`.
5. Use a managed PostgreSQL database such as Supabase, Neon, or Render PostgreSQL.
6. Deploy.

## Render

The repository includes `render.yaml`.

1. Create a new Blueprint in Render from this repository.
2. Set DATABASE_URL, DIRECT_URL, AUTH_SECRET and NEXT_PUBLIC_SITE_URL.
3. Render runs `npm ci && npx prisma generate && npm run build`.
4. The production server runs `npm start`.
5. Health check: `/api/health`.

## Database

For production, run migrations with:

```bash
npx prisma migrate deploy
```

For initial prototyping:

```bash
npx prisma db push
```

Never commit `.env` files or production credentials.

## Deployment notes

The application is designed to run as a standard Next.js Node server, which makes it compatible with both Vercel's Next.js runtime and Render's Node web service. Keep heavy WebGL/animation components client-only and dynamically imported as the immersive UI is expanded.

## Current foundation

- Premium ONYX visual shell
- Responsive landing page
- Booking form
- PostgreSQL/Prisma schema
- Booking API with validation
- Health endpoint
- Admin foundation
- Security headers
- Vercel configuration
- Render Blueprint
- Environment template

The CMS, authentication/RBAC, payments, media storage, notifications and advanced animation modules can be expanded on this foundation without changing the deployment model.
