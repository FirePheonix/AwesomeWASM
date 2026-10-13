"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  ExternalLink,
  Gamepad2,
  HardDrive,
  Heart,
  Monitor,
  X,
} from "lucide-react";

import { PlayTypeBadge } from "@/components/games/play-type-badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useFavourites } from "@/hooks/use-favourites";
import { PLAY_TYPE_HINTS, PLAY_TYPE_LABELS } from "@/lib/play-type";
import { cn } from "@/lib/utils";
import type { Game } from "@/types/game";

export function GameDetail({ game }: { game: Game }) {
  const { isFavourite, toggleFavourite } = useFavourites();
  const fav = isFavourite(game.id);

  const browsers = [
    { key: "chrome", label: "Chrome", ok: game.compatibility.chrome },
    { key: "firefox", label: "Firefox", ok: game.compatibility.firefox },
    { key: "safari", label: "Safari", ok: game.compatibility.safari },
    { key: "edge", label: "Edge", ok: game.compatibility.edge },
  ] as const;

  return (
    <div>
      <div className="relative isolate min-h-[38vh] overflow-hidden">
        <Image
          src={game.heroImage}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/80 to-[#111111]/45" />
        <div className="relative mx-auto flex max-w-[1400px] flex-col justify-end px-4 pb-10 pt-20 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="mb-5 inline-flex w-fit items-center gap-2 text-sm text-neutral-400 hover:text-[#F3652F]"
          >
            <ArrowLeft className="size-4" />
            Back home
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <PlayTypeBadge type={game.playType} />
            {game.requiresOwnFiles && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-amber-300">
                <HardDrive className="size-3" />
                Requires your own game files
              </span>
            )}
          </div>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold uppercase text-white sm:text-5xl md:text-6xl">
            {game.title}
          </h1>
          <p className="mt-3 max-w-2xl text-neutral-300">{game.shortDescription}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={game.playUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 rounded-full bg-[#F3652F] px-6 font-semibold text-white hover:bg-[#ff7a45]",
              )}
            >
              Play Now
              <ExternalLink className="size-4" />
            </a>
            <button
              type="button"
              onClick={() => toggleFavourite(game.id)}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 rounded-full border-white/15 bg-black/30 text-white hover:bg-white/10",
                fav && "border-[#F3652F]/50 text-[#F3652F]",
              )}
            >
              <Heart className={cn("size-4", fav && "fill-current")} />
              {fav ? "Favourited" : "Favourite"}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.4fr_0.8fr] lg:px-8">
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-white">About</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-400 sm:text-base">
              {game.description}
            </p>
            {game.playNotes && (
              <p className="mt-4 rounded-2xl bg-[#F3652F]/10 px-4 py-3 text-sm text-[#F3652F]">
                {game.playNotes}
              </p>
            )}
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">Screenshots</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {game.screenshots.map((src, i) => (
                <div
                  key={src}
                  className={cn(
                    "relative overflow-hidden rounded-2xl bg-[#1a1a1a]",
                    i === 0 ? "aspect-[21/9] sm:col-span-2" : "aspect-video",
                  )}
                >
                  <Image
                    src={src}
                    alt={`${game.title} screenshot ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 60vw"
                  />
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl bg-[#1a1a1a] p-5">
            <h3 className="text-xs font-semibold uppercase text-neutral-500">
              Play path
            </h3>
            <p className="mt-2 text-xl font-semibold text-white">
              {PLAY_TYPE_LABELS[game.playType]}
            </p>
            <p className="mt-1 text-sm text-neutral-500">
              {PLAY_TYPE_HINTS[game.playType]}
            </p>
            <Separator className="my-4 bg-white/10" />
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-neutral-500">Publisher</dt>
                <dd className="text-right text-neutral-200">{game.publisher}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-neutral-500">Year</dt>
                <dd className="text-neutral-200">{game.year}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-neutral-500">Players</dt>
                <dd className="text-neutral-200">{game.players}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-neutral-500">Rating</dt>
                <dd className="text-[#F3652F]">★ {game.rating.toFixed(1)}</dd>
              </div>
            </dl>
            <a
              href={game.playUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-5 h-11 w-full rounded-full bg-[#F3652F] font-semibold text-white hover:bg-[#ff7a45]",
              )}
            >
              Play on external site
              <ExternalLink className="size-4" />
            </a>
          </div>

          <div className="rounded-2xl bg-[#1a1a1a] p-5">
            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase text-neutral-500">
              <Monitor className="size-3.5" />
              Browser compatibility
            </h3>
            <ul className="mt-3 space-y-2">
              {browsers.map((b) => (
                <li
                  key={b.key}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-neutral-300">{b.label}</span>
                  {b.ok ? (
                    <span className="inline-flex items-center gap-1 text-emerald-400">
                      <Check className="size-3.5" /> Supported
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-neutral-500">
                      <X className="size-3.5" /> Limited
                    </span>
                  )}
                </li>
              ))}
            </ul>
            {game.compatibility.notes && (
              <p className="mt-3 text-xs text-neutral-500">
                {game.compatibility.notes}
              </p>
            )}
          </div>

          <div className="rounded-2xl bg-[#1a1a1a] p-5">
            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase text-neutral-500">
              <Gamepad2 className="size-3.5" />
              Controller
            </h3>
            <p className="mt-2 text-sm text-neutral-300">
              {game.controllerSupport
                ? "Controller / gamepad supported on the destination experience."
                : "Keyboard & mouse preferred. Controller support not guaranteed."}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {game.genres.map((g) => (
                <span
                  key={g}
                  className="rounded-full bg-[#222] px-2.5 py-1 text-xs text-neutral-400"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
