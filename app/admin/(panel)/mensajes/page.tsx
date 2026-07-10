import { getMensajes } from "@/services/admin.service";
import { MessagesInbox } from "@/components/admin/messages-inbox";

export const metadata = { title: "Mensajes" };

export default async function AdminMensajesPage() {
  const mensajes = await getMensajes();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Mensajes</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Consultas recibidas desde el formulario de contacto.
        </p>
      </div>
      <MessagesInbox mensajes={mensajes} />
    </div>
  );
}
