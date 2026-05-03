import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const { messages } = await req.json()

  // Fetch actual data from DB to provide context to the AI
  const projects = await prisma.project.findMany({
    where: { active: true }
  })
  
  const admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } })
  const investments = admin ? await prisma.investment.findMany({
    where: { userId: admin.id },
    include: { project: true }
  }) : []

  const totalInvertido = investments.reduce((acc, inv) => acc + inv.amount, 0)
  const tokensActivos = investments.reduce((acc, inv) => acc + inv.tokens, 0)
  
  const projectListContext = projects.map(p => 
    `- ${p.name}: Tipo ${p.type}, TIR ${p.tir}%, Mínimo $${p.minAmount}, Plazo ${p.durationYears} años. (Vendido: ${p.soldTokens}/${p.totalTokens} tokens)`
  ).join('\n')

  const portfolioContext = `El usuario actual tiene un portafolio con:
  - Total invertido: $${totalInvertido}
  - Tokens activos: ${tokensActivos}
  - Inversiones detalladas: ${investments.map(i => `${i.tokens} tokens en ${i.project.name} ($${i.amount})`).join(', ') || 'Ninguna'}`

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

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        ...messages,
      ],
      max_tokens: 800,
    }),
  })

  const data = await response.json()
  const message = data.choices?.[0]?.message?.content ?? 'No se pudo obtener respuesta del modelo.'
  return NextResponse.json({ message })
}