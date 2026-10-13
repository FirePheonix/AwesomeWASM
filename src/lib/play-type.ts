import type { PlayType } from "@/types/game";

export const PLAY_TYPE_LABELS: Record<PlayType, string> = {
  "browser-native": "Browser Native",
  webassembly: "WebAssembly",
  emulated: "Emulated",
  "cloud-streamed": "Cloud Streamed",
};

export const PLAY_TYPE_HINTS: Record<PlayType, string> = {
  "browser-native": "Built for the web — open and play.",
  webassembly: "Native-speed port compiled to WASM / WebGL.",
  emulated: "Runs via an in-browser emulator.",
  "cloud-streamed": "Rendered remotely and streamed to your tab.",
};
