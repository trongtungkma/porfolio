# Lê Trọng Tùng — Portfolio

A personal portfolio using the Next.js App Router, React, and the existing Vinext/Vite runtime.

## Run locally

Use Node.js 22.13 or newer. From this directory:

```sh
npm install
npm run dev -- --host 127.0.0.1
```

Open http://localhost:3000. For validation, run `npm run lint`, `npx tsc --noEmit`, and `npm run build`.

## Digital Twin

The server route at `app/api/chat/route.ts` calls OpenRouter with the `openrouter/free` model. Set `OPENROUTER_API_KEY` in an ignored `.env.local` file in this directory (see `.env.example`). The local setup already contains a copy of the key from the workspace-root `.env`; keep those files private and restart the dev server after changing the key.

The key is used only on the server. Messages are held in browser memory, not saved by this application, and are sent to OpenRouter and its selected model provider. Free-provider availability varies; the interface preserves failed questions for retry. Request validation, timeouts, and a basic per-process rate limit are included. A public deployment would need persistent abuse protection.

## Update the content

- `app/page.tsx`: introduction, career, education, and contact details.
- `app/portfolio-data.ts`: project summaries and skill groups; add real case-study URLs when available.
- `app/api/chat/route.ts`: the AI's career context. Keep this aligned with the visible portfolio and CV.
- `app/globals.css`: layout, responsive styles, and colors.
- `public/Le-Trong-Tung-Middle-FE.pdf`: downloadable CV.

Employment dates reflect the supplied CV; confirm current status before updating them. No site is published by the local development commands.
