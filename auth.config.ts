import type { NextAuthConfig } from "next-auth";

/**
 * Configuración base de Auth.js — edge-safe (sin Prisma ni bcrypt).
 * La usa el middleware para proteger rutas. El provider con acceso a la
 * base vive en `auth.ts` (runtime Node).
 */
export const authConfig = {
  pages: {
    signIn: "/admin/login",
  },
  session: { strategy: "jwt" },
  trustHost: true,
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;
      const isLogin = pathname === "/admin/login";
      const isPanel = pathname.startsWith("/admin");

      if (isLogin) {
        if (isLoggedIn) return Response.redirect(new URL("/admin", nextUrl));
        return true;
      }
      if (isPanel) return isLoggedIn; // redirige al signIn si no hay sesión
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "admin" | "editor";
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
