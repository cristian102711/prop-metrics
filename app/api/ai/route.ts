import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { messages } = await req.json()

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
          content: `Eres un asistente financiero especializado en inversión inmobiliaria tokenizada.
          Ayudas a inversores a entender conceptos como Cap Rate, TIR, plusvalía, tokens de renta y desarrollo.
          Responde siempre en español, de forma clara y concisa.
          Proyectos disponibles: Edificio Alameda Centro (Token Renta, TIR 11.2%), Las Condes IV (Token Desarrollo, TIR 14.8%), Torre Providencia (Socio Preferente, TIR 12.5%).`,
        },
        ...messages,
      ],
      max_tokens: 500,
    }),
  })

  const data = await response.json()
  console.log('Groq response:', JSON.stringify(data))

  const message = data.choices?.[0]?.message?.content ?? 'No se pudo obtener respuesta.'
  return NextResponse.json({ message })
}