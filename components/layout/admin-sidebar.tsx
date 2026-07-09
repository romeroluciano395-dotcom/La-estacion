"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";

import { cn } from "@/lib/utils";
import { ADMIN_NAV } from "@/lib/constants";
import { Logo } from "@/components/shared/logo";
import { Icon } from "@/components/shared/icon";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-background lg:flex">
      <div className="flex h-16 items-center border-b border-border px-6">
        <Logo />
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {ADMIN_NAV.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              <Icon name={item.icon} className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-4">
        <Link
          href="/login"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </Link>
      </div>
    </aside>
  );
}
