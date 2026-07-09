"use client";

import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";

import type { Evento, EventFiltersState } from "@/types/event";
import { CATEGORY_LABEL, isReservable } from "@/lib/events-config";
import { Button } from "@/components/ui/button";
import { SearchBar } from "./search-bar";
import { EventFilters } from "./event-filters";
import { EventList } from "./event-list";

const PAGE_SIZE = 6;

const DEFAULT_FILTERS: EventFiltersState = {
  query: "",
  categoria: "todas",
  ciudad: "todas",
  precioMax: null,
  fechaDesde: null,
  soloDisponibles: false,
  sort: "fecha-asc",
};

export function EventsExplorer({
  eventos,
  ciudades,
}: {
  eventos: Evento[];
  ciudades: string[];
}) {
  const [filters, setFilters] = useState<EventFiltersState>(DEFAULT_FILTERS);
  const [visible, setVisible] = useState(PAGE_SIZE);

  function patch(p: Partial<EventFiltersState>) {
    setFilters((f) => ({ ...f, ...p }));
    setVisible(PAGE_SIZE); // reinicia paginación al filtrar
  }

  function reset() {
    setFilters(DEFAULT_FILTERS);
    setVisible(PAGE_SIZE);
  }

  const activeCount = useMemo(() => {
    let n = 0;
    if (filters.categoria !== "todas") n++;
    if (filters.ciudad !== "todas") n++;
    if (filters.precioMax !== null) n++;
    if (filters.fechaDesde !== null) n++;
    if (filters.soloDisponibles) n++;
    return n;
  }, [filters]);

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase();

    const list = eventos.filter((e) => {
      if (q) {
        const haystack = `${e.nombre} ${e.ciudad} ${CATEGORY_LABEL[e.categoria]}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (filters.categoria !== "todas" && e.categoria !== filters.categoria)
        return false;
      if (filters.ciudad !== "todas" && e.ciudad !== filters.ciudad)
        return false;
      if (filters.precioMax !== null && e.precio > filters.precioMax)
        return false;
      if (filters.fechaDesde && e.fecha < filters.fechaDesde) return false;
      if (filters.soloDisponibles && !isReservable(e.estado)) return false;
      return true;
    });

    const sorted = [...list].sort((a, b) => {
      switch (filters.sort) {
        case "precio-asc":
          return a.precio - b.precio;
        case "precio-desc":
          return b.precio - a.precio;
        case "nombre-asc":
          return a.nombre.localeCompare(b.nombre, "es");
        case "lugares-desc":
          return b.lugaresDisponibles - a.lugaresDisponibles;
        case "fecha-asc":
        default:
          return (
            new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
          );
      }
    });

    return sorted;
  }, [eventos, filters]);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  return (
    <div>
      <SearchBar value={filters.query} onChange={(v) => patch({ query: v })} />

      <div className="mt-6 grid gap-8 lg:grid-cols-[300px_1fr]">
        {/* Sidebar de filtros */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <EventFilters
            filters={filters}
            ciudades={ciudades}
            onChange={patch}
            onReset={reset}
            activeCount={activeCount}
          />
        </aside>

        {/* Resultados */}
        <div>
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">
                {filtered.length}
              </span>{" "}
              {filtered.length === 1 ? "viaje encontrado" : "viajes encontrados"}
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] py-20 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-muted-foreground">
                <SearchX className="h-7 w-7" />
              </span>
              <p className="mt-4 font-semibold">No encontramos viajes</p>
              <p className="mt-1 max-w-xs text-sm text-muted-foreground">
                Probá cambiar los filtros o la búsqueda para ver más resultados.
              </p>
              <Button variant="outline" size="sm" className="mt-5" onClick={reset}>
                Limpiar filtros
              </Button>
            </div>
          ) : (
            <>
              <EventList eventos={shown} />

              {hasMore && (
                <div className="mt-10 flex justify-center">
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  >
                    Cargar más viajes
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
