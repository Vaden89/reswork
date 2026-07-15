import {
  EMPTY_EDUCATION,
  EMPTY_EXPERIENCE,
  EMPTY_LINK,
  EMPTY_PROJECT,
  EMPTY_SKILL,
  EMPTY_TEMPLATE_DATA,
} from '#/data/constants/form-defaults'
import { useReducer } from 'react'
import type { Dispatch } from 'react'
import type { TemplateData } from '#/types/template.type'
import type { SectionFormAction } from '#/types/section-forms.type'

export type ResumeDispatch = Dispatch<SectionFormAction>

export function useResumeData(initialData: TemplateData = EMPTY_TEMPLATE_DATA) {
  const [resumeData, dispatch] = useReducer<TemplateData, [SectionFormAction]>(
    resumeDataReducer,
    initialData,
  )
  return { resumeData, dispatch }
}

const resumeDataReducer = (
  state: TemplateData,
  action: SectionFormAction,
): TemplateData => {
  switch (action.type) {
    case 'ADD_EDUCATION':
      return {
        ...state,
        education: [{ ...EMPTY_EDUCATION }, ...state.education],
      }
    case 'REMOVE_EDUCATION':
      return {
        ...state,
        education: state.education.filter((_, i) => i !== action.index),
      }
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        education: state.education.map((item, i) =>
          i === action.index ? { ...item, [action.field]: action.value } : item,
        ),
      }
    case 'ADD_WORK_EXPERIENCE':
      return {
        ...state,
        workExperience: [
          { ...EMPTY_EXPERIENCE, responsibilities: [''] },
          ...state.workExperience,
        ],
      }
    case 'REMOVE_WORK_EXPERIENCE':
      return {
        ...state,
        workExperience: state.workExperience.filter(
          (_, i) => i !== action.index,
        ),
      }
    case 'UPDATE_WORK_EXPERIENCE':
      return {
        ...state,
        workExperience: state.workExperience.map((item, i) =>
          i === action.index ? { ...item, [action.field]: action.value } : item,
        ),
      }
    case 'ADD_WORK_RESPONSIBILITY':
      return {
        ...state,
        workExperience: state.workExperience.map((item, i) =>
          i === action.index
            ? { ...item, responsibilities: [...item.responsibilities, ''] }
            : item,
        ),
      }
    case 'REMOVE_WORK_RESPONSIBILITY':
      return {
        ...state,
        workExperience: state.workExperience.map((item, i) =>
          i === action.workExpIndex
            ? {
                ...item,
                responsibilities: item.responsibilities.filter(
                  (_, j) => j !== action.resIndex,
                ),
              }
            : item,
        ),
      }
    case 'UPDATE_WORK_RESPONSIBILITY':
      return {
        ...state,
        workExperience: state.workExperience.map((item, i) =>
          i === action.workExpIndex
            ? {
                ...item,
                responsibilities: item.responsibilities.map((resp, j) =>
                  j === action.resIndex ? action.value : resp,
                ),
              }
            : item,
        ),
      }
    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, { ...EMPTY_PROJECT, technologies: [''] }],
      }
    case 'REMOVE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter((_, i) => i !== action.index),
      }
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map((item, i) =>
          i === action.index ? { ...item, [action.field]: action.value } : item,
        ),
      }
    case 'ADD_TECHNOLOGY':
      return {
        ...state,
        projects: state.projects.map((item, i) =>
          i === action.index
            ? { ...item, technologies: [...item.technologies, ''] }
            : item,
        ),
      }
    case 'REMOVE_TECHNOLOGY':
      return {
        ...state,
        projects: state.projects.map((item, i) =>
          i === action.projIndex
            ? {
                ...item,
                technologies: item.technologies.filter(
                  (_, j) => j !== action.techIndex,
                ),
              }
            : item,
        ),
      }
    case 'UPDATE_TECHNOLOGY':
      return {
        ...state,
        projects: state.projects.map((item, i) =>
          i === action.projIndex
            ? {
                ...item,
                technologies: item.technologies.map((tech, j) =>
                  j === action.techIndex ? action.value : tech,
                ),
              }
            : item,
        ),
      }
    case 'ADD_SKILL':
      return {
        ...state,
        skills: [{ ...EMPTY_SKILL, sub_skills: [''] }, ...state.skills],
      }
    case 'REMOVE_SKILL':
      return {
        ...state,
        skills: state.skills.filter((_, i) => i !== action.index),
      }
    case 'UPDATE_SKILL_NAME':
      return {
        ...state,
        skills: state.skills.map((item, i) =>
          i === action.index ? { ...item, skill_name: action.value } : item,
        ),
      }
    case 'ADD_SUB_SKILL':
      return {
        ...state,
        skills: state.skills.map((item, i) =>
          i === action.index
            ? { ...item, sub_skills: [...item.sub_skills, ''] }
            : item,
        ),
      }
    case 'REMOVE_SUB_SKILL':
      return {
        ...state,
        skills: state.skills.map((item, i) =>
          i === action.skillIndex
            ? {
                ...item,
                sub_skills: item.sub_skills.filter(
                  (_, j) => j !== action.subSkillIndex,
                ),
              }
            : item,
        ),
      }
    case 'UPDATE_SUB_SKILL':
      return {
        ...state,
        skills: state.skills.map((item, i) =>
          i === action.skillIndex
            ? {
                ...item,
                sub_skills: item.sub_skills.map((subSkill, j) =>
                  j === action.subSkillIndex ? action.value : subSkill,
                ),
              }
            : item,
        ),
      }
    case 'ADD_LINK':
      return {
        ...state,
        links: [...state.links, { ...EMPTY_LINK }],
      }
    case 'REMOVE_LINK':
      return {
        ...state,
        links: state.links.filter((_, i) => i !== action.index),
      }
    case 'UPDATE_LINK':
      return {
        ...state,
        links: state.links.map((item, i) =>
          i === action.index ? { ...item, [action.field]: action.value } : item,
        ),
      }
    case 'BASIC_UPDATE':
      return {
        ...state,
        [action.key]: action.value,
      }
    case 'SET_RESUME_DATA':
      return action.data
    default:
      return state
  }
}
