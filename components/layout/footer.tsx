import Link from "next/link";
import { Instagram, Facebook, MessageCircle, Mail, MapPin } from "lucide-react";

import { NAV_LINKS, whatsappLink } from "@/lib/constants";
import { getSiteSettings } from "@/services/settings.service";
import { Logo } from "@/components/shared/logo";

export async function Footer() {
  const settings = await getSiteSettings();
  const waUrl = whatsappLink(
    "¡Hola La Estación! Quiero hacer una consulta sobre un viaje.",
  );

  const socialLinks = [
    { label: "Instagram", href: settings.instagram, icon: Instagram },
    { label: "WhatsApp", href: waUrl, icon: MessageCircle },
    { label: "Facebook", href: settings.facebook, icon: Facebook },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="bg-aurora">
        <div className="container-app grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {settings.descripcion}
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links rápidos */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Navegación
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Contacto
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2.5">
                <MessageCircle className="h-4 w-4 text-primary" /> {settings.whatsapp}
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-primary" /> {settings.email}
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {settings.direccion}
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              ¿Planeás un viaje?
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Escribinos por WhatsApp y coordinamos tu próximo traslado en
              minutos.
            </p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4" />
              Contactar
            </a>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="container-app flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground sm:flex-row">
            <p>
              © {new Date().getFullYear()} {settings.nombre}. Todos los derechos
              reservados.
            </p>
            <p>Diseñado con Next.js · TailwindCSS · Framer Motion</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
