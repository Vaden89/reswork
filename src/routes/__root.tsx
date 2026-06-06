import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import '../styles.css'
import { Footer } from '#/components/footer'
import { AuthProvider } from '#/context/auth.context'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <AuthProvider>
      <main className="w-full min-h-dvh flex flex-col">
        <div className="w-full flex-1">
          <Outlet />
        </div>
        <Footer />
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'TanStack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
      </main>
    </AuthProvider>
  )
}
