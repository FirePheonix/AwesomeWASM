"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";

import type { Game } from "@/types/game";

/** Entire card opens the external play site in a new tab */
export function MediumGameCard({ game }: { game: Game }) {
  return (
    <a
      href={game.playUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-2xl bg-[#1a1a1a] p-4 transition hover:bg-[#1f1f1f] sm:p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-white group-hover:text-[#F3652F] sm:text-lg">
          {game.title}
        </h3>
        <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-white">
          {game.year}
          <ExternalLink className="size-3.5 text-neutral-500 opacity-0 transition group-hover:opacity-100" />
        </span>
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-[#222] px-2.5 py-1 text-[11px] text-neutral-300">
          <span className="text-amber-400">★</span> {game.rating.toFixed(1)}
        </span>
        <span className="rounded-full bg-[#222] px-2.5 py-1 text-[11px] text-neutral-400">
          {game.players}
        </span>
      </div>

      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-400">
        {game.shortDescription}{" "}
        <span className="font-medium text-[#F3652F]">Play now →</span>
      </p>

      <div className="mt-4 flex gap-2">
        {game.screenshots.slice(0, 3).map((src) => (
          <div
            key={src}
            className="relative size-14 overflow-hidden rounded-xl sm:size-16"
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
        ))}
      </div>
    </a>
  );
}
