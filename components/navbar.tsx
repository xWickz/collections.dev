import Link from "next/link";
import Container from "@/components/ui/container";

interface NavbarItems {
  readonly name: string;
  link: string;
}

const navbarItems: Readonly<NavbarItems[]> = [
  {
    name: "Articulos",
    link: "/articles",
  },
];

export default function Navbar() {
  return (
    <header className="border-b border-white/10 bg-void-eclipse backdrop-blur font-mono px-12">
      <nav className="flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-semibold text-white">
          collections.dev
        </Link>

        <div className="flex items-center gap-6 text-sm text-zinc-300">
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
