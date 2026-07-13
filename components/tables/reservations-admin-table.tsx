"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Search,
  Download,
  MoreHorizontal,
  Eye,
  Pencil,
  CircleCheck,
  CircleX,
  Flag,
  Trash2,
} from "lucide-react";

import type { Reserva } from "@/types/admin";
import {
  confirmarReservaAction,
  cancelarReservaAction,
  finalizarReservaAction,
  eliminarReservaAction,
} from "@/app/admin/(panel)/actions";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReservaStatusBadge } from "@/components/reservations/reserva-status-badge";

const PAGE_SIZE = 10;

function fmt(iso: string) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(iso));
}

export function ReservationsAdminTable({ reservas }: { reservas: Reserva[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [query, setQuery] = useState("");
  const [estado, setEstado] = useState("todas");
  const [evento, setEvento] = useState("todos");
  const [ciudad, setCiudad] = useState("todas");
  const [fecha, setFecha] = useState("");
  const [sort, setSort] = useState("fecha");
  const [page, setPage] = useState(1);
  const [toDelete, setToDelete] = useState<Reserva | null>(null);

  const eventos = useMemo(
    () => Array.from(new Set(reservas.map((r) => r.eventoNombre))).sort(),
    [reservas],
  );
  const ciudades = useMemo(
    () => Array.from(new Set(reservas.map((r) => r.eventoCiudad))).sort(),
    [reservas],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = reservas.filter((r) => {
      if (
        q &&
        !`${r.nombre} ${r.apellido} ${r.eventoNombre} ${r.dni} ${r.email} ${r.telefono}`
          .toLowerCase()
          .includes(q)
      )
        return false;
      if (estado !== "todas" && r.estado !== estado) return false;
      if (evento !== "todos" && r.eventoNombre !== evento) return false;
      if (ciudad !== "todas" && r.eventoCiudad !== ciudad) return false;
      if (fecha && r.eventoFecha !== fecha) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "nombre") return a.nombre.localeCompare(b.nombre, "es");
      if (sort === "evento")
        return a.eventoNombre.localeCompare(b.eventoNombre, "es");
      if (sort === "cantidad") return b.cantidadPasajeros - a.cantidadPasajeros;
      if (sort === "estado") return a.estado.localeCompare(b.estado);
      return b.createdAt.localeCompare(a.createdAt);
    });
    return list;
  }, [reservas, query, estado, evento, ciudad, fecha, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function run(action: () => Promise<unknown>, msg: string) {
    startTransition(async () => {
      await action();
      toast.success(msg);
      router.refresh();
    });
  }

  function confirmDelete() {
    if (!toDelete) return;
    const r = toDelete;
    setToDelete(null);
    run(() => eliminarReservaAction(r.id), "Reserva eliminada");
  }

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Buscar por pasajero, DNI, email, teléfono o evento…"
            className="pl-10"
          />
        </div>
        <Button variant="secondary" asChild>
          <a href="/admin/reservas/export">
            <Download /> Exportar a Excel
          </a>
        </Button>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <Select value={estado} onValueChange={(v) => { setEstado(v); setPage(1); }}>
          <SelectTrigger><SelectValue placeholder="Estado" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todos los estados</SelectItem>
            <SelectItem value="pendiente">Pendiente</SelectItem>
            <SelectItem value="confirmada">Confirmada</SelectItem>
            <SelectItem value="finalizada">Finalizada</SelectItem>
            <SelectItem value="cancelada">Cancelada</SelectItem>
          </SelectContent>
        </Select>

        <Select value={evento} onValueChange={(v) => { setEvento(v); setPage(1); }}>
          <SelectTrigger><SelectValue placeholder="Evento" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los eventos</SelectItem>
            {eventos.map((e) => (
              <SelectItem key={e} value={e}>{e}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={ciudad} onValueChange={(v) => { setCiudad(v); setPage(1); }}>
          <SelectTrigger><SelectValue placeholder="Ciudad" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas las ciudades</SelectItem>
            {ciudades.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="date"
          value={fecha}
          onChange={(e) => { setFecha(e.target.value); setPage(1); }}
          aria-label="Fecha del viaje"
        />

        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="fecha">Orden: Más recientes</SelectItem>
            <SelectItem value="nombre">Orden: Nombre</SelectItem>
            <SelectItem value="evento">Orden: Evento</SelectItem>
            <SelectItem value="cantidad">Orden: Cantidad</SelectItem>
            <SelectItem value="estado">Orden: Estado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabla */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-card/40 backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">Nombre</th>
                <th className="px-4 py-3 font-medium">Apellido</th>
                <th className="px-4 py-3 font-medium">Evento</th>
                <th className="px-4 py-3 text-center font-medium">Cant.</th>
                <th className="px-4 py-3 font-medium">Teléfono</th>
                <th className="px-4 py-3 font-medium">Correo</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 font-medium">Fecha</th>
                <th className="px-4 py-3 text-right font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((r) => (
                <tr
                  key={r.id}
                  className="border-b border-white/5 transition-colors last:border-0 hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {r.id.slice(-8).toUpperCase()}
                  </td>
                  <td className="px-4 py-3 font-medium">{r.nombre}</td>
                  <td className="px-4 py-3">{r.apellido}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    <span className="line-clamp-1">{r.eventoNombre}</span>
                  </td>
                  <td className="px-4 py-3 text-center">{r.cantidadPasajeros}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{r.telefono}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{r.email}</td>
                  <td className="px-4 py-3"><ReservaStatusBadge estado={r.estado} /></td>
                  <td className="px-4 py-3 text-muted-foreground">{fmt(r.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
                            aria-label="Acciones"
                            disabled={pending}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Reserva</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => router.push(`/admin/reservas/${r.id}`)}>
                            <Eye /> Ver detalle
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => router.push(`/admin/reservas/${r.id}/editar`)}>
                            <Pencil /> Editar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Estado</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => run(() => confirmarReservaAction(r.id), "Reserva confirmada")}>
                            <CircleCheck /> Confirmar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => run(() => finalizarReservaAction(r.id), "Reserva finalizada")}>
                            <Flag /> Finalizar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => run(() => cancelarReservaAction(r.id), "Reserva cancelada")}>
                            <CircleX /> Cancelar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem variant="danger" onClick={() => setToDelete(r)}>
                            <Trash2 /> Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-4 py-16 text-center text-muted-foreground">
                    No hay reservas que coincidan con la búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Página {page} de {totalPages} · {filtered.length} reservas
          </p>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
              Anterior
            </Button>
            <Button variant="secondary" size="sm" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
              Siguiente
            </Button>
          </div>
        </div>
      )}

      {/* Confirmación de borrado */}
      <Dialog open={!!toDelete} onOpenChange={(o) => !o && setToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar reserva</DialogTitle>
            <DialogDescription>
              ¿Seguro que querés eliminar la reserva de{" "}
              <span className="font-medium text-foreground">
                {toDelete?.nombre} {toDelete?.apellido}
              </span>
              ? Se repondrán los lugares al evento. Esta acción no se puede
              deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setToDelete(null)}>Cancelar</Button>
            <Button variant="danger" onClick={confirmDelete}><Trash2 /> Eliminar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
