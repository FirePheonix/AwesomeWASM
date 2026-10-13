import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/5 bg-[#111111]">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="text-sm font-medium text-white">
          Awesome<span className="text-[#F3652F]">WASM</span>
        </p>
        <div className="flex flex-wrap gap-5 text-sm text-neutral-500">
          <Link href="/" className="hover:text-[#F3652F]">
            Home
          </Link>
          <Link href="/favourites" className="hover:text-[#F3652F]">
            Favourites
          </Link>
          <a
            href="https://webassembly.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#F3652F]"
          >
            About WASM
          </a>
        </div>
      </div>
    </footer>
  );
}
