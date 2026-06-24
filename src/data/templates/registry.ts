import type { ComponentType } from 'react'
import type { TemplateData } from '#/types/template.type'
import { Template1 } from '#/components/templates/template-1'

export interface Template {
  id: string
  label: string
  image: string
  subText: string
  component: ComponentType<{ data: TemplateData }>
}

export const TEMPLATES: Template[] = [
  {
    id: 'template-1',
    label: 'Classic',
    image: '/images/template/1.webp',
    subText: 'Traditional, high-density structure',
    component: Template1,
  },
]
