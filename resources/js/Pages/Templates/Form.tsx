import { useState } from 'react'
import { useForm, Link } from '@inertiajs/react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { notyf } from '@/libs/notyf'
import { Inertia } from '@inertiajs/inertia'
import InputLabel from '@/Components/InputLabel'
import InputError from '@/Components/InputError'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Form from '@/Layouts/FormLayout'
import SecondaryButton from '@/Components/SecondaryButton'
import TertiaryButton from '@/Components/TertiaryButton'
import axios, { AxiosError } from 'axios'
import { TemplateProps } from '@/types/template'
import { Eye } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import { PreviewModal } from '@/Components/PreviewModal'
import { handleReqError } from '@/utils/handleReqError'
import { FormField } from '@/Components/FormField'

type FormErrors = {
  name?: string
  body?: string
}

type Props = {
  template?: TemplateProps
  isEdit?: boolean
}

export default function TemplateForm({ template, isEdit }: Props) {
  const [errors, setErrors] = useState<FormErrors>({})

  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)

  const [processing, setProcessing] = useState(false)

  const { data, setData } = useForm({
    name: template?.name || '',
    body: template?.body || '',
  })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)
    setErrors({})

    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('body', data.body)

    if (isEdit) {
      formData.append('_method', 'PUT')
    }

    try {
      const url = isEdit ? route('templates.update', template?.id) : route('templates.store');
      const response = await axios.post(url, formData)

      if (response?.data.message) {
        await new Promise((resolve) => {
          notyf?.success(response?.data?.message)
          setTimeout(resolve, 2000)
        })
      }

      Inertia.visit(route('templates.index'))
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        handleReqError(error);
      }
    } finally {
      setProcessing(false)
    }
  }

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          {isEdit ? 'Templates - Edit' : 'Templates - Create'}
        </h2>
      }
    >
      <div className="flex flex-col pb-12 lg:pb-0">
        <Link
          href={route('templates.index')}
          className="mt-10 mb-2 ml-1 text-xs text-gray-400"
        >
          {`Templates > `}
          <Link
            href={route(isEdit ? 'templates.edit' : 'templates.create', {
              template: template?.id,
            })}
          >
            {isEdit ? 'Edit' : 'Create'}
          </Link>
        </Link>
        <Form isBigger onSubmit={submit}>
          <FormField
            label='Name'
            id="name"
            placeholder="Choose a name for your template"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            disabled={processing}
            error={errors.name}
            autoComplete="name"
          />

          <div>
            <div className="flex items-center justify-between">
              <InputLabel htmlFor="body" value="Body (HTML)" />
              <Dialog.Root open={isPreviewModalOpen}>
                <Dialog.Trigger asChild>
                  <button
                    onClick={() => setIsPreviewModalOpen(true)}
                    className="flex items-center gap-2 text-sm text-gray-200 transition-all duration-150 hover:text-white"
                  >
                    <Eye size={15} /> Preview
                  </button>
                </Dialog.Trigger>
                <PreviewModal
                  closeModal={() => setIsPreviewModalOpen(false)}
                  data={data.body}
                />
                      </Dialog.Root>
            </div>
            <div spellCheck={false}>
              <ReactQuill
                value={data.body}
                onChange={(value) => setData('body', value)}
                theme="snow"
                placeholder="Your template here"
                readOnly={processing}
                modules={{
                  toolbar: [
                    [{ header: '1' }, { header: '2' }, { font: [] }],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['bold', 'italic', 'underline'],
                    [{ align: [] }],
                    ['link'],
                    [{ color: [] }, { background: [] }],
                    ['blockquote', 'image', 'code-block'],
                    [{ 'separator': 'divider' }] 
                  ],
                }}
                className="mt-2 text-gray-300 border-transparent rounded-md shadow-sm custom-quill disabled:cursor-not-allowed disabled:text-gray-500 bg-background-tertiary focus:border-gray-600 focus:ring-gray-600"
              />
            </div>

            <InputError className="mt-2" message={errors.body} />
          </div>

          <div className="flex items-center justify-end gap-4">
            <SecondaryButton
              onClick={() => (window.location.href = '/templates')}
              disabled={processing}
            >
              Go back
            </SecondaryButton>
            <TertiaryButton disabled={processing}>Save Template</TertiaryButton>
          </div>
        </Form>
      </div>

      <style>{`
        .ql-toolbar.ql-snow {
          border: none !important;
        }
        .ql-container.ql-snow {
          border: none !important;
        }
        .ql-editor.ql-blank::before {
          border: none !important;
          font-style: normal !important;
          color: #52525b;
          font-size: 14px;
        }
        .ql-container.ql-snow {
          height: 200px;
        }
      `}</style>
    </AuthenticatedLayout>
  )
}
