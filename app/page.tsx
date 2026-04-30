import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">PM</span>
          </div>
          <span className="font-semibold text-foreground">PropMetrics</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/sign-in">
            <Button variant="ghost" size="sm">Iniciar sesión</Button>
          </Link>
          <Link href="/sign-up">
            <Button size="sm">Comenzar gratis</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-8 py-24 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-medium px-3 py-1 rounded-full mb-6 border border-emerald-200 dark:border-emerald-800">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
          Plataforma SaaS para inversión inmobiliaria tokenizada
        </div>
        <h1 className="text-5xl font-semibold text-foreground mb-6 leading-tight">
          Analiza, simula y optimiza<br />
          <span className="text-emerald-600">tus inversiones inmobiliarias</span>
        </h1>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl">
          PropMetrics centraliza el análisis de proyectos tokenizados, simula rentabilidad en tiempo real y automatiza alertas para que tomes mejores decisiones de inversión.
        </p>
        <div className="flex items-center gap-4">
          <Link href="/sign-up">
            <Button size="lg">Comenzar gratis →</Button>
          </Link>
          <Link href="/sign-in">
            <Button variant="outline" size="lg">Ver demo</Button>
          </Link>
        </div>
      </section>

      {/* Métricas */}
      <section className="grid grid-cols-3 gap-6 max-w-3xl mx-auto px-8 pb-24">
        <div className="text-center p-6 rounded-xl border border-border bg-card">
          <div className="text-3xl font-semibold text-foreground mb-1">+12%</div>
          <div className="text-sm text-muted-foreground">TIR promedio anual</div>
        </div>
        <div className="text-center p-6 rounded-xl border border-border bg-card">
          <div className="text-3xl font-semibold text-foreground mb-1">6</div>
          <div className="text-sm text-muted-foreground">Tipos de análisis</div>
        </div>
        <div className="text-center p-6 rounded-xl border border-border bg-card">
          <div className="text-3xl font-semibold text-foreground mb-1">100%</div>
          <div className="text-sm text-muted-foreground">Multi-tenant</div>
        </div>
      </section>

    </main>
  )
}