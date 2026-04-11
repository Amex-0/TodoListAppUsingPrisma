# Todo List App

A simple Todo List application built with Next.js and Prisma.

## Tech stack
- Next.js (App Router)
- React
- Prisma ORM
- SQLite (local development) via `@prisma/adapter-better-sqlite3`

## Quick start (local)
```bash
npm install
# generate Prisma client
npx prisma generate
# create local SQLite database and apply migrations
npx prisma migrate dev --name init
# run dev server
npm run dev
```

## Configuration
- The database URL is read from `DATABASE_URL` in `.env`. For local development it defaults to `file:./dev.db`.

## Deployment notes
- For production, replace SQLite with a networked Postgres database (e.g., Supabase) and update `prisma/schema.prisma` and `DATABASE_URL` accordingly.
- When deploying on serverless platforms, consider Prisma Data Proxy or a pooling solution to avoid connection limits.




