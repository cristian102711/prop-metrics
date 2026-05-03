import { NextRequest } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const { messages } = await req.json()

  // Fetch actual data from DB to provide context to the AI
  const projects = await prisma.project.findMany({ where: { active: true } })
  // Obtener el usuario real de Clerk
  const { userId: clerkId } = await auth()
  const dbUser = clerkId
    ? await prisma.user.findUnique({ where: { clerkId } })
    : null

  const investments = dbUser
    ? await prisma.investment.findMany({
        where: { userId: dbUser.id },
        include: { project: true },
      })
    : []

  const totalInvertido = investments.reduce((acc, inv) => acc + inv.amount, 0)
  const tokensActivos = investments.reduce((acc, inv) => acc + inv.tokens, 0)

  const projectListContext = projects
    .map(
      (p) =>
        `- ${p.name}: Tipo ${p.type}, TIR ${p.tir}%, Mínimo $${p.minAmount}, Plazo ${p.durationYears} años. (Vendido: ${p.soldTokens}/${p.totalTokens} tokens)`
    )
    .join('\n')

  const portfolioContext = `El usuario actual tiene un portafolio con:
  - Total invertido: $${totalInvertido}
  - Tokens activos: ${tokensActivos}
  - Inversiones detalladas: ${
    investments
      .map((i) => `${i.tokens} tokens en ${i.project.name} ($${i.amount})`)
      .join(', ') || 'Ninguna'
  }`

  const systemPrompt = `Eres un experto y consultor financiero virtual especializado en la plataforma PropMetrics (inversión inmobiliaria tokenizada).
Tus respuestas deben ser precisas, amigables y siempre en español. No inventes proyectos que no existan en la plataforma.
Ayudas a los inversores a entender conceptos como Cap Rate, TIR, plusvalía, y tipos de tokens (Renta, Desarrollo, Socio Preferente).

CONTEXTO EN TIEMPO REAL DE LA BASE DE DATOS:
Proyectos Activos Disponibles:
${projectListContext}

${portfolioContext}

Instrucciones adicionales:
1. Sé conciso y estructura tu respuesta con viñetas o negritas si es útil.
2. Si te preguntan por un proyecto en particular, usa la información del "CONTEXTO EN TIEMPO REAL".
3. Si el usuario pide recomendaciones, básate en su portafolio actual y los proyectos activos disponibles.`

  // Call Groq with stream: true
  const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      stream: true,
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
      max_tokens: 800,
    }),
  })

  if (!groqResponse.body) {
    return new Response('No stream body', { status: 500 })
  }

  // Pipe Groq's SSE stream → client as plain text stream
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  const stream = new ReadableStream({
    async start(controller) {
      const reader = groqResponse.body!.getReader()
      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split('\n').filter((l) => l.startsWith('data: '))

          for (const line of lines) {
            const data = line.replace('data: ', '')
            if (data === '[DONE]') {
              controller.enqueue(encoder.encode('[DONE]'))
              break
            }
            try {
              const parsed = JSON.parse(data)
              const token = parsed.choices?.[0]?.delta?.content
              if (token) {
                controller.enqueue(encoder.encode(token))
              }
            } catch {
              // Ignore malformed chunks
            }
          }
        }
      } finally {
        controller.close()
        reader.releaseLock()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}