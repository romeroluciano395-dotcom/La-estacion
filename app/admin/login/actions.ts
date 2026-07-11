"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export interface LoginResult {
  ok: boolean;
  error?: string;
}

/**
 * Login vía Auth.js (Credentials). Valida contra PostgreSQL con bcrypt.
 * No redirige acá (redirect:false); la navegación la hace el cliente al
 * recibir { ok: true }.
 */
export async function loginAction(formData: FormData): Promise<LoginResult> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    return { ok: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { ok: false, error: "Email o contraseña incorrectos." };
    }
    throw error;
  }
}
