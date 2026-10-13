"use client";

import Image from "next/image";
import { ExternalLink, Heart } from "lucide-react";

import { PlayTypeBadge } from "@/components/games/play-type-badge";
import { useFavourites } from "@/hooks/use-favourites";
import { cn } from "@/lib/utils";
import type { Game } from "@/types/game";

export function GameCard({ game }: { game: Game; index?: number }) {
  const { isFavourite, toggleFavourite } = useFavourites();
  const fav = isFavourite(game.id);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#1a1a1a]">
      <a
        href={game.playUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block aspect-[16/10] overflow-hidden"
      >
        <Image
          src={game.coverImage}
          alt={game.title}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2">
          <PlayTypeBadge type={game.playType} />
        </div>
      </a>

      <div className="flex flex-1 flex-col gap-2 p-3.5">
        <div className="flex items-start justify-between gap-2">
          <a
            href={game.playUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#F3652F]"
          >
            <h3 className="text-sm font-semibold text-white">{game.title}</h3>
          </a>
          <button
            type="button"
            aria-label={fav ? "Remove from favourites" : "Add to favourites"}
            onClick={() => toggleFavourite(game.id)}
            className={cn(
              "rounded-full p-1.5 text-neutral-500 transition hover:text-white",
              fav && "text-[#F3652F]",
            )}
          >
            <Heart className={cn("size-3.5", fav && "fill-current")} />
          </button>
        </div>
        <p className="line-clamp-2 text-xs text-neutral-500">
          {game.shortDescription}
        </p>
        <a
          href={game.playUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex h-8 items-center justify-center gap-1.5 rounded-full bg-[#F3652F] text-xs font-semibold text-white hover:bg-[#ff7a45]"
        >
          Play
          <ExternalLink className="size-3" />
        </a>
      </div>
    </article>
  );
}
