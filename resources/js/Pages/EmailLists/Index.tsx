/* eslint-disable react-hooks/exhaustive-deps */
import { EmptyContainer } from '@/Components/EmptyContainer'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router } from '@inertiajs/react'
import EmptySvg from '/public/assets/empty_lists.svg'
import { useEffect, useState } from 'react'
import { EmailListProps } from '@/types/emailList'
import LinkButton from '@/Components/LinkButton'
import { ListsTable } from './Partials/ListsTable'
import SearchInput from '@/Components/SearchInput'
import { ListsPaginationContainer } from './Partials/ListsPaginationContainer'
import Checkbox from '@/Components/Checkbox'

export type EmailListsResult = {
  data: EmailListProps[]
  total: number
  current_page: number
  per_page: number
  next_page_url: string
  prev_page_url: string
  to: number
  from: number
}

type Props = {
  emailLists: EmailListsResult
}

export default function EmailList({ emailLists }: Props) {
  const [search, setSearch] = useState('')

  const [withTrashed, setWithTrashed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search === '') {
        router.get(
          route('lists.index'),
          {},
          {
            preserveState: true,
            preserveScroll: true,
            replace: true,
          },
        )
      } else {
        router.get(
          route('lists.index', {
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

  useEffect(() => {
    const timer = setTimeout(() => {
      router.get(
        route('lists.index', {
          search,
          withTrashed: withTrashed ? 1 : 0,
        }),
        {},
        {
          preserveState: true,
          preserveScroll: true,
          replace: true,
        },
      )
    }, 500)

    return () => clearTimeout(timer)
  }, [search, withTrashed])

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Lists
        </h2>
      }
    >
      <Head title="List" />

      {(emailLists?.data.length > 0 && search === '') || search !== '' ? (
        <div className="flex flex-col pb-12 lg:pb-0">
          <Link
            href={route('lists.index')}
            className="mt-10 mb-2 ml-1 text-xs text-gray-400 lg:mt-0"
          >
            Lists
          </Link>
          <section className="w-[90vw] max-w-[30rem] lg:max-w-[45rem] p-5 py-7 lg:p-8 lg:w-[45rem] rounded-xl bg-background-secondary">
            <div className="flex flex-col lg:grid lg:grid-cols-[1fr,3.5fr] gap-4">
              <LinkButton href={route('lists.create')}>Create List</LinkButton>
              <SearchInput
                id="search"
                name="search"
                className="block w-full py-2"
                placeholder="Search by title or ID"
                value={search}
                search={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearch(e.target.value)
                }}
                onReset={() => setSearch('')}
              />
            </div>

            <div className="block mt-4">
              <label className="flex items-center">
                <Checkbox
                  name="remember"
                  checked={withTrashed}
                  onChange={() => setWithTrashed(!withTrashed)}
                />
                <span className="text-sm text-gray-600 ms-2 dark:text-gray-400">
                  Show deleted records?
                </span>
              </label>
            </div>

            <ListsTable emailLists={emailLists} />

            <ListsPaginationContainer
              withTrashed={withTrashed}
              search={search}
              emailLists={emailLists}
            />
          </section>
        </div>
      ) : (
        <EmptyContainer
          url="/lists/create"
          imagePath={EmptySvg}
          content="It looks like you haven't created any lists yet."
          title="Create List"
        />
      )}
    </AuthenticatedLayout>
  )
}
