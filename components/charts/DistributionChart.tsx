'use client'

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const data = [
  { name: 'Token Renta', value: 55, color: 'oklch(0.60 0.20 160)' },
  { name: 'Token Desarrollo', value: 30, color: 'oklch(0.55 0.16 200)' },
  { name: 'Socio Preferente', value: 15, color: 'oklch(0.65 0.14 120)' },
]

export function DistributionChart() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-2">
        <h2 className="text-sm font-semibold text-foreground">Distribución por token</h2>
        <p className="text-xs text-muted-foreground">Composición del portfolio</p>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={48}
            outerRadius={70}
            paddingAngle={3}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(v: number) => [`${v}%`, 'Participación']}
            contentStyle={{
              background: 'oklch(0.14 0.015 240)',
              border: '1px solid oklch(1 0 0 / 10%)',
              borderRadius: '0.5rem',
              fontSize: '12px',
            }}
            labelStyle={{ color: 'oklch(0.90 0.005 160)' }}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: '11px', color: 'oklch(0.58 0.02 200)' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
