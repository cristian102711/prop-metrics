'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export interface PortfolioDataPoint {
  mes: string
  valor: number
}

const fmt = (v: number) =>
  v >= 1000000
    ? `$${(v / 1000000).toFixed(1)}M`
    : `$${(v / 1000).toFixed(0)}K`

export function PortfolioChart({ data }: { data: PortfolioDataPoint[] }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-foreground">Crecimiento del portfolio</h2>
        <p className="text-xs text-muted-foreground">Últimos 7 meses</p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="oklch(0.60 0.20 160)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="oklch(0.60 0.20 160)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 6%)" />
          <XAxis
            dataKey="mes"
            tick={{ fontSize: 11, fill: 'oklch(0.58 0.02 200)' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={fmt}
            tick={{ fontSize: 11, fill: 'oklch(0.58 0.02 200)' }}
            axisLine={false}
            tickLine={false}
            width={52}
          />
          <Tooltip
            formatter={((v: unknown) => [fmt(Number(v)), 'Portfolio']) as (v: unknown) => [string, string]}
            contentStyle={{
              background: 'oklch(0.14 0.015 240)',
              border: '1px solid oklch(1 0 0 / 10%)',
              borderRadius: '0.5rem',
              fontSize: '12px',
            }}
            labelStyle={{ color: 'oklch(0.90 0.005 160)' }}
            itemStyle={{ color: 'oklch(0.60 0.20 160)' }}
          />
          <Area
            type="monotone"
            dataKey="valor"
            stroke="oklch(0.60 0.20 160)"
            strokeWidth={2}
            fill="url(#portfolioGrad)"
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
