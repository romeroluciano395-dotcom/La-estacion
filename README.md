# La Estación — Sistema de Transporte de Pasajeros

Sistema web profesional para la empresa de transporte **La Estación**. Preparado
para crecer: reservas online, panel administrador, pagos con MercadoPago y
persistencia con PostgreSQL vía Prisma.

## Stack

- **Next.js 15** (App Router) + **React 18** + **TypeScript**
- **TailwindCSS** + **shadcn/ui** (componentes copiados al repo)
- **Framer Motion** (animaciones)
- **Lucide** (iconos)
- **React Hook Form** + **Zod** (formularios y validación)
- **Prisma** (PostgreSQL-ready)
- **MercadoPago** (capa de pago aislada)

## Arquitectura

```
app/                 Rutas (App Router) agrupadas por contexto
  (marketing)/       Sitio público: home, servicios, nosotros, contacto, reservar
  (auth)/            Login / registro
  admin/             Panel administrador (dashboard, reservas, pasajeros, viajes, stats)
  api/               Route handlers (reservas, health)
components/
  ui/                Componentes shadcn/ui reutilizables
  layout/            Navbar, footer, sidebar y topbar del admin
  shared/            Logo, iconos, animaciones, headings, theme
features/            Lógica de UI por dominio (reservations, services, dashboard, auth)
hooks/               Hooks reutilizables
lib/                 utils, constantes, prisma, mercadopago, validaciones (Zod)
services/            Acceso a datos (hoy mock, mañana Prisma) — API estable
types/               Tipos de dominio (fuente de verdad)
utils/               Helpers de formato y presentación
prisma/              schema.prisma + seed
```

**Principio clave:** la UI consume la capa `services/`, no la base de datos
directamente. Hoy `services/` lee datos mock (`services/mock-data.ts`), por lo
que la app **corre sin base de datos**. Al conectar PostgreSQL, se reemplaza el
cuerpo de las funciones por consultas Prisma sin tocar componentes.

## Puesta en marcha

```bash
npm install
cp .env.example .env      # completar variables
npm run dev               # http://localhost:3000
```

### Rutas principales

- `/` — Home
- `/servicios` y `/servicios/[slug]` — Catálogo de servicios
- `/reservar` — Reserva online (flujo de 3 pasos)
- `/login` — Acceso al panel
- `/admin` — Dashboard administrador

## Conectar PostgreSQL (Prisma)

```bash
# 1. Configurar DATABASE_URL en .env
npm run db:push       # crea las tablas
npm run db:seed       # datos de ejemplo
npm run db:studio     # explorar la base
```

Luego migrar las funciones de `services/*.service.ts` de mock a Prisma.

## MercadoPago

La integración vive en `lib/mercadopago.ts` (aislada). Configurar
`MP_ACCESS_TOKEN` y reemplazar el mock de `createPreference` por el SDK real.
