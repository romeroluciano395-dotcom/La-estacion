"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { Evento } from "@/types/event";
import { FeaturedEvent } from "./featured-event";

export function FeaturedCarousel({ eventos }: { eventos: Evento[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.8, 580);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  if (eventos.length === 0) return null;

  return (
    <div className="relative">
      {/* Flechas (desktop) */}
      <div className="pointer-events-none absolute -top-14 right-0 hidden gap-2 sm:flex">
        <button
          onClick={() => scrollBy(-1)}
          aria-label="Anterior"
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground transition-colors hover:border-primary/40 hover:bg-primary/10"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => scrollBy(1)}
          aria-label="Siguiente"
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground transition-colors hover:border-primary/40 hover:bg-primary/10"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Track scrollable con snap */}
      <div
        ref={trackRef}
        className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0"
      >
        {eventos.map((evento) => (
          <FeaturedEvent key={evento.id} evento={evento} />
        ))}
      </div>
    </div>
  );
}
