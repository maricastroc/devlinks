/* eslint-disable react-hooks/exhaustive-deps */
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, router } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { EmailListProps } from '@/types/emailList'
import TextInput from '@/Components/TextInput'
import LinkButton from '@/Components/LinkButton'
import { SubscriberProps } from '@/types/subscriber'
import SecondaryButton from '@/Components/SecondaryButton'
import { useDebounce } from '@react-hook/debounce'

interface LinksProps {
  url: string
  label: string
  isActive: boolean
}

interface SubscribersResult {
  data: SubscriberProps[]
  total: number
  links: LinksProps
  current_page: number
  per_page: number
  next_page_url: string
  prev_page_url: string
  to: number
}

interface Props {
  emailList: EmailListProps
  subscribers: SubscribersResult
}

export default function EmailList({ emailList, subscribers }: Props) {
  const [search, setSearch] = useState('')

  const [debouncedSearch, setDebouncedSearch] = useDebounce('', 500)

  useEffect(() => {
    setDebouncedSearch(search)
  }, [search])

  useEffect(() => {
    if (debouncedSearch === '' && search === '') {
      router.get(
        route('lists.edit', { emailList: emailList.id }),
        {},
        {
          preserveState: true,
          preserveScroll: true,
          replace: true,
        },
      )
    } else if (debouncedSearch !== '') {
      router.get(
        route('lists.edit', {
          emailList: emailList.id,
          search: debouncedSearch,
        }),
        {},
        {
          preserveState: true,
          preserveScroll: true,
          replace: true,
        },
      )
    }
  }, [debouncedSearch])

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Lists
        </h2>
      }
    >
      <Head title="List" />
      <section className="lg:max-h-[78vh] p-8 w-[45rem] rounded-xl bg-background-secondary">
        <div className="grid grid-cols-[1fr,2.5fr] gap-4">
          <LinkButton href="lists/create">Add Subscriber</LinkButton>
          <TextInput
            id="search"
            name="search"
            className="block w-full py-2"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
            }}
          />
        </div>

        <div className="px-5 py-5 rounded-lg mt-7 bg-background-tertiary text-content">
          <div className="overflow-y-auto max-h-[43vh]">
            {subscribers?.data?.length ? (
              <table className="table w-full text-content">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="py-2 text-content text-medium">Name</th>
                    <th className="py-2 text-content text-medium">E-mail</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.data.map((subscriber) => {
                    return (
                      <tr
                        key={subscriber.id}
                        className="border-b border-zinc-800"
                      >
                        <td className="py-2 text-gray-300 text-medium">
                          {subscriber.name}
                        </td>
                        <td className="py-2 text-gray-300 text-medium">
                          {subscriber.email}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            ) : (
              <div className="flex items-center justify-center">
                <p className="text-gray-400">
                  We couldnt&apos;t find any subscribers.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <SecondaryButton
            onClick={() =>
              router.get(
                subscribers.prev_page_url,
                {},
                { preserveState: true, replace: true },
              )
            }
            disabled={
              subscribers.current_page === 1 || !subscribers?.data?.length
            }
          >
            Previous
          </SecondaryButton>
          <p>{`Page ${subscribers.current_page} of ${
            Math.ceil(subscribers.total / subscribers.per_page) || 1
          }`}</p>
          <SecondaryButton
            onClick={() =>
              router.get(
                subscribers.next_page_url,
                {},
                { preserveState: true, replace: true },
              )
            }
            disabled={
              subscribers.to === subscribers.total || !subscribers?.data?.length
            }
          >
            Next
          </SecondaryButton>
        </div>
      </section>
    </AuthenticatedLayout>
  )
}
