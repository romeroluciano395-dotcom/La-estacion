"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Search, Download, Eye } from "lucide-react";

import type { Reserva, ReservaEstado } from "@/types/admin";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ESTADO_META: Record<ReservaEstado, { label: string; className: string }> =
  {
    pendiente: {
      label: "Pendiente",
      className: "border-amber-500/30 bg-amber-500/15 text-amber-400",
    },
    confirmada: {
      label: "Confirmada",
      className: "border-primary/30 bg-primary/15 text-primary",
    },
    pagada: {
      label: "Pagada",
      className: "border-success/30 bg-success/15 text-success",
    },
    cancelada: {
      label: "Cancelada",
      className: "border-destructive/30 bg-destructive/15 text-destructive",
    },
  };

function fmt(dateIso: string) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateIso));
}

export function ReservationsAdminTable({ reservas }: { reservas: Reserva[] }) {
  const [query, setQuery] = useState("");
  const [estado, setEstado] = useState("todas");
  const [detalle, setDetalle] = useState<Reserva | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return reservas.filter((r) => {
      if (
        q &&
        !`${r.nombre} ${r.apellido} ${r.dni} ${r.email} ${r.eventoNombre}`
          .toLowerCase()
          .includes(q)
      )
        return false;
      if (estado !== "todas" && r.estado !== estado) return false;
      return true;
    });
  }, [reservas, query, estado]);

  function exportCsv() {
    const headers = [
      "Nombre",
      "Apellido",
      "DNI",
      "Teléfono",
      "Email",
      "Evento",
      "Pasajeros",
      "Estado",
      "Fecha",
      "Observaciones",
    ];
    const rows = filtered.map((r) => [
      r.nombre,
      r.apellido,
      r.dni,
      r.telefono,
      r.email,
      r.eventoNombre,
      String(r.cantidadPasajeros),
      r.estado,
      fmt(r.createdAt),
      r.observaciones.replace(/\n/g, " "),
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reservas-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Reservas exportadas");
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por pasajero, DNI, email o evento…"
            className="pl-10"
          />
        </div>
        <Select value={estado} onValueChange={setEstado}>
          <SelectTrigger className="sm:w-44">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todos los estados</SelectItem>
            <SelectItem value="pendiente">Pendiente</SelectItem>
            <SelectItem value="confirmada">Confirmada</SelectItem>
            <SelectItem value="pagada">Pagada</SelectItem>
            <SelectItem value="cancelada">Cancelada</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="secondary" onClick={exportCsv}>
          <Download /> Exportar
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-card/40 backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-medium">Pasajero</th>
                <th className="px-4 py-3 font-medium">DNI</th>
                <th className="px-4 py-3 font-medium">Contacto</th>
                <th className="px-4 py-3 font-medium">Evento</th>
                <th className="px-4 py-3 font-medium">Pasaj.</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 font-medium">Fecha</th>
                <th className="px-4 py-3 text-right font-medium">Ver</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr
                  key={r.id}
                  className="border-b border-white/5 transition-colors last:border-0 hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-3 font-medium">
                    {r.nombre} {r.apellido}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{r.dni}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    <div className="text-xs">{r.telefono}</div>
                    <div className="text-xs">{r.email}</div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    <span className="line-clamp-1">{r.eventoNombre}</span>
                  </td>
                  <td className="px-4 py-3 text-center text-muted-foreground">
                    {r.cantidadPasajeros}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
                        ESTADO_META[r.estado].className,
                      )}
                    >
                      {ESTADO_META[r.estado].label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {fmt(r.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end">
                      <button
                        onClick={() => setDetalle(r)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-white/10 hover:text-foreground"
                        aria-label="Ver detalle"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-16 text-center text-muted-foreground"
                  >
                    No hay reservas que coincidan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={!!detalle} onOpenChange={(o) => !o && setDetalle(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {detalle?.nombre} {detalle?.apellido}
            </DialogTitle>
            <DialogDescription>{detalle?.eventoNombre}</DialogDescription>
          </DialogHeader>
          {detalle && (
            <dl className="space-y-3 text-sm">
              <Row k="DNI" v={detalle.dni} />
              <Row k="Teléfono" v={detalle.telefono} />
              <Row k="Email" v={detalle.email} />
              <Row k="Pasajeros" v={String(detalle.cantidadPasajeros)} />
              <Row k="Estado" v={ESTADO_META[detalle.estado].label} />
              <Row k="Fecha" v={fmt(detalle.createdAt)} />
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                  Observaciones
                </dt>
                <dd className="mt-1">
                  {detalle.observaciones || "Sin observaciones."}
                </dd>
              </div>
            </dl>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-2">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="text-right font-medium">{v}</dd>
    </div>
  );
}
