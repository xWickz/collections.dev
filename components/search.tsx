"use client";

import { useSearchParams } from "next/navigation";
import { useRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useHotkey, useSetSearchParam } from "@/lib/hooks";

export default function Search({ placeholder }: { placeholder: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const setParam = useSetSearchParam();

  const handleSearch = useDebouncedCallback(
    (term: string) => setParam("query", term),
    300,
  );
  const handleTypeChange = (type: string) => setParam("type", type);

  useHotkey("k", () => inputRef.current?.focus());

  return (
    <div className="relative flex flex-1 shrink-0 max-w-md w-full mx-auto font-pixel">
      <label htmlFor="search" className="sr-only">
        Búsqueda de artículos
      </label>
      <div className="pr-3 flex items-center border pl-3 gap-2 bg-foreground/5 border-foreground/20 h-[46px] rounded-md overflow-hidden w-full focus-within:ring-2 focus-within:ring-foreground/20 transition-all">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 30 30"
          fill="currentColor"
          className="shrink-0 text-foreground/60"
        >
          <title>Search Icon</title>
          <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
        </svg>
        <select
          name="type"
          id="type-search"
          className="outline-none bg-transparent text-sm text-foreground/70 cursor-pointer [&>option]:bg-background"
          defaultValue={searchParams.get("type") || "articles"}
          onChange={(e) => handleTypeChange(e.target.value)}
        >
          <option value="articles">Artículo</option>
          <option value="category">Categoria</option>
        </select>
        <input
          ref={inputRef}
          id="search"
          type="text"
          className="w-full h-full outline-none text-foreground placeholder-foreground/40 text-sm"
          placeholder={placeholder}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get("query")?.toString()}
        />
        <div className="hidden sm:flex items-center gap-1 bg-foreground/10 px-1.5 py-1 rounded border border-foreground/20 text-[10px] font-sans text-foreground/60">
          <span className="text-xs">⌘</span>K
        </div>
      </div>
    </div>
  );
}
