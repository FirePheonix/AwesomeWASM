export type PlayType =
  | "browser-native"
  | "webassembly"
  | "emulated"
  | "cloud-streamed";

export type Genre =
  | "Action"
  | "Adventure"
  | "FPS"
  | "Racing"
  | "Sports"
  | "Sandbox"
  | "Horror"
  | "Fighting"
  | "Platformer"
  | "Retro"
  | "Multiplayer"
  | "Strategy";

export interface BrowserCompatibility {
  chrome: boolean;
  firefox: boolean;
  safari: boolean;
  edge: boolean;
  notes?: string;
}

export interface Game {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  coverImage: string;
  heroImage: string;
  screenshots: string[];
  genres: Genre[];
  year: number;
  playType: PlayType;
  playUrl: string;
  publisher: string;
  requiresOwnFiles: boolean;
  controllerSupport: boolean;
  trending: boolean;
  featured: boolean;
  rating: number;
  players: string;
  tags: string[];
  compatibility: BrowserCompatibility;
  /** Optional note shown on detail page (e.g. account / file requirements) */
  playNotes?: string;
}

/** Future DB / community submission shape */
export interface GameSubmissionDraft {
  title: string;
  playUrl: string;
  playType: PlayType;
  genres: Genre[];
  description: string;
  requiresOwnFiles: boolean;
  submitterNote?: string;
}

export interface GameFilters {
  query?: string;
  genres?: Genre[];
  playTypes?: PlayType[];
  controllerOnly?: boolean;
  favouritesOnly?: boolean;
  requiresOwnFiles?: boolean | null;
}

export interface GameRepository {
  list(filters?: GameFilters): Promise<Game[]>;
  getBySlug(slug: string): Promise<Game | null>;
  getFeatured(): Promise<Game[]>;
  getTrending(): Promise<Game[]>;
}
