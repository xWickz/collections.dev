"use client";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isGreen, setGreen] = useState(false);

  // Parpadeo verde cada 3–8 s, con un intervalo nuevo en cada vuelta.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(
        () => {
          setGreen(true);
          timer = setTimeout(() => {
            setGreen(false);
            schedule();
          }, 1000);
        },
        Math.random() * 5000 + 3000,
      );
    };
    schedule();

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="text-foreground font-pixel items-center flex flex-col">
      <p
        className={`text-6xl max-sm:text-5xl font-bold transition-colors duration-500 ${
          isGreen ? "text-accent" : "text-foreground"
        }`}
      >
        collections.dev
      </p>
      <h1 className="text-foreground/90 text-center">
        Colección de recursos, artículos y herramientas
      </h1>
    </div>
  );
}
