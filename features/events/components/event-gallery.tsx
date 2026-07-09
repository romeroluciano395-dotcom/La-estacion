"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function EventGallery({
  imagenPrincipal,
  galeria,
  alt,
}: {
  imagenPrincipal: string;
  galeria: string[];
  alt: string;
}) {
  const imagenes = [imagenPrincipal, ...galeria];
  const [activa, setActiva] = useState(0);

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 shadow-premium">
        <Image
          key={activa}
          src={imagenes[activa]}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover duration-500 animate-in fade-in"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
      </div>

      {imagenes.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {imagenes.map((src, i) => (
            <button
              key={src}
              onClick={() => setActiva(i)}
              aria-label={`Ver imagen ${i + 1}`}
              className={cn(
                "relative aspect-[16/10] overflow-hidden rounded-xl border transition-all",
                activa === i
                  ? "border-primary ring-2 ring-primary/40"
                  : "border-white/10 opacity-60 hover:opacity-100",
              )}
            >
              <Image
                src={src}
                alt={`${alt} — miniatura ${i + 1}`}
                fill
                loading="lazy"
                sizes="25vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
