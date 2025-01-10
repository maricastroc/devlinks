/* eslint-disable react-hooks/exhaustive-deps */
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, router } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { EmailListProps } from '@/types/emailList'
import LinkButton from '@/Components/LinkButton'
import { SubscriberProps } from '@/types/subscriber'
import SecondaryButton from '@/Components/SecondaryButton'
import SearchInput from '@/Components/SearchInput'
import PaginationButton from '@/Components/PaginationButton'
import { PaginationContainer } from './Partials/PaginationContainer'

interface LinksProps {
  url: string
  label: string
  isActive: boolean
}

export interface SubscribersResult {
  data: SubscriberProps[]
  total: number
  links: LinksProps
  current_page: number
  per_page: number
  next_page_url: string
  prev_page_url: string
  to: number
  from: number
}

interface Props {
  emailList: EmailListProps
  subscribers: SubscribersResult
}

export default function EmailList({ emailList, subscribers }: Props) {
  const [search, setSearch] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search === '') {
        router.get(
          route('lists.edit', { emailList: emailList.id }),
          {},
          {
            preserveState: true,
            preserveScroll: true,
            replace: true,
          }
        )
      } else {
        router.get(
          route('lists.edit', {
            emailList: emailList.id,
            search,
          }),
          {},
          {
            preserveState: true,
            preserveScroll: true,
            replace: true,
          }
        )
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [search])

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
          <SearchInput
            id="search"
            name="search"
            className="block w-full py-2"
            placeholder="Search by name or email"
            value={search}
            search={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearch(e.target.value)
            }}
            onReset={() => setSearch('')}
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

        <PaginationContainer emailList={emailList} subscribers={subscribers} />
      </section>
    </AuthenticatedLayout>
  )
}
