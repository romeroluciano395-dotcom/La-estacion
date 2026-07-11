"use server";

import { loginSchema } from "@/lib/validations";
import { createSession, verifyCredentials } from "@/lib/auth";

export interface LoginResult {
  ok: boolean;
  error?: string;
}

/**
 * Server action de login. Valida con Zod, verifica credenciales simuladas
 * y crea la sesión (cookie). NO redirige acá: la navegación la hace el
 * cliente al recibir { ok: true } (evita el error "unexpected response"
 * de redirect() dentro de useActionState). Reemplazar `verifyCredentials`
 * por NextAuth / Prisma sin cambiar el formulario.
 */
export async function loginAction(formData: FormData): Promise<LoginResult> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { ok: false, error: "Revisá el email y la contraseña." };
  }

  const user = verifyCredentials(parsed.data.email, parsed.data.password);
  if (!user) {
    return { ok: false, error: "Credenciales incorrectas." };
  }

  await createSession(user);
  return { ok: true };
}
