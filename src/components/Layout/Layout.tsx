import { Link } from '@tanstack/react-router'
import { IconVolume, IconPlus } from '@tabler/icons-react'

const NAV_ROUTES = [
  {
    to: '/',
    label: 'All noises',
    icon: IconVolume,
  },
  {
    to: '/add',
    label: 'Add a noise',
    icon: IconPlus,
  },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white shadow-md">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold">Noisy</h1>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-64 bg-gray-100 border-r border-gray-200">
          <nav className="p-4">
            <ul className="space-y-2">
              {NAV_ROUTES.map((route) => {
                const Icon = route.icon

                return (
                  <li key={route.to}>
                    <Link
                      to={route.to}
                      className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                      activeProps={{
                        className: 'bg-gray-200 font-semibold',
                      }}
                    >
                      <Icon size={20} />
                      {route.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
