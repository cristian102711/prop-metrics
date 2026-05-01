import Link from 'next/link'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import {
  LayoutDashboard,
  Building2,
  Calculator,
  Bot,
  Bell,
  TrendingUp,
} from 'lucide-react'

const navItems = [
  { href: '/portfolio', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/projects', label: 'Proyectos', icon: Building2 },
  { href: '/simulator', label: 'Simulador', icon: Calculator },
  { href: '/assistant', label: 'Asistente IA', icon: Bot },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background mesh-bg">

      {/* Sidebar */}
      <aside className="w-56 border-r border-border flex flex-col py-6 px-3 gap-1 bg-sidebar/80 backdrop-blur-sm">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-3 mb-6">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/30">
            <TrendingUp className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <span className="font-semibold text-sm text-foreground">PropMetrics</span>
            <div className="text-[10px] text-muted-foreground leading-none">Fintech SaaS</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-0.5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-150 group"
            >
              <item.icon className="w-4 h-4 group-hover:text-primary transition-colors" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer sidebar */}
        <div className="mt-auto px-3">
          <div className="text-[10px] text-muted-foreground/60 text-center">
            Powered by Groq · n8n · Algorand
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* Header */}
        <header className="flex items-center justify-between px-6 py-3 border-b border-border bg-background/60 backdrop-blur-sm sticky top-0 z-10">
          <div className="text-sm text-muted-foreground">
            Plataforma de inversión tokenizada · <span className="text-primary font-medium">Blockchain Algorand</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative w-8 h-8 flex items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-primary rounded-full" />
            </button>
            <ThemeToggle />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>

      </div>
    </div>
  )
}