import { Outlet, createRootRoute } from '@tanstack/react-router'

import '../styles.css'
import { Footer } from '#/components/footer'
import { NavBar } from '#/components/common/nav-bar'
import { AuthProvider } from '#/context/auth.context'
import { DataSourceProvider } from '#/context/data-source.context'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <AuthProvider>
      <DataSourceProvider>
        <main className="root w-full min-h-dvh flex flex-col">
          <NavBar />
          <div className="w-full flex-1 flex flex-col min-h-0 short:min-h-auto">
            <Outlet />
          </div>
          <Footer />
        </main>
      </DataSourceProvider>
    </AuthProvider>
  )
}
