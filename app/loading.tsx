export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      {/* Logo animado */}
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          {/* Anillo exterior pulsante */}
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
          {/* Anillo medio */}
          <div className="absolute inset-1 rounded-full border border-emerald-500/30 animate-spin" style={{ animationDuration: '3s' }} />
          {/* Icono central */}
          <div className="relative w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center">
            <svg
              className="w-7 h-7 text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
            </svg>
          </div>
        </div>

        {/* Brand */}
        <div className="text-center space-y-1">
          <p className="text-sm font-semibold tracking-widest text-emerald-400 uppercase">PropMetrics</p>
          {/* Barra de progreso animada */}
          <div className="w-40 h-0.5 bg-white/5 rounded-full overflow-hidden mt-3">
            <div className="h-full bg-emerald-500 rounded-full animate-loading-bar" />
          </div>
        </div>
      </div>
    </div>
  )
}
