# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

This monorepo contains three packages:

- **`website/`** — Next.js 13 frontend (main application)
- **`cms/`** — Sanity Studio (headless CMS content management)
- **`migration/`** — Data migration scripts

## Development Commands

All commands are run from within the relevant subdirectory.

### Website (`cd website`)

```bash
npm run dev      # Start Next.js dev server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

### CMS (`cd cms`)

```bash
npm run dev      # Start Sanity Studio (localhost:3333)
npm run build    # Build Sanity Studio
npm run deploy   # Deploy studio to Sanity's hosted URL
```

### Migration (`cd migration`)

```bash
npm run start    # Run migration script
```

## Architecture

### Data Flow

Content is authored in Sanity Studio (cms/) and fetched by the Next.js frontend via the Sanity client using GROQ queries. All data fetching happens server-side via `getServerSideProps` — there are no client-side API calls and no Next.js API routes.

### Key Files

- **`website/client.tsx`** — Sanity client initialization (uses `SANITY_PROJECT_ID` and `SANITY_DATASET` env vars)
- **`website/utils/groq-helper.ts`** — All GROQ queries for fetching articles, categories, etc.
- **`website/utils/image-helper.ts`** — Sanity image URL builder
- **`cms/schemas/`** — Sanity content schemas (Article, Category, Author, PublishingLink, Global)

### Routing

Next.js file-based routing:
- `/` → home page with 12 featured articles
- `/articles` → article listing with infinite scroll, search, and category filtering
- `/[category]/[slug]` → dynamic article detail page
- `/advertise`, `/biography`, `/publishing-links` → static pages

### Path Aliases (website)

TypeScript path aliases configured in `tsconfig.json`:
```
@client, @styles/*, @utils/*, @interfaces/*, @components/*, @layout/*, @pages/*, @context/*
```

## Environment Variables

The website requires a `.env.local` file:
```
SANITY_PROJECT_ID=fcyjcwi3
SANITY_DATASET=production
```

## Sanity Content Models

- **Article** — title, slug, publishedDate, body (Portable Text), image, category ref, author ref
- **Category** — title, slug
- **Author** — title
- **PublishingLink** — external platform links
- **Global** — site-wide config

## Styling

Tailwind CSS with a custom theme:
- Primary color: `#5C0E06`
- Container max-width: `1000px`
- Custom styles in `website/styles/globals.css`

## No Testing Framework

There is no test setup in this repo.
