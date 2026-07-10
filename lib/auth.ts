import { cookies } from "next/headers";

/**
 * Autenticación simulada del panel.
 *
 * Está aislada acá para poder reemplazarla por NextAuth (Auth.js) sin
 * tocar las páginas: mantené las funciones getSession / login / logout y
 * cambiá su implementación por el provider de credenciales de NextAuth
 * validando contra PostgreSQL.
 *
 * Migración prevista:
 *   - Instalar next-auth (Auth.js v5)
 *   - Credentials provider → authorize() valida contra prisma.user
 *   - getSession() → auth() de NextAuth
 */

export const SESSION_COOKIE = "le_admin_session";

export interface SessionUser {
  email: string;
  name: string;
  role: "admin" | "operador";
}

/** Credenciales simuladas (reemplazar por consulta a la base de datos). */
const MOCK_USERS = [
  {
    email: "admin@laestacion.com.ar",
    password: "admin123",
    name: "Administrador",
    role: "admin" as const,
  },
];

/** Valida credenciales. Devuelve el usuario (sin password) o null. */
export function verifyCredentials(
  email: string,
  password: string,
): SessionUser | null {
  const user = MOCK_USERS.find(
    (u) => u.email === email && u.password === password,
  );
  if (!user) return null;
  return { email: user.email, name: user.name, role: user.role };
}

function encode(user: SessionUser): string {
  return Buffer.from(JSON.stringify(user)).toString("base64");
}

function decode(token: string): SessionUser | null {
  try {
    return JSON.parse(Buffer.from(token, "base64").toString("utf-8"));
  } catch {
    return null;
  }
}

/** Crea la sesión (cookie httpOnly). Simulada, sin firma criptográfica. */
export async function createSession(user: SessionUser): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, encode(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 horas
  });
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

/** Devuelve la sesión actual o null. */
export async function getSession(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return decode(token);
}
