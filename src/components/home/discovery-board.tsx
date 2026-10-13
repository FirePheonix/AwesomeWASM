"use client";

import { useDeferredValue, useMemo, useState, useTransition } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import { FeaturedGameCard } from "@/components/games/featured-game-card";
import { MediumGameCard } from "@/components/games/medium-game-card";
import { SmallGameCard } from "@/components/games/small-game-card";
import { Input } from "@/components/ui/input";
import { filterGamesSync } from "@/lib/games-repository";
import { cn } from "@/lib/utils";
import type { Game, Genre } from "@/types/game";

const FILTERS: Array<{ label: string; genre?: Genre; tag?: string }> = [
  { label: "All games" },
  { label: "Recent", tag: "recent" },
  { label: "FPS", genre: "FPS" },
  { label: "Horror", genre: "Horror" },
  { label: "Action", genre: "Action" },
  { label: "Platformer", genre: "Platformer" },
  { label: "Strategy", genre: "Strategy" },
  { label: "Sports", genre: "Sports" },
  { label: "Retro", genre: "Retro" },
];

export function DiscoveryBoard({ games }: { games: Game[] }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Recent");
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query);

  const activeMeta = FILTERS.find((f) => f.label === activeFilter);

  const filtered = useMemo(() => {
    let list = filterGamesSync(games, {
      query: deferredQuery,
      genres: activeMeta?.genre ? [activeMeta.genre] : undefined,
    });
    if (activeMeta?.tag) {
      list = list.filter((g) => g.tags.includes(activeMeta.tag!));
    }
    return list;
  }, [games, deferredQuery, activeMeta]);

  const featured =
    filtered.find((g) => g.tags.includes("recent") && g.featured) ??
    filtered.find((g) => g.featured && g.trending) ??
    filtered.find((g) => g.featured) ??
    filtered[0];

  const rest = filtered.filter((g) => g.id !== featured?.id);
  const smallCards = rest.slice(0, 4);
  const mediumCards = rest.slice(4, 6);
  const extras = rest.slice(6);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="max-w-2xl">
          <h1 className="flex items-center gap-3 text-3xl font-extrabold uppercase text-white sm:text-4xl lg:text-[2.75rem] lg:leading-none">
            <span className="inline-block h-10 w-1 shrink-0 rounded-full bg-[#F3652F] sm:h-12" />
            Discover your next game
          </h1>
          <p className="mt-3 text-sm text-neutral-400 sm:text-base">
            High-end games that were{" "}
            <span className="font-semibold text-white">never meant</span> for
            browsers — WASM ports from 2024–26.{" "}
            <span className="font-semibold text-[#F3652F]">0 installation.</span>{" "}
            Bookmark this.
          </p>
        </div>

        <div className="relative w-full max-w-xl lg:w-[42%]">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-neutral-500" />
          <Input
            value={query}
            onChange={(e) => {
              const value = e.target.value;
              startTransition(() => setQuery(value));
            }}
            placeholder="Search GTA 5, Halo, Quake, Zombies…"
            className="h-12 rounded-full border-0 bg-[#1a1a1a] pr-12 pl-11 text-white placeholder:text-neutral-500 focus-visible:ring-[#F3652F]/40"
          />
          <span className="absolute top-1/2 right-3 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#222] text-neutral-400">
            <SlidersHorizontal className="size-4" />
          </span>
        </div>
      </div>

      <section id="recommended" className="mt-10 scroll-mt-24">
        <div className="mb-5 max-w-xl">
          <h2 className="text-xl font-semibold text-white sm:text-2xl">
            Recommended
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Tap <span className="text-neutral-300">Recent</span> for Celeste,
            Terraria, Doom 3, Eaglercraft, Halo MP, Space Cadet… Every card opens
            the real host.
          </p>
        </div>

        <div className="mb-6 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {FILTERS.map((filter) => {
            const active = activeFilter === filter.label;
            return (
              <button
                key={filter.label}
                type="button"
                onClick={() =>
                  startTransition(() => setActiveFilter(filter.label))
                }
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition",
                  active
                    ? "bg-[#F3652F] text-white"
                    : "bg-[#1a1a1a] text-neutral-400 hover:bg-[#222] hover:text-white",
                )}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {filtered.length === 0 || !featured ? (
          <div className="rounded-2xl bg-[#1a1a1a] px-6 py-16 text-center">
            <p className="text-lg font-semibold text-white">No games found</p>
            <p className="mt-2 text-sm text-neutral-500">
              Try another search or filter.
            </p>
            <button
              type="button"
              onClick={() => {
                startTransition(() => {
                  setQuery("");
                  setActiveFilter("All games");
                });
              }}
              className="mt-4 rounded-full bg-[#F3652F] px-5 py-2 text-sm font-semibold text-white"
            >
              Reset
            </button>
          </div>
        ) : (
          <div
            className={cn(
              "grid gap-3 sm:gap-4 lg:grid-cols-12 lg:items-stretch",
              isPending && "opacity-70 transition-opacity",
            )}
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-3">
              {smallCards.map((game) => (
                <SmallGameCard key={game.id} game={game} />
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:gap-4 lg:col-span-4">
              {mediumCards.map((game) => (
                <MediumGameCard key={game.id} game={game} />
              ))}
            </div>

            <div className="lg:col-span-5">
              <FeaturedGameCard game={featured} />
            </div>
          </div>
        )}

        {extras.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-4 text-lg font-semibold text-white">
              More to play
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {extras.map((game) => (
                <SmallGameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
