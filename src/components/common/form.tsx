import type {
  FormFieldProps,
  FormLabelProps,
  FormSelectProps,
} from '#/types/form.type'
import { cn } from '#/utils/cn'

export function FormField({
  name,
  label,
  type = 'text',
  value,
  classname,
  placeholder,
  inputClassName,
  onChange,
  extra,
}: FormFieldProps) {
  const wrapperStyling = cn(
    'w-full h-10 flex items-center border border-border bg-white focus-within:border-tertiary',
    inputClassName,
  )
  const inputStyling = cn(
    'h-full min-w-0 flex-1 bg-transparent px-4 outline-none',
  )

  return (
    <div className={cn('w-full flex flex-col gap-1', classname)}>
      {label && <FormLabel label={label} />}
      <div className={wrapperStyling}>
        <input
          name={name}
          value={value}
          className={inputStyling}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
        />
        {extra && <div className="shrink-0 px-2">{extra}</div>}
      </div>
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
