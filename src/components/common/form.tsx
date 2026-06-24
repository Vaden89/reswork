import type {
  FormFieldProps,
  FormLabelProps,
  FormSelectProps,
} from '#/types/form.type'
import { cn } from '#/utils/cn'

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

export function FormSelect({
  label,
  name,
  options,
  value,
  classname,
  onChange,
}: FormSelectProps) {
  const styling =
    'h-10 border border-border active:border-tertiary focus:border-tertiary bg-white px-4 outline-none'

  return (
    <div className={cn('flex flex-col gap-1', classname)}>
      <FormLabel label={label} />
      <select name={name} value={value} className={styling} onChange={onChange}>
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

function FormLabel({ label, required = true }: FormLabelProps) {
  return (
    <span className="text-sm flex items-center">
      {label}
      {required && <span className="text-red-500">*</span>}
    </span>
  )
}
