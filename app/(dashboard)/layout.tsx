import Link from 'next/link'
import {
  LayoutDashboard,
  Building2,
  Calculator,
  Bot,
  Bell
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
    <div className="flex min-h-screen bg-background">

      {/* Sidebar */}
      <aside className="w-56 border-r border-border flex flex-col py-6 px-4 gap-1">
        <div className="flex items-center gap-2 px-2 mb-6">
          <div className="w-7 h-7 bg-emerald-600 rounded-md flex items-center justify-center">
            <span className="text-white text-xs font-bold">PM</span>
          </div>
          <span className="font-semibold text-sm text-foreground">PropMetrics</span>
        </div>

        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </Link>
        ))}
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1">

        {/* Header */}
        <header className="flex items-center justify-between px-6 py-3 border-b border-border">
          <div className="text-sm text-muted-foreground">
            Bienvenido a PropMetrics
          </div>
          <div className="flex items-center gap-3">
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="w-4 h-4" />
            </button>
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