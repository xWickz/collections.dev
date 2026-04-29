import Link from "next/link";
import { Suspense } from "react";
import Search from "@/components/search";
import { GitHub } from "@/components/svg/icons";
import type { NavbarItems } from "@/lib/definitions";

const navbarItems = [
  {
    name: "Articulos",
    link: "/articles",
  },
] as const satisfies readonly NavbarItems[];

export default function Navbar() {
  return (
    <header className="border-b border-white/10 bg-void-eclipse/95 backdrop-blur font-pixel px-4 sm:px-6 lg:px-12">
      <nav className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-3 py-3 md:h-16 md:grid-cols-[auto_minmax(320px,1fr)_auto] md:gap-6 md:py-0">
        <Link
          href="/"
          className="text-base font-semibold text-white sm:text-lg md:justify-self-start text-center"
        >
          collections.dev
        </Link>

        <div className="w-full md:max-w-xl md:justify-self-center">
          <Suspense
            fallback={
              <p className="text-sm text-zinc-500">Cargando búsqueda...</p>
            }
          >
            <Search placeholder="Buscar artículos..." />
          </Suspense>
        </div>

        <div className="flex items-center gap-4 text-sm text-zinc-300 md:justify-self-end md:gap-6 text-center justify-center">
          {navbarItems.map((item) => (
            <Link
              href={item.link}
              key={item.name}
              className="transition-colors hover:text-white"
            >
              {item.name}
            </Link>
          ))}
          <a
            href="https://github.com/xWickz/collections.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            <GitHub width={20} height={20} />
          </a>
        </div>
      </nav>
    </header>
  );
}
