import { Outlet, createRootRoute } from '@tanstack/react-router'

import '../styles.css'
import { Footer } from '#/components/footer'
import { NavBar } from '#/components/common/nav-bar'
import { AuthProvider } from '#/context/auth.context'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <AuthProvider>
      <main className="w-full min-h-dvh flex flex-col">
        <NavBar />
        <div className="w-full flex-1 flex flex-col min-h-0">
          <Outlet />
        </div>
        <Footer />
      </main>
    </AuthProvider>
  )
}
