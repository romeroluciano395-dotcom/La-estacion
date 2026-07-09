"use client";

import { MessageCircle } from "lucide-react";

import type { EventStatus } from "@/types/event";
import { whatsappLink } from "@/lib/constants";
import { isReservable } from "@/lib/events-config";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props extends Omit<ButtonProps, "asChild" | "children"> {
  nombreEvento: string;
  estado: EventStatus;
  label?: string;
  fullWidth?: boolean;
}

/**
 * Botón de reserva. Por ahora abre WhatsApp con un mensaje pre-cargado.
 * Cuando exista el sistema de reservas real, se cambiará el destino.
 */
export function ReservationButton({
  nombreEvento,
  estado,
  label = "Reservar",
  fullWidth = false,
  className,
  variant = "primary",
  size,
  ...props
}: Props) {
  const disabled = !isReservable(estado);
  const href = whatsappLink(
    `Hola. Quiero reservar un lugar para el viaje a ${nombreEvento}.`,
  );

  if (disabled) {
    return (
      <Button
        variant="secondary"
        size={size}
        disabled
        className={cn(fullWidth && "w-full", className)}
        {...props}
      >
        {estado === "agotado" ? "Agotado" : "No disponible"}
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(fullWidth && "w-full", className)}
      asChild
      {...props}
    >
      <a href={href} target="_blank" rel="noopener noreferrer">
        <MessageCircle />
        {label}
      </a>
    </Button>
  );
}
