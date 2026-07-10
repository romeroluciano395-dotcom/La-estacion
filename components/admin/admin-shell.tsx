"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import type { SessionUser } from "@/lib/auth";
import { adminTitleFromPath } from "@/lib/admin-nav";
import { SidebarContent } from "./sidebar-content";

export function AdminShell({
  user,
  children,
}: {
  user: SessionUser;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const title = adminTitleFromPath(pathname);

  return (
    <div className="min-h-screen">
      {/* Sidebar fija (desktop) */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-white/10 bg-card/40 backdrop-blur-xl lg:block">
        <SidebarContent />
      </aside>

      {/* Drawer (mobile) */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              className="fixed inset-y-0 left-0 z-50 w-72 border-r border-white/10 bg-card lg:hidden"
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar menú"
                className="absolute right-3 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
              <SidebarContent onNavigate={() => setOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Contenido */}
      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-white/10 bg-background/70 px-5 backdrop-blur-xl sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              aria-label="Abrir menú"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-white/10 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <div className="text-sm font-medium leading-tight">
                {user.name}
              </div>
              <div className="text-xs capitalize text-muted-foreground">
                {user.role}
              </div>
            </div>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-semibold text-white">
              {user.name.slice(0, 1)}
            </span>
          </div>
        </header>

        <main className="p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
