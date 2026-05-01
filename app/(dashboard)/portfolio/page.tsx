import { PortfolioChart } from '@/components/charts/PortfolioChart'
import { DividendsChart } from '@/components/charts/DividendsChart'
import { DistributionChart } from '@/components/charts/DistributionChart'
import { TrendingUp, Coins, BarChart3, Layers } from 'lucide-react'

const metrics = [
  {
    label: 'Total invertido',
    value: '$2.450.000',
    sub: '+12% este mes',
    icon: TrendingUp,
    positive: true,
  },
  {
    label: 'Dividendos acumulados',
    value: '$87.340',
    sub: '+$3.200 hoy',
    icon: Coins,
    positive: true,
  },
  {
    label: 'TIR proyectada',
    value: '11,4%',
    sub: 'anual estimado',
    icon: BarChart3,
    positive: true,
  },
  {
    label: 'Tokens activos',
    value: '34',
    sub: 'en 4 proyectos',
    icon: Layers,
    positive: null,
  },
]

const notifications = [
  {
    color: 'bg-primary',
    text: 'Dividendo pagado — Edificio Alameda Centro · $1.240 acreditados',
    time: 'hace 2 horas · automático vía n8n',
  },
  {
    color: 'bg-blue-500',
    text: 'Proyecto Las Condes IV llegó al 85% de financiamiento',
    time: 'hace 5 horas · automático vía n8n',
  },
  {
    color: 'bg-amber-500',
    text: 'Reporte semanal generado y enviado a tu email',
    time: 'ayer 08:00 · automático vía n8n',
  },
]

export default function PortfolioPage() {
  return (
    <div className="space-y-6">

      {/* Encabezado */}
      <div>
        <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Resumen de tu portfolio de inversiones tokenizadas</p>
      </div>

      {/* Métricas KPI */}
      <div className="grid grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">{m.label}</span>
              <m.icon className="w-3.5 h-3.5 text-muted-foreground/50" />
            </div>
            <div className="text-2xl font-semibold text-foreground tabular-nums">{m.value}</div>
            <div className={`text-xs mt-1 ${m.positive ? 'text-primary' : 'text-muted-foreground'}`}>
              {m.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Charts — fila 1 */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <PortfolioChart />
        </div>
        <DistributionChart />
      </div>

      {/* Charts + Notificaciones — fila 2 */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <DividendsChart />
        </div>

        {/* Notificaciones */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground">Notificaciones</h2>
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
              3 nuevas
            </span>
          </div>
          <div className="space-y-3">
            {notifications.map((n, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-border last:border-0">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.color}`} />
                <div>
                  <div className="text-xs text-foreground leading-relaxed">{n.text}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}