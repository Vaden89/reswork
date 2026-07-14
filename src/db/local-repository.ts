import { db } from './index'
import { EMPTY_TEMPLATE_DATA } from '#/data/constants/form-defaults'
import type { TemplateData } from '#/types/template.type'
import type { ResumeMetadata } from '#/types/db.type'
import type {
  CreateResumeOptions,
  Resume,
  ResumeRepository,
} from '#/types/repository.type'

export const localRepository: ResumeRepository = {
  async listResumes(): Promise<ResumeMetadata[]> {
    return db.resumeMetadata.orderBy('updated_at').reverse().toArray()
  },

  async getResume(id: string): Promise<Resume | null> {
    const metadata = await db.resumeMetadata.get(id)
    if (!metadata) return null

    const dataSource = await db.resumeDataSource.get(metadata.data_source_id)

    return { ...metadata, data: dataSource?.data ?? EMPTY_TEMPLATE_DATA }
  },

  async createResume(options: CreateResumeOptions): Promise<string> {
    return db.transaction(
      'rw',
      db.resumeMetadata,
      db.resumeDataSource,
      async () => {
        const now = new Date()
        const data_source_id = crypto.randomUUID()

        await db.resumeDataSource.add({
          id: data_source_id,
          data: EMPTY_TEMPLATE_DATA,
          created_at: now,
          updated_at: now,
        })

        return db.resumeMetadata.add({
          id: crypto.randomUUID(),
          title: options.title,
          template_id: options.template_id,
          data_source_id,
          created_at: now,
          updated_at: now,
        })
      },
    )
  },

  async updateResumeData(id: string, data: TemplateData): Promise<void> {
    await db.transaction(
      'rw',
      db.resumeMetadata,
      db.resumeDataSource,
      async () => {
        const metadata = await db.resumeMetadata.get(id)
        if (!metadata) return

        const now = new Date()
        await db.resumeDataSource.update(metadata.data_source_id, {
          data,
          updated_at: now,
        })
        await db.resumeMetadata.update(id, { updated_at: now })
      },
    )
  },

  async renameResume(id: string, title: string): Promise<void> {
    await db.resumeMetadata.update(id, { title, updated_at: new Date() })
  },

  async deleteResume(id: string): Promise<void> {
    await db.transaction(
      'rw',
      db.resumeMetadata,
      db.resumeDataSource,
      async () => {
        const metadata = await db.resumeMetadata.get(id)
        if (!metadata) return

        await db.resumeDataSource.delete(metadata.data_source_id)
        await db.resumeMetadata.delete(id)
      },
    )
  },
}
