import type { ButtonHTMLAttributes, ReactNode } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string
  icon?: ReactNode
  className?: string
  variants?: 'default' | 'ghost' | 'outline'
  iconPosition?: 'left' | 'right'
}
