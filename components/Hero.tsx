"use client";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isGreen, setGreen] = useState(false);

  useEffect(() => {
    const interval = setInterval(
      () => {
        setGreen(true);
        setTimeout(() => {
          setGreen(false);
        }, 1000);
      },
      Math.random() * 5000 + 3000,
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-snow-white font-pixel items-center flex flex-col">
      <h1
        className={`text-6xl font-bold transition-colors duration-500 ${
          isGreen ? "text-green-400" : "text-snow-white"
        }`}
      >
        collections.dev
      </h1>
      <p className="text-snow-white/90">
        Colección de recursos, artículos y herramientas
      </p>
    </div>
  );
}
