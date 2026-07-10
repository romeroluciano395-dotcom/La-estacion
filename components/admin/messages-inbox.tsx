"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Mail, MailOpen, Trash2, Reply, CircleDot } from "lucide-react";

import type { Mensaje } from "@/types/admin";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  marcarMensajeLeidoAction,
  eliminarMensajeAction,
} from "@/app/admin/(panel)/actions";

function fmt(iso: string) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function MessagesInbox({ mensajes }: { mensajes: Mensaje[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [openId, setOpenId] = useState<string | null>(null);

  const noLeidos = mensajes.filter((m) => !m.leido).length;

  function toggleRead(m: Mensaje) {
    startTransition(async () => {
      await marcarMensajeLeidoAction(m.id, !m.leido);
      router.refresh();
    });
  }

  function remove(m: Mensaje) {
    startTransition(async () => {
      await eliminarMensajeAction(m.id);
      toast.success("Mensaje eliminado");
      router.refresh();
    });
  }

  function open(m: Mensaje) {
    setOpenId((prev) => (prev === m.id ? null : m.id));
    if (!m.leido) {
      startTransition(async () => {
        await marcarMensajeLeidoAction(m.id, true);
        router.refresh();
      });
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{noLeidos}</span> sin
        leer · {mensajes.length} en total
      </p>

      <div className="space-y-3">
        {mensajes.map((m) => {
          const isOpen = openId === m.id;
          return (
            <div
              key={m.id}
              className={cn(
                "overflow-hidden rounded-2xl border backdrop-blur-xl transition-colors",
                m.leido
                  ? "border-white/10 bg-card/40"
                  : "border-primary/30 bg-primary/[0.06]",
              )}
            >
              <button
                onClick={() => open(m)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left"
              >
                <span
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                    m.leido
                      ? "bg-white/5 text-muted-foreground"
                      : "bg-primary/15 text-primary",
                  )}
                >
                  {m.leido ? (
                    <MailOpen className="h-5 w-5" />
                  ) : (
                    <Mail className="h-5 w-5" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-medium">{m.nombre}</p>
                    {!m.leido && (
                      <CircleDot className="h-3.5 w-3.5 shrink-0 text-primary" />
                    )}
                  </div>
                  <p className="truncate text-sm text-muted-foreground">
                    {m.asunto}
                  </p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {fmt(m.createdAt)}
                </span>
              </button>

              {isOpen && (
                <div className="border-t border-white/10 px-5 py-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {m.mensaje}
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    De: {m.email}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button size="sm" asChild>
                      <a
                        href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.asunto)}`}
                      >
                        <Reply /> Responder
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      disabled={pending}
                      onClick={() => toggleRead(m)}
                    >
                      {m.leido ? <Mail /> : <MailOpen />}
                      {m.leido ? "Marcar no leído" : "Marcar leído"}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:bg-destructive/10"
                      disabled={pending}
                      onClick={() => remove(m)}
                    >
                      <Trash2 /> Eliminar
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {mensajes.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/10 py-16 text-center text-muted-foreground">
            No hay mensajes.
          </div>
        )}
      </div>
    </div>
  );
}
