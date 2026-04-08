import Link from "next/link";
import Container from "@/components/container";

export default function Navbar() {
  return (
    <header className="border-b border-white/10 bg-black/90 backdrop-blur font-sans">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <Link href="/" className="text-lg font-semibold text-white">
            collections.dev
          </Link>

          <div className="flex items-center gap-6 text-sm text-zinc-300">
            <Link href="/articles" className="hover:text-white">
              Articulos
            </Link>
          </div>
        </nav>
      </Container>
    </header>
  );
}
