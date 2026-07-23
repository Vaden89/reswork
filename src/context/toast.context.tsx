import { cn } from '#/utils/cn'
import { Toast } from '@base-ui/react'
import { TriangleAlert } from 'lucide-react'
import { createContext, useContext } from 'react'

import type { ReactNode } from 'react'

export interface ToastContextProps {
  success: (message: string, title: string) => void
  error: (message: string, title: string) => void
}

const ToastContext = createContext<ToastContextProps>({
  success: () => {},
  error: () => {},
})

export function useToast() {
  const ctx = useContext(ToastContext)

  if (!ctx) {
    throw new Error('useToast() must be used withing a <ToastProvider/>')
  }
  return ctx
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const toastManager = Toast.createToastManager()

  function success(message: string, title = 'Success') {
    toastManager.add({
      title: title,
      description: message,
      type: 'success',
      timeout: 2500,
    })
  }

  function error(message: string, title = 'Error') {
    toastManager.add({
      title,
      description: message,
      type: 'error',
      timeout: 2500,
    })
  }

  return (
    <ToastContext.Provider value={{ error, success }}>
      <Toast.Provider toastManager={toastManager}>
        <ToastPortal />
      </Toast.Provider>
      {children}
    </ToastContext.Provider>
  )
}

function ToastPortal() {
  const { toasts } = Toast.useToastManager()

  const baseStyling =
    'flex h-full items-center gap-4 p-3 overflow-hidden transition-opacity duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] data-behind:opacity-0 data-expanded:opacity-100 bg-white border'

  return (
    <Toast.Portal>
      <Toast.Viewport className="fixed top-7 right-0 bottom-auto left-0 z-1 mx-auto w-[calc(100vw-2rem)] max-w-90">
        {toasts.map((toast) => {
          const styling = cn(
            baseStyling,
            toast.type === 'error' && 'border-warning rounded-md text-warning',
            toast.type === 'success' &&
              'border-success rounded-md text-success',
          )
          return (
            <Toast.Root
              key={toast.id}
              toast={toast}
              swipeDirection="up"
              className="[--gap:0.75rem] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-offset-y)+(var(--toast-index)*var(--gap))+var(--toast-swipe-movement-y))] absolute top-0 right-0 left-0 z-[calc(1000-var(--toast-index))] mx-auto w-full origin-top [transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+(var(--toast-index)*var(--peek))+(var(--shrink)*var(--height))))_scale(var(--scale))]   select-none after:absolute after:bottom-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-[''] data-ending-style:opacity-0 data-expanded:[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--offset-y)))] data-limited:opacity-0 data-starting-style:[transform:translateY(-150%)] [&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(-150%)] data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))] data-expanded:data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))] data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))] data-expanded:data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))] data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))] data-expanded:data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))] data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))] data-expanded:data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))] h-[var(--height)] data-expanded:h-[var(--toast-height)] [transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1),opacity_0.5s,height_0.15s]"
            >
              <Toast.Content className={styling}>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <TriangleAlert size={20} />
                    <Toast.Description className="text-sm" />
                  </div>
                </div>
              </Toast.Content>
            </Toast.Root>
          )
        })}
      </Toast.Viewport>
    </Toast.Portal>
  )
}
