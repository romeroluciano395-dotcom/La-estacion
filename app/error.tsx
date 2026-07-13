"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // En producción, enviar a un servicio de observabilidad (Sentry, etc.).
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-5xl font-bold text-accent">Ups</p>
      <h1 className="mt-4 text-2xl font-semibold">Algo salió mal</h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        Ocurrió un error inesperado. Podés reintentar; si el problema persiste,
        contactanos.
      </p>
      <Button variant="primary" className="mt-8" onClick={reset}>
        <RotateCcw /> Reintentar
      </Button>
    </div>
  );
}
