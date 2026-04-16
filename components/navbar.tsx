import Link from "next/link";
import { Suspense } from "react";
import Search from "@/components/search";
import type { NavbarItems } from "@/lib/definitions";

const navbarItems = [
  {
    name: "Articulos",
    link: "/articles",
  },
] as const satisfies readonly NavbarItems[];

export default function Navbar() {
  return (
    <header className="border-b border-white/10 bg-void-eclipse backdrop-blur font-pixel px-12">
      <nav className="relative flex h-16 items-center justify-between">
        <Link href="/" className="z-10 text-lg font-semibold text-white">
          collections.dev
        </Link>

        <div className="absolute left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2">
          <Suspense
            fallback={
              <p className="text-zinc-500 mt-8">Cargando búsqueda...</p>
            }
          >
            <Search placeholder="Buscar artículos..." />
          </Suspense>
        </div>

        <div className="z-10 flex items-center gap-6 text-sm text-zinc-300">
          {navbarItems.map((item) => (
            <Link href={item.link} key={item.name} className="hover:text-white">
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
