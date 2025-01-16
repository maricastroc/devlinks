/* eslint-disable react-hooks/exhaustive-deps */
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, router } from '@inertiajs/react'
import { TemplateProps } from '@/types/template'
import SecondaryButton from '@/Components/SecondaryButton'
import { cleanHTML } from '@/utils/cleanHtml'

type Props = {
  template: TemplateProps
}

export default function Index({ template }: Props) {
  console.log(template.body)
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Lists
        </h2>
      }
    >
      <Head title="List" />

      <div className="flex flex-col gap-4 mt-7">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-200">{template.name}</h1>
          <SecondaryButton onClick={() => router.get(route('templates.index'))}>
            Go Back
          </SecondaryButton>
        </div>
        <section
          className={`mb-10 p-5 py-7 lg:p-8 w-[90vw] lg:min-h-[28rem] max-w-[40rem] rounded-xl bg-background-secondary flex items-center justify-center`}
        >
          <div
style={{ fontFamily: 'inherit' }}
            className="w-full lg:min-h-[20rem] p-4 prose text-gray-200 border border-gray-700 rounded-lg shadow"
            dangerouslySetInnerHTML={{ __html: cleanHTML(template.body) }}
          />
        </section>
      </div>

      <style>{`
        .ql-font-monospace {
          font-family: 'Monaco', 'Courier New', monospace;
        }
        .ql-font-serif {
          font-family: 'Georgia', serif;
        }
        .ql-font-sans-serif {
          font-family: 'Arial', sans-serif;
        }
      `}</style>
    </AuthenticatedLayout>
  )
}
