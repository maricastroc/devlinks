import {
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'

export default forwardRef(function TextInput(
  {
    type = 'text',
    className = '',
    isFocused = false,
    ...props
  }: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean },
  ref,
) {
  const localRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus(),
  }))

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus()
    }
  }, [isFocused])

  return (
    <input
      {...props}
      type={type}
      className={
        'disabled:cursor-not-allowed disabled:text-gray-500 rounded-md border-transparent shadow-sm bg-background-tertiary text-gray-300 focus:border-gray-600 focus:ring-gray-600 ' +
        className
      }
      ref={localRef}
    />
  )
})
