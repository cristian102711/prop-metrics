'use client'

import { useState } from 'react'
import { TrendingUp, Clock, Shield, Zap, ChevronRight, ExternalLink } from 'lucide-react'

type TokenType = 'todos' | 'RENTA' | 'DESARROLLO' | 'SOCIO_PREFERENTE'

export interface ProjectData {
  id: string
  name: string
  location: string
  type: 'RENTA' | 'DESARROLLO' | 'SOCIO_PREFERENTE'
  active: boolean
  tir: number
  durationYears: number
  minAmount: number
  totalTokens: number
  soldTokens: number
}

interface ClientProjectListProps {
  projects: ProjectData[]
}

const filters: { value: TokenType; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'RENTA', label: 'Token Renta' },
  { value: 'DESARROLLO', label: 'Token Desarrollo' },
  { value: 'SOCIO_PREFERENTE', label: 'Socio Preferente' },
]

const typeLabels: Record<string, string> = {
  RENTA: 'Token Renta',
  DESARROLLO: 'Token Desarrollo',
  SOCIO_PREFERENTE: 'Socio Preferente',
}

// Adding some visual mappings that aren't stored in the database
const getRiesgo = (type: string) => {
  if (type === 'RENTA') return 'Bajo'
  if (type === 'DESARROLLO') return 'Medio'
  return 'Bajo'
}

const getGradient = (type: string, id: string) => {
  if (type === 'RENTA') return 'from-emerald-500/20 to-teal-500/10'
  if (type === 'DESARROLLO') return 'from-violet-500/20 to-purple-500/10'
  return 'from-blue-500/20 to-cyan-500/10'
}

const riesgoColor: Record<string, string> = {
  Bajo: 'text-emerald-500 bg-emerald-500/10',
  Medio: 'text-amber-500 bg-amber-500/10',
  Alto: 'text-red-500 bg-red-500/10',
}

const fmtM = (v: number) =>
  v >= 1000000000
    ? `$${(v / 1000000000).toFixed(1)}B`
    : `$${(v / 1000000).toFixed(0)}M`

export default function ClientProjectList({ projects }: ClientProjectListProps) {
  const [activeFilter, setActiveFilter] = useState<TokenType>('todos')

  const filtered = projects.filter(
    (p) => activeFilter === 'todos' || p.type === activeFilter
  )

  const activeCount = projects.filter(p => p.active).length

  return (
    <div className="space-y-6">

      {/* Encabezado */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Proyectos tokenizados</h1>
          <p className="text-sm text-muted-foreground">
            Inversiones respaldadas por activos reales · Blockchain Algorand · Regulado CMF
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-card border border-border px-3 py-1.5 rounded-lg">
          <Shield className="w-3.5 h-3.5 text-primary" />
          Ley Fintech · NCG 502
        </div>
      </div>

      {/* Stats rápidas */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Proyectos activos', value: activeCount.toString(), icon: Zap },
          { label: 'TIR promedio', value: '12,9%', icon: TrendingUp },
          { label: 'Capital en proyectos', value: '$2.015M', icon: Shield },
          { label: 'Blockchain', value: 'Algorand', icon: Clock },
        ].map((s) => (
          <div key={s.label} className="p-3 rounded-xl border border-border bg-card flex items-center gap-3">
            <s.icon className="w-4 h-4 text-primary shrink-0" />
            <div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
              <div className="text-sm font-semibold text-foreground">{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div className="flex gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={`text-xs px-4 py-2 rounded-lg border transition-all duration-150 ${
              activeFilter === f.value
                ? 'bg-primary text-primary-foreground border-primary font-medium'
                : 'border-border text-muted-foreground hover:text-foreground hover:border-primary/40 bg-card'
            }`}
          >
            {f.label}
          </button>
        ))}
        <span className="ml-auto text-xs text-muted-foreground self-center">
          {filtered.length} proyectos
        </span>
      </div>

      {/* Grid de proyectos */}
      <div className="grid grid-cols-3 gap-4">
        {filtered.map((project) => {
          const progreso = project.totalTokens > 0 ? Math.round((project.soldTokens / project.totalTokens) * 100) : 0
          const statusLabel = project.active ? (progreso >= 100 ? 'Financiado' : 'Activo') : 'Próximamente'
          const statusColor = project.active ? (progreso >= 100 ? 'bg-blue-500' : 'bg-emerald-500') : 'bg-amber-500'
          const riesgo = getRiesgo(project.type)

          return (
            <div
              key={project.id}
              className="group rounded-xl border border-border bg-card overflow-hidden hover:border-primary/40 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5"
            >
              {/* Card header con gradiente */}
              <div className={`h-24 bg-linear-to-br ${getGradient(project.type, project.id)} relative flex items-end p-4`}>
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <span className="text-[10px] bg-black/30 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
                    Algorand
                  </span>
                  <span className={`w-2 h-2 rounded-full ${statusColor}`} />
                </div>
                <div>
                  <div className="text-xs font-medium text-foreground/80">{typeLabels[project.type]}</div>
                  <h3 className="text-sm font-semibold text-foreground leading-tight">{project.name}</h3>
                </div>
              </div>

              {/* Card body */}
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{project.location}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${riesgoColor[riesgo]}`}>
                    Riesgo {riesgo}
                  </span>
                </div>

                {/* Métricas */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-muted/50 rounded-lg p-2">
                    <div className="text-sm font-bold text-primary">{project.tir}%</div>
                    <div className="text-[10px] text-muted-foreground">TIR</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-2">
                    <div className="text-sm font-bold text-foreground">{project.durationYears} años</div>
                    <div className="text-[10px] text-muted-foreground">Plazo</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-2">
                    <div className="text-sm font-bold text-foreground">
                      ${(project.minAmount / 1000).toFixed(0)}K
                    </div>
                    <div className="text-[10px] text-muted-foreground">Mín.</div>
                  </div>
                </div>

                {/* Progreso de financiamiento */}
                {project.active ? (
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-muted-foreground">Financiamiento</span>
                      <span className="font-semibold text-foreground">{progreso}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${progreso}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-muted-foreground">
                      <span>{project.soldTokens} tokens</span>
                      <span>Objetivo {project.totalTokens}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-2 text-xs text-muted-foreground border border-dashed border-border rounded-lg">
                    Apertura próximamente
                  </div>
                )}

                {/* CTA */}
                <button
                  disabled={!project.active}
                  className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all duration-150 ${
                    !project.active
                      ? 'bg-muted text-muted-foreground cursor-not-allowed'
                      : 'bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground group-hover:bg-primary group-hover:text-primary-foreground'
                  }`}
                >
                  {!project.active ? 'Notificarme' : 'Invertir ahora'}
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer informativo */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground bg-card border border-border rounded-xl p-4">
        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
        Las rentabilidades mostradas son estimaciones. Toda inversión conlleva riesgos.
        PropMetrics opera bajo la Ley Fintech chilena (NCG 502 CMF).
      </div>

    </div>
  )
}
