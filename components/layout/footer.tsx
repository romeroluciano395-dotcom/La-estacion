import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { NAV_LINKS, SERVICES, SITE } from "@/lib/constants";
import { Logo } from "@/components/shared/logo";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-primary text-primary-foreground">
      <div className="container grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo inverted />
          <p className="mt-4 max-w-xs text-sm text-white/60">
            {SITE.description}
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/80">
            Navegación
          </h3>
          <ul className="space-y-2.5 text-sm text-white/60">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/80">
            Servicios
          </h3>
          <ul className="space-y-2.5 text-sm text-white/60">
            {SERVICES.slice(0, 4).map((s) => (
              <li key={s.slug}>
                <Link href={`/servicios/${s.slug}`} className="hover:text-accent">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/80">
            Contacto
          </h3>
          <ul className="space-y-3 text-sm text-white/60">
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-accent" /> {SITE.phone}
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-accent" /> {SITE.email}
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              {SITE.address}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Todos los derechos
            reservados.
          </p>
          <p>Hecho con Next.js, TypeScript y Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}
