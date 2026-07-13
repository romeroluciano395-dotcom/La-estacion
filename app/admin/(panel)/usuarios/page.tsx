import { UserPlus } from "lucide-react";

import { getUsuarios } from "@/services/admin.service";
import { cn, formatDateLong } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Usuarios" };

export default async function AdminUsuariosPage() {
  const usuarios = await getUsuarios();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Usuarios</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Administradores y operadores del panel.
          </p>
        </div>
        <Button disabled title="Disponible próximamente">
          <UserPlus /> Nuevo usuario
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-card/40 backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-medium">Nombre</th>
                <th className="px-4 py-3 font-medium">Correo</th>
                <th className="px-4 py-3 font-medium">Rol</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 font-medium">Creado</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr
                  key={u.id}
                  className="border-b border-white/5 transition-colors last:border-0 hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-semibold text-white">
                        {u.nombre
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </span>
                      <span className="font-medium">{u.nombre}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs font-medium capitalize">
                      {u.rol}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
                        u.estado === "activo"
                          ? "border-success/30 bg-success/15 text-success"
                          : "border-white/15 bg-white/5 text-muted-foreground",
                      )}
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          u.estado === "activo"
                            ? "bg-success"
                            : "bg-muted-foreground",
                        )}
                      />
                      {u.estado === "activo" ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {formatDateLong(u.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
