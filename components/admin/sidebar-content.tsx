"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";

import { cn } from "@/lib/utils";
import { ADMIN_NAV } from "@/lib/admin-nav";
import { Logo } from "@/components/shared/logo";
import { logoutAction } from "@/app/admin/(panel)/actions";

export function SidebarContent({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b border-white/10 px-6">
        <Logo />
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {ADMIN_NAV.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "text-white"
                  : "text-muted-foreground hover:bg-white/5 hover:text-white",
              )}
            >
              {active && (
                <motion.span
                  layoutId="admin-active"
                  className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 ring-1 ring-inset ring-primary/30"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <item.icon
                className={cn(
                  "h-[18px] w-[18px] shrink-0 transition-colors",
                  active ? "text-primary" : "",
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-[18px] w-[18px]" />
            Cerrar sesión
          </button>
        </form>
      </div>
    </div>
  );
}
