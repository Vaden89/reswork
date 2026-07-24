import { useEffect, useRef, useState } from 'react'
import { FormField } from '../../common/form'
import { Sparkles, Trash2 } from 'lucide-react'
import * as AiService from '#/services/ai.service'
import type { WorkExperience } from '#/types/template.type'
import { RefineResponsibilitySkeleton } from './refine-responsibility-skeleton'
import { useAuth } from '#/context/auth.context'
import { useToast } from '#/context/toast.context'

export interface ResponsibilityInputProps {
  exp: WorkExperience
  value: string
  onChange: (value: string) => void
  onRemove: () => void
}

export function ResponsibilityInput({
  exp,
  value,
  onChange,
  onRemove,
}: ResponsibilityInputProps) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const { error, success } = useToast()
  const isAuthenticated = user?.type === 'authenticated'
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const typingInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
    }
  }, [])

  // Scroll to end of input as each character is typed
  useEffect(() => {
    if (isTyping && typingInputRef.current) {
      typingInputRef.current.scrollLeft = typingInputRef.current.scrollWidth
    }
  }, [value, isTyping])

  async function handleReqRefinement(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()

    if (!isAuthenticated) return

    if (!value) {
      error('You have to provide a responsibility to refine', 'Error')
      return
    }

    setLoading(true)

    try {
      const response = await AiService.refineResponsibility({
        responsibility: value,
        position: exp.position,
        company: exp.company,
      })

      if (!('data' in response)) throw new Error(response.message)

      const refinedText = response.data
      setLoading(false)
      setIsTyping(true)
      onChange('')

      let i = 0
      const charDelay = Math.max(12, Math.min(30, 2500 / refinedText.length))

      function typeNext() {
        i++
        onChange(refinedText.slice(0, i))
        if (i < refinedText.length) {
          typingTimeoutRef.current = setTimeout(typeNext, charDelay)
        } else {
          setIsTyping(false)
          success('Responsibility refined successfully')
        }
      }

      typingTimeoutRef.current = setTimeout(typeNext, charDelay)
    } catch (err) {
      error(err instanceof Error ? err.message : String(err), 'Error')
      setLoading(false)
    }
  }

  if (loading) {
    return <RefineResponsibilitySkeleton />
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        {isTyping ? (
          <div className="flex h-10 flex-1 items-center border border-border bg-white ai-typing-glow">
            <input
              ref={typingInputRef}
              readOnly
              value={value}
              className="h-full min-w-0 flex-1 bg-transparent px-4 outline-none caret-transparent"
            />
            <div className="flex shrink-0 items-center gap-1 px-2">
              <span className="ai-cursor" />
              <Sparkles size={14} className="animate-pulse text-accent" />
            </div>
          </div>
        ) : (
          <FormField
            value={value}
            classname="flex-1"
            name="responsibility"
            onChange={(e) => onChange(e.target.value)}
            placeholder="Built and maintained internal tooling that reduced deployment time by 50%"
            extra={
              <button
                type="button"
                onClick={handleReqRefinement}
                className="group relative flex items-center justify-center disabled:text-secondary"
                aria-label="Refine with AI"
              >
                <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 flex -translate-x-1/2 translate-y-1 scale-95 items-center justify-center rounded-lg bg-tertiary px-3 py-1 text-border opacity-0 shadow-md transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:scale-100 group-focus-visible:opacity-100">
                  <span className="whitespace-nowrap text-xs">
                    {isAuthenticated ? 'Refine with AI' : 'Login to refine'}
                  </span>
                  <span className="absolute left-1/2 top-full size-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-tertiary" />
                </div>
                <Sparkles size={16} />
              </button>
            }
          />
        )}
        <button type="button" onClick={onRemove} className="text-red-500">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  )
}
