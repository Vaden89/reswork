# Reswork

Reswork is a resume builder built with TanStack Start, Convex, Better Auth, and local-first storage for guest users. It supports creating and editing resumes, browsing template-based previews, and using AI-assisted refinement for responsibilities.

## Features

- Resume creation and editing with a multi-section builder
- Template gallery with live preview cards and thumbnails
- Authenticated and guest flows
- Local-first storage: guest resumes are persisted in the browser via IndexedDB (Dexie)
- Convex-backed user data and AI token tracking
- AI refinement requests for resume responsibilities
- PDF rendering and export via `@react-pdf/renderer`

## Tech Stack

- TanStack Start & TanStack Router (file-based routing)
- Convex (backend data + HTTP endpoints)
- Better Auth (via `@convex-dev/better-auth`)
- React 19 + TypeScript
- Tailwind CSS v4
- Base UI (`@base-ui/react`) and Motion for UI
- Dexie (IndexedDB) for local-first guest storage
- `@react-pdf/renderer`, `react-pdf`, and `pdfjs-dist` for PDF tooling
- Axios for API requests

## Prerequisites

- Node.js 20 or newer
- `pnpm`
- A configured Convex deployment

## Setup

Install dependencies:

```bash
pnpm install
```

Create a local env file from the example and fill in the deployment values:

```bash
cp .env.example .env.local
```

The project expects these values:

- `CONVEX_DEPLOYMENT` — the deployment used by `npx convex dev`
- `VITE_CONVEX_URL` — Convex deployment URL (`*.convex.cloud`)
- `VITE_CONVEX_SITE_URL` — Convex HTTP actions URL (`*.convex.site`)
- `SITE_URL` — app origin (e.g. `http://localhost:3000`)
- `VITE_SITE_URL` — app origin exposed to the client

## Development

Run the app locally:

```bash
pnpm dev
```

The app runs on port `3000`.

Run the Convex backend in a separate terminal:

```bash
npx convex dev
```

## Build

Create a production build:

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```

## Tests

Run the test suite (Vitest):

```bash
pnpm test
```

## Quality Checks

Lint, format, and verify formatting:

```bash
pnpm lint     # eslint
pnpm format   # prettier --write + eslint --fix
pnpm check    # prettier --check
```

## Convex Development

This project uses Convex for backend data and auth. Key files live under `convex/`:

- `convex/schema.ts` — database schema (currently the `users` table with token counts)
- `convex/auth.ts` / `convex/auth.config.ts` — auth setup and providers
- `convex/convex.config.ts` — enables the Better Auth integration
- `convex/tokens.ts` — AI token tracking functions
- `convex/http.ts` — HTTP endpoints (auth routes, CORS)

When you change Convex functions or schema, use the Convex CLI from the project root. To list the available commands:

```bash
npx convex -h
```

## Project Structure

- `src/routes/` — TanStack file-based routes (landing, auth, resumes, builder)
- `src/components/` — shared UI, forms, and landing page sections
- `src/context/` — auth, data source, and toast providers
- `src/hooks/` — reusable React hooks
- `src/services/` — API and AI service helpers
- `src/data/` — template registry, repositories (local/remote), and app constants
- `src/db/` — Dexie database and local persistence logic
- `src/lib/` — auth client and shared library setup
- `src/types/` — shared TypeScript types
- `src/utils/` — helpers (PDF, thumbnails, dates, strings, API)
- `convex/` — Convex backend functions, schema, and auth config

## Notes

- Guest users store resumes locally on the current device via IndexedDB.
- Authenticated users can sync data and access AI features.
