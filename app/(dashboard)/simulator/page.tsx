'use client'

import { useState } from 'react'

const tipos = [
  { value: 'renta', label: 'Token Renta', rate: 0.058 },
  { value: 'desarrollo', label: 'Token Desarrollo', rate: 0.071 },
  { value: 'socio', label: 'Socio Preferente', rate: 0.063 },
]

export default function SimulatorPage() {
  const [monto, setMonto] = useState(1000000)
  const [plazo, setPlazo] = useState(5)
  const [plusvalia, setPlusvalia] = useState(3)
  const [tipo, setTipo] = useState('renta')

  const rate = tipos.find((t) => t.value === tipo)?.rate ?? 0.058
  const dividendos = Math.round(monto * rate * plazo)
  const plusTotal = Math.round(monto * (Math.pow(1 + plusvalia / 100, plazo) - 1))
  const total = monto + dividendos + plusTotal

  return (
    <div className="space-y-6">

      {/* Título */}
      <div>
        <h1 className="text-xl font-semibold text-foreground">Simulador de rentabilidad</h1>
        <p className="text-sm text-muted-foreground">Proyecta tu inversión antes de comprometer capital</p>
      </div>

      <div className="grid grid-cols-2 gap-6">

        {/* Parámetros */}
        <div className="rounded-xl border border-border bg-card p-6 space-y-5">
          <h2 className="text-sm font-semibold text-foreground">Parámetros</h2>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Monto a invertir</span>
              <span className="font-semibold text-foreground">${monto.toLocaleString('es-CL')}</span>
            </div>
            <input
              type="range" min={100000} max={5000000} step={100000}
              value={monto} onChange={(e) => setMonto(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Tipo de token</span>
            </div>
            <select
              value={tipo} onChange={(e) => setTipo(e.target.value)}
              className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-background text-foreground"
            >
              {tipos.map((t) => (
                <option key={t.value} value={t.value}>{t.label} ({(t.rate * 100).toFixed(1)}%)</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Plazo</span>
              <span className="font-semibold text-foreground">{plazo} años</span>
            </div>
            <input
              type="range" min={1} max={10} step={1}
              value={plazo} onChange={(e) => setPlazo(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Plusvalía anual estimada</span>
              <span className="font-semibold text-foreground">{plusvalia}%</span>
            </div>
            <input
              type="range" min={1} max={8} step={0.5}
              value={plusvalia} onChange={(e) => setPlusvalia(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
          </div>
        </div>

        {/* Resultados */}
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-emerald-50 dark:bg-emerald-950 p-6">
            <h2 className="text-sm font-semibold text-emerald-800 dark:text-emerald-200 mb-4">Proyección de retorno</h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Dividendos totales', value: `$${dividendos.toLocaleString('es-CL')}` },
                { label: 'Plusvalía estimada', value: `$${plusTotal.toLocaleString('es-CL')}` },
                { label: 'Retorno total', value: `$${total.toLocaleString('es-CL')}` },
              ].map((item) => (
                <div key={item.label}>
                  <div className="text-xs text-emerald-700 dark:text-emerald-300 mb-1">{item.label}</div>
                  <div className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-sm font-semibold text-foreground mb-4">Proyección año a año</h2>
            <div className="space-y-2">
              {Array.from({ length: plazo }, (_, i) => {
                const año = i + 1
                const valor = Math.round(monto + monto * rate * año + monto * (Math.pow(1 + plusvalia / 100, año) - 1))
                const pct = Math.round(((valor - monto) / monto) * 100)
                return (
                  <div key={año} className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-12">Año {año}</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all"
                        style={{ width: `${Math.min(pct * 2, 100)}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-foreground w-24 text-right">${valor.toLocaleString('es-CL')}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}