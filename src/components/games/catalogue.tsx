"use client";

import { useDeferredValue, useMemo, useState, useTransition } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

import { GameCard } from "@/components/games/game-card";
import { GameCardSkeleton } from "@/components/games/game-card-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFavourites } from "@/hooks/use-favourites";
import { filterGamesSync } from "@/lib/games-repository";
import { PLAY_TYPE_LABELS } from "@/lib/play-type";
import { cn } from "@/lib/utils";
import type { Game, Genre, PlayType } from "@/types/game";
import { PLAY_TYPES } from "@/data/games";

export function Catalogue({
  games,
  genres,
  initialQuery = "",
  initialGenres = [],
  showFavouritesToggle = true,
}: {
  games: Game[];
  genres: Genre[];
  initialQuery?: string;
  initialGenres?: Genre[];
  showFavouritesToggle?: boolean;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>(initialGenres);
  const [selectedTypes, setSelectedTypes] = useState<PlayType[]>([]);
  const [controllerOnly, setControllerOnly] = useState(false);
  const [favouritesOnly, setFavouritesOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(initialGenres.length > 0);
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query);
  const { favourites } = useFavourites();

  const filtered = useMemo(
    () =>
      filterGamesSync(
        games,
        {
          query: deferredQuery,
          genres: selectedGenres,
          playTypes: selectedTypes,
          controllerOnly,
          favouritesOnly,
        },
        favourites,
      ),
    [
      games,
      deferredQuery,
      selectedGenres,
      selectedTypes,
      controllerOnly,
      favouritesOnly,
      favourites,
    ],
  );

  const toggleGenre = (genre: Genre) => {
    startTransition(() => {
      setSelectedGenres((prev) =>
        prev.includes(genre)
          ? prev.filter((g) => g !== genre)
          : [...prev, genre],
      );
    });
  };

  const toggleType = (type: PlayType) => {
    startTransition(() => {
      setSelectedTypes((prev) =>
        prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
      );
    });
  };

  const clearFilters = () => {
    startTransition(() => {
      setQuery("");
      setSelectedGenres([]);
      setSelectedTypes([]);
      setControllerOnly(false);
      setFavouritesOnly(false);
    });
  };

  const activeCount =
    selectedGenres.length +
    selectedTypes.length +
    (controllerOnly ? 1 : 0) +
    (favouritesOnly ? 1 : 0) +
    (query ? 1 : 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500" />
          <Input
            value={query}
            onChange={(e) => {
              const value = e.target.value;
              startTransition(() => setQuery(value));
            }}
            placeholder="Search GTA, Quake, Halo, Minecraft…"
            className="h-11 border-[#292929] bg-[#0c0c0c] pl-10 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-[#edff00]/40 focus-visible:ring-[#edff00]/20"
          />
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => setFiltersOpen((v) => !v)}
          className="h-11 border-[#292929] bg-[#0c0c0c] text-zinc-200 hover:bg-[#141414]"
        >
          <SlidersHorizontal className="size-4" />
          Filters
          {activeCount > 0 && (
            <span className="rounded-full bg-[#edff00] px-1.5 text-[11px] font-bold text-black">
              {activeCount}
            </span>
          )}
        </Button>
        {activeCount > 0 && (
          <Button
            type="button"
            variant="ghost"
            onClick={clearFilters}
            className="h-11 text-zinc-400 hover:text-white"
          >
            <X className="size-4" />
            Clear
          </Button>
        )}
      </div>

      {filtersOpen && (
        <div className="rounded-[15px] border border-[#292929] bg-[#080808] p-4 sm:p-5">
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                Genres
              </p>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => {
                  const active = selectedGenres.includes(genre);
                  return (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => toggleGenre(genre)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-xs transition",
                        active
                          ? "border-[#edff00]/40 bg-[#edff00]/15 text-[#edff00]"
                          : "border-white/10 text-zinc-400 hover:border-white/25 hover:text-white",
                      )}
                    >
                      {genre}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                Play type
              </p>
              <div className="flex flex-wrap gap-2">
                {PLAY_TYPES.map((type) => {
                  const active = selectedTypes.includes(type);
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => toggleType(type)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-xs transition",
                        active
                          ? "border-[#edff00]/40 bg-[#edff00]/15 text-[#edff00]"
                          : "border-white/10 text-zinc-400 hover:border-white/25 hover:text-white",
                      )}
                    >
                      {PLAY_TYPE_LABELS[type]}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  startTransition(() => setControllerOnly((v) => !v))
                }
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs transition",
                  controllerOnly
                    ? "border-[#edff00]/40 bg-[#edff00]/15 text-[#edff00]"
                    : "border-white/10 text-zinc-400 hover:border-white/25 hover:text-white",
                )}
              >
                Controller support
              </button>
              {showFavouritesToggle && (
                <button
                  type="button"
                  onClick={() =>
                    startTransition(() => setFavouritesOnly((v) => !v))
                  }
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs transition",
                    favouritesOnly
                      ? "border-[#edff00]/40 bg-[#edff00]/15 text-[#edff00]"
                      : "border-white/10 text-zinc-400 hover:border-white/25 hover:text-white",
                  )}
                >
                  Favourites only
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-zinc-500">
          {isPending ? "Filtering…" : `${filtered.length} game${filtered.length === 1 ? "" : "s"}`}
        </p>
      </div>

      {isPending && filtered.length === 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <GameCardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-[15px] border border-dashed border-[#333] bg-[#080808] px-6 py-16 text-center">
          <p className="font-display text-xl text-white">No games matched</p>
          <p className="mt-2 text-sm text-zinc-500">
            Try another search or clear filters.
          </p>
          <Button
            type="button"
            onClick={clearFilters}
            className="mt-5 bg-[#edff00] text-black hover:bg-[#f5ff4d]"
          >
            Reset catalogue
          </Button>
        </div>
      ) : (
        <div
          className={cn(
            "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
            isPending && "opacity-70 transition-opacity",
          )}
        >
          {filtered.map((game, index) => (
            <GameCard key={game.id} game={game} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
