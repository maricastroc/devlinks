/* eslint-disable react-hooks/exhaustive-deps */
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, router, Link } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { EmailListProps } from '@/types/emailList'
import LinkButton from '@/Components/LinkButton'
import { SubscriberProps } from '@/types/subscriber'
import SearchInput from '@/Components/SearchInput'
import { PaginationContainer } from './Partials/PaginationContainer'
import { SubscribersTable } from './Partials/SubscribersTable'

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
          route('lists.show', { emailList: emailList.id }),
          {},
          {
            preserveState: true,
            preserveScroll: true,
            replace: true,
          },
        )
      } else {
        router.get(
          route('lists.show', {
            emailList: emailList.id,
            search,
          }),
          {},
          {
            preserveState: true,
            preserveScroll: true,
            replace: true,
          },
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
      <div className="flex flex-col">
        <Link href={route('lists')} className="mb-2 ml-1 text-xs text-gray-400">
          {`Lists > `}
          <Link
            href={route('lists.show', { emailList: emailList.id })}
            className="text-gray-200"
          >
            Show
          </Link>
        </Link>

        <section className="lg:max-h-[78vh] p-8 w-[45rem] rounded-xl bg-background-secondary">
          <div className="grid grid-cols-[1fr,2.5fr] gap-4">
            <LinkButton
              href={route('lists.show.add-subscriber', {
                emailList: emailList.id,
              })}
            >
              Add Subscriber
            </LinkButton>
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

          <SubscribersTable subscribers={subscribers} />

          <PaginationContainer
            emailList={emailList}
            subscribers={subscribers}
          />
        </section>
      </div>
    </AuthenticatedLayout>
  )
}
