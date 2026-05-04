/**
 * seed-demo.ts
 * Siembra datos realistas para el usuario demo (demo@propmetrics.app).
 *
 * PRE-REQUISITO: El usuario demo debe haber iniciado sesión al menos una vez
 * en la aplicación para que getAuthUser() lo cree en la BD.
 *
 * USO:
 *   npx tsx prisma/seed-demo.ts
 *
 * Para sembrar en PRODUCCIÓN apuntar DIRECT_URL al string de Supabase directo.
 */

import { PrismaClient, ProjectType, Role } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const pool = new Pool({
  connectionString: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const DEMO_EMAIL = 'demo@propmetrics.app'

async function main() {
  console.log(`\n🌱 Iniciando seed del usuario demo: ${DEMO_EMAIL}\n`)

  // ── 1. Buscar usuario demo en BD ──────────────────────────────────────────
  const demoUser = await prisma.user.findUnique({ where: { email: DEMO_EMAIL } })

  if (!demoUser) {
    console.error(`
❌ Usuario "${DEMO_EMAIL}" no encontrado en la base de datos.

SOLUCIÓN:
  1. Abre https://prop-metrics.vercel.app/sign-in en el navegador
  2. Inicia sesión con demo@propmetrics.app / Demo1234!
  3. Espera a que cargue el dashboard (esto crea el usuario en la BD)
  4. Vuelve a ejecutar este script

`)
    process.exit(1)
  }

  console.log(`✓ Usuario demo encontrado: ${demoUser.id}`)

  // ── 2. Asegurar que el tenant existe ──────────────────────────────────────
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'default-tenant' },
    update: {},
    create: { name: 'PropMetrics Master Tenant', slug: 'default-tenant' },
  })

  // Vincular usuario al tenant si no está vinculado
  if (!demoUser.tenantId) {
    await prisma.user.update({
      where: { id: demoUser.id },
      data: { tenantId: tenant.id },
    })
  }

  // ── 3. Asegurar proyectos base ────────────────────────────────────────────
  const projectsData = [
    {
      name: 'Edificio Alameda Centro',
      location: 'Santiago Centro',
      type: ProjectType.RENTA,
      capRate: 6.5, tir: 11.4, minAmount: 100000,
      totalTokens: 4500, soldTokens: 3510, durationYears: 5,
      active: true, tenantId: tenant.id,
    },
    {
      name: 'Proyecto Borde Vivo',
      location: 'Ñuñoa, Santiago',
      type: ProjectType.RENTA,
      capRate: 5.8, tir: 9.8, minAmount: 100000,
      totalTokens: 3200, soldTokens: 2944, durationYears: 4,
      active: true, tenantId: tenant.id,
    },
    {
      name: 'Las Condes IV',
      location: 'Las Condes, Santiago',
      type: ProjectType.DESARROLLO,
      capRate: 0, tir: 14.2, minAmount: 500000,
      totalTokens: 1600, soldTokens: 1360, durationYears: 3,
      active: true, tenantId: tenant.id,
    },
    {
      name: 'Torre Providencia',
      location: 'Providencia, Santiago',
      type: ProjectType.DESARROLLO,
      capRate: 0, tir: 16.8, minAmount: 1000000,
      totalTokens: 1200, soldTokens: 540, durationYears: 4,
      active: true, tenantId: tenant.id,
    },
    {
      name: 'Fondo Norte Verde I',
      location: 'Concepción, Biobío',
      type: ProjectType.SOCIO_PREFERENTE,
      capRate: 7.2, tir: 12.5, minAmount: 200000,
      totalTokens: 1250, soldTokens: 750, durationYears: 2,
      active: true, tenantId: tenant.id,
    },
  ]

  const projects: Record<string, string> = {}
  for (const p of projectsData) {
    const existing = await prisma.project.findFirst({ where: { name: p.name } })
    const project = existing ?? await prisma.project.create({ data: p })
    projects[p.name] = project.id
    console.log(`✓ Proyecto: ${p.name}`)
  }

  // ── 4. Inversiones del usuario demo ──────────────────────────────────────
  const existingInvestments = await prisma.investment.count({
    where: { userId: demoUser.id },
  })

  if (existingInvestments === 0) {
    await prisma.investment.createMany({
      data: [
        {
          userId: demoUser.id,
          projectId: projects['Edificio Alameda Centro'],
          amount: 1_200_000,
          tokens: 12,
        },
        {
          userId: demoUser.id,
          projectId: projects['Proyecto Borde Vivo'],
          amount: 600_000,
          tokens: 6,
        },
        {
          userId: demoUser.id,
          projectId: projects['Las Condes IV'],
          amount: 950_000,
          tokens: 19,
        },
      ],
    })
    console.log('\n✓ Inversiones del demo creadas (3 inversiones)')
  } else {
    console.log(`\n⚠️  El usuario demo ya tiene ${existingInvestments} inversiones — saltando`)
  }

  // ── 5. Dividendos ─────────────────────────────────────────────────────────
  const existingDividends = await prisma.dividend.count({
    where: { projectId: projects['Edificio Alameda Centro'] },
  })

  if (existingDividends === 0) {
    await prisma.dividend.createMany({
      data: [
        { projectId: projects['Edificio Alameda Centro'], amount: 18_000 },
        { projectId: projects['Edificio Alameda Centro'], amount: 19_200 },
        { projectId: projects['Proyecto Borde Vivo'],     amount: 9_500  },
        { projectId: projects['Las Condes IV'],           amount: 22_000 },
      ],
    })
    console.log('✓ Dividendos creados (4 pagos)')
  } else {
    console.log('⚠️  Dividendos ya existen — saltando')
  }

  // ── 6. Notificaciones del usuario demo ───────────────────────────────────
  const existingNotifications = await prisma.notification.count()

  if (existingNotifications === 0) {
    await prisma.notification.createMany({
      data: [
        {
          type: 'DIVIDEND_PAID',
          channel: 'system',
          message: 'Dividendo acreditado — Edificio Alameda Centro · $19.200 disponibles',
        },
        {
          type: 'PROJECT_FUNDED',
          channel: 'system',
          message: 'Las Condes IV llegó al 85% de financiamiento · Última oportunidad',
        },
        {
          type: 'WEEKLY_REPORT',
          channel: 'system',
          message: 'Tu reporte semanal está listo · TIR promedio: 11.9%',
        },
      ],
    })
    console.log('✓ Notificaciones creadas (3 notificaciones)')
  } else {
    console.log('⚠️  Notificaciones ya existen — saltando')
  }

  console.log('\n✅ Seed del usuario demo completado exitosamente\n')
  console.log('   Portafolio demo:')
  console.log('   ├── 3 inversiones activas')
  console.log('   ├── $2.750.000 total invertido')
  console.log('   ├── 4 dividendos recibidos ($68.700 acumulados)')
  console.log('   └── 3 notificaciones en inbox\n')
}

main()
  .catch((e) => {
    console.error('Error en seed-demo:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
