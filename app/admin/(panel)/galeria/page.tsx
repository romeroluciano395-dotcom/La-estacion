import { getEventos } from "@/services/events.service";
import { GalleryManager } from "@/components/admin/gallery-manager";

export const metadata = { title: "Galería" };

export default async function AdminGaleriaPage() {
  // Semilla inicial: imágenes principales de los eventos existentes.
  const eventos = await getEventos();
  const initial = eventos.map((e) => e.imagenPrincipal).slice(0, 8);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Galería</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Administrá las imágenes que se muestran en la galería del sitio.
        </p>
      </div>
      <GalleryManager initial={initial} />
    </div>
  );
}
