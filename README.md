# Awais Naseer Portfolio (Next.js)
Next.js (App Router) + TypeScript + Tailwind CSS + Lucide.

## Run
```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_CALENDLY_URL
npm run dev                  # http://localhost:3000
npm run typecheck && npm run lint && npm run build
```
## Customize
- Site info, links, Calendly: `src/config/site.ts` and `.env.local`
- Services, skills, projects, experience, FAQ: `src/data/index.ts`
- Project images: `public/projects/` (see the README there)
- Your photo: add e.g. `public/profile/awais.jpg` (portrait, about 800x1000) and set `profileImage` in `src/config/site.ts`
- Background animation: `src/components/ui/BackgroundCanvas.tsx` (d3-force particle network; tweak node count, speed, link distance)
- Colors: full 50-950 scales in `tailwind.config.ts`; light/dark semantic tokens in `src/app/globals.css`
- AI chat: `src/lib/ai/chat.ts`. Replace `mockProvider` with `httpProvider()` and add a server route (`src/app/api/chat/route.ts`) that calls OpenAI/Anthropic with the key in a server-only env var. Never expose keys to the client.
- If `NEXT_PUBLIC_CALENDLY_URL` is empty, Schedule a Call opens an email instead; otherwise it opens the Calendly popup (via `react-calendly`).

## Testimonials
Edit `src/data/testimonials.ts` with real client feedback (name, role, company, country, rating, quote, optional avatar). Placeholder entries only appear in development; production builds hide them, and the whole section disappears if there are no real testimonials. It is not in the navbar; add `{ label: "Testimonials", id: "testimonials" }` to `NAV` in `src/config/site.ts` once you have real ones.
