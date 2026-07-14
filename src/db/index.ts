import Dexie from 'dexie'
import type { EntityTable } from 'dexie'
import type { ResumeDataSource, ResumeMetadata } from '#/types/db.type'

const db = new Dexie('localstore') as Dexie & {
  resumeMetadata: EntityTable<ResumeMetadata, 'id'>
  resumeDataSource: EntityTable<ResumeDataSource, 'id'>
}

db.version(1).stores({
  resumeMetadata:
    'id, title, template_id, data_source_id, created_at, updated_at',
  resumeDataSource: 'id, created_at, updated_at',
})

export { db }
