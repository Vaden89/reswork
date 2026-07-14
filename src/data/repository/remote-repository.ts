import type { ResumeMetadata } from '#/types/db.type'
import type { TemplateData } from '#/types/template.type'
import type {
  CreateResumeOptions,
  Resume,
  ResumeRepository,
} from '#/types/repository.type'

/**
 * Online data source backed by Convex. Used for authenticated users.
 *
 * NOTE: this is a typed stub. Convex is not installed yet, so the imperative
 * methods below are placeholders and each is marked with the future call site.
 * Reads return empty and mutations throw so accidental online usage is obvious.
 * Replace the bodies with `ConvexClient`/generated `api.*` calls once the
 * backend exists — the interface will not need to change.
 */
const NOT_IMPLEMENTED = new Error(
  'remoteRepository (Convex) is not implemented yet',
)

export const remoteRepository: ResumeRepository = {
  async listResumes(): Promise<ResumeMetadata[]> {
    // future: convex.query(api.resumes.list)
    return []
  },

  async getResume(_id: string): Promise<Resume | null> {
    // future: convex.query(api.resumes.get, { id })
    return null
  },

  async createResume(_options: CreateResumeOptions): Promise<string> {
    // future: convex.mutation(api.resumes.create, options)
    throw NOT_IMPLEMENTED
  },

  async updateResumeData(_id: string, _data: TemplateData): Promise<void> {
    // future: convex.mutation(api.resumes.updateData, { id, data })
    throw NOT_IMPLEMENTED
  },

  async renameResume(_id: string, _title: string): Promise<void> {
    // future: convex.mutation(api.resumes.rename, { id, title })
    throw NOT_IMPLEMENTED
  },

  async deleteResume(_id: string): Promise<void> {
    // future: convex.mutation(api.resumes.remove, { id })
    throw NOT_IMPLEMENTED
  },
}

/**
 * Reactive read stubs consumed by the unified hooks. Shaped like Convex's
 * `useQuery` (pass `enabled: false` to "skip"). While stubbed they always
 * return `undefined`, so the online branch stays inert until Convex is wired.
 *
 * future: `return enabled ? useQuery(api.resumes.list) : undefined`
 */
export function useRemoteResumes(_enabled: boolean): ResumeMetadata[] | undefined {
  return undefined
}

export function useRemoteResume(
  _id: string,
  _enabled: boolean,
): Resume | null | undefined {
  return undefined
}
