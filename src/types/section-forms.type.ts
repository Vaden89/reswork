import type { ResumeDispatch } from '#/hooks/use-resume-data'
import type {
  Education,
  Link,
  Project,
  TemplateData,
  WorkExperience,
} from './template.type'

export interface FormProps {
  resumeData: TemplateData
  dispatch: ResumeDispatch
}

export type SectionFormAction =
  | { type: 'ADD_WORK_EXPERIENCE' }
  | { type: 'ADD_WORK_RESPONSIBILITY'; index: number }
  | { type: 'REMOVE_WORK_EXPERIENCE'; index: number }
  | {
      type: 'REMOVE_WORK_RESPONSIBILITY'
      workExpIndex: number
      resIndex: number
    }
  | {
      type: 'UPDATE_WORK_RESPONSIBILITY'
      workExpIndex: number
      resIndex: number
      value: string
    }
  | { type: 'REMOVE_EDUCATION'; index: number }
  | { type: 'ADD_EDUCATION' }
  | {
      type: 'UPDATE_EDUCATION'
      index: number
      field: keyof Education
      value: string
    }
  | {
      type: 'UPDATE_WORK_EXPERIENCE'
      index: number
      field: keyof WorkExperience
      value: string
    }
  | { type: 'ADD_PROJECT' }
  | { type: 'REMOVE_PROJECT'; index: number }
  | {
      type: 'UPDATE_PROJECT'
      index: number
      field: keyof Project
      value: string
    }
  | { type: 'ADD_TECHNOLOGY'; index: number }
  | { type: 'REMOVE_TECHNOLOGY'; projIndex: number; techIndex: number }
  | {
      type: 'UPDATE_TECHNOLOGY'
      projIndex: number
      techIndex: number
      value: string
    }
  | { type: 'ADD_SKILL' }
  | { type: 'REMOVE_SKILL'; index: number }
  | { type: 'UPDATE_SKILL_NAME'; index: number; value: string }
  | { type: 'ADD_SUB_SKILL'; index: number }
  | { type: 'REMOVE_SUB_SKILL'; skillIndex: number; subSkillIndex: number }
  | {
      type: 'UPDATE_SUB_SKILL'
      skillIndex: number
      subSkillIndex: number
      value: string
    }
  | { type: 'ADD_LINK' }
  | { type: 'REMOVE_LINK'; index: number }
  | { type: 'UPDATE_LINK'; index: number; value: string; field: keyof Link }
  | { type: 'BASIC_UPDATE'; key: keyof TemplateData; value: string }
  | { type: 'SET_RESUME_DATA'; data: TemplateData }
