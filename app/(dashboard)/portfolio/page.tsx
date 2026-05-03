import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/getAuthUser'
import { PortfolioChart } from '@/components/charts/PortfolioChart'
import { DividendsChart } from '@/components/charts/DividendsChart'
import { DistributionChart } from '@/components/charts/DistributionChart'
import { TrendingUp, Coins, BarChart3, Layers } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

export default async function PortfolioPage() {
  // Obtenemos el usuario autenticado real desde Clerk → BD
  const user = await getAuthUser()
  if (!user) redirect('/sign-in')

  const userId = user.id

  // 1. Fetch Inversiones
  const investments = await prisma.investment.findMany({
    where: { userId },
    include: { project: true },
  })

  const totalInvertido = investments.reduce((acc, inv) => acc + inv.amount, 0)
  const tokensActivos = investments.reduce((acc, inv) => acc + inv.tokens, 0)
  const proyectosActivos = new Set(investments.map((i) => i.projectId)).size

  // Cálculo de TIR ponderada
  const tirTotal = investments.reduce((acc, inv) => acc + (inv.project.tir * inv.amount), 0)
  const tirProyectada = totalInvertido > 0 ? (tirTotal / totalInvertido).toFixed(1) : '0.0'

  // 2. Fetch Dividendos (Simplificado para la demo)
  const dividends = await prisma.dividend.findMany()
  const dividendosAcumulados = dividends.reduce((acc, div) => acc + div.amount, 0)

  // 3. Fetch Notificaciones
  const notificationsData = await prisma.notification.findMany({
    orderBy: { sentAt: 'desc' },
    take: 3,
  })

  // 4. Generar datos para los gráficos basados en datos reales
  
  // a) Distribución por Token
  const distributionMap = new Map<string, number>()
  investments.forEach((inv) => {
    const type = inv.project.type
    distributionMap.set(type, (distributionMap.get(type) || 0) + inv.amount)
  })
  
  const typeNames: Record<string, string> = {
    RENTA: 'Token Renta',
    DESARROLLO: 'Token Desarrollo',
    SOCIO_PREFERENTE: 'Socio Preferente'
  }
  
  const typeColors: Record<string, string> = {
    RENTA: 'oklch(0.60 0.20 160)',
    DESARROLLO: 'oklch(0.55 0.16 200)',
    SOCIO_PREFERENTE: 'oklch(0.65 0.14 120)'
  }

  const distributionData = Array.from(distributionMap.entries()).map(([type, amount]) => ({
    name: typeNames[type] || type,
    value: totalInvertido > 0 ? Math.round((amount / totalInvertido) * 100) : 0,
    color: typeColors[type] || 'oklch(0.60 0.20 160)'
  }))

  // b) Curva de Crecimiento del Portfolio (Simulada para 6 meses terminando en el valor real)
  const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun']
  let valorActual = totalInvertido * 0.4 // Empezamos en 40% del portfolio hace 6 meses
  const portfolioData = meses.map((mes, index) => {
    if (index === meses.length - 1) {
      return { mes, valor: totalInvertido }
    }
    const growth = (totalInvertido - valorActual) / (meses.length - index)
    valorActual += growth * (0.8 + Math.random() * 0.4) // Randomize un poco
    return { mes, valor: Math.round(valorActual) }
  })

  // c) Curva de Dividendos (Simulada para 6 meses con total igual al real)
  let dividendosRestantes = dividendosAcumulados
  const dividendData = meses.map((mes, index) => {
    if (index === meses.length - 1) {
      return { mes, dividendos: dividendosRestantes }
    }
    const avg = dividendosRestantes / (meses.length - index)
    const current = Math.round(avg * (0.5 + Math.random()))
    dividendosRestantes -= current
    return { mes, dividendos: current }
  })

  // Format the metrics for the UI
  const metrics = [
    {
      label: 'Total invertido',
      value: `$${(totalInvertido / 1000).toFixed(0)}K`,
      sub: '+12% este mes',
      icon: TrendingUp,
      positive: true,
    },
    {
      label: 'Dividendos acumulados',
      value: `$${(dividendosAcumulados / 1000).toFixed(1)}K`,
      sub: '+$3.2K hoy',
      icon: Coins,
      positive: true,
    },
    {
      label: 'TIR proyectada',
      value: `${tirProyectada}%`,
      sub: 'anual estimado',
      icon: BarChart3,
      positive: true,
    },
    {
      label: 'Tokens activos',
      value: tokensActivos.toString(),
      sub: `en ${proyectosActivos} proyectos`,
      icon: Layers,
      positive: null,
    },
  ]

  // Color mapping based on notification type
  const getNotifColor = (type: string) => {
    switch (type) {
      case 'DIVIDEND_PAID': return 'bg-primary'
      case 'PROJECT_FUNDED': return 'bg-blue-500'
      case 'WEEKLY_REPORT': return 'bg-amber-500'
      default: return 'bg-primary'
    }
  }

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
          <PortfolioChart data={portfolioData} />
        </div>
        <DistributionChart data={distributionData} />
      </div>

      {/* Charts + Notificaciones — fila 2 */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <DividendsChart data={dividendData} />
        </div>

        {/* Notificaciones */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground">Notificaciones</h2>
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
              {notificationsData.length} nuevas
            </span>
          </div>
          <div className="space-y-3">
            {notificationsData.map((n) => (
              <div key={n.id} className="flex items-start gap-3 py-2 border-b border-border last:border-0">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${getNotifColor(n.type)}`} />
                <div>
                  <div className="text-xs text-foreground leading-relaxed">{n.message}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">
                    {formatDistanceToNow(n.sentAt, { addSuffix: true, locale: es })} · automático vía {n.channel}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}