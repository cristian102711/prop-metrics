'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const suggestions = [
  '¿Cuál proyecto tiene mejor TIR?',
  '¿Qué es el Cap Rate?',
  '¿Cuánto tiempo tarda en venderse un token?',
  'Compara Token Renta vs Socio Preferente',
]

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hola, soy tu asistente financiero de PropMetrics. Puedo ayudarte a analizar proyectos, comparar rentabilidades y explicarte conceptos de inversión inmobiliaria tokenizada. ¿En qué te puedo ayudar?',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async (text?: string) => {
    const content = text ?? input.trim()
    if (!content) return

    const newMessages: Message[] = [...messages, { role: 'user', content }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })
      const data = await response.json()
      setMessages([...newMessages, { role: 'assistant', content: data.message }])
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'Hubo un error al procesar tu consulta. Intenta de nuevo.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 h-full">

      {/* Título */}
      <div>
        <h1 className="text-xl font-semibold text-foreground">Asistente IA</h1>
        <p className="text-sm text-muted-foreground">Consulta sobre inversiones, proyectos y rentabilidad</p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => sendMessage(s)}
            className="text-xs text-left px-3 py-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors text-muted-foreground"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Chat */}
      <div className="rounded-xl border border-border bg-card flex flex-col" style={{ height: '420px' }}>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-emerald-600 text-white rounded-br-sm'
                  : 'bg-muted text-foreground rounded-bl-sm border border-border'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-muted border border-border px-4 py-2.5 rounded-2xl rounded-bl-sm text-sm text-muted-foreground">
                Analizando...
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-border p-3 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Escribe tu consulta financiera..."
            className="flex-1 text-sm px-3 py-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-emerald-500"
          />
          <Button size="sm" onClick={() => sendMessage()} disabled={loading}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

    </div>
  )
}