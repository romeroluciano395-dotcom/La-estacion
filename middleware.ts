import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";

/**
 * Protege el panel: si no hay sesión, redirige a /admin/login.
 * La verificación real de credenciales ocurre en las páginas/acciones;
 * acá solo chequeamos presencia de la cookie para la UX de redirección.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLogin = pathname === "/admin/login";
  const hasSession = request.cookies.has(SESSION_COOKIE);

  // Sin sesión e intentando entrar al panel → login
  if (!hasSession && pathname.startsWith("/admin") && !isLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  // Con sesión y yendo al login → dashboard
  if (hasSession && isLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
