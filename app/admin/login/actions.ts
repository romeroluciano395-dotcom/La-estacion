"use server";

import { redirect } from "next/navigation";

import { loginSchema } from "@/lib/validations";
import { createSession, verifyCredentials } from "@/lib/auth";

export interface LoginState {
  error?: string;
}

/**
 * Server action de login. Valida con Zod, verifica credenciales simuladas
 * y crea la sesión (cookie). Reemplazar `verifyCredentials` por NextAuth
 * / Prisma sin cambiar el formulario.
 */
export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Revisá el email y la contraseña." };
  }

  const user = verifyCredentials(parsed.data.email, parsed.data.password);
  if (!user) {
    return { error: "Credenciales incorrectas." };
  }

  await createSession(user);
  redirect("/admin");
}
