import { Outlet, createRootRoute, useRouterState } from '@tanstack/react-router'

import '../styles.css'
import { Footer } from '#/components/footer'
import { NavBar } from '#/components/common/nav-bar'
import { AuthProvider } from '#/context/auth.context'
import { DataSourceProvider } from '#/context/data-source.context'
import { ConvexBetterAuthProvider } from '@convex-dev/better-auth/react'
import { ConvexReactClient } from 'convex/react'
import { authClient } from '#/lib/auth-client'
import { ToastProvider } from '#/context/toast.context'

export const Route = createRootRoute({
  component: RootComponent,
})

const convex = new ConvexReactClient(
  import.meta.env.VITE_CONVEX_URL as string,
  {
    expectAuth: true,
  },
)

function RootComponent() {
  const hideChrome = useRouterState({
    select: (state) =>
      state.matches.some((match) => match.routeId.startsWith('/(auth)')),
  })

  return (
    <ConvexBetterAuthProvider client={convex} authClient={authClient as any}>
      <AuthProvider>
        <DataSourceProvider>
          <ToastProvider>
            <main className="root w-full min-h-dvh flex flex-col">
              {!hideChrome && <NavBar />}

              <div className="w-full flex-1 flex flex-col min-h-0 short:min-h-auto">
                <Outlet />
              </div>

              {!hideChrome && <Footer />}
            </main>
          </ToastProvider>
        </DataSourceProvider>
      </AuthProvider>
    </ConvexBetterAuthProvider>
  )
}
