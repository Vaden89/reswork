import { createContext, useContext, useEffect, useRef } from 'react'

import { useAuth } from './auth.context'
import { localRepository } from '#/db/local-repository'
import { remoteRepository } from '#/data/repository/remote-repository'
import { migrateLocalToRemote } from '#/data/repository/migrate'
import type { ReactNode } from 'react'
import type { ResumeRepository } from '#/types/repository.type'

type DataSourceContextValue = {
  /** True when the active source is the online (Convex) backend. */
  isOnline: boolean
  /** The active repository — Dexie when offline, Convex when online. */
  repository: ResumeRepository
}

const DataSourceContext = createContext<DataSourceContextValue | null>(null)

export function DataSourceProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const isOnline = user?.type === 'authenticated'
  const repository = isOnline ? remoteRepository : localRepository

  const wasOnline = useRef(isOnline)
  useEffect(() => {
    if (isOnline && !wasOnline.current) {
      migrateLocalToRemote(localRepository, remoteRepository).catch((error) => {
        console.error('Failed to migrate local resumes to the cloud', error)
      })
    }
    wasOnline.current = isOnline
  }, [isOnline])

  return (
    <DataSourceContext.Provider value={{ isOnline, repository }}>
      {children}
    </DataSourceContext.Provider>
  )
}

export function useDataSource(): DataSourceContextValue {
  const ctx = useContext(DataSourceContext)
  if (!ctx)
    throw new Error('useDataSource must be used within a DataSourceProvider!!!')
  return ctx
}
