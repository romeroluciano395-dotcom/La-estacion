import { cache } from "react";
import type { SiteSettings } from "@/types/admin";
import { settingsRepository } from "@/server/repositories/settings.repository";
import { toSiteSettings } from "@/server/mappers";
import { SITE, SOCIALS } from "@/lib/constants";

/** Configuración por defecto si aún no hay fila en la base. */
const FALLBACK: SiteSettings = {
  nombre: SITE.name,
  descripcion: SITE.description,
  whatsapp: SITE.whatsapp,
  instagram: SOCIALS.instagram,
  facebook: SOCIALS.facebook,
  email: SITE.email,
  direccion: SITE.address,
  horarios: "",
  logoUrl: "",
  colorPrimario: "#2563EB",
  colorAcento: "#7C3AED",
};

/**
 * Configuración del sitio para uso público (footer, contacto, etc.).
 * Memorizada por request con `cache()` para evitar consultas duplicadas
 * cuando la piden varios componentes del mismo árbol.
 */
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const row = await settingsRepository.get();
  return row ? toSiteSettings(row) : FALLBACK;
});
