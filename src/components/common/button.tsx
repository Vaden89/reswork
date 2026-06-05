import type { ReactNode } from 'react'
import { cn } from '#/utils/cn'

interface ButtonProps {
  children: ReactNode
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  className?: string
}

export const Button = ({
  children,
  icon,
  iconPosition,
  className,
}: ButtonProps) => {
  const baseStyling =
    'bg-primary text-white w-fit text-sm font-medium px-2 py-1 flex items-center justify-center gap-2'

  return (
    <button className={cn(baseStyling, className)}>
      {iconPosition === 'left' && icon}
      {children}
      {iconPosition === 'right' && icon}
    </button>
  )
}
