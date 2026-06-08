import { Plus, Trash2 } from 'lucide-react'
import { useEffect } from 'react'
import { Button } from '../common/button'
import { FormField } from '../common/form'
import type { Link, TemplateData } from '#/types/template.type'
import type { SetField } from '#/hooks/use-resume-data'

const MAX_LINKS = 3

const EMPTY_LINK: Link = { label: '', url: '' }

interface GeneralInfoFormProps {
  resumeData: TemplateData
  setField: SetField
}

export const GeneralInfoForm = ({ resumeData, setField }: GeneralInfoFormProps) => {
  const links = resumeData.links

  useEffect(() => {
    if (links.length === 0) setField('links', [EMPTY_LINK])
  }, [])

  const updateLinks = (updated: Link[]) => setField('links', updated)

  const addLink = () => updateLinks([...links, EMPTY_LINK])

  const removeLink = (i: number) => updateLinks(links.filter((_, idx) => idx !== i))

  const updateLink = (i: number, field: keyof Link, value: string) =>
    updateLinks(links.map((link, idx) => (idx === i ? { ...link, [field]: value } : link)))

  return (
    <>
      <div className="flex flex-col pb-5 border-b border-border">
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
          value={resumeData.profession}
          onChange={(e) => setField('profession', e.target.value)}
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
      <div className="w-full flex flex-col gap-4 mt-5">
        <div className="w-full flex items-center justify-between">
          <span className="text-2xl font-medium">Web Links</span>
          {links.length < MAX_LINKS && (
            <Button
              variants="ghost"
              icon={<Plus size={20} />}
              iconPosition="left"
              onClick={addLink}
            >
              Add Link
            </Button>
          )}
        </div>
        <div className="w-full flex flex-col gap-3">
          {links.map((link, i) => (
            <LinkRow
              key={i}
              link={link}
              canRemove={links.length > 1}
              onRemove={() => removeLink(i)}
              onUpdate={(field, value) => updateLink(i, field, value)}
            />
          ))}
        </div>
      </div>
    </>
  )
}

interface LinkRowProps {
  link: Link
  canRemove: boolean
  onRemove: () => void
  onUpdate: (field: keyof Link, value: string) => void
}

function LinkRow({ link, canRemove, onRemove, onUpdate }: LinkRowProps) {
  return (
    <div className="w-full p-4 border border-border">
      <div className="w-full flex items-end gap-2">
        <FormField
          label="Label"
          name="link_label"
          placeholder="Github"
          classname="w-2/6"
          value={link.label}
          onChange={(e) => onUpdate('label', e.target.value)}
        />
        <FormField
          label="URL"
          name="link_url"
          classname="flex-1"
          placeholder="https://github.com/username"
          value={link.url}
          onChange={(e) => onUpdate('url', e.target.value)}
        />
        {canRemove && (
          <button type="button" onClick={onRemove} className="text-red-500 mb-1">
            <Trash2 size={24} />
          </button>
        )}
      </div>
    </div>
  )
}
