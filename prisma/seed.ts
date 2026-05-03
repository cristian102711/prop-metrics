import { PrismaClient, ProjectType, Role } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const pool = new Pool({ connectionString: process.env.DATABASE_URL || process.env.DIRECT_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Starting database seed...')

  // 1. Create a default Tenant
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'default-tenant' },
    update: {},
    create: {
      name: 'PropMetrics Master Tenant',
      slug: 'default-tenant',
    },
  })
  console.log(`✓ Tenant created: ${tenant.name}`)

  // 2. Create an Admin User
  const admin = await prisma.user.upsert({
    where: { email: 'admin@propmetrics.com' },
    update: {},
    create: {
      email: 'admin@propmetrics.com',
      name: 'Admin PropMetrics',
      role: Role.ADMIN,
      tenantId: tenant.id,
    },
  })
  console.log(`✓ Admin user created: ${admin.email}`)

  // 3. Create mock projects
  const mockProjects = [
    {
      name: 'Edificio Alameda Centro',
      location: 'Santiago Centro',
      type: ProjectType.RENTA,
      capRate: 6.5,
      tir: 11.4,
      minAmount: 100000,
      totalTokens: 4500,
      soldTokens: 3510,
      durationYears: 5,
      active: true,
      tenantId: tenant.id,
    },
    {
      name: 'Proyecto Borde Vivo',
      location: 'Ñuñoa, Santiago',
      type: ProjectType.RENTA,
      capRate: 5.8,
      tir: 9.8,
      minAmount: 100000,
      totalTokens: 3200,
      soldTokens: 2944,
      durationYears: 4,
      active: true,
      tenantId: tenant.id,
    },
    {
      name: 'Las Condes IV',
      location: 'Las Condes, Santiago',
      type: ProjectType.DESARROLLO,
      capRate: 0, // No cap rate for desarrollo usually
      tir: 14.2,
      minAmount: 500000,
      totalTokens: 1600,
      soldTokens: 1360,
      durationYears: 3,
      active: true,
      tenantId: tenant.id,
    },
    {
      name: 'Torre Providencia',
      location: 'Providencia, Santiago',
      type: ProjectType.DESARROLLO,
      capRate: 0,
      tir: 16.8,
      minAmount: 1000000,
      totalTokens: 1200,
      soldTokens: 540,
      durationYears: 4,
      active: true,
      tenantId: tenant.id,
    },
    {
      name: 'Fondo Norte Verde I',
      location: 'Concepción, Biobío',
      type: ProjectType.SOCIO_PREFERENTE,
      capRate: 7.2,
      tir: 12.5,
      minAmount: 200000,
      totalTokens: 1250,
      soldTokens: 750,
      durationYears: 2,
      active: true,
      tenantId: tenant.id,
    },
    {
      name: 'Parque Industrial Sur',
      location: 'Maipú, Santiago',
      type: ProjectType.SOCIO_PREFERENTE,
      capRate: 8.0,
      tir: 13.0,
      minAmount: 300000,
      totalTokens: 1333,
      soldTokens: 0,
      durationYears: 3,
      active: false, // Próximamente
      tenantId: tenant.id,
    },
  ]

  for (const p of mockProjects) {
    const existing = await prisma.project.findFirst({ where: { name: p.name } })
    if (!existing) {
      await prisma.project.create({ data: p })
      console.log(`✓ Project created: ${p.name}`)
    } else {
      console.log(`✓ Project already exists: ${p.name}`)
    }
  }

  console.log('✅ Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
