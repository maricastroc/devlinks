import { EmailListProps } from '@/types/emailList'
import { TemplateProps } from '@/types/template'
import {
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'

export default forwardRef(function SelectInput(
  {
    type = 'text',
    className = '',
    isFocused = false,
    emailLists,
    templates,
    ...props
  }: InputHTMLAttributes<HTMLSelectElement> & { isFocused?: boolean, emailLists?: EmailListProps[], templates?: TemplateProps[] },
  ref,
) {
  const localRef = useRef<HTMLSelectElement>(null)

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus(),
  }))

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus()
    }
  }, [isFocused])

  return (
    <select
      {...props}
      className={
        'disabled:cursor-not-allowed w-full mt-1 disabled:text-gray-500 rounded-md border-transparent shadow-sm bg-background-tertiary text-gray-300 focus:border-gray-600 focus:ring-gray-600 ' +
        className
      }
      ref={localRef}
    >
        <option disabled value="">
          {emailLists ? 'Select a List' : 'Select a Template'}
        </option>
        {emailLists && (
          emailLists.map((item) => (
            <option key={item.id} value={item.id}>
              {item?.title}
            </option>
          ))
        )}

        {templates && (
          templates.map((item) => (
            <option key={item.id} value={item.id}>
              {item?.name}
            </option>
          ))
        )}
    </select>
  )
})
