# PropMetrics — Arquitectura del Sistema

## Diagrama de flujo general

```mermaid
flowchart TD
    subgraph Cliente["🌐 Cliente (Browser)"]
        Landing["Landing Page\n/"]
        Auth["Auth Pages\n/sign-in  /sign-up"]
        Dashboard["Dashboard\n/portfolio  /projects\n/simulator  /assistant"]
    end

    subgraph Next["⚡ Next.js 16 (Vercel Edge)"]
        MW["proxy.ts\n(Middleware Clerk)"]
        SC["Server Components\n(fetch directo a Prisma)"]
        API["API Routes\n/api/ai\n/api/webhooks/clerk"]
    end

    subgraph Auth_Layer["🔐 Autenticación"]
        Clerk["Clerk v7\nJWT + OAuth"]
        Google["Google OAuth 2.0"]
    end

    subgraph Data["🗄️ Datos"]
        Prisma["Prisma ORM v7"]
        Supabase["Supabase\nPostgreSQL"]
    end

    subgraph AI["🤖 Inteligencia Artificial"]
        Groq["Groq API\nllama-3.3-70b-versatile\nStreaming SSE"]
    end

    subgraph Automation["⚙️ Automatización (Fase 3)"]
        N8N["n8n Workflows\nWebhooks / Emails"]
        Resend["Resend\nEmail Transaccional"]
    end

    Landing --> Auth
    Auth --> Clerk
    Clerk --> Google
    Clerk --> MW
    MW --> SC
    SC --> Prisma
    Prisma --> Supabase
    Dashboard --> API
    API --> Groq
    API --> Prisma
    Clerk -->|"user.created\nuser.updated"| API
    SC -->|"userId Clerk\n→ User en BD"| Prisma
    Prisma -->|"Notificaciones\nDividendos"| N8N
    N8N --> Resend
```

---

## Modelo de datos (Prisma Schema)

```
User
├── clerkId (FK → Clerk)
├── email
├── name
├── role (ADMIN | INVESTOR)
├── investments[]
└── notifications[]

Project
├── name, type, location
├── targetAmount, currentAmount
├── tir, status
├── investments[]
└── dividends[]

Investment
├── userId (FK → User)
├── projectId (FK → Project)
├── amount
└── tokens

Dividend
├── projectId (FK → Project)
├── amount
└── paidAt

Notification
├── userId (FK → User)
├── type (DIVIDEND | PROJECT | REPORT)
├── message
└── read
```

---

## Flujo de autenticación

```
1. Usuario visita /sign-in
2. Clerk autentica (email o Google OAuth)
3. Clerk emite JWT → almacenado en cookie HttpOnly
4. proxy.ts (middleware) valida JWT en cada request
5. Server Component llama getAuthUser() → obtiene clerkId
6. getAuthUser() busca User en BD o lo crea (get-or-create)
7. Todas las queries Prisma se filtran por userId
```

---

## Flujo del Asistente IA

```
1. Usuario escribe pregunta en /assistant
2. POST /api/ai con historial del chat + pregunta
3. API construye prompt con contexto del portfolio del usuario
4. Groq API responde con streaming SSE
5. ReadableStream enviado al cliente
6. Frontend renderiza el texto token por token (streaming)
```

---

## Variables de entorno requeridas

| Variable | Servicio | Obligatoria |
|---|---|---|
| `DATABASE_URL` | Supabase (PgBouncer) | ✅ |
| `DIRECT_URL` | Supabase (directo) | ✅ |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk | ✅ |
| `CLERK_SECRET_KEY` | Clerk | ✅ |
| `CLERK_WEBHOOK_SECRET` | Clerk Webhooks | ✅ |
| `GROQ_API_KEY` | Groq | ✅ |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Clerk | ✅ |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Clerk | ✅ |
