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

type Props = {
  emailList: EmailListProps
}

type AddSubscriberErrors = {
  name?: string
  email?: string
}

export default function Index({ emailList }: Props) {
  console.log(emailList)
  const [errors, setErrors] = useState<AddSubscriberErrors>({})

  const [processing, setProcessing] = useState(false)

  const { data, setData } = useForm({
    name: '',
    email: '',
  })

  const submit: FormEventHandler = async (e) => {
    e.preventDefault()

    setProcessing(true)

    setErrors({})

    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('email', data.email)

    try {
      const response = await axios.post(route('lists.store'), formData)

      if (response?.data.message) {
        await new Promise((resolve) => {
          notyf?.success(response?.data?.message)
          setTimeout(resolve, 2000)
        })
      }

      if (response.data.redirect) {
        window.location.href = response.data.redirect
      }
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
          Lists - Create
        </h2>
      }
    >
      <div className="flex flex-col">
        <Link href={route('lists')} className="mb-2 ml-1 text-xs text-gray-400">
          {`Lists > `}
          <Link
            href={route('lists.show', {
              emailList: emailList.id,
            })}
            className="text-gray-400"
          >
            {`Show > `}
          </Link>
          <Link
            href={route('lists.show.add-subscriber', {
              emailList: emailList.id,
            })}
            className="text-gray-200"
          >
            Add Subscriber
          </Link>
        </Link>
        <section className="p-8 w-[30rem] rounded-xl bg-background-secondary">
          <form onSubmit={submit} className="space-y-6 ">
            <div>
              <InputLabel htmlFor="name" value="Name" />

              <TextInput
                id="name"
                name="name"
                className="block w-full mt-1"
                placeholder="Subscriber's name"
                value={data.name}
                disabled={processing}
                onChange={(e) => setData('name', e.target.value)}
                isFocused
                autoComplete="name"
              />

              <InputError className="mt-2" message={errors.name} />
            </div>

            <div>
              <InputLabel htmlFor="email" value="Email" />

              <TextInput
                id="email"
                name="email"
                className="block w-full mt-1"
                placeholder="subscriber@email.com"
                value={data.email}
                disabled={processing}
                onChange={(e) => setData('email', e.target.value)}
                isFocused
                autoComplete="email"
              />

              <InputError className="mt-2" message={errors.name} />
            </div>

            <div className="flex items-center justify-end gap-4">
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
