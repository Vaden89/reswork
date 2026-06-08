import { Plus, Trash2 } from 'lucide-react'
import { Button } from '../common/button'
import { FormField } from '../common/form'
import type { TemplateData } from '#/types/template.type'
import type { SetField } from '#/hooks/use-resume-data'

interface ExperienceFormProps {
  resumeData: TemplateData
  setField: SetField
}

export const ExperienceForm = ({ resumeData: _resumeData, setField: _setField }: ExperienceFormProps) => {
  return (
    <>
      <div className="flex flex-col pb-5 border-b border-border">
        <span className="text-4xl font-semibold">Work Experience</span>
        <p className="text-sm text-secondary">
          Add your work history starting with the most recent role.
        </p>
      </div>
      <div className="w-full flex flex-col gap-4 mt-5">
        <div className="w-full flex items-center justify-between">
          <span className="text-2xl font-medium">Positions</span>
          <Button variants="ghost" icon={<Plus size={20} />} iconPosition="left">
            Add Position
          </Button>
        </div>
        <div className="w-full p-4 border border-border flex flex-col gap-4">
          <div className="w-full flex items-start gap-2">
            <div className="flex-1 grid grid-cols-2 gap-4">
              <FormField label="Company" name="company_0" placeholder="Acme Corp" />
              <FormField label="Location" name="exp_location_0" placeholder="Lagos, Nigeria" />
            </div>
            <button className="text-red-500 mt-6">
              <Trash2 size={24} />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <FormField label="Job Title" name="position_0" placeholder="Software Engineer" />
            <FormField label="Start Date" name="exp_start_0" placeholder="Jan 2022" />
            <FormField label="End Date" name="exp_end_0" placeholder="Present" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm">Responsibilities</span>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <input
                  name="responsibility_0_0"
                  placeholder="Built and maintained internal tooling that reduced deploy time by 40%"
                  className="flex-1 h-10 border border-border bg-white px-4 outline-none focus:border-tertiary"
                />
                <button className="text-red-500">
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <input
                  name="responsibility_0_1"
                  placeholder="Led a team of 3 engineers to ship a new billing module"
                  className="flex-1 h-10 border border-border bg-white px-4 outline-none focus:border-tertiary"
                />
                <button className="text-red-500">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <Button variants="ghost" icon={<Plus size={16} />} iconPosition="left">
              Add Responsibility
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
