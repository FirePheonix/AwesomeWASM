import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-extrabold uppercase text-white">Game over</h1>
      <p className="mt-3 text-sm text-neutral-500">
        That page isn&apos;t in the shelf.
      </p>
      <Link
        href="/"
        className={cn(
          buttonVariants({ size: "lg" }),
          "mt-6 h-11 rounded-full bg-[#F3652F] font-semibold text-white hover:bg-[#ff7a45]",
        )}
      >
        Back home
      </Link>
    </div>
  );
}
