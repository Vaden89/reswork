import type { ResumeMetadata } from './db.type'
import type { TemplateData } from './template.type'

export type Resume = ResumeMetadata & { data: TemplateData }

export type CreateResumeOptions = Omit<
  ResumeMetadata,
  'id' | 'created_at' | 'updated_at' | 'data_source_id'
>

export interface ResumeRepository {
  listResumes: () => Promise<ResumeMetadata[]>
  getResume: (id: string) => Promise<Resume | null>
  createResume: (options: CreateResumeOptions) => Promise<string>
  updateResumeData: (id: string, data: TemplateData) => Promise<void>
  renameResume: (id: string, title: string) => Promise<void>
  deleteResume: (id: string) => Promise<void>
}
