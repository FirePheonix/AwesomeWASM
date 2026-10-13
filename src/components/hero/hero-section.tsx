"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Play } from "lucide-react";

import { PlayTypeBadge } from "@/components/games/play-type-badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Game } from "@/types/game";

export function HeroSection({ featured }: { featured: Game }) {
  return (
    <section className="relative isolate min-h-[min(92vh,920px)] overflow-hidden border-b border-white/5">
      <Image
        src={featured.heroImage}
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(237,255,0,0.12),transparent_55%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-[#020202]/88 to-[#020202]/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202]/50" />

      <div className="relative mx-auto flex min-h-[min(88vh,860px)] max-w-7xl flex-col justify-center px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <h1 className="mb-4 font-display text-5xl tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Awesome<span className="text-[#edff00]">WASM</span>
          </h1>
          <p className="max-w-lg text-base text-zinc-300 sm:text-lg">
            Premium discovery for games you can actually play in a browser —
            WASM ports, native web titles, emulators, and cloud streams.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/catalogue"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 bg-[#edff00] px-5 font-semibold text-black hover:bg-[#f5ff4d]",
              )}
            >
              Explore catalogue
              <ArrowRight className="size-4" />
            </Link>
            <a
              href={featured.playUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 border-white/20 bg-black/30 px-5 text-white backdrop-blur hover:bg-white/10",
              )}
            >
              <Play className="size-4 fill-current" />
              Play featured
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 max-w-xl rounded-[15px] border border-white/10 bg-[#080808]/75 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-md sm:mt-12 sm:p-5"
        >
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-[#edff00] px-2 py-0.5 text-[10px] font-bold tracking-wider text-black uppercase">
              Featured drop
            </span>
            <PlayTypeBadge type={featured.playType} />
          </div>
          <h2 className="mt-3 font-display text-2xl tracking-tight text-white sm:text-3xl">
            {featured.title}
          </h2>
          <p className="mt-2 line-clamp-2 text-sm text-zinc-400">
            {featured.shortDescription}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href={`/games/${featured.slug}`}
              className={cn(
                buttonVariants({ size: "sm" }),
                "border border-white/15 bg-white/5 text-white hover:bg-white/10",
              )}
            >
              View details
            </Link>
            <a
              href={featured.playUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "sm" }),
                "bg-[#edff00] font-semibold text-black hover:bg-[#f5ff4d]",
              )}
            >
              Play now
              <ExternalLink className="size-3.5" />
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] bottom-[-20%] hidden h-[55%] w-[45%] rounded-full bg-[#edff00]/10 blur-[90px] lg:block"
        animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.08, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
}
