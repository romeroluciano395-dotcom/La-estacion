import type { Metadata } from "next";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = { title: "Ingresar" };

export default function LoginPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-display text-2xl">Panel de administración</CardTitle>
        <CardDescription>
          Ingresá con tus credenciales para gestionar reservas y viajes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
        <p className="mt-6 text-center text-sm text-muted-foreground">
          ¿No tenés cuenta?{" "}
          <Link href="/registro" className="font-medium text-accent hover:underline">
            Solicitar acceso
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
