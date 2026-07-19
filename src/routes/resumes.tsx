import { Button } from '#/components/common/button'
import { useResumes } from '#/hooks/use-resumes'
import { useAuth } from '#/context/auth.context'
import { useDataSource } from '#/context/data-source.context'
import type { ResumeMetadata } from '#/types/db.type'
import { formatDate } from '#/utils/date'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Download, Edit, Plus, Trash2 } from 'lucide-react'

export const Route = createFileRoute('/resumes')({ component: RouteComponent })

function RouteComponent() {
  const resumes = useResumes()
  const { user } = useAuth()

  return (
    <div className="w-full max-w-6xl px-4 sm:px-8 xl:px-0 mx-auto mt-8">
      <div className="w-full flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold">My Resumes</h2>
          <span className="text-sm text-secondary font-light">
            {resumes?.length ?? 0} Documents
          </span>
        </div>
        <Link to="/builder/templates">
          <Button
            text="CREATE RESUME"
            icon={<Plus size={18} />}
            className="py-2"
          />
        </Link>
      </div>
      {user?.type === 'guest' && (
        <div className="w-full mt-6 border border-border bg-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium">
              You're working as a guest
            </span>
            <span className="text-sm text-secondary font-light">
              Resumes are stored on this device only. Create a free account to
              sync them anywhere and get 10 free AI tokens.
            </span>
          </div>
          <Link
            to="/login"
            className="text-sm text-secondary underline underline-offset-2"
          >
            Log in
          </Link>
        </div>
      )}
      {resumes && resumes.length === 0 ? (
        <p className="text-secondary my-10">
          No resumes yet. Create one to get started.
        </p>
      ) : (
        <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10">
          {resumes?.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </section>
      )}
    </div>
  )
}

function ResumeCard({ resume }: { resume: ResumeMetadata }) {
  const { repository } = useDataSource()
  return (
    <div className=" flex flex-col">
      <div className="h-125 bg-border p-3">
        <img
          width={500}
          height={500}
          alt={resume.title}
          src={'/images/template/' + resume.template_id.split('-')[1] + '.webp'}
          className="w-full h-full  object-center"
        />
      </div>
      <div className="p-3 bg-white">
        <div className="w-full flex items-center justify-between 2xl:mb-4 gap-2">
          <span className="text-xl font-bold truncate">{resume.title}</span>
          <div className="flex items-center gap-4">
            <button>
              <Download size={18} />
            </button>
            <button onClick={() => repository.deleteResume(resume.id)}>
              <Trash2 size={18} />
            </button>
            <Link to="/builder/$id" params={{ id: resume.id }}>
              <Edit size={18} />
            </Link>
          </div>
        </div>
        <span className="text-xs 2xl:text-sm text-secondary">
          Edited {formatDate(resume.updated_at)}
        </span>
      </div>
    </div>
  )
}
