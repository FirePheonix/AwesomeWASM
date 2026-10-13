import { cn } from "@/lib/utils";
import { PLAY_TYPE_LABELS } from "@/lib/play-type";
import type { PlayType } from "@/types/game";

const STYLES: Record<PlayType, string> = {
  "browser-native": "bg-[#F3652F] text-white",
  webassembly: "bg-white/90 text-[#111111]",
  emulated: "bg-[#2a2a2a] text-white",
  "cloud-streamed": "bg-[#F3652F]/20 text-[#F3652F] ring-1 ring-[#F3652F]/40",
};

export function PlayTypeBadge({
  type,
  className,
}: {
  type: PlayType;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-[-0.04em]",
        STYLES[type],
        className,
      )}
    >
      {PLAY_TYPE_LABELS[type]}
    </span>
  );
}
