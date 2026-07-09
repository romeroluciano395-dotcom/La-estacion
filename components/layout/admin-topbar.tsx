import { Bell } from "lucide-react";

export function AdminTopbar({ title }: { title: string }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background px-6">
      <h1 className="font-display text-xl font-semibold">{title}</h1>
      <div className="flex items-center gap-4">
        <button
          className="relative rounded-lg p-2 text-muted-foreground hover:bg-secondary"
          aria-label="Notificaciones"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent" />
        </button>
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <div className="text-sm font-medium">Administrador</div>
            <div className="text-xs text-muted-foreground">
              admin@laestacion.com.ar
            </div>
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            LE
          </span>
        </div>
      </div>
    </header>
  );
}
