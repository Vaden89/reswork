import type { SetField } from '#/hooks/use-resume-data'
import type { TemplateData } from './template.type'

export interface FormProps {
  resumeData: TemplateData
  setField: SetField
}
