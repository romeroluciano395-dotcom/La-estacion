import type { Metadata } from "next";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Solicitar acceso" };

export default function RegistroPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-display text-2xl">Solicitar acceso</CardTitle>
        <CardDescription>
          El registro de operadores lo gestiona un administrador. Contactanos
          para habilitar tu usuario.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button variant="accent" className="w-full" asChild>
          <Link href="/contacto">Contactar al administrador</Link>
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          ¿Ya tenés cuenta?{" "}
          <Link href="/login" className="font-medium text-accent hover:underline">
            Ingresar
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
