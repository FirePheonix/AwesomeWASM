"use client";

import { SiGithub, SiWebassembly } from "react-icons/si";
import { Cloud, Gamepad2, Globe2, MonitorSmartphone } from "lucide-react";

import { ResearchBentoGrid } from "@/components/ui/research-bento-grid";
import type { ResearchBentoBrand } from "@/components/ui/research-bento-grid";

function LucideBrand({
  icon: Icon,
  className,
  ...props
}: {
  icon: typeof Cloud;
  className?: string;
  "aria-hidden"?: boolean;
}) {
  return <Icon className={className} aria-hidden={props["aria-hidden"]} />;
}

const BRANDS: ResearchBentoBrand[] = [
  { name: "WebAssembly", icon: SiWebassembly },
  {
    name: "Browser",
    icon: (props) => <LucideBrand icon={Globe2} {...props} />,
  },
  {
    name: "Devices",
    icon: (props) => <LucideBrand icon={MonitorSmartphone} {...props} />,
  },
  {
    name: "Cloud",
    icon: (props) => <LucideBrand icon={Cloud} {...props} />,
  },
  {
    name: "Gamepad",
    icon: (props) => <LucideBrand icon={Gamepad2} {...props} />,
  },
  { name: "GitHub", icon: SiGithub },
];

export function WasmBento() {
  return (
    <ResearchBentoGrid
      className="min-h-[720px] rounded-[18px] sm:min-h-[780px]"
      brands={BRANDS}
      defaultSelectedBrand={0}
      monthlyPrice={0}
      previousPrice={60}
      currency="USD"
      userLabel="You"
      collaboratorLabel="Play"
      copy={{
        showcaseTitle: (
          <>
            One catalogue.
            <br />
            Every play path.
          </>
        ),
        showcaseDescription:
          "Browser-native, WebAssembly, emulated, or cloud-streamed — we label the tech so you know what opens when you hit Play.",
        pricingTitle: (
          <>
            Zero install tax.
            <br />
            Instant sessions.
          </>
        ),
        pricingDescription:
          "Skip downloads when a tab is enough. Featured titles link straight to their real playable hosts — QuakeJS, Minecraft Classic, cloud catalogs, and more.",
        pauseTitle: (
          <>
            Favourites on standby.
            <br />
            Resume anytime.
          </>
        ),
        activeDescription:
          "Save games locally, filter by genre or play type, then jump back when the next round starts.",
        pausedDescription:
          "Your favourites stay parked in this browser. Unpause the grind whenever you are ready.",
      }}
    />
  );
}
