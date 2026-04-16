import Link from "next/link";

export default function Footer() {
  return (
    <header className="border-snow-white/10 bg-void-eclipse backdrop-blur font-pixel px-12">
      <nav className="flex h-16 items-center justify-between max-sm:flex-col max-sm:gap-4 max-sm:py-3 max-sm:h-auto">
        <Link
          href="/"
          className="text-lg font-semibold text-snow-white max-sm:text-sm"
        >
          collections.dev
        </Link>

        <div className="flex items-center gap-6 text-sm text-snow-white/80 max-sm:text-sm">
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
