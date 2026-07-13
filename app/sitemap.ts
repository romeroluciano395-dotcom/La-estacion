import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getEventos } from "@/services/events.service";
import { SERVICES } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    {
      url: `${SITE_URL}/proximos-viajes`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    { url: `${SITE_URL}/servicios`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/nosotros`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/contacto`, changeFrequency: "yearly", priority: 0.5 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${SITE_URL}/servicios/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const eventos = await getEventos();
  const eventRoutes: MetadataRoute.Sitemap = eventos.map((e) => ({
    url: `${SITE_URL}/eventos/${e.slug}`,
    lastModified: new Date(e.updatedAt),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes, ...eventRoutes];
}
