/* eslint-disable @typescript-eslint/no-explicit-any */
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import TextInput from '@/Components/TextInput'
import SecondaryButton from '@/Components/SecondaryButton'
import TertiaryButton from '@/Components/TertiaryButton'
import { Link, useForm } from '@inertiajs/react'
import { FormEventHandler, useState } from 'react'
import { notyf } from '@/libs/notyf'
import axios from 'axios'
import { EmailListProps } from '@/types/emailList'
import { LinkSimple } from 'phosphor-react'
import { Inertia } from '@inertiajs/inertia'

type FormErrors = {
  title?: string
}

type Props = {
  emailList: EmailListProps
}

export default function Index({ emailList }: Props) {
  const [errors, setErrors] = useState<FormErrors>({})

  const [processing, setProcessing] = useState(false)

  const { data, setData } = useForm({
    title: emailList.title,
    listFile: null as File | null,
  })

  const submit: FormEventHandler = async (e) => {
    e.preventDefault()

    setProcessing(true)

    setErrors({})

    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('_method', 'PUT')

    try {
      const response = await axios.post(`lists/${emailList.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response?.data.message) {
        await new Promise((resolve) => {
          notyf?.success(response?.data?.message)
          setTimeout(resolve, 2000)
        })
      }

      Inertia.visit(route('lists.index'))
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors)
      } else {
        notyf?.error(error.response?.data?.message || 'An error occurred.')
      }
    } finally {
      setProcessing(false)
    }
  }

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Lists - Edit
        </h2>
      }
    >
      <div className="flex flex-col">
        <Link
          href={route('lists.index')}
          className="mb-2 ml-1 text-xs text-gray-400"
        >
          {`Lists > `}
          <Link href={route('lists.edit', { list: emailList.id })}>Edit</Link>
        </Link>
        <section className="p-8 w-[30rem] rounded-xl bg-background-secondary">
          <form onSubmit={submit}>
            <div>
              <InputLabel htmlFor="name" value="Name" />

              <TextInput
                id="name"
                name="name"
                className="block w-full mt-1"
                placeholder="Choose a name for your list"
                value={data.title}
                disabled={processing}
                onChange={(e) => setData('title', e.target.value)}
                isFocused
                autoComplete="name"
              />

              <InputError className="mt-2" message={errors.title} />
            </div>
            <div className="flex items-center gap-2 mt-3">
              <Link
                href={route('lists.show', { list: emailList.id })}
                className="flex items-center text-xs text-gray-300 transition-all duration-150 hover:text-gray-100"
              >
                <LinkSimple size={16} className="mr-1" />
                Click to view / edit subscribers
              </Link>
            </div>

            <div className="flex items-center justify-end gap-4 mt-5">
              <SecondaryButton
                onClick={() => (window.location.href = '/lists')}
                disabled={processing}
              >
                Go back
              </SecondaryButton>
              <TertiaryButton disabled={processing}>Save List</TertiaryButton>
            </div>
          </form>
        </section>
      </div>
    </AuthenticatedLayout>
  )
}
