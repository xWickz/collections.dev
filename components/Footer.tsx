import Link from "next/link";

export default function Footer() {
  return (
    <header className="border-t border-snow-white/10 bg-void-eclipse backdrop-blur font-mono px-12">
      <nav className="flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-semibold text-snow-white">
          collections.dev
        </Link>

        <div className="flex items-center gap-6 text-sm text-snow-white/80">
          <span>
            Desarrollado por{" "}
            <a href="https://github.com/xWickz" className="hover:text-white">
              Wickz
            </a>
          </span>
        </div>
      </nav>
    </header>
  );
}
