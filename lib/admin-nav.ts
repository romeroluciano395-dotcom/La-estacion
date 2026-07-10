import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  CalendarDays,
  Ticket,
  Images,
  MessageSquare,
  Users,
  Settings,
} from "lucide-react";

export interface AdminNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const ADMIN_NAV: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Eventos", href: "/admin/eventos", icon: CalendarDays },
  { label: "Reservas", href: "/admin/reservas", icon: Ticket },
  { label: "Galería", href: "/admin/galeria", icon: Images },
  { label: "Mensajes", href: "/admin/mensajes", icon: MessageSquare },
  { label: "Usuarios", href: "/admin/usuarios", icon: Users },
  { label: "Configuración", href: "/admin/configuracion", icon: Settings },
];

/** Título legible de la página actual del panel. */
export function adminTitleFromPath(pathname: string): string {
  if (pathname === "/admin") return "Dashboard";
  const match = ADMIN_NAV.find(
    (i) => i.href !== "/admin" && pathname.startsWith(i.href),
  );
  return match?.label ?? "Panel";
}
