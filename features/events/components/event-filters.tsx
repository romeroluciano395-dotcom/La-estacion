"use client";

import { SlidersHorizontal, X } from "lucide-react";

import type { EventCategory, EventFiltersState } from "@/types/event";
import { cn } from "@/lib/utils";
import { EVENT_CATEGORIES, SORT_OPTIONS } from "@/lib/events-config";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  filters: EventFiltersState;
  ciudades: string[];
  onChange: (patch: Partial<EventFiltersState>) => void;
  onReset: () => void;
  activeCount: number;
}

export function EventFilters({
  filters,
  ciudades,
  onChange,
  onReset,
  activeCount,
}: Props) {
  return (
    <div className="space-y-5 rounded-2xl border border-white/10 bg-card/60 p-5 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <SlidersHorizontal className="h-4 w-4 text-primary" />
          Filtros
        </h3>
        {activeCount > 0 && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" /> Limpiar ({activeCount})
          </button>
        )}
      </div>

      {/* Categorías como pills */}
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Categoría
        </p>
        <div className="flex flex-wrap gap-2">
          <Pill
            active={filters.categoria === "todas"}
            onClick={() => onChange({ categoria: "todas" })}
          >
            Todas
          </Pill>
          {EVENT_CATEGORIES.map((c) => (
            <Pill
              key={c.slug}
              active={filters.categoria === c.slug}
              onClick={() => onChange({ categoria: c.slug as EventCategory })}
            >
              {c.label}
            </Pill>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {/* Ciudad */}
        <Field label="Ciudad">
          <Select
            value={filters.ciudad}
            onValueChange={(v) => onChange({ ciudad: v })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Todas las ciudades" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas las ciudades</SelectItem>
              {ciudades.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        {/* Precio máximo */}
        <Field label="Precio máximo">
          <Input
            type="number"
            min={0}
            step={5000}
            placeholder="Sin límite"
            value={filters.precioMax ?? ""}
            onChange={(e) =>
              onChange({
                precioMax: e.target.value ? Number(e.target.value) : null,
              })
            }
          />
        </Field>

        {/* Fecha desde */}
        <Field label="Fecha desde">
          <Input
            type="date"
            value={filters.fechaDesde ?? ""}
            onChange={(e) =>
              onChange({ fechaDesde: e.target.value || null })
            }
          />
        </Field>

        {/* Ordenar */}
        <Field label="Ordenar por">
          <Select
            value={filters.sort}
            onValueChange={(v) =>
              onChange({ sort: v as EventFiltersState["sort"] })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      {/* Solo disponibles */}
      <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
        <span className="text-sm font-medium">Solo con lugares</span>
        <button
          type="button"
          role="switch"
          aria-checked={filters.soloDisponibles}
          onClick={() => onChange({ soloDisponibles: !filters.soloDisponibles })}
          className={cn(
            "relative h-6 w-11 rounded-full transition-colors",
            filters.soloDisponibles ? "bg-primary" : "bg-white/15",
          )}
        >
          <span
            className={cn(
              "absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform",
              filters.soloDisponibles ? "translate-x-[22px]" : "translate-x-0.5",
            )}
          />
        </button>
      </label>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      {children}
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
        active
          ? "border-transparent bg-gradient-to-r from-primary to-accent text-white"
          : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-white/20 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
