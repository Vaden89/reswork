export interface TemplateData {
  first_name: string
  last_name: string
  state: string
  country: string
  location: string
  email: string
  phone: string
  website: string
  profession: string
  skills: Skills[]
  workExperience: workExperience[]
  projects: Project[]
  education: Education[]
}

interface Skills {
  skill_name: string
  sub_skills: string[]
}

interface workExperience {
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

interface Education {
  school: string
  course: string
  end_date: string
  location: string
  start_date: string
  degree_type: string
  gpa: string
}
