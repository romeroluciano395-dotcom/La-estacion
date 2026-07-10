"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUploader } from "@/components/forms/image-uploader";

export function GalleryManager({ initial }: { initial: string[] }) {
  const [imagenes, setImagenes] = useState<string[]>(initial);
  const [pending, startTransition] = useTransition();

  function guardar() {
    // Preparado para persistir en la base de datos / storage.
    startTransition(async () => {
      await new Promise((r) => setTimeout(r, 500));
      toast.success("Galería guardada", {
        description: `${imagenes.length} imágenes`,
      });
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Imágenes de la galería del sitio</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ImageUploader value={imagenes} onChange={setImagenes} multiple />
        <div className="flex justify-end border-t border-white/10 pt-4">
          <Button onClick={guardar} disabled={pending}>
            <Save /> {pending ? "Guardando…" : "Guardar galería"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
