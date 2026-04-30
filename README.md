# PropMetrics 🏠

**Plataforma SaaS de análisis de inversión inmobiliaria tokenizada**

PropMetrics centraliza el análisis de proyectos tokenizados, simula rentabilidad en tiempo real y automatiza alertas para que inversores tomen mejores decisiones.

[![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat&logo=vercel)](https://prop-metrics.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat&logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript)](https://typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat&logo=supabase)](https://supabase.com)

---

## ✨ Funcionalidades

- **Dashboard** — Métricas de portfolio en tiempo real: TIR, dividendos, tokens activos
- **Marketplace** — Proyectos tokenizados con filtros por tipo y rentabilidad
- **Simulador** — Proyección interactiva de rentabilidad con sliders dinámicos
- **Asistente IA** — Chat financiero con Groq (llama-3.3-70b-versatile) especializado en inversión inmobiliaria
- **Autenticación** — Sistema multi-tenant con Clerk (email + Google)
- **Automatización** — Notificaciones automáticas vía n8n (dividendos, reportes, alertas)

---

## 🛠️ Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 15, TypeScript, Tailwind CSS, Shadcn UI |
| Backend | Next.js API Routes, Server Actions |
| Base de datos | Supabase (PostgreSQL) + Prisma ORM |
| Autenticación | Clerk (multi-tenant, roles) |
| IA | Groq API (llama-3.3-70b-versatile) |
| Automatización | n8n (webhooks, notificaciones) |
| Deploy | Vercel |

---

## 🗄️ Arquitectura de base de datos
Tenant (organización)
├── User (ADMIN | INVESTOR)
├── Project (RENTA | DESARROLLO | SOCIO_PREFERENTE)
│     ├── Investment
│     └── Dividend
└── Notification

---

## 🚀 Instalación local

### Requisitos
- Node.js 18+
- Cuenta en Supabase
- Cuenta en Clerk
- API Key de Groq

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/cristian102711/prop-metrics.git
cd prop-metrics

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# 4. Ejecutar migraciones
npx prisma migrate dev

# 5. Iniciar el servidor
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Variables de entorno

Copia `.env.example` a `.env` y completa:

```env
DATABASE_URL=           # Supabase connection string
DIRECT_URL=             # Supabase direct URL
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
GROQ_API_KEY=
```

---

## 📁 Estructura del proyecto
prop-metrics/
├── app/
│   ├── (auth)/         # sign-in, sign-up
│   ├── (dashboard)/    # portfolio, projects, simulator, assistant
│   └── api/            # ai, investments, projects
├── components/
│   ├── ui/             # Shadcn components
│   ├── charts/
│   └── shared/
├── lib/                # prisma, supabase, utils
├── prisma/             # schema + migrations
└── types/

---

## 👤 Autor

**Cristian Velásquez** — Full Stack Developer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/cristian-carlos-velasquez-cornejo/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/cristian102711)
[![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=flat&logo=vercel&logoColor=white)](https://portfolio-cristian-app.vercel.app)