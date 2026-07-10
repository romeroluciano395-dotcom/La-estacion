"use client";

import { useRef, useState } from "react";
import {
  UploadCloud,
  X,
  ArrowLeft,
  ArrowRight,
  LinkIcon,
  Plus,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * Uploader de imágenes moderno. Soporta drag & drop, pegar URL, preview,
 * eliminar y reordenar. En esta etapa guarda data URLs / URLs; está
 * preparado para reemplazar `readAsDataURL` por una subida real a
 * Supabase Storage o Cloudinary que devuelva la URL pública.
 */
export function ImageUploader({
  value,
  onChange,
  multiple = false,
  label,
}: {
  value: string[];
  onChange: (urls: string[]) => void;
  multiple?: boolean;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [url, setUrl] = useState("");

  function add(urls: string[]) {
    onChange(multiple ? [...value, ...urls] : urls.slice(-1));
  }

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const list = Array.from(files).filter((f) => f.type.startsWith("image/"));
    const dataUrls = await Promise.all(
      list.map(
        (file) =>
          new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result));
            reader.readAsDataURL(file);
          }),
      ),
    );
    add(dataUrls);
  }

  function addUrl() {
    const v = url.trim();
    if (!v) return;
    add([v]);
    setUrl("");
  }

  function remove(i: number) {
    onChange(value.filter((_, idx) => idx !== i));
  }

  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }

  return (
    <div className="space-y-3">
      {label && <p className="text-sm font-medium">{label}</p>}

      {/* Zona de drop */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-8 text-center transition-colors",
          dragging
            ? "border-primary bg-primary/10"
            : "border-white/15 bg-white/[0.02] hover:border-white/25",
        )}
      >
        <UploadCloud className="h-8 w-8 text-muted-foreground" />
        <p className="mt-2 text-sm font-medium">
          Arrastrá imágenes o hacé clic para subir
        </p>
        <p className="text-xs text-muted-foreground">
          PNG, JPG o WEBP {multiple ? "· varias imágenes" : ""}
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* Pegar URL */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addUrl();
              }
            }}
            placeholder="…o pegá una URL de imagen"
            className="pl-9"
          />
        </div>
        <Button type="button" variant="secondary" size="icon" onClick={addUrl}>
          <Plus />
        </Button>
      </div>

      {/* Previews */}
      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {value.map((src, i) => (
            <div
              key={`${src.slice(0, 24)}-${i}`}
              className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-white/5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Imagen ${i + 1}`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                {multiple && (
                  <button
                    type="button"
                    onClick={() => move(i, -1)}
                    className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10 text-white hover:bg-white/20"
                    aria-label="Mover a la izquierda"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="flex h-7 w-7 items-center justify-center rounded-md bg-destructive/80 text-white hover:bg-destructive"
                  aria-label="Eliminar"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
                {multiple && (
                  <button
                    type="button"
                    onClick={() => move(i, 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10 text-white hover:bg-white/20"
                    aria-label="Mover a la derecha"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
              {i === 0 && multiple && (
                <span className="absolute left-1.5 top-1.5 rounded bg-primary px-1.5 py-0.5 text-[10px] font-medium text-white">
                  Portada
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
