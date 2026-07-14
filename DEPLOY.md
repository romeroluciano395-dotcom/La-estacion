# 🚀 Deploy a producción (Vercel + Neon)

Guía para poner el proyecto online, gratis. Necesitás 3 cuentas (todas con
plan free): **GitHub**, **Neon** (PostgreSQL) y **Vercel** (hosting).

---

## 1) Subir el código a GitHub

Creá un repo vacío en https://github.com/new (por ejemplo `la-estacion`), y
desde la carpeta del proyecto:

```bash
git remote add origin https://github.com/TU_USUARIO/la-estacion.git
git branch -M main
git push -u origin main
```

---

## 2) Base de datos en Neon (PostgreSQL gratis)

1. Entrá a https://neon.tech y creá un proyecto (región más cercana).
2. Copiá el **connection string** (empieza con `postgresql://…`, incluye
   `?sslmode=require`). Guardalo: es tu `DATABASE_URL`.

---

## 3) Desplegar en Vercel

1. Entrá a https://vercel.com/new e importá el repo de GitHub.
2. En **Environment Variables**, cargá:

   | Variable | Valor |
   |----------|-------|
   | `DATABASE_URL` | el connection string de Neon |
   | `AUTH_SECRET` | generá uno (ver abajo) |
   | `NEXTAUTH_SECRET` | el mismo valor que `AUTH_SECRET` |
   | `NEXTAUTH_URL` | `https://TU-APP.vercel.app` |
   | `AUTH_URL` | `https://TU-APP.vercel.app` |
   | `AUTH_TRUST_HOST` | `true` |
   | `NEXT_PUBLIC_SITE_URL` | `https://TU-APP.vercel.app` |

   Generá el secreto con:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

3. **Deploy**. El build corre `prisma generate && prisma migrate deploy &&
   next build`, así que las **tablas se crean solas** en Neon.

> Después del primer deploy, actualizá `NEXTAUTH_URL`, `AUTH_URL` y
> `NEXT_PUBLIC_SITE_URL` con la URL real que te dio Vercel y volvé a desplegar.

---

## 4) Cargar los datos iniciales (una sola vez)

Las tablas ya están creadas por la migración; falta el seed (admin + eventos).
Desde tu compu, apuntando a Neon:

**PowerShell (Windows):**
```powershell
$env:DATABASE_URL="postgresql://...neon..."; npm run db:seed
```

**bash/macOS/Linux:**
```bash
DATABASE_URL="postgresql://...neon..." npm run db:seed
```

Listo. Entrá a `https://TU-APP.vercel.app` y al panel en `/admin`
(`admin@laestacion.com.ar` / `admin123` — **cambiá esta contraseña** en
producción).

---

## Notas

- Para subir imágenes reales, cargá las variables `CLOUDINARY_*` en Vercel.
- Cada `git push` a `main` dispara un nuevo deploy automático.
- Cambiá las credenciales del admin del seed antes de usarlo con datos reales.
