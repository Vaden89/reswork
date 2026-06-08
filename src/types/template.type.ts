export interface TemplateData {
  first_name: string
  last_name: string
  location: string
  email: string
  phone: string
  links: Link[]
  profession: string
  skills: Skills[]
  workExperience: WorkExperience[]
  projects: Project[]
  education: Education[]
}

export interface Link {
  label: string
  url: string
}

interface Skills {
  skill_name: string
  sub_skills: string[]
}

export interface WorkExperience {
  company: string
  position: string
  start_date: string
  end_date: string
  location: string
  responsibilities: string[]
}

interface Project {
  name: string
  live_url: string
  description: string
  technologies: string[]
}

export interface Education {
  school: string
  course: string
  end_date: string
  location: string
  start_date: string
  degree_type: string
  gpa: string
}
