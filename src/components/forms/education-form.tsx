import { Plus, Trash2 } from 'lucide-react'
import { Button } from '../common/button'
import { FormField, FormSelect } from '../common/form'
import { DEGREE_TYPES } from '#/data/degree-types'
import type { TemplateData } from '#/types/template.type'
import type { SetField } from '#/hooks/use-resume-data'

interface EducationFormProps {
  resumeData: TemplateData
  setField: SetField
}

export const EducationForm = ({ resumeData: _resumeData, setField: _setField }: EducationFormProps) => {
  return (
    <>
      <div className="flex flex-col pb-5 border-b border-border">
        <span className="text-4xl font-semibold">Education</span>
        <p className="text-sm text-secondary">
          Add your academic background starting with the most recent.
        </p>
      </div>
      <div className="w-full flex flex-col gap-4 mt-5">
        <div className="w-full flex items-center justify-between">
          <span className="text-2xl font-medium">Degrees</span>
          <Button
            variants="ghost"
            icon={<Plus size={20} />}
            iconPosition="left"
          >
            Add Degree
          </Button>
        </div>
        <div className="w-full p-4 border border-border flex flex-col gap-4">
          <div className="w-full flex items-start gap-2">
            <div className="flex-1 grid grid-cols-2 gap-4">
              <FormField
                label="School"
                name="school_0"
                placeholder="University of Lagos"
              />
              <FormField
                label="Location"
                name="edu_location_0"
                placeholder="Lagos, Nigeria"
              />
            </div>
            <button className="text-red-500 mt-6">
              <Trash2 size={24} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormSelect
              label="Degree Type"
              name="degree_type_0"
              options={DEGREE_TYPES}
            />
            <FormField
              label="Course / Major"
              name="course_0"
              placeholder="Computer Science"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <FormField
              label="Start Date"
              name="edu_start_0"
              placeholder="Sep 2018"
            />
            <FormField
              label="End Date"
              name="edu_end_0"
              placeholder="Jun 2022"
            />
            <FormField label="GPA" name="gpa_0" placeholder="4.0" />
          </div>
        </div>
      </div>
    </>
  )
}
