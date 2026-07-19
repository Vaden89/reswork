import { useState } from 'react'
import { FormField } from '../../common/form'
import { Sparkles, Trash2 } from 'lucide-react'
import * as AiService from '#/services/ai.service'
import type { WorkExperience } from '#/types/template.type'
import { RefineResponsibilitySkeleton } from './refine-responsibility-skeleton'
import { useAuth } from '#/context/auth.context'

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
  const [error, setError] = useState<string | null>(null)
  const isAuthenticated = user?.type === 'authenticated'

  async function handleReqRefinement(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    setLoading(true)
    setError(null)

    if (!isAuthenticated) return

    if (!value) {
      setError('You have to provide a responsibility to refine')
      return
    }

    try {
      const response = await AiService.refineResponsibility({
        responsibility: value,
        position: exp.position,
        company: exp.company,
      })

      if (!('data' in response)) throw new Error(response.message)

      onChange(response.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <RefineResponsibilitySkeleton />
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
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
              disabled={user?.type !== 'authenticated' || !value}
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
        <button type="button" onClick={onRemove} className="text-red-500">
          <Trash2 size={18} />
        </button>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
