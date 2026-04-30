export default function PortfolioPage() {
  return (
    <div className="space-y-6">

      {/* Título */}
      <div>
        <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Resumen de tu portfolio de inversiones</p>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total invertido', value: '$2.450.000', sub: '+12% este mes' },
          { label: 'Dividendos acumulados', value: '$87.340', sub: '+$3.200 hoy' },
          { label: 'TIR proyectada', value: '11,4%', sub: 'anual estimado' },
          { label: 'Tokens activos', value: '34', sub: 'en 4 proyectos' },
        ].map((metric) => (
          <div key={metric.label} className="p-4 rounded-xl border border-border bg-card">
            <div className="text-xs text-muted-foreground mb-1">{metric.label}</div>
            <div className="text-2xl font-semibold text-foreground">{metric.value}</div>
            <div className="text-xs text-emerald-600 mt-1">{metric.sub}</div>
          </div>
        ))}
      </div>

      {/* Notificaciones n8n */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-foreground">Notificaciones recientes</h2>
          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">3 nuevas</span>
        </div>
        <div className="space-y-3">
          {[
            { color: 'bg-emerald-500', text: 'Dividendo pagado — Edificio Alameda Centro · $1.240 acreditados', time: 'hace 2 horas · automático vía n8n' },
            { color: 'bg-blue-500', text: 'Proyecto Las Condes IV llegó al 85% de financiamiento', time: 'hace 5 horas · automático vía n8n' },
            { color: 'bg-amber-500', text: 'Reporte semanal generado y enviado a tu email', time: 'ayer 08:00 · automático vía n8n' },
          ].map((notif, i) => (
            <div key={i} className="flex items-start gap-3 py-2 border-b border-border last:border-0">
              <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${notif.color}`} />
              <div>
                <div className="text-sm text-foreground">{notif.text}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{notif.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}