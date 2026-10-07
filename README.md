# Lê Trọng Tùng — Portfolio

Personal portfolio website for Lê Trọng Tùng, a Middle Frontend Developer. The site presents professional experience, selected projects, technical skills, education, contact details, and a downloadable CV.

## Tech stack

- Next.js App Router
- React and TypeScript
- Vinext and Vite
- Tailwind CSS
- OpenRouter for the optional Digital Twin chat

## Getting started

Node.js 22.13 or newer is required.

```bash
cd portfolio
npm install
npm run dev -- --host 127.0.0.1
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment variables

Copy the example environment file and add an OpenRouter API key to enable the Digital Twin chat:

```bash
cd portfolio
cp .env.example .env.local
```

```env
OPENROUTER_API_KEY=your_api_key
```

Keep `.env.local` private. The API key is read only by the server route and must not be committed.

## Available commands

Run these commands from the `portfolio` directory:

```bash
npm run dev      # Start the development server
npm run lint     # Run ESLint
npm run build    # Create a production build
npm run start    # Start the production server
```

## Project structure

```text
portfolio/
├── app/                    # Pages, styling, data, and API routes
│   └── api/chat/route.ts   # Digital Twin chat endpoint
├── public/                 # CV and static assets
├── package.json            # Dependencies and scripts
└── .env.example            # Environment variable template
```

## Content updates

- Edit `portfolio/app/page.tsx` for the main page structure.
- Edit `portfolio/app/portfolio-data.ts` for projects and skills.
- Edit `portfolio/app/api/chat/route.ts` to update the Digital Twin context.
- Edit `portfolio/app/globals.css` for global styling and responsive behavior.
- Replace `portfolio/public/Le-Trong-Tung-Middle-FE.pdf` to update the downloadable CV.

## License

This is a personal portfolio project. All personal content and assets are reserved by their owner.
