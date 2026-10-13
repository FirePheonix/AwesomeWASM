import { DiscoveryBoard } from "@/components/home/discovery-board";
import { GAMES } from "@/data/games";

export default function HomePage() {
  return <DiscoveryBoard games={GAMES} />;
}
