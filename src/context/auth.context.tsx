import { createContext, useContext, useEffect, useState } from 'react'

import { authClient } from '#/lib/auth-client'
import type { ReactNode } from 'react'
import type { User } from '#/types/user.type'

const GUEST_ID_KEY = 'guest_id'

function resolveGuestUser(): User {
  let id = localStorage.getItem(GUEST_ID_KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(GUEST_ID_KEY, id)
  }
  return { id, type: 'guest' }
}

type AuthContextValue = {
  user: User | null
  isLoading: boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending } = authClient.useSession()
  const [guestUser, setGuestUser] = useState<User | null>(null)

  useEffect(() => {
    setGuestUser(resolveGuestUser())
  }, [])

  const user = session?.user
    ? { id: session.user.id, type: 'authenticated' as const }
    : guestUser

  return (
    <AuthContext.Provider value={{ user: user, isLoading: isPending }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider!!!')
  return ctx
}
