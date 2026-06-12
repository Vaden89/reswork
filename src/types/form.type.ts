import type { ChangeEventHandler } from 'react'

export interface FormFieldProps {
  name: string
  label?: string
  value?: string
  classname?: string
  placeholder?: string
  inputClassName?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export interface FormSelectProps {
  name: string
  label: string
  options: { value: string; label: string }[]
  value?: string
  classname?: string
  onChange?: ChangeEventHandler<HTMLSelectElement>
}

export interface FormLabelProps {
  required?: boolean
  label: string
}
