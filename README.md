This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Local setup (Postgres / Supabase)

1. Copy the example env file and set your DB URL (do NOT commit `.env`):

```bash
cp .env.example .env
# Edit .env and paste your provider DATABASE_URL (postgresql://...)
```

2. Install deps and generate Prisma client:

```bash
npm ci
npm install zod
npx prisma generate
```

3. Apply migrations to your DB (for development against a hosted Postgres):

```bash
npx prisma migrate dev --name init
```

4. Run the dev server:

```bash
npm run dev
```

5. Vercel build command (set `DATABASE_URL` in Vercel env):

```
npx prisma migrate deploy && npx prisma generate && npm run build
```

If you need help provisioning Supabase or debugging migrations, open an issue or ask for step-by-step guidance.

## Using Prisma Data Proxy (recommended for Vercel)

If your CI/build environment cannot connect directly to your Postgres database (common on serverless platforms), enable Prisma Data Proxy (or Prisma Accelerate) and set the proxy URL in Vercel.

1. Create a Data Proxy/Accelerate instance via the Prisma Cloud dashboard and get the `PRISMA_DATA_PROXY_URL` value.
2. Add `PRISMA_DATA_PROXY_URL` to Vercel Environment Variables (Production & Preview).
3. Update Vercel Build Command (same as before):

```
npx prisma migrate deploy && npx prisma generate && npm run build
```

The application will automatically use the Data Proxy when `PRISMA_DATA_PROXY_URL` is present.

