"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu } from "lucide-react";
import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useFavourites } from "@/hooks/use-favourites";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/#recommended", label: "Play" },
  { href: "/favourites", label: "Favourites" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { favourites } = useFavourites();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#111111]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <nav className="hidden items-center gap-6 md:flex">
          {LINKS.map((link) => {
            const base = link.href.split("#")[0];
            const active =
              link.href === "/"
                ? pathname === "/"
                : base !== "/" && pathname.startsWith(base);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition",
                  active ? "text-white" : "text-neutral-500 hover:text-white",
                )}
              >
                {link.label}
                {link.href === "/favourites" && favourites.length > 0 && (
                  <span className="ml-1.5 text-[#F3652F]">
                    {favourites.length}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/"
          className="font-semibold text-white md:absolute md:left-1/2 md:-translate-x-1/2"
        >
          Awesome<span className="text-[#F3652F]">WASM</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/favourites"
            className="relative rounded-full p-2 text-neutral-400 transition hover:text-white"
            aria-label="Favourites"
          >
            <Heart className="size-4" />
            {favourites.length > 0 && (
              <span className="absolute top-1 right-1 size-1.5 rounded-full bg-[#F3652F]" />
            )}
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="inline-flex size-8 items-center justify-center rounded-full text-neutral-300 md:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-[#2a2a2a] bg-[#1a1a1a] text-white"
            >
              <SheetHeader>
                <SheetTitle className="text-left text-white">
                  Awesome<span className="text-[#F3652F]">WASM</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1">
                {LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-3 text-neutral-300 hover:bg-white/5 hover:text-[#F3652F]"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
