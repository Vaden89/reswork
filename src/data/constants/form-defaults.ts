import type {
  Education,
  Link,
  Project,
  TemplateData,
  WorkExperience,
} from '#/types/template.type'

export const EMPTY_TEMPLATE_DATA: TemplateData = {
  first_name: '',
  last_name: '',
  location: '',
  email: '',
  phone: '',
  links: [],
  profession: '',
  skills: [],
  workExperience: [],
  projects: [],
  education: [],
}

export const EMPTY_EDUCATION: Education = {
  course: '',
  degree_type: '',
  end_date: '',
  gpa: '',
  location: '',
  school: '',
  start_date: '',
}

export const MAX_LINKS = 3

export const EMPTY_LINK: Link = { label: '', url: '' }

export const EMPTY_PROJECT: Project = {
  name: '',
  live_url: '',
  description: '',
  technologies: [''],
}

export const EMPTY_EXPERIENCE: WorkExperience = {
  company: '',
  end_date: '',
  location: '',
  position: '',
  responsibilities: [''],
  start_date: '',
}

export const EMPTY_SKILL = { skill_name: '', sub_skills: [''] }
