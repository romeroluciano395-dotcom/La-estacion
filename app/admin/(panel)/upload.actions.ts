"use server";

import { auth } from "@/auth";
import { isCloudinaryConfigured, uploadToCloudinary } from "@/lib/cloudinary";

/**
 * Sube una imagen. Si Cloudinary está configurado, devuelve su URL pública;
 * si no, devuelve la fuente tal cual (data URL o URL pegada) para que la app
 * siga funcionando sin storage externo.
 */
export async function uploadImageAction(source: string): Promise<string> {
  const session = await auth();
  if (!session?.user) throw new Error("No autorizado");

  if (isCloudinaryConfigured()) {
    try {
      return await uploadToCloudinary(source);
    } catch {
      return source;
    }
  }
  return source;
}
