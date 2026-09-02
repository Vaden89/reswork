import type { TemplateData } from './template.type'

export interface ResumeMetadata {
  id: string
  title: string
  template_id: string
  data_source_id: string
  created_at: Date
  updated_at: Date
  // Snapshot of the first page of the rendered resume, shown on the resumes
  // page. Stored as a Blob locally; a URL will back this on the remote source.
  preview?: Blob
}

export interface ResumeDataSource {
  id: string
  data: TemplateData
  created_at: Date
  updated_at: Date
}
