import { useLiveQuery } from 'dexie-react-hooks'

import { db } from '#/db/index'
import { useDataSource } from '#/context/data-source.context'
import {
  useRemoteResume,
  useRemoteResumes,
} from '#/data/repository/remote-repository'
import type { ResumeMetadata } from '#/types/db.type'
import type { Resume } from '#/types/repository.type'

// A reactive list of all resumes from the active data source.
export function useResumes(): ResumeMetadata[] | undefined {
  const { isOnline } = useDataSource()

  const local = useLiveQuery(
    () =>
      isOnline
        ? []
        : db.resumeMetadata.orderBy('updated_at').reverse().toArray(),
    [isOnline],
  )
  const remote = useRemoteResumes(isOnline)

  return isOnline ? remote : local
}

// A reactive single resume (metadata + data) from the active data source.
export function useResume(id: string): Resume | null | undefined {
  const { isOnline } = useDataSource()

  const local = useLiveQuery(async () => {
    if (isOnline) return undefined

    const metadata = await db.resumeMetadata.get(id)
    if (!metadata) return null

    const dataSource = await db.resumeDataSource.get(metadata.data_source_id)
    if (!dataSource) return null

    return { ...metadata, data: dataSource.data }
  }, [isOnline, id])
  const remote = useRemoteResume(id, isOnline)

  return isOnline ? remote : local
}
