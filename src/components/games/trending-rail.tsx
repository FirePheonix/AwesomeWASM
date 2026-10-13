"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { PlayTypeBadge } from "@/components/games/play-type-badge";
import type { Game } from "@/types/game";

export function TrendingRail({ games }: { games: Game[] }) {
  return (
    <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:-mx-0 sm:px-0 [scrollbar-width:thin]">
      {games.map((game, index) => (
        <motion.div
          key={game.id}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05, duration: 0.4 }}
          className="w-[240px] shrink-0 sm:w-[260px]"
        >
          <Link
            href={`/games/${game.slug}`}
            className="group block overflow-hidden rounded-[15px] border border-[#292929] bg-[#080808] transition hover:border-[#edff00]/25"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={game.coverImage}
                alt={game.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="260px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute top-2 left-2">
                <PlayTypeBadge type={game.playType} />
              </div>
              <span className="absolute right-2 bottom-2 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-bold text-[#edff00]">
                #{index + 1}
              </span>
            </div>
            <div className="p-3">
              <h3 className="truncate font-display text-base tracking-tight text-white group-hover:text-[#edff00]">
                {game.title}
              </h3>
              <p className="mt-1 truncate text-xs text-zinc-500">
                {game.genres.slice(0, 2).join(" · ")}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
