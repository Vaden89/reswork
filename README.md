# Reswork

Reswork is a resume builder built with TanStack Start, Convex, Better Auth, and local-first storage for guest users. It supports creating and editing resumes, browsing template-based previews, and using AI-assisted refinement for responsibilities.

## Features

- Resume creation and editing
- Template gallery and preview cards
- Authenticated and guest flows
- Convex-backed user data and token tracking
- AI refinement requests for resume content
- PDF-oriented resume tooling

## Tech Stack

- TanStack Start
- TanStack Router
- Convex
- Better Auth
- React 19
- TypeScript
- Tailwind CSS v4

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

- `CONVEX_DEPLOYMENT`
- `VITE_CONVEX_URL`
- `VITE_CONVEX_SITE_URL`
- `SITE_URL`
- `VITE_SITE_URL`

## Development

Run the app locally:

```bash
pnpm dev
```

The app runs on port `3000`.

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

Run the test suite:

```bash
pnpm test
```

## Quality Checks

Run formatting and linting checks:

```bash
pnpm lint
pnpm format
pnpm check
```

## Convex Development

This project uses Convex for backend data and auth. Key files live under `convex/`:

- `convex/schema.ts` defines the database schema
- `convex/auth.config.ts` configures auth providers
- `convex/convex.config.ts` enables the Better Auth integration
- `convex/http.ts` contains HTTP endpoints

When you change Convex functions or schema, use the Convex CLI from the project root. The fastest way to learn the available commands is:

```bash
npx convex -h
```

## Project Structure

- `src/routes/` - TanStack file-based routes
- `src/components/` - shared UI and landing page sections
- `src/context/` - auth and data source providers
- `src/hooks/` - reusable React hooks
- `src/services/` - API and AI service helpers
- `src/db/` - local repository and persistence logic
- `convex/` - Convex backend functions, schema, and auth config

## Notes

- Guest users store resumes locally on the current device.
- Authenticated users can sync data and access AI features.
