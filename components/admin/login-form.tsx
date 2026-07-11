"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LogIn, Lock, Mail, TriangleAlert } from "lucide-react";

import { loginAction } from "@/app/admin/login/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await loginAction(formData);
      if (res.ok) {
        router.replace("/admin");
        router.refresh();
      } else {
        setError(res.error ?? "No se pudo iniciar sesión.");
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {error && (
        <Alert variant="danger">
          <TriangleAlert />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="admin@laestacion.com.ar"
            className="pl-10"
            autoComplete="email"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="password"
            name="password"
            type="password"
            required
            placeholder="••••••••"
            className="pl-10"
            autoComplete="current-password"
          />
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? "Ingresando..." : "Ingresar"}
        <LogIn />
      </Button>
    </form>
  );
}
