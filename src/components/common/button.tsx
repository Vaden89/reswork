import type { ButtonProps } from '#/types/button.type'
import { cn } from '#/utils/cn'

const variants = {
  default: 'bg-primary text-white',
  ghost: 'bg-transparent text-secondary',
}

export const Button = ({
  text,
  icon,
  iconPosition = 'right',
  variants: variant = 'default',
  className,
  onClick,
}: ButtonProps) => {
  const baseStyling =
    'w-fit text-sm font-medium px-2 py-1 flex items-center justify-center gap-2'

  return (
    <button
      onClick={onClick}
      className={cn(baseStyling, variants[variant], className)}
    >
      {iconPosition === 'left' && icon}
      {text}
      {iconPosition === 'right' && icon}
    </button>
  )
}
