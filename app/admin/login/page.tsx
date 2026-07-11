import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { Logo } from "@/components/shared/logo";
import { Card, CardContent } from "@/components/ui/card";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Ingresar al panel",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const session = await auth();
  if (session?.user) redirect("/admin");

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-5">
      <div className="absolute inset-0 bg-aurora" />
      <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(60%_50%_at_50%_40%,black,transparent)]" />

      <div className="relative w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <Card className="p-2">
          <CardContent className="pt-6">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold tracking-tight">
                Panel de administración
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Ingresá con tus credenciales para gestionar el sitio.
              </p>
            </div>

            <LoginForm />

            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Demo:</span>{" "}
              admin@laestacion.com.ar / admin123
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
