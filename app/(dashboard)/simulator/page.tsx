'use client'

import { useState } from 'react'
import { ProjectionChart } from '@/components/charts/ProjectionChart'

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
  const roi = (((total - monto) / monto) * 100).toFixed(1)

  const fmt = (v: number) => `$${v.toLocaleString('es-CL')}`

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-xl font-semibold text-foreground">Simulador de rentabilidad</h1>
        <p className="text-sm text-muted-foreground">Proyecta tu inversión antes de comprometer capital</p>
      </div>

      <div className="grid grid-cols-2 gap-6">

        {/* Parámetros */}
        <div className="rounded-xl border border-border bg-card p-6 space-y-5">
          <h2 className="text-sm font-semibold text-foreground">Parámetros de inversión</h2>

          {/* Monto */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Monto a invertir</span>
              <span className="font-semibold text-foreground tabular-nums">{fmt(monto)}</span>
            </div>
            <input
              type="range" min={100000} max={5000000} step={100000}
              value={monto} onChange={(e) => setMonto(Number(e.target.value))}
              className="w-full accent-emerald-500 h-1.5 rounded-full cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground/60">
              <span>$100K</span><span>$5M</span>
            </div>
          </div>

          {/* Tipo de token */}
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">Tipo de token</span>
            <div className="grid grid-cols-3 gap-2">
              {tipos.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTipo(t.value)}
                  className={`text-xs px-2 py-2 rounded-lg border transition-all duration-150 ${
                    tipo === t.value
                      ? 'border-primary bg-primary/10 text-primary font-medium'
                      : 'border-border bg-background text-muted-foreground hover:border-primary/40'
                  }`}
                >
                  <div>{t.label}</div>
                  <div className="font-semibold mt-0.5">{(t.rate * 100).toFixed(1)}%</div>
                </button>
              ))}
            </div>
          </div>

          {/* Plazo */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Plazo de inversión</span>
              <span className="font-semibold text-foreground">{plazo} años</span>
            </div>
            <input
              type="range" min={1} max={10} step={1}
              value={plazo} onChange={(e) => setPlazo(Number(e.target.value))}
              className="w-full accent-emerald-500 h-1.5 rounded-full cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground/60">
              <span>1 año</span><span>10 años</span>
            </div>
          </div>

          {/* Plusvalía */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Plusvalía anual estimada</span>
              <span className="font-semibold text-foreground">{plusvalia}%</span>
            </div>
            <input
              type="range" min={1} max={8} step={0.5}
              value={plusvalia} onChange={(e) => setPlusvalia(Number(e.target.value))}
              className="w-full accent-emerald-500 h-1.5 rounded-full cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground/60">
              <span>1%</span><span>8%</span>
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div className="space-y-4">

          {/* KPIs resultado */}
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
            <h2 className="text-sm font-semibold text-foreground mb-4">Proyección en {plazo} años</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Capital inicial', value: fmt(monto), highlight: false },
                { label: 'ROI total', value: `+${roi}%`, highlight: true },
                { label: 'Dividendos', value: fmt(dividendos), highlight: false },
                { label: 'Plusvalía', value: fmt(plusTotal), highlight: false },
              ].map((item) => (
                <div key={item.label}>
                  <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
                  <div className={`text-lg font-semibold tabular-nums ${item.highlight ? 'text-primary' : 'text-foreground'}`}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-primary/20 flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Retorno total estimado</span>
              <span className="text-xl font-bold text-primary tabular-nums">{fmt(total)}</span>
            </div>
          </div>

          {/* Chart de proyección */}
          <ProjectionChart monto={monto} rate={rate} plusvalia={plusvalia} plazo={plazo} />
        </div>

      </div>
    </div>
  )
}