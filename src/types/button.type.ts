import type { ButtonHTMLAttributes, ReactNode } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string
  icon?: ReactNode
  className?: string
  variants?: 'default' | 'ghost'
  iconPosition?: 'left' | 'right'
}
