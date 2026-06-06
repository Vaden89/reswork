import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '#/utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  className?: string
}

export const Button = ({
  children,
  icon,
  iconPosition = 'right',
  className,
  onClick,
}: ButtonProps) => {
  const baseStyling =
    'bg-primary text-white w-fit text-sm font-medium px-2 py-1 flex items-center justify-center gap-2'

  return (
    <button onClick={onClick} className={cn(baseStyling, className)}>
      {iconPosition === 'left' && icon}
      {children}
      {iconPosition === 'right' && icon}
    </button>
  )
}
