import { TrendingUp, Shield, BarChart3 } from 'lucide-react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      
      {/* Left Panel: Branding & Value Prop */}
      <div className="hidden lg:flex flex-col flex-1 bg-card/50 border-r border-border mesh-bg relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[20%] left-[20%] w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-[20%] right-[20%] w-72 h-72 bg-blue-500/20 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 flex flex-col justify-between h-full p-12 lg:p-20">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <span className="font-bold text-xl text-foreground tracking-tight">PropMetrics</span>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Fintech SaaS</div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="space-y-8 max-w-md">
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight">
              La evolución de la inversión <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-emerald-400">inmobiliaria</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Analiza, simula y optimiza tu portfolio de activos tokenizados con inteligencia artificial e información de mercado en tiempo real.
            </p>

            {/* Features */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-sm text-foreground/80">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-primary" />
                </div>
                <span>Métricas avanzadas de Cap Rate y TIR en tiempo real</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground/80">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <span>Plataforma regulada e integrada con Blockchain</span>
              </div>
            </div>
          </div>

          {/* Footer Left */}
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} PropMetrics. Todos los derechos reservados.
          </div>
        </div>
      </div>

      {/* Right Panel: Auth Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 relative bg-background">
        
        {/* Mobile Logo (Visible only on small screens) */}
        <div className="absolute top-8 left-8 lg:hidden flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/30">
            <TrendingUp className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-foreground">PropMetrics</span>
        </div>

        {/* Clerk Form Container */}
        <div className="w-full max-w-md">
          {children}
        </div>
        
      </div>
    </div>
  )
}
