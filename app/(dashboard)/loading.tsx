export default function DashboardLoading() {
  return (
    <div className="flex flex-1 items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-2 border-white/5" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-emerald-500 animate-spin" />
        </div>
        <p className="text-xs text-zinc-500 tracking-widest uppercase">Cargando datos...</p>
      </div>
    </div>
  )
}
