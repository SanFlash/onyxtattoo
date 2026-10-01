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
npm install
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
4. Add all required variables from `.env.example`.
5. Use a managed PostgreSQL database such as Supabase, Neon, or Render PostgreSQL.
6. Deploy.

## Render

The repository includes `render.yaml`.

1. Create a new Blueprint in Render from this repository.
2. Set DATABASE_URL, DIRECT_URL, AUTH_SECRET and NEXT_PUBLIC_SITE_URL.
3. Render installs dependencies with `npm install`, generates Prisma Client and runs the Next.js production build.
4. The production server runs `npm start`.
5. Health check: `/api/health`.

The build intentionally uses `npm install` rather than `npm ci` because this repository is bootstrapped without a committed npm lockfile.

## Database

For production, use Prisma migrations:

```bash
npx prisma migrate deploy
```

For initial prototyping:

```bash
npx prisma db push
```

Before using `migrate deploy` in production, commit the generated Prisma migration directory.

Never commit `.env` files or production credentials.

## Required environment variables

```env
DATABASE_URL=
DIRECT_URL=
AUTH_SECRET=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_APP_NAME=ONYX TATTOO STUDIO
```

## Current foundation

- Premium ONYX visual shell
- Responsive landing page
- Booking form
- PostgreSQL/Prisma schema
- Booking API with Zod validation
- Health endpoint
- Admin foundation
- Security headers
- Vercel configuration
- Render Blueprint
- Environment template
