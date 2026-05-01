import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { TrendingUp, Shield, BarChart3, Bot, ChevronRight, Zap } from 'lucide-react'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30">
      
      {/* Navbar Premium */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-border bg-background/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
            <TrendingUp className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg tracking-tight text-foreground">PropMetrics</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/sign-in" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Iniciar sesión
          </Link>
          <Link href="/sign-up">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-5 shadow-lg shadow-primary/20">
              Comenzar gratis
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-8 pt-32 pb-24 overflow-hidden mesh-bg min-h-[85vh]">
        
        {/* Badge superior */}
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-8 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Zap className="w-3.5 h-3.5" />
          <span>Diseñado para inversores de Reity y plataformas tokenizadas</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight max-w-4xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
          Analiza tu portfolio <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
            con precisión institucional
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          PropMetrics centraliza el análisis de tus tokens inmobiliarios, simula rentabilidades en tiempo real y te asiste con IA financiera.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
          <Link href="/sign-up">
            <Button size="lg" className="h-12 px-8 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/20 group">
              Acceder al Dashboard
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/portfolio">
            <Button variant="outline" size="lg" className="h-12 px-8 text-base font-medium border-border hover:bg-muted/50 bg-background/50 backdrop-blur-sm">
              Ver Demo en Vivo
            </Button>
          </Link>
        </div>

        {/* Floating Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl animate-in fade-in duration-1000 delay-500">
          {[
            { label: 'Volumen Analizado', value: '$5.4B+' },
            { label: 'Proyectos Indexados', value: '40+' },
            { label: 'Precisión de IA', value: '99.9%' },
            { label: 'Actualización', value: 'Tiempo Real' }
          ].map((stat, i) => (
            <div key={i} className="glass rounded-2xl p-5 flex flex-col items-center justify-center">
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1 tabular-nums">{stat.value}</div>
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-8 bg-background relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">La ventaja competitiva para tu capital</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              No dejes tus decisiones financieras al azar. Utiliza las mismas herramientas que los fondos de inversión institucionales.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="glass rounded-2xl p-8 hover:bg-card/50 transition-colors relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity group-hover:bg-primary/20"></div>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 border border-primary/20">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Analytics Avanzado</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Visualiza el rendimiento real de tu portfolio. Calcula TIR exacta, cap rates y proyecta dividendos con gráficos interactivos.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass rounded-2xl p-8 hover:bg-card/50 transition-colors relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity group-hover:bg-blue-500/20"></div>
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 border border-blue-500/20">
                <Shield className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Simulador de Riesgo</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Modela diferentes escenarios antes de invertir. Ajusta plazos, plusvalías y compara Tokens de Renta vs Desarrollo.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass rounded-2xl p-8 hover:bg-card/50 transition-colors relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity group-hover:bg-amber-500/20"></div>
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6 border border-amber-500/20">
                <Bot className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Asistente IA Financiero</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Consultas en lenguaje natural. Nuestro modelo LLM especializado en tokenización responde dudas sobre proyectos y regulaciones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">Toma el control de tus inversiones tokenizadas</h2>
          <p className="text-lg text-muted-foreground mb-10">
            Únete a la nueva era de inversión inmobiliaria. Analiza como profesional, invierte con seguridad.
          </p>
          <Link href="/sign-up">
            <Button size="lg" className="h-14 px-10 text-lg font-bold bg-foreground text-background hover:bg-foreground/90 shadow-xl">
              Crear cuenta gratuita
            </Button>
          </Link>
          <p className="mt-6 text-xs text-muted-foreground">
            Compatible con proyectos listados en Reity bajo normativa CMF NCG 502.
          </p>
        </div>
      </section>

      {/* Footer minimalista */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground bg-background">
        <p>© 2026 PropMetrics. Construido para revolucionar la tokenización inmobiliaria.</p>
      </footer>
    </main>
  )
}