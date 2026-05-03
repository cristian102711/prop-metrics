'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Send, Trash2, Bot } from 'lucide-react'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const STORAGE_KEY = 'propmetrics-chat-history'

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content:
    'Hola, soy tu asistente financiero de PropMetrics. Puedo ayudarte a analizar proyectos, comparar rentabilidades y explicarte conceptos de inversión inmobiliaria tokenizada. ¿En qué te puedo ayudar?',
}

const suggestions = [
  '¿Cuál proyecto tiene mejor TIR?',
  '¿Qué es el Cap Rate?',
  'Compara Token Renta vs Socio Preferente',
  'Recomiéndame dónde invertir',
]

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as Message[]
        if (parsed.length > 0) setMessages(parsed)
      }
    } catch {
      // Ignore parse errors
    }
  }, [])

  // Persist to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 1) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    }
  }, [messages])

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const clearHistory = useCallback(() => {
    setMessages([INITIAL_MESSAGE])
    localStorage.removeItem(STORAGE_KEY)
    inputRef.current?.focus()
  }, [])

  const sendMessage = useCallback(
    async (text?: string) => {
      const content = text ?? input.trim()
      if (!content || loading) return

      const userMessage: Message = { role: 'user', content }
      const updatedMessages: Message[] = [...messages, userMessage]
      setMessages(updatedMessages)
      setInput('')
      setLoading(true)

      // Placeholder for the streaming assistant response
      const assistantPlaceholder: Message = { role: 'assistant', content: '' }
      setMessages((prev) => [...prev, assistantPlaceholder])

      try {
        const response = await fetch('/api/ai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: updatedMessages.map(({ role, content }) => ({ role, content })),
          }),
        })

        if (!response.body) throw new Error('No stream body')

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let accumulated = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          if (chunk === '[DONE]') break

          accumulated += chunk

          // Update the last message in state with the accumulated content
          setMessages((prev) => {
            const updated = [...prev]
            updated[updated.length - 1] = { role: 'assistant', content: accumulated }
            return updated
          })
        }
      } catch {
        setMessages((prev) => {
          const updated = [...prev]
          updated[updated.length - 1] = {
            role: 'assistant',
            content: 'Hubo un error al procesar tu consulta. Intenta de nuevo.',
          }
          return updated
        })
      } finally {
        setLoading(false)
        inputRef.current?.focus()
      }
    },
    [input, loading, messages]
  )

  return (
    <div className="flex flex-col h-full space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Asistente IA</h1>
          <p className="text-sm text-muted-foreground">
            Consulta sobre inversiones, proyectos y rentabilidad
          </p>
        </div>
        <button
          onClick={clearHistory}
          title="Limpiar historial"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors px-3 py-1.5 rounded-lg border border-border hover:border-destructive/50 bg-card"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Limpiar
        </button>
      </div>

      {/* Suggestions */}
      <div className="grid grid-cols-4 gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => sendMessage(s)}
            disabled={loading}
            className="text-xs text-left px-3 py-2 rounded-lg border border-border bg-card hover:bg-muted hover:border-primary/40 transition-colors text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Chat window */}
      <div className="flex-1 rounded-xl border border-border bg-card flex flex-col min-h-0" style={{ height: '420px' }}>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scroll-smooth">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3 h-3 text-primary" />
                </div>
              )}
              <div
                className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-sm'
                    : 'bg-muted text-foreground rounded-bl-sm border border-border'
                }`}
              >
                {msg.content}
                {/* Blinking cursor while streaming the last assistant message */}
                {loading && i === messages.length - 1 && msg.role === 'assistant' && (
                  <span className="inline-block w-0.5 h-3.5 bg-primary ml-0.5 animate-pulse align-middle" />
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator shown only before first token arrives */}
          {loading && messages[messages.length - 1]?.content === '' && (
            <div className="flex gap-2 justify-start">
              <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-3 h-3 text-primary" />
              </div>
              <div className="bg-muted border border-border px-4 py-2.5 rounded-2xl rounded-bl-sm text-sm text-muted-foreground flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-border p-3 flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder="Escribe tu consulta financiera..."
            disabled={loading}
            className="flex-1 text-sm px-3 py-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary transition-colors disabled:opacity-50"
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            className="px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}