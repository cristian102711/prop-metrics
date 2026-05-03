import { auth, currentUser } from '@clerk/nextjs/server'
import { prisma } from './prisma'

/**
 * Retorna el User de nuestra base de datos correspondiente al usuario
 * autenticado en Clerk. Si el usuario no existe aún en la BD, lo crea
 * automáticamente (patrón "get or create").
 *
 * Uso en Server Components:
 *   const user = await getAuthUser()
 *   if (!user) redirect('/sign-in')
 */
export async function getAuthUser() {
  const { userId } = await auth()
  if (!userId) return null

  // 1. Try to find by clerkId
  const existing = await prisma.user.findUnique({
    where: { clerkId: userId },
  })
  if (existing) return existing

  // 2. Not found — create it (first sign-in flow)
  const clerkUser = await currentUser()
  if (!clerkUser) return null

  // Ensure the default tenant exists
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'default-tenant' },
    update: {},
    create: {
      name: 'PropMetrics Master Tenant',
      slug: 'default-tenant',
    },
  })

  const email =
    clerkUser.emailAddresses[0]?.emailAddress ?? `${userId}@clerk.local`

  const newUser = await prisma.user.create({
    data: {
      clerkId: userId,
      email,
      name: clerkUser.fullName ?? clerkUser.firstName ?? 'Usuario',
      tenantId: tenant.id,
    },
  })

  return newUser
}
