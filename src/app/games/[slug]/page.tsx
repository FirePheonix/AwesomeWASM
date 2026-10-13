import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GameDetail } from "@/components/games/game-detail";
import { GAMES } from "@/data/games";
import { getGameBySlugSync } from "@/lib/games-repository";

export function generateStaticParams() {
  return GAMES.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlugSync(slug);
  if (!game) return { title: "Game not found" };
  return {
    title: game.title,
    description: game.shortDescription,
  };
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = getGameBySlugSync(slug);
  if (!game) notFound();
  return <GameDetail game={game} />;
}
