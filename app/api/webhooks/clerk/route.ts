import { headers } from 'next/headers'
import { Webhook } from 'svix'
import { prisma } from '@/lib/prisma'

// Tipos del payload de Clerk webhooks
interface ClerkEmailAddress {
  email_address: string
  id: string
}

interface ClerkUserPayload {
  id: string
  first_name: string | null
  last_name: string | null
  email_addresses: ClerkEmailAddress[]
  primary_email_address_id: string
}

interface ClerkDeletedPayload {
  id: string
  deleted: boolean
}

type WebhookEvent =
  | { type: 'user.created' | 'user.updated'; data: ClerkUserPayload }
  | { type: 'user.deleted'; data: ClerkDeletedPayload }

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    console.error('CLERK_WEBHOOK_SECRET no está configurado en .env')
    return new Response('Webhook secret no configurado', { status: 500 })
  }

  // Leer los headers de verificación de Svix
  const headerPayload = await headers()
  const svixId = headerPayload.get('svix-id')
  const svixTimestamp = headerPayload.get('svix-timestamp')
  const svixSignature = headerPayload.get('svix-signature')

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Headers de Svix faltantes', { status: 400 })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Verificar la firma con Svix
  const wh = new Webhook(WEBHOOK_SECRET)
  let event: WebhookEvent

  try {
    event = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verificando webhook de Clerk:', err)
    return new Response('Firma inválida', { status: 400 })
  }

  // Asegurar que el Tenant por defecto exista
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'default-tenant' },
    update: {},
    create: { name: 'PropMetrics Master Tenant', slug: 'default-tenant' },
  })

  switch (event.type) {
    case 'user.created': {
      const { id: clerkId, email_addresses, primary_email_address_id, first_name, last_name } = event.data
      const primary = email_addresses.find((e) => e.id === primary_email_address_id)
      const email = primary?.email_address ?? `${clerkId}@clerk.local`
      const name = [first_name, last_name].filter(Boolean).join(' ') || 'Usuario'

      await prisma.user.upsert({
        where: { clerkId },
        update: { email, name },
        create: { clerkId, email, name, tenantId: tenant.id },
      })

      console.log(`✅ Webhook user.created: ${email} (${clerkId})`)
      break
    }

    case 'user.updated': {
      const { id: clerkId, email_addresses, primary_email_address_id, first_name, last_name } = event.data
      const primary = email_addresses.find((e) => e.id === primary_email_address_id)
      const email = primary?.email_address ?? `${clerkId}@clerk.local`
      const name = [first_name, last_name].filter(Boolean).join(' ') || 'Usuario'

      await prisma.user.upsert({
        where: { clerkId },
        update: { email, name },
        create: { clerkId, email, name, tenantId: tenant.id },
      })

      console.log(`✅ Webhook user.updated: ${email} (${clerkId})`)
      break
    }

    case 'user.deleted': {
      const { id: clerkId } = event.data
      if (!clerkId) break

      const user = await prisma.user.findUnique({ where: { clerkId } })
      if (user) {
        // Eliminar inversiones del usuario primero (FK constraint)
        await prisma.investment.deleteMany({ where: { userId: user.id } })
        await prisma.user.delete({ where: { clerkId } })
        console.log(`✅ Webhook user.deleted: ${clerkId}`)
      }
      break
    }

    default:
      console.log(`ℹ️ Evento no manejado: ${(event as { type: string }).type}`)
  }

  return new Response('OK', { status: 200 })
}
