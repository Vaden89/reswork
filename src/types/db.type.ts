import type { TemplateData } from './template.type'

export interface ResumeMetadata {
  id: string
  title: string
  template_id: string
  data_source_id: string
  created_at: Date
  updated_at: Date
  preview?: Blob
}

export interface ResumeDataSource {
  id: string
  data: TemplateData
  created_at: Date
  updated_at: Date
}
