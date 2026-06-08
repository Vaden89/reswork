import { Plus, Trash2 } from 'lucide-react'
import { Button } from '../common/button'
import { FormField } from '../common/form'
import type { TemplateData } from '#/types/template.type'
import type { SetField } from '#/hooks/use-resume-data'

interface GeneralInfoFormProps {
  resumeData: TemplateData
  setField: SetField
}

export const GeneralInfoForm = ({ resumeData, setField }: GeneralInfoFormProps) => {
  return (
    <>
      <div className="flex flex-col pb-5 border-b border-border ">
        <span className="text-4xl font-semibold">Contact Information</span>
        <p className="text-sm text-secondary">
          This is how employers will reach you, Ensure this is accurate.
        </p>
      </div>
      <div className="w-full flex flex-col gap-8 mt-5 pb-8 border-b border-border">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            name="firstname"
            label="First Name"
            placeholder="John"
            value={resumeData.first_name}
            onChange={(e) => setField('first_name', e.target.value)}
          />
          <FormField
            name="lastname"
            label="Last Name"
            placeholder="Doe"
            value={resumeData.last_name}
            onChange={(e) => setField('last_name', e.target.value)}
          />
        </div>
        <FormField
          name="professional_header"
          label="Professional Header"
          placeholder="Software Engineer"
        />
      </div>
      <div className="w-full flex flex-col gap-8 mt-5 pb-8 border-b border-border">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            name="email"
            label="Email Address"
            placeholder="johndoe@example.com"
            value={resumeData.email}
            onChange={(e) => setField('email', e.target.value)}
          />
          <FormField
            name="phone"
            label="Phone Number"
            placeholder="+234 907 456 5432"
            value={resumeData.phone}
            onChange={(e) => setField('phone', e.target.value)}
          />
        </div>
        <FormField
          name="location"
          label="Location (City, Country)"
          placeholder="Lagos, Nigeria"
          value={resumeData.location}
          onChange={(e) => setField('location', e.target.value)}
        />
      </div>
      <div className="w-full flex flex-col gap-8 mt-5">
        <div className="w-full flex items-center justify-between">
          <span className="text-2xl font-medium">Web Links</span>
          <Button variants="ghost" icon={<Plus size={20} />} iconPosition="left">
            Add Link
          </Button>
        </div>
        <div className="w-full p-4 border border-border">
          <div className="w-full flex gap-2">
            <FormField
              label="Label"
              name="link-label-0"
              placeholder="Github"
              classname="w-2/6"
            />
            <FormField
              label="URL"
              name="link-0"
              classname="w-3/6"
              placeholder="https://github.com/vaden89"
              value={resumeData.website}
              onChange={(e) => setField('website', e.target.value)}
            />
            <button className="text-red-500 mt-4 ml-4">
              <Trash2 size={24} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
