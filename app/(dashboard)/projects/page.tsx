const projects = [
  {
    name: 'Edificio Alameda Centro',
    location: 'Santiago Centro',
    type: 'Token Renta',
    typeColor: 'bg-emerald-100 text-emerald-700',
    capRate: '5,8%',
    tir: '11,2%',
    plazo: '5 años',
    min: '$100.000',
    progress: 78,
    emoji: '🏢',
    bg: 'bg-emerald-50',
  },
  {
    name: 'Las Condes IV',
    location: 'Las Condes',
    type: 'Token Desarrollo',
    typeColor: 'bg-blue-100 text-blue-700',
    capRate: '7,1%',
    tir: '14,8%',
    plazo: '3 años',
    min: '$500.000',
    progress: 85,
    emoji: '🏗️',
    bg: 'bg-blue-50',
  },
  {
    name: 'Torre Providencia',
    location: 'Providencia',
    type: 'Socio Preferente',
    typeColor: 'bg-amber-100 text-amber-700',
    capRate: '6,3%',
    tir: '12,5%',
    plazo: '4 años',
    min: '$200.000',
    progress: 42,
    emoji: '🏛️',
    bg: 'bg-amber-50',
  },
]

export default function ProjectsPage() {
  return (
    <div className="space-y-6">

      {/* Título */}
      <div>
        <h1 className="text-xl font-semibold text-foreground">Proyectos</h1>
        <p className="text-sm text-muted-foreground">Marketplace de proyectos disponibles</p>
      </div>

      {/* Filtros */}
      <div className="flex items-center gap-3">
        <select className="text-sm px-3 py-1.5 rounded-lg border border-border bg-background text-foreground">
          <option>Todos los tipos</option>
          <option>Token Renta</option>
          <option>Token Desarrollo</option>
          <option>Socio Preferente</option>
        </select>
        <select className="text-sm px-3 py-1.5 rounded-lg border border-border bg-background text-foreground">
          <option>Mayor rentabilidad</option>
          <option>Menor riesgo</option>
          <option>Más reciente</option>
        </select>
        <span className="text-xs text-muted-foreground ml-auto">{projects.length} proyectos disponibles</span>
      </div>

      {/* Grid de proyectos */}
      <div className="grid grid-cols-3 gap-5">
        {projects.map((project) => (
          <div key={project.name} className="rounded-xl border border-border bg-card overflow-hidden">
            <div className={`h-24 flex items-center justify-center text-4xl ${project.bg}`}>
              {project.emoji}
            </div>
            <div className="p-4">
              <div className="font-semibold text-sm text-foreground mb-0.5">{project.name}</div>
              <div className="text-xs text-muted-foreground mb-3">{project.location}</div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${project.typeColor}`}>
                {project.type}
              </span>
              <div className="grid grid-cols-2 gap-2 mt-3">
                {[
                  { label: 'Cap Rate', value: project.capRate },
                  { label: 'TIR', value: project.tir },
                  { label: 'Plazo', value: project.plazo },
                  { label: 'Mínimo', value: project.min },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                    <div className="text-xs font-semibold text-foreground">{stat.value}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground mt-1">{project.progress}% financiado</div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}