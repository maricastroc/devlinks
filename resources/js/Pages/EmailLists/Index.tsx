/* eslint-disable react-hooks/exhaustive-deps */
import { EmptyContainer } from '@/Components/EmptyContainer'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, usePage, router } from '@inertiajs/react'
import EmptySvg from 'assets/empty_lists.svg'
import { useEffect, useState } from 'react'
import { notyf } from '@/libs/notyf'
import { EmailListProps } from '@/types/emailList'
import TextInput from '@/Components/TextInput'
import LinkButton from '@/Components/LinkButton'
import { PencilSimple, TrashSimple } from 'phosphor-react'
import { useDebounce } from '@react-hook/debounce'

interface Props {
  emailLists: EmailListProps[]
}

export default function EmailList({ emailLists }: Props) {
  const { props } = usePage()

  const [search, setSearch] = useState('')

  const [debouncedSearch, setDebouncedSearch] = useDebounce('', 500)

  const { success, error } = props

  useEffect(() => {
    if (success) {
      notyf?.success(success)
    } else if (error) {
      notyf?.error(error)
    }
  }, [success])

  useEffect(() => {
    setDebouncedSearch(search)
  }, [search])

  useEffect(() => {
    if (debouncedSearch === '' && search === '') {
      router.get(
        route('lists'),
        {},
        {
          preserveState: true,
          preserveScroll: true,
          replace: true,
        },
      )
    } else if (debouncedSearch !== '') {
      router.get(
        route('lists', {
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

      {(emailLists?.length > 0 && search === '') || search !== '' ? (
        <section className="p-8 w-[45rem] rounded-xl bg-background-secondary">
          <div className="grid grid-cols-[1fr,3.5fr] gap-4">
            <LinkButton href="lists/create">Create List</LinkButton>
            <TextInput
              id="search"
              name="search"
              className="block w-full py-2"
              placeholder="Search for a list"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              spellCheck={false}
            />
          </div>

          <div className="px-5 py-5 mt-10 rounded-lg lg:h-[15rem] bg-background-tertiary text-content">
            <table className="table overflow-y-scroll text-content table-md">
              <thead>
                <tr className="border-b-zinc-800">
                  <th className="text-content text-medium w-[20%]">ID</th>
                  <th className="text-content text-medium w-[30%]">List</th>
                  <th className="text-content text-medium w-[30%]">
                    Subscribers
                  </th>
                  <th className="text-content text-medium w-[20%]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {emailLists.map((list) => {
                  return (
                    <tr key={list.id} className="border-b-zinc-800">
                      <td className="text-gray-300 text-medium">{list.id}</td>
                      <td className="text-gray-300 text-medium">
                        {list.title}
                      </td>
                      <td className="text-gray-300 text-medium">
                        {list.subscribers.length}
                      </td>
                      <td className="text-gray-300">
                        <div className="flex items-center gap-3">
                          <Link
                            className={
                              'hover:text-blue-500 transition-all duration-150'
                            }
                            href={`lists/edit/${list.id}`}
                          >
                            <PencilSimple size={16} />
                          </Link>
                          <button
                            className={
                              'hover:text-red-500 transition-all duration-150'
                            }
                          >
                            <TrashSimple size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
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
