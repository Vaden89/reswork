import { useEffect } from 'react'
import { LinkRow } from '../link-row'
import { Button } from '../common/button'
import { FormField } from '../common/form'
import { Plus } from 'lucide-react'
import type { FormProps } from '#/types/section-forms.type'
import { MAX_LINKS } from '#/data/constants/form-defaults'

export const GeneralInfoForm = ({ resumeData, dispatch }: FormProps) => {
  const links = resumeData.links

  useEffect(() => {
    if (links.length === 0) dispatch({ type: 'ADD_LINK' })
  }, [])

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
            onChange={(e) =>
              dispatch({
                type: 'BASIC_UPDATE',
                key: 'first_name',
                value: e.target.value,
              })
            }
          />
          <FormField
            name="lastname"
            label="Last Name"
            placeholder="Doe"
            value={resumeData.last_name}
            onChange={(e) =>
              dispatch({
                type: 'BASIC_UPDATE',
                key: 'last_name',
                value: e.target.value,
              })
            }
          />
        </div>
        <FormField
          name="professional_header"
          label="Professional Header"
          placeholder="Software Engineer"
          value={resumeData.profession}
          onChange={(e) =>
            dispatch({
              type: 'BASIC_UPDATE',
              key: 'profession',
              value: e.target.value,
            })
          }
        />
      </div>
      <div className="w-full flex flex-col gap-8 mt-5 pb-8 border-b border-border">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            name="email"
            label="Email Address"
            placeholder="johndoe@example.com"
            value={resumeData.email}
            onChange={(e) =>
              dispatch({
                type: 'BASIC_UPDATE',
                key: 'email',
                value: e.target.value,
              })
            }
          />
          <FormField
            name="phone"
            label="Phone Number"
            placeholder="+234 907 456 5432"
            value={resumeData.phone}
            onChange={(e) =>
              dispatch({
                type: 'BASIC_UPDATE',
                key: 'phone',
                value: e.target.value,
              })
            }
          />
        </div>
        <FormField
          name="location"
          label="Location (City, Country)"
          placeholder="Lagos, Nigeria"
          value={resumeData.location}
          onChange={(e) =>
            dispatch({
              type: 'BASIC_UPDATE',
              key: 'location',
              value: e.target.value,
            })
          }
        />
      </div>
      <div className="w-full flex flex-col gap-4 mt-5">
        <div className="w-full flex items-center justify-between">
          <span className="text-2xl font-medium">Web Links</span>
          {links.length < MAX_LINKS && (
            <Button
              text="Add Link"
              variants="ghost"
              icon={<Plus size={20} />}
              iconPosition="left"
              onClick={() => dispatch({ type: 'ADD_LINK' })}
            />
          )}
        </div>
        <div className="w-full flex flex-col gap-3">
          {links.map((link, i) => (
            <LinkRow
              key={i}
              link={link}
              canRemove={links.length > 1}
              onRemove={() => dispatch({ type: 'REMOVE_LINK', index: i })}
              onUpdate={(field, value) =>
                dispatch({ type: 'UPDATE_LINK', index: i, field, value })
              }
            />
          ))}
        </div>
      </div>
    </>
  )
}
