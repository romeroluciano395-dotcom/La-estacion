# La Estación — Sistema de Transporte de Pasajeros

Aplicación web full-stack, lista para producción, para una empresa de transporte
de pasajeros. Incluye sitio público, sistema de eventos/viajes, reservas online
y un panel de administración completo. Diseño premium, arquitectura limpia y
preparada para escalar y reutilizar cambiando únicamente la marca.

---

## ✨ Características

- **Sitio público**: home premium, catálogo de próximos viajes con buscador,
  filtros, orden y paginación, página individual por evento (SEO + Schema.org),
  servicios y contacto.
- **Reservas online**: formulario validado, control de cupos transaccional,
  auto-agotado, pantalla de confirmación con WhatsApp.
- **Panel de administración**: dashboard con métricas y gráficos, CRUD de
  eventos, gestión de reservas (con export a Excel), mensajes, usuarios y
  configuración del sitio editable.
- **Autenticación** con Auth.js (NextAuth v5), sesión JWT y rutas protegidas.
- **SEO**: metadata dinámica, Open Graph, Twitter Cards, `sitemap.xml`,
  `robots.txt`, JSON-LD, canonical, manifest (PWA).

---

## 🛠️ Tecnologías

| Área | Stack |
|------|-------|
| Framework | Next.js 15 (App Router, Server Actions) · React 18 |
| Lenguaje | TypeScript (estricto, sin `any`) |
| Estilos | TailwindCSS · shadcn/ui · Framer Motion · Lucide |
| Formularios | React Hook Form · Zod |
| Base de datos | PostgreSQL · Prisma ORM |
| Auth | Auth.js (NextAuth v5) · bcryptjs |
| Imágenes | next/image · Cloudinary (opcional) |
| Export | ExcelJS |

---

## 📁 Estructura de carpetas

```
app/
  (marketing)/         Sitio público (home, viajes, evento, servicios, contacto, confirmación)
  admin/
    login/             Login del panel
    (panel)/           Panel protegido (dashboard, eventos, reservas, mensajes, usuarios, config)
  api/auth/            Route handler de Auth.js
  robots.ts · sitemap.ts · manifest.ts · opengraph-image.tsx · icon.svg
components/
  ui/                  Componentes base (shadcn/ui)
  layout/ · shared/    Navbar, footer, logo, animaciones, JSON-LD
  admin/ · dashboard/  UI del panel y gráficos
  forms/ · tables/     Formularios y tablas del panel
  reservations/        Badges de estado de reserva
features/
  home/ · events/ · reservations/ · services/   UI por dominio
server/
  db.ts                Cliente Prisma (singleton)
  mappers.ts           Mapeo Prisma ↔ dominio
  repositories/        Acceso a datos (Prisma)
  services/            Servicios de infraestructura (emails)
services/              Lógica de negocio (eventos, reservas, admin, settings)
lib/                   utils, constantes, validaciones (Zod), auth-config, cloudinary
types/                 Tipos de dominio
prisma/                schema.prisma · migraciones · seed.ts
```

**Arquitectura por capas:** `validators (Zod)` → `Server Actions` →
`services (negocio)` → `repositories (Prisma)` → `db`. La UI consume servicios
que devuelven tipos de dominio; los *mappers* aíslan el esquema de la base de
la interfaz.

---

## 🚀 Instalación

Requisitos: **Node 18+** y **PostgreSQL 14+**.

```bash
# 1. Dependencias
npm install

# 2. Variables de entorno
cp .env.example .env      # completar DATABASE_URL y AUTH_SECRET

# 3. Base de datos: aplicar migraciones + datos iniciales
npm run db:migrate        # crea las tablas
npm run db:seed           # admin, eventos, reservas, configuración

# 4. Desarrollo
npm run dev               # http://localhost:3070
```

### Scripts

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` / `npm start` | Build y servidor de producción |
| `npm run typecheck` | Chequeo de tipos |
| `npm run db:migrate` | Migraciones (dev) |
| `npm run db:seed` | Carga datos iniciales |
| `npm run db:studio` | Prisma Studio (explorar la base) |

---

## 🔐 Variables de entorno

Ver [`.env.example`](.env.example). Principales:

- `DATABASE_URL` — conexión a PostgreSQL.
- `NEXT_PUBLIC_SITE_URL` — URL pública (SEO, sitemap, canonical).
- `AUTH_SECRET` / `NEXTAUTH_SECRET` — secreto de sesión.
- `CLOUDINARY_*` — opcional; activa la subida real de imágenes.

---

## 👤 Usuarios de prueba (seed)

| Rol | Email | Contraseña |
|-----|-------|-----------|
| Admin | `admin@laestacion.com.ar` | `admin123` |
| Editor | `editor@laestacion.com.ar` | `editor123` |

> **Producción:** cambiá estas credenciales editando `prisma/seed.ts` o creando
> usuarios reales (ver más abajo).

---

## 📖 Guías rápidas

**Agregar un evento** → Panel → *Eventos* → *Nuevo evento*. Se publica según su
estado y aparece al instante en el sitio.

**Administrar reservas** → Panel → *Reservas*. Confirmar / cancelar / finalizar /
editar / eliminar, filtrar y exportar a Excel. Al cancelar o eliminar se
reponen los lugares del evento automáticamente.

**Cambiar información de la empresa** → Panel → *Configuración*. Nombre,
descripción, WhatsApp, redes, correo, dirección y colores; se reflejan en el
sitio.

**Crear un administrador** → editar `prisma/seed.ts` (hash con bcrypt) y correr
`npm run db:seed`, o insertarlo con `npm run db:studio`.

---

## ☁️ Deploy en Vercel

1. Subí el repo a GitHub e importalo en Vercel.
2. Base de datos gestionada (Neon / Supabase) → copiá su `DATABASE_URL`.
3. Cargá las variables de entorno del `.env.example` en Vercel.
4. Build command: `prisma generate && next build`. Tras el primer deploy,
   corré `npx prisma migrate deploy` y el seed contra la base gestionada.

## 🐳 Deploy con Docker (opcional)

```dockerfile
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Usá un `docker-compose.yml` con un servicio `postgres` y pasá `DATABASE_URL`.

---

## ✅ Buenas prácticas aplicadas

- TypeScript estricto, **sin `any`**; validación con Zod en cliente y servidor.
- Server Components por defecto; Client Components solo donde hacen falta.
- Server Actions protegidas (verifican sesión en el servidor).
- Consultas Prisma con `include`/`select` (sin N+1) e índices en el esquema.
- `next/image` con lazy loading; revalidación de caché tras cada mutación.
- Accesibilidad (contraste, foco, `aria-label`, textos alternativos) y SEO completo.

---

Hecho con Next.js, TypeScript, Prisma y mucho café. ☕
