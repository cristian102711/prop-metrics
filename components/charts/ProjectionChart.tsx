'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'

interface ProjectionChartProps {
  monto: number
  rate: number
  plusvalia: number
  plazo: number
}

export function ProjectionChart({ monto, rate, plusvalia, plazo }: ProjectionChartProps) {
  const data = Array.from({ length: plazo + 1 }, (_, i) => {
    const dividendos = Math.round(monto * rate * i)
    const plusTotal = Math.round(monto * (Math.pow(1 + plusvalia / 100, i) - 1))
    return {
      año: i === 0 ? 'Hoy' : `Año ${i}`,
      valor: monto + dividendos + plusTotal,
      base: monto,
    }
  })

  const fmt = (v: number) =>
    v >= 1000000
      ? `$${(v / 1000000).toFixed(2)}M`
      : `$${(v / 1000).toFixed(0)}K`

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-foreground">Proyección de crecimiento</h2>
        <p className="text-xs text-muted-foreground">Capital inicial vs retorno proyectado</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 6%)" />
          <XAxis
            dataKey="año"
            tick={{ fontSize: 11, fill: 'oklch(0.58 0.02 200)' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={fmt}
            tick={{ fontSize: 11, fill: 'oklch(0.58 0.02 200)' }}
            axisLine={false}
            tickLine={false}
            width={60}
          />
          <Tooltip
            formatter={(v: number, name: string) => [
              fmt(v),
              name === 'valor' ? 'Retorno total' : 'Capital inicial',
            ]}
            contentStyle={{
              background: 'oklch(0.14 0.015 240)',
              border: '1px solid oklch(1 0 0 / 10%)',
              borderRadius: '0.5rem',
              fontSize: '12px',
            }}
            labelStyle={{ color: 'oklch(0.90 0.005 160)' }}
          />
          <ReferenceLine
            y={monto}
            stroke="oklch(0.58 0.02 200)"
            strokeDasharray="4 4"
            strokeWidth={1}
          />
          <Line
            type="monotone"
            dataKey="valor"
            stroke="oklch(0.60 0.20 160)"
            strokeWidth={2.5}
            dot={{ r: 3, fill: 'oklch(0.60 0.20 160)', strokeWidth: 0 }}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
          <Line
            type="monotone"
            dataKey="base"
            stroke="oklch(0.58 0.02 200)"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
