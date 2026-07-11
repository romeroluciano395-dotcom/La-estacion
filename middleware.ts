import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

/**
 * Protege /admin/** mediante el callback `authorized` de auth.config.
 * Runtime edge (sin Prisma), decodifica la sesión desde el JWT.
 */
export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: ["/admin/:path*"],
};
