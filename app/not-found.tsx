import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <Logo />
      <div>
        <p className="font-display text-6xl font-bold text-accent">404</p>
        <h1 className="mt-4 font-display text-2xl font-semibold">
          Página no encontrada
        </h1>
        <p className="mt-2 text-muted-foreground">
          El destino que buscás no existe o fue movido.
        </p>
      </div>
      <Button variant="accent" asChild>
        <Link href="/">Volver al inicio</Link>
      </Button>
    </div>
  );
}
