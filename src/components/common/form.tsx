import type {
  FormFieldProps,
  FormLabelProps,
  FormSelectProps,
  FormTextareaProps,
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
  required,
}: FormFieldProps) {
  const wrapperStyling = cn(
    'w-full flex h-10 border border-border bg-white focus-within:border-tertiary relative',
    inputClassName,
  )
  const inputStyling = cn(
    'h-full min-w-0 flex-1 bg-transparent px-4 outline-none',
    extra && 'pr-5',
  )

  return (
    <div className={cn('w-full flex flex-col gap-1', classname)}>
      {label && <FormLabel required={required} label={label} />}
      <div className={wrapperStyling}>
        <input
          name={name}
          value={value}
          className={inputStyling}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
        />
        {extra && (
          <div className="shrink-0 px-2 absolute top-[25%] right-0">
            {extra}
          </div>
        )}
      </div>
    </div>
  )
}

export function FormTextarea({
  label,
  name,
  value,
  classname,
  inputClassName,
  placeholder,
  onChange,
  extra,
  required,
}: FormTextareaProps) {
  const wrapperStyling = cn(
    'w-full h-full flex border border-border bg-white focus-within:border-tertiary noscroll py-1 relative',
    inputClassName,
  )
  const inputStyling = cn(
    'min-h-18 field-sizing-content min-w-0 flex-1 bg-transparent px-4 outline-none noscroll resize-none',
    extra && 'pr-5',
  )

  return (
    <div className={cn('w-full flex flex-col gap-1', classname)}>
      {label && <FormLabel required={required} label={label} />}
      <div className={wrapperStyling}>
        <textarea
          name={name}
          value={value}
          className={inputStyling}
          onChange={onChange}
          placeholder={placeholder}
          rows={1}
        />
        {extra && (
          <div className="shrink-0 px-2 absolute top-[20%] right-0">
            {extra}
          </div>
        )}
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
