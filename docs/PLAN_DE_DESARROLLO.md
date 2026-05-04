# PropMetrics — Plan de Completado

> Documento interno de desarrollo. Última actualización: Mayo 2026.

---

## ✅ v0.1.1 — Completado y en Producción

| Módulo | Estado |
|---|---|
| UI/UX Landing + Auth (dark glassmorphism) | ✅ |
| Autenticación Clerk (email + Google OAuth) | ✅ |
| Base de datos Supabase + Prisma v7 | ✅ |
| Dashboard con KPIs reales desde BD | ✅ |
| Gráficos conectados a datos reales | ✅ |
| Proyectos (marketplace) desde BD con filtros | ✅ |
| Asistente IA Groq con streaming SSE | ✅ |
| Multi-tenant (Clerk userId → BD User) | ✅ |
| Webhooks Clerk (user.created/updated/deleted) | ✅ |
| Loading states globales + cursor pointer | ✅ |
| Chat history aislado por usuario (localStorage) | ✅ |
| Dividendos filtrados por usuario | ✅ |
| Deploy en Vercel (producción) | ✅ |
| `prisma generate` en build + postinstall | ✅ |
| PR Template en GitHub | ✅ |

---

## 🔴 FASE 1 — Indispensable antes de publicar en LinkedIn

> Objetivo: que cualquier persona que visite el repo o la URL pueda entender y explorar el proyecto sin ayuda.

### 1.1 README profesional con capturas
- [ ] Screenshots del dashboard, login, proyectos, asistente IA
- [ ] GIF de 10-15 segundos del flujo completo (login → dashboard → chat)
- [ ] Corregir badge: "Next.js 15" → "Next.js 16"
- [ ] Mover "n8n" a sección `🚧 En desarrollo`
- [ ] Agregar diagrama de arquitectura (Mermaid)
- [ ] Agregar sección "Demo" con link y credenciales

### 1.2 Cuenta demo pública
- [ ] Crear usuario `propmetrics.demo@gmail.com` / `PropMetrics@2026!` en Clerk
- [ ] Hacer seed de datos realistas para ese usuario en Supabase
  - Mínimo 3 inversiones en proyectos distintos
  - Mínimo 2 dividendos recibidos
  - Historial de notificaciones
- [ ] Agregar botón "▶ Ver Demo" en la landing page
- [ ] El botón auto-completa las credenciales o hace login directo

### 1.3 Clerk Production Keys
- [ ] Crear aplicación en modo Producción en Clerk Dashboard
- [ ] Actualizar `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` y `CLERK_SECRET_KEY` en Vercel
- [ ] Configurar Google OAuth con URL de producción
- [ ] Configurar webhook de Clerk con URL de producción (`/api/webhooks/clerk`)
- [ ] Redeploy en Vercel y verificar que desaparece el banner "Development mode"

---

## 🟡 FASE 2 — Calidad de producción (UX robusta)

### 2.1 Manejo de errores global
- [ ] `app/error.tsx` — Error global con diseño Glassmorphism
- [ ] `app/(dashboard)/error.tsx` — Error específico del dashboard
- [ ] `app/not-found.tsx` — Página 404 personalizada

### 2.2 Empty States
- [ ] Componente `EmptyState` reutilizable
- [ ] Portfolio vacío → mensaje "Aún no tienes inversiones"
- [ ] Proyectos vacíos → mensaje y CTA
- [ ] Sin notificaciones → mensaje amigable

### 2.3 Open Graph / SEO para LinkedIn
- [ ] `og:image` 1200×630px del dashboard (screenshot o diseñado)
- [ ] `og:title`, `og:description` en `layout.tsx`
- [ ] Metadata específico por página (dashboard, proyectos)
- [ ] Verificar preview con https://opengraph.xyz

### 2.4 Responsive / Mobile
- [ ] Auditar el dashboard en viewport 375px (iPhone SE)
- [ ] Sidebar colapsable en mobile
- [ ] Gráficos adaptados a pantalla pequeña
- [ ] Tablas con scroll horizontal en mobile

---

## 🟢 FASE 3 — Diferenciadores (te ponen por encima del promedio)

### 3.1 Notificaciones en tiempo real (ícono 🔔)
- [ ] Leer tabla `Notification` de BD por usuario
- [ ] Badge dinámico con conteo de no leídas
- [ ] Dropdown con listado de notificaciones
- [ ] Marcar como leídas (PATCH endpoint)
- [ ] Endpoint `POST /api/notifications/trigger` para n8n

### 3.2 Simulador conectado a BD real
- [ ] Selector de proyecto real (dropdown con proyectos de Prisma)
- [ ] TIR calculada desde el proyecto seleccionado
- [ ] Proyección basada en monto real de inversión del usuario

### 3.3 Página de Perfil (`/profile`)
- [ ] Nombre y email del usuario (desde Clerk)
- [ ] Nivel de inversor (calculado desde total invertido)
- [ ] Historial de inversiones
- [ ] Botón de descarga de estado de cuenta (PDF o CSV)

### 3.4 n8n Automatización
- [ ] Configurar n8n (Railway/Render o n8n Cloud)
- [ ] Flujo: dividendo pagado → email al inversor
- [ ] Flujo: nuevo proyecto disponible → notificación
- [ ] Flujo: reporte semanal de portafolio (lunes)

---

## 🔧 Deuda técnica

| Problema | Prioridad |
|---|---|
| `proxy.ts` debería llamarse `middleware.ts` | 🟡 Media |
| Cero tests (Playwright/Vitest) | 🟡 Media |
| Sin documentación de API endpoints | 🟢 Baja |
| Groq API sin manejo de rate limits | 🟡 Media |
| Chat history en localStorage (no persiste en BD) | 🟢 Baja |

---

## 📋 Stack completo

| Capa | Tecnología |
|---|---|
| Frontend | Next.js 16 (App Router, Server Components) |
| Estilos | Tailwind CSS v4 + shadcn/ui |
| Auth | Clerk v7 (multi-tenant) |
| Base de datos | Supabase (PostgreSQL) |
| ORM | Prisma v7 con PgBouncer |
| IA | Groq API (llama-3.3-70b-versatile) + streaming SSE |
| Webhooks | Svix (verificación Clerk) |
| Deploy | Vercel (CI/CD automático desde `main`) |
| Automatización | n8n (FASE 3) |

---

## 🗂️ Flujo de trabajo Git

```
feature/xxx o fix/xxx
       │
       ▼
  PR → develop  ← staging (preview en Vercel)
       │
       ▼
  PR → main     ← producción (deploy automático Vercel)
```

**Regla:** Nunca hacer push directo a `main`. Siempre pasar por PR desde `develop`.
