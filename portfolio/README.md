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

## Update the content automatically from the CV

The CV is stored at `public/cv.pdf`. Replacing that file and pushing it to `master` starts the **Update portfolio from CV** GitHub Actions workflow. The workflow extracts the PDF text, converts it to validated career data, checks the site, and opens a pull request for review. It never publishes extracted content directly.

Repository setup:

1. Add `OPENROUTER_API_KEY` as a GitHub Actions repository secret.
2. Optionally add `OPENROUTER_CV_MODEL` as a repository variable. It defaults to `openai/gpt-4.1-mini`.
3. In GitHub Actions settings, allow workflows to create pull requests if that option is disabled.

To test an import locally, install Poppler so `pdftotext` is on `PATH`, configure `.env.local` or export `OPENROUTER_API_KEY`, and run:

```sh
npm run cv:import
npm run check
```

`content/career.json` is the validated CV-derived source of truth. `content/career-overrides.json` contains protected presentation choices such as featured projects and must be reviewed manually when project IDs change. The visible portfolio and Digital Twin both consume the same career data.

## Update content manually

- `content/career.json`: CV-derived career facts.
- `content/career-overrides.json`: featured projects, categories, links, and hero technologies.
- `app/page.tsx`: presentation and non-CV marketing copy.
- `content/career-context.ts`: formatting of verified career data for the Digital Twin.
- `app/globals.css`: layout, responsive styles, and colors.
- `public/cv.pdf`: downloadable CV and automation trigger.

Employment dates reflect the supplied CV; confirm current status before updating them. No site is published by the local development commands.
