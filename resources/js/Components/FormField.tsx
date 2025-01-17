import InputError from "./InputError"
import InputLabel from "./InputLabel"
import TextInput from "./TextInput"

export function FormField({
  label,
  id,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
}: {
  label: string
  id: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  error?: string
  disabled?: boolean
}) {
  return (
    <div>
      <InputLabel htmlFor={id} value={label} />
      <TextInput
        id={id}
        name={id}
        className="block w-full mt-1"
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
      />
      {error && <InputError className="mt-2" message={error} />}
    </div>
  )
}