import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import SecondaryButton from '@/Components/SecondaryButton'
import TertiaryButton from '@/Components/TertiaryButton'
import { Link, router, useForm } from '@inertiajs/react'
import { FormEventHandler, useState } from 'react'
import { notyf } from '@/libs/notyf'
import axios, { AxiosError } from 'axios'
import { Inertia } from '@inertiajs/inertia'
import { SubscriberProps } from '@/types/subscriber'
import Form from '@/Layouts/FormLayout'
import { EmailListProps } from '@/types/emailList'
import { handleReqError } from '@/utils/handleReqError'
import { FormField } from '@/Components/FormField'

type Props = {
  emailList?: EmailListProps
  subscriber?: SubscriberProps
  isEdit?: boolean
}

type FormErrors = {
  name?: string
  email?: string
  email_list_id?: string
}

export default function Edit({ subscriber, emailList, isEdit }: Props) {
  const [errors, setErrors] = useState<FormErrors>({})

  const [processing, setProcessing] = useState(false)

  const { data, setData } = useForm({
    name: subscriber?.name,
    email: subscriber?.email,
  })

  const submit: FormEventHandler = async (e) => {
    e.preventDefault()

    setProcessing(true)

    setErrors({})

    const formData = new FormData()

    formData.append('name', data?.name || '')
    formData.append('email', data?.email || '')
    formData.append(
      'email_list_id',
      subscriber?.email_list_id.toString() || emailList?.id?.toString() || '',
    )

    if (isEdit) {
      formData.append('_method', 'PUT')
    }

    const routeName = isEdit ? 'subscribers.update' : 'subscribers.store'
    
    const routeParams = isEdit
      ? { list: subscriber?.email_list_id, subscriber: subscriber?.id }
      : { list: emailList?.id }

    try {
      const response = await axios.post(route(routeName, routeParams), formData)

      if (response?.data.message) {
        await new Promise((resolve) => {
          notyf?.success(response?.data?.message)
          setTimeout(resolve, 2000)
        })
      }

      Inertia.visit(
        route('lists.show', {
          list: subscriber?.email_list_id || emailList?.id,
        }),
      )
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
          {isEdit ? 'Subscriber - Edit' : 'Subscriber - Create'}
        </h2>
      }
    >
      <div className="flex flex-col pb-12 mt-10">
        <Link
          href={route('lists.index')}
          className="mb-2 ml-1 text-xs text-gray-400 w-[12rem]"
        >
          {`Lists > `}
          <Link
            href={route('lists.show', {
              list: subscriber?.email_list_id || emailList?.id,
            })}
            className="text-gray-400"
          >
            {`Show > `}
          </Link>
          <Link
            href={route(
              !isEdit ? 'subscribers.create' : 'subscribers.edit',
              !isEdit
                ? { list: emailList?.id }
                : {
                  list: subscriber?.email_list_id,
                  subscriber: subscriber?.id,
                },
            )}
            className="text-gray-200"
          >
            {isEdit ? 'Edit Subscriber' : 'Create Subscriber'}
          </Link>
        </Link>
        <Form onSubmit={submit}>
          <FormField
            label='Name'
            id="name"
            placeholder="Subscriber's name"
            value={data.name || ''}
            disabled={processing}
            onChange={(e) => setData('name', e.target.value)}
            autoComplete="name"
            error={errors.name}
          />

          <FormField
            label='Email'
            id="email"
            placeholder="Subscriber's email"
            value={data.email || ''}
            disabled={processing}
            onChange={(e) => setData('email', e.target.value)}
            autoComplete="email"
            error={errors.email}
          />

          <div className="flex items-center justify-end gap-4">
            <SecondaryButton
              onClick={() =>
                router.get(
                  route('lists.show', {
                    list: subscriber?.email_list_id || emailList?.id,
                  }),
                )
              }
              disabled={processing}
            >
              Go back
            </SecondaryButton>
            <TertiaryButton disabled={processing}>Save List</TertiaryButton>
          </div>
        </Form>
      </div>
    </AuthenticatedLayout>
  )
}
