import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { FavouritesProvider } from "@/hooks/use-favourites";

import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "AwesomeWASM — Browser Game Discovery",
    template: "%s · AwesomeWASM",
  },
  description:
    "Discover browser-playable games: WebAssembly ports, native web titles, emulators, and cloud streams.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`dark ${bricolage.variable} h-full`}>
      <body className={`${bricolage.className} flex min-h-full flex-col tracking-[-0.04em]`}>
        <FavouritesProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </FavouritesProvider>
      </body>
    </html>
  );
}
