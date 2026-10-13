"use client";

import Image from "next/image";
import { ExternalLink, Gamepad2, Heart, Monitor } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { useFavourites } from "@/hooks/use-favourites";
import { PLAY_TYPE_LABELS } from "@/lib/play-type";
import { cn } from "@/lib/utils";
import type { Game } from "@/types/game";

/** Card CTA + image/title jump straight to the external play site */
export function FeaturedGameCard({ game }: { game: Game }) {
  const { isFavourite, toggleFavourite } = useFavourites();
  const fav = isFavourite(game.id);

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-[#1a1a1a]">
      <a
        href={game.playUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block aspect-[16/11] overflow-hidden sm:aspect-[16/10] lg:aspect-auto lg:min-h-[220px] lg:flex-1"
      >
        <Image
          src={game.heroImage}
          alt={game.title}
          fill
          className="object-cover transition duration-500 hover:scale-[1.03]"
          sizes="(max-width:1024px) 100vw, 360px"
          priority
        />
      </a>

      <button
        type="button"
        aria-label={fav ? "Remove favourite" : "Add favourite"}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavourite(game.id);
        }}
        className={cn(
          "absolute top-3 right-3 z-10 rounded-full bg-black/45 p-2 text-white backdrop-blur transition hover:bg-black/60",
          fav && "text-[#F3652F]",
        )}
      >
        <Heart className={cn("size-4", fav && "fill-current")} />
      </button>

      <div className="flex flex-col gap-3 p-4 sm:p-5">
        <a
          href={game.playUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <h3 className="text-xl font-semibold text-white hover:text-[#F3652F]">
            {game.title}
          </h3>
          <p className="mt-1 text-sm text-neutral-500">
            {game.publisher} · {game.genres.slice(0, 2).join(", ")}
          </p>
        </a>

        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {["BG", "JS", "KW"].map((initials) => (
              <span
                key={initials}
                className="flex size-7 items-center justify-center rounded-full border-2 border-[#1a1a1a] bg-[#2a2a2a] text-[9px] font-bold text-neutral-300"
              >
                {initials}
              </span>
            ))}
          </div>
          <p className="text-xs text-neutral-500">
            <span className="text-white">12k+</span> players this week
          </p>
        </div>

        <p className="line-clamp-3 text-sm leading-relaxed text-neutral-400">
          {game.shortDescription}
        </p>

        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#222] px-3 py-1.5 text-xs text-neutral-300">
            <Monitor className="size-3.5 text-[#F3652F]" />
            {PLAY_TYPE_LABELS[game.playType]}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#222] px-3 py-1.5 text-xs text-neutral-300">
            <Gamepad2 className="size-3.5 text-[#F3652F]" />
            {game.controllerSupport ? "Controller OK" : "KBM"}
          </span>
        </div>

        <div className="mt-1 flex items-end justify-between gap-3 border-t border-white/5 pt-4">
          <div>
            <p className="text-[11px] text-neutral-500">Rating</p>
            <p className="text-2xl font-semibold text-white">
              ★ {game.rating.toFixed(1)}
            </p>
          </div>
        </div>

        <a
          href={game.playUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants(),
            "h-11 w-full rounded-full bg-[#F3652F] font-semibold text-white hover:bg-[#ff7a45]",
          )}
        >
          Play Now
          <ExternalLink className="size-3.5" />
        </a>
      </div>
    </article>
  );
}
