import type { Education, Link, Project } from '#/types/template.type'

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
