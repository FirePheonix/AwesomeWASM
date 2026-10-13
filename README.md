# AwesomeWASM

Premium browser-game discovery for WebAssembly ports, browser-native titles, emulators, and cloud-streamed classics.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- VengeanceUI `research-bento-grid` visual language (`#edff00` neon on near-black)

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Architecture

- `src/types/game.ts` — shared game / filter / repository contracts
- `src/data/games.ts` — structured mock catalogue with real external play URLs
- `src/lib/games-repository.ts` — `MockGameRepository` (swap for DB later)
- Pages consume repository-shaped data; favourites persist in `localStorage`

## Play types

Each game is labeled as **browser-native**, **WebAssembly**, **emulated**, or **cloud-streamed**. Titles that need your own game files show an **Own files** badge.
