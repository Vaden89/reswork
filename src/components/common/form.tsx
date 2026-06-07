import { cn } from '#/utils/cn'
import type { ChangeEventHandler } from 'react'

interface FormFieldProps {
  name: string
  label?: string
  value?: string
  classname?: string
  placeholder?: string
  inputClassName?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export function FormField({
  name,
  label,
  value,
  classname,
  placeholder,
  inputClassName,
  onChange,
}: FormFieldProps) {
  const baseStyling =
    'h-10 border border-border active:border-tertiary focus:border-tertiary bg-white px-4 outline-none'
  const styling = cn(baseStyling, inputClassName)

  return (
    <div className={cn('w-full flex flex-col gap-1', classname)}>
      {label && <FormLabel label={label} />}
      <input
        name={name}
        value={value}
        className={styling}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  )
}

interface FormSelectProps {
  name: string
  label: string
  options: { value: string; label: string }[]
  classname?: string
}

export function FormSelect({
  label,
  name,
  options,
  classname,
}: FormSelectProps) {
  const styling =
    'h-10 border border-border active:border-tertiary focus:border-tertiary bg-white px-4 outline-none'

  return (
    <div className={cn('flex flex-col gap-1', classname)}>
      <FormLabel label={label} />
      <select name={name} className={styling}>
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

interface FormLabelProps {
  required?: boolean
  label: string
}

function FormLabel({ label, required = true }: FormLabelProps) {
  return (
    <span className="text-sm flex items-center">
      {label}
      {required && <span className="text-red-500">*</span>}
    </span>
  )
}
