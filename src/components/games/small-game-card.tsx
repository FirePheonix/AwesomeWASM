"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";

import { PlayTypeBadge } from "@/components/games/play-type-badge";
import type { Game } from "@/types/game";

/** Entire card opens the external play site in a new tab */
export function SmallGameCard({ game }: { game: Game }) {
  return (
    <a
      href={game.playUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-2xl bg-[#1a1a1a] transition hover:bg-[#1f1f1f]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={game.coverImage}
          alt={game.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width:768px) 50vw, 180px"
        />
        <div className="absolute top-2 right-2 flex items-center gap-1">
          <PlayTypeBadge type={game.playType} />
        </div>
        <span className="absolute right-2 bottom-2 rounded-full bg-black/55 p-1.5 text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
          <ExternalLink className="size-3" />
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="truncate text-sm font-semibold text-white group-hover:text-[#F3652F]">
          {game.title}
        </h3>
        <p className="text-[11px] text-neutral-500">
          ★ {game.rating.toFixed(1)} · {game.year}
        </p>
        <p className="truncate text-[11px] text-neutral-500">
          {game.genres[0]}
          {game.controllerSupport ? " · Controller" : ""}
        </p>
      </div>
    </a>
  );
}
