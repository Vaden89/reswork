import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '#/utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode
  className?: string
  children: ReactNode
  variants?: 'default' | 'ghost'
  iconPosition?: 'left' | 'right'
}

const variants = {
  default: 'bg-primary text-white',
  ghost: 'bg-transparent text-secondary',
}

export const Button = ({
  children,
  icon,
  iconPosition = 'right',
  variants: variant = 'default',
  className,
  onClick,
}: ButtonProps) => {
  const baseStyling =
    'w-fit text-sm font-medium px-2 py-1 flex items-center justify-center gap-2'

  return (
    <button onClick={onClick} className={cn(baseStyling, variants[variant], className)}>
      {iconPosition === 'left' && icon}
      {children}
      {iconPosition === 'right' && icon}
    </button>
  )
}
