import { Dialog } from '@base-ui/react'
import { X } from 'lucide-react'
import type { ReactNode } from 'react'

type ModalWidth = 'sm' | 'md' | 'lg' | 'xl' | 'full'

const widthClasses: Record<ModalWidth, string> = {
  sm: 'md:w-1/4',
  md: 'md:w-2/5',
  lg: 'md:w-2/3',
  xl: 'md:w-3/4',
  full: 'md:w-full',
}

interface ModalProps {
  children: ReactNode
  trigger: ReactNode
  title?: string
  description?: string
  footer?: ReactNode
  width?: ModalWidth
}

export function Modal({
  children,
  trigger,
  title,
  description,
  footer,
  width = 'md',
}: ModalProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 h-dvh bg-black/20 transition-opacity duration-150" />
        <Dialog.Popup
          className={`fixed top-1/2 left-1/2 -mt-8 flex flex-col max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 bg-white shadow-md transition-[scale,opacity] duration-100 ease-out data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0 p-4 rounded-lg w-full ${widthClasses[width]}`}
        >
          <div className="w-full flex items-start justify-between">
            <div className="flex flex-col gap-1">
              {title && (
                <Dialog.Title className="text-xl font-semibold">
                  {title}
                </Dialog.Title>
              )}
              {description && (
                <Dialog.Description>{description}</Dialog.Description>
              )}
            </div>
            <Dialog.Close>
              <X size={18} />
            </Dialog.Close>
          </div>
          <div className="flex flex-col space-y-4 ">{children}</div>
          {footer && <div className="mt-4">{footer}</div>}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
