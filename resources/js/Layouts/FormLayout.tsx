import { FormEventHandler, ReactNode } from 'react'

type Props = {
  children: ReactNode
  onSubmit: FormEventHandler
  isBigger?: boolean
}

export default function Form({ children, onSubmit, isBigger = false }: Props) {
  return (
    <section
      className={`p-5 py-7 lg:p-8 w-[90vw] max-w-[30rem] rounded-xl bg-background-secondary ${
        isBigger ? 'lg:w-[50rem] max-w-[50rem]' : 'lg:w-[30rem]'
      }`}
    >
      <form onSubmit={onSubmit} className="space-y-6 ">
        {children}
      </form>
    </section>
  )
}
