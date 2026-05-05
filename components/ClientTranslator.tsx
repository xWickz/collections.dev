"use client";

// Source-Code: https://github.com/xWickz/google-translator-ai/blob/main/scripts.js
// Adapted with AI

import { useEffect, useState } from "react";

type ClientTranslatorProps = {
  defaultTarget?: string;
};

export default function ClientTranslator({
  defaultTarget = "en",
}: ClientTranslatorProps) {
  if (process.env.NODE_ENV === "production") {
    return null; // No render in production
  }

  const [status, setStatus] = useState<string>("Detectando disponibilidad...");
  const [canTranslate, setCanTranslate] = useState<boolean>(false);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  useEffect(() => {
    async function checkAvailability() {
      if (!("Translator" in window) || !("LanguageDetector" in window)) {
        setStatus("Traducción no compatible en este navegador.");
        return;
      }
      setStatus("Listo para traducir");
      setCanTranslate(true);
    }

    checkAvailability();
  }, []);

  const handleTranslate = async () => {
    if (!canTranslate || isTranslating) return;

    setIsTranslating(true);
    setStatus("Preparando traducción...");

    try {
      const elements = document.querySelectorAll(
        "article p, article h1, article h2, article h3, article ul, article ol, article a",
      );
      const fullText = Array.from(elements)
        .map((el) => el.textContent)
        .join(" ");

      const detector = await (window as any).LanguageDetector.create();
      const detectionResult = await detector.detect(fullText);
      const detectedLanguage = detectionResult[0]?.detectedLanguage || "es";

      if (detectedLanguage === defaultTarget) {
        setStatus("Ya está en el idioma objetivo.");
        setIsTranslating(false);
        return;
      }

      const availability = await (window as any).Translator.availability({
        sourceLanguage: detectedLanguage,
        targetLanguage: defaultTarget,
      });

      if (
        availability === "vulnerable" ||
        availability === "after-download" ||
        availability === "downloadable"
      ) {
        console.log("El modelo debe descargarse. Inicializando descarga...");
      }

      const translator = await (window as any).Translator.create({
        sourceLanguage: detectedLanguage,
        targetLanguage: defaultTarget,
        monitor(monitor: any) {
          monitor.addEventListener("downloadprogress", (e: any) => {
            const progress = Math.floor((e.loaded / e.total) * 100);
            setDownloadProgress(progress);
            setStatus(`Descargando modelo: ${progress}%`);
          });
        },
      });

      for (const el of elements) {
        if (el.textContent?.trim()) {
          el.textContent = await translator.translate(el.textContent);
        }
      }

      setStatus("Traducido con IA local");
      setDownloadProgress(null);
    } catch (error) {
      console.error("Error al traducir:", error);
      setStatus("Error al traducir el artículo");
      setIsTranslating(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-zinc-900 border border-white/10 p-4 rounded-lg text-xs shadow-xl flex flex-col gap-2 max-w-xs">
      <p className="text-zinc-400">{status}</p>
      {downloadProgress !== null && (
        <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-accent-blue h-full transition-all duration-300"
            style={{ width: `${downloadProgress}%` }}
          />
        </div>
      )}
      {!isTranslating && (
        <button
          type="button"
          onClick={handleTranslate}
          className="mt-1 px-3 py-1.5 bg-white text-black rounded hover:bg-zinc-200 transition-colors w-full cursor-pointer font-sans"
        >
          Traducir artículo al inglés
        </button>
      )}
    </div>
  );
}
