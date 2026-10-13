import { GAMES } from "@/data/games";
import type { Game, GameFilters, GameRepository } from "@/types/game";

function matchesFilters(game: Game, filters: GameFilters = {}): boolean {
  const query = filters.query?.trim().toLowerCase();
  if (query) {
    const haystack = [
      game.title,
      game.shortDescription,
      game.description,
      game.publisher,
      ...game.genres,
      ...game.tags,
      game.playType,
    ]
      .join(" ")
      .toLowerCase();
    if (!haystack.includes(query)) return false;
  }

  if (filters.genres?.length) {
    if (!filters.genres.some((g) => game.genres.includes(g))) return false;
  }

  if (filters.playTypes?.length) {
    if (!filters.playTypes.includes(game.playType)) return false;
  }

  if (filters.controllerOnly && !game.controllerSupport) return false;

  if (filters.requiresOwnFiles === true && !game.requiresOwnFiles) return false;
  if (filters.requiresOwnFiles === false && game.requiresOwnFiles) return false;

  return true;
}

/**
 * In-memory repository. Replace with Prisma/Supabase later —
 * pages should only depend on GameRepository.
 */
export class MockGameRepository implements GameRepository {
  async list(filters: GameFilters = {}): Promise<Game[]> {
    await delay(80);
    return GAMES.filter((g) => matchesFilters(g, filters)).sort(
      (a, b) => b.rating - a.rating,
    );
  }

  async getBySlug(slug: string): Promise<Game | null> {
    await delay(60);
    return GAMES.find((g) => g.slug === slug) ?? null;
  }

  async getFeatured(): Promise<Game[]> {
    await delay(60);
    return GAMES.filter((g) => g.featured);
  }

  async getTrending(): Promise<Game[]> {
    await delay(60);
    return GAMES.filter((g) => g.trending).sort((a, b) => b.rating - a.rating);
  }
}

export const gamesRepository: GameRepository = new MockGameRepository();

/** Sync helpers for static generation / client filters */
export function filterGamesSync(
  games: Game[],
  filters: GameFilters = {},
  favouriteIds?: string[],
): Game[] {
  return games.filter((game) => {
    if (!matchesFilters(game, filters)) return false;
    if (filters.favouritesOnly && favouriteIds) {
      return favouriteIds.includes(game.id);
    }
    return true;
  });
}

export function getGameBySlugSync(slug: string): Game | undefined {
  return GAMES.find((g) => g.slug === slug);
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
