"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import {
  MoreHorizontal,
  Pencil,
  Copy,
  Trash2,
  Eye,
  Star,
  StarOff,
  CircleCheck,
  CircleX,
  EyeOff,
  Search,
  Plus,
} from "lucide-react";

import type { Evento, EventStatus } from "@/types/event";
import { formatCurrency, formatDateShort } from "@/lib/utils";
import { EVENT_CATEGORIES } from "@/lib/events-config";
import {
  duplicarEventoAction,
  eliminarEventoAction,
  toggleDestacadoAction,
  cambiarEstadoEventoAction,
} from "@/app/admin/(panel)/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { AvailabilityBadge } from "@/features/events/components/availability-badge";

const PAGE_SIZE = 8;

export function EventsTable({ eventos }: { eventos: Evento[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("todas");
  const [sort, setSort] = useState("fecha");
  const [page, setPage] = useState(1);
  const [toDelete, setToDelete] = useState<Evento | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = eventos.filter((e) => {
      if (q && !`${e.nombre} ${e.ciudad}`.toLowerCase().includes(q))
        return false;
      if (cat !== "todas" && e.categoria !== cat) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "precio") return b.precio - a.precio;
      if (sort === "nombre") return a.nombre.localeCompare(b.nombre, "es");
      if (sort === "lugares") return b.lugaresDisponibles - a.lugaresDisponibles;
      return a.fecha.localeCompare(b.fecha);
    });
    return list;
  }, [eventos, query, cat, sort]);

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
    const ev = toDelete;
    setToDelete(null);
    run(() => eliminarEventoAction(ev.id), `"${ev.nombre}" eliminado`);
  }

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Buscar por nombre o ciudad…"
            className="pl-10"
          />
        </div>
        <Select
          value={cat}
          onValueChange={(v) => {
            setCat(v);
            setPage(1);
          }}
        >
          <SelectTrigger className="sm:w-48">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas las categorías</SelectItem>
            {EVENT_CATEGORIES.map((c) => (
              <SelectItem key={c.slug} value={c.slug}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="sm:w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fecha">Ordenar: Fecha</SelectItem>
            <SelectItem value="precio">Ordenar: Precio</SelectItem>
            <SelectItem value="nombre">Ordenar: Nombre</SelectItem>
            <SelectItem value="lugares">Ordenar: Lugares</SelectItem>
          </SelectContent>
        </Select>
        <Button asChild>
          <Link href="/admin/eventos/nuevo">
            <Plus /> Nuevo evento
          </Link>
        </Button>
      </div>

      {/* Tabla */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-card/40 backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-medium">Evento</th>
                <th className="px-4 py-3 font-medium">Fecha</th>
                <th className="px-4 py-3 font-medium">Ciudad</th>
                <th className="px-4 py-3 font-medium">Precio</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 font-medium">Lugares</th>
                <th className="px-4 py-3 text-right font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((e) => (
                <tr
                  key={e.id}
                  className="border-b border-white/5 transition-colors last:border-0 hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={e.imagenPrincipal}
                        alt=""
                        className="h-11 w-16 shrink-0 rounded-lg object-cover"
                      />
                      <div className="min-w-0">
                        <p className="flex items-center gap-1.5 font-medium">
                          <span className="line-clamp-1">{e.nombre}</span>
                          {e.destacado && (
                            <Star className="h-3.5 w-3.5 shrink-0 fill-amber-400 text-amber-400" />
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          /{e.slug}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {formatDateShort(e.fecha)}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{e.ciudad}</td>
                  <td className="px-4 py-3 font-medium">
                    {formatCurrency(e.precio)}
                  </td>
                  <td className="px-4 py-3">
                    <AvailabilityBadge estado={e.estado} />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {e.lugaresDisponibles}
                  </td>
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
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(`/admin/eventos/${e.id}`)
                            }
                          >
                            <Pencil /> Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <a
                              href={`/eventos/${e.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Eye /> Vista previa
                            </a>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              run(
                                () => duplicarEventoAction(e.id),
                                "Evento duplicado",
                              )
                            }
                          >
                            <Copy /> Duplicar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              run(
                                () => toggleDestacadoAction(e.id),
                                e.destacado
                                  ? "Quitado de destacados"
                                  : "Marcado como destacado",
                              )
                            }
                          >
                            {e.destacado ? <StarOff /> : <Star />}
                            {e.destacado ? "Quitar destacado" : "Destacar"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Estado</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() =>
                              run(
                                () =>
                                  cambiarEstadoEventoAction(
                                    e.id,
                                    "disponible" as EventStatus,
                                  ),
                                "Evento publicado",
                              )
                            }
                          >
                            <CircleCheck /> Publicar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              run(
                                () =>
                                  cambiarEstadoEventoAction(
                                    e.id,
                                    "agotado" as EventStatus,
                                  ),
                                "Marcado como agotado",
                              )
                            }
                          >
                            <CircleX /> Marcar agotado
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              run(
                                () =>
                                  cambiarEstadoEventoAction(
                                    e.id,
                                    "proximamente" as EventStatus,
                                  ),
                                "Evento ocultado (próximamente)",
                              )
                            }
                          >
                            <EyeOff /> Ocultar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            variant="danger"
                            onClick={() => setToDelete(e)}
                          >
                            <Trash2 /> Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}

              {pageItems.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-16 text-center text-muted-foreground"
                  >
                    No hay eventos que coincidan con la búsqueda.
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
            Página {page} de {totalPages} · {filtered.length} eventos
          </p>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Anterior
            </Button>
            <Button
              variant="secondary"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Siguiente
            </Button>
          </div>
        </div>
      )}

      {/* Confirmación de borrado */}
      <Dialog open={!!toDelete} onOpenChange={(o) => !o && setToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar evento</DialogTitle>
            <DialogDescription>
              ¿Seguro que querés eliminar{" "}
              <span className="font-medium text-foreground">
                {toDelete?.nombre}
              </span>
              ? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setToDelete(null)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              <Trash2 /> Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
