import { FormEventHandler, ReactNode } from 'react'

type Props = {
  children: ReactNode
  onSubmit: FormEventHandler
}

export default function Form({
  children,
  onSubmit,
}: Props) {
  return (
    <section className="p-5 py-7 lg:p-8 w-[90vw] max-w-[30rem] lg:w-[30rem] rounded-xl bg-background-secondary">
      <form onSubmit={onSubmit} className="space-y-6 ">
          {children}
      </form>
    </section>
  )
}
