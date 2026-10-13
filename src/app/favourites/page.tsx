"use client";

import { useMemo } from "react";
import Link from "next/link";

import { SmallGameCard } from "@/components/games/small-game-card";
import { buttonVariants } from "@/components/ui/button";
import { GameCardSkeleton } from "@/components/games/game-card-skeleton";
import { GAMES } from "@/data/games";
import { useFavourites } from "@/hooks/use-favourites";
import { cn } from "@/lib/utils";

export default function FavouritesPage() {
  const { favourites, hydrated } = useFavourites();

  const games = useMemo(
    () => GAMES.filter((g) => favourites.includes(g.id)),
    [favourites],
  );

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="flex items-center gap-3 text-3xl font-extrabold uppercase text-white sm:text-4xl">
        <span className="inline-block h-9 w-1 rounded-full bg-[#F3652F]" />
        Favourites
      </h1>
      <p className="mt-2 text-sm text-neutral-500">
        Favourites are stored in{" "}
        <span className="text-neutral-300">localStorage</span> on this device —
        they stay after refresh, no account needed.
      </p>

      <div className="mt-8">
        {!hydrated ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <GameCardSkeleton key={i} />
            ))}
          </div>
        ) : games.length === 0 ? (
          <div className="rounded-2xl bg-[#1a1a1a] px-6 py-16 text-center">
            <p className="text-lg font-semibold text-white">No favourites yet</p>
            <p className="mt-2 text-sm text-neutral-500">
              Heart a featured game or open any title to save it.
            </p>
            <Link
              href="/"
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-5 inline-flex h-11 rounded-full bg-[#F3652F] font-semibold text-white hover:bg-[#ff7a45]",
              )}
            >
              Discover games
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {games.map((game) => (
              <SmallGameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
