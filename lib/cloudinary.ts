import { v2 as cloudinary } from "cloudinary";

/**
 * Integración con Cloudinary. Se activa automáticamente cuando estén
 * configuradas las variables de entorno CLOUDINARY_*. Sin ellas, la app
 * sigue funcionando (el uploader guarda la imagen localmente / por URL).
 */

export function isCloudinaryConfigured(): boolean {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  );
}

let configured = false;
function ensureConfig() {
  if (configured) return;
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  configured = true;
}

/** Sube una imagen (data URL o URL) y devuelve la URL segura pública. */
export async function uploadToCloudinary(source: string): Promise<string> {
  ensureConfig();
  const res = await cloudinary.uploader.upload(source, {
    folder: "la-estacion",
    resource_type: "image",
  });
  return res.secure_url;
}
