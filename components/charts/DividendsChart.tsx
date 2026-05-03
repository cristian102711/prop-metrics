'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export interface DividendDataPoint {
  mes: string
  dividendos: number
}

const fmt = (v: number) => `$${v.toLocaleString('es-CL')}`

export function DividendsChart({ data }: { data: DividendDataPoint[] }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-foreground">Dividendos mensuales</h2>
        <p className="text-xs text-muted-foreground">Acreditados en tu cuenta</p>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 6%)" vertical={false} />
          <XAxis
            dataKey="mes"
            tick={{ fontSize: 11, fill: 'oklch(0.58 0.02 200)' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
            tick={{ fontSize: 11, fill: 'oklch(0.58 0.02 200)' }}
            axisLine={false}
            tickLine={false}
            width={42}
          />
          <Tooltip
            formatter={(v: number | string | (number | string)[]) => [fmt(Number(v)), 'Dividendos']}
            contentStyle={{
              background: 'oklch(0.14 0.015 240)',
              border: '1px solid oklch(1 0 0 / 10%)',
              borderRadius: '0.5rem',
              fontSize: '12px',
            }}
            labelStyle={{ color: 'oklch(0.90 0.005 160)' }}
            itemStyle={{ color: 'oklch(0.60 0.20 160)' }}
            cursor={{ fill: 'oklch(1 0 0 / 4%)' }}
          />
          <Bar
            dataKey="dividendos"
            fill="oklch(0.60 0.20 160)"
            radius={[4, 4, 0, 0]}
            maxBarSize={32}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
