import type { TemplateData } from '#/components/templates/template-1'
import { useState } from 'react'

export type SetField = <T extends keyof TemplateData>(
  key: T,
  value: TemplateData[T],
) => void

const defaultData: TemplateData = {
  first_name: '',
  last_name: '',
  state: '',
  country: '',
  location: '',
  email: '',
  phone: '',
  website: '',
  profession: '',
  skills: [],
  workExperience: [],
  projects: [],
  education: [],
}

export function useResumeData() {
  const [resumeData, setResumeData] = useState<TemplateData>(defaultData)

  const setField: SetField = (key, value) => {
    setResumeData((prev) => ({ ...prev, [key]: value }))
  }

  return { resumeData, setField }
}
