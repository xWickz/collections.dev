"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

// Escribe (o borra, si el valor está vacío) un parámetro de búsqueda.
// Solo "/" y "/articles" filtran; desde cualquier otra página se va a "/articles".
export function useSetSearchParam() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push, replace } = useRouter();

  return (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    if (pathname === "/" || pathname === "/articles") {
      replace(`${pathname}?${params.toString()}`);
    } else {
      push(`/articles?${params.toString()}`);
    }
  };
}

// Ejecuta `handler` con Cmd/Ctrl + `key`.
export function useHotkey(key: string, handler: () => void) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === key && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handler();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [key, handler]);
}
