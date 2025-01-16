import * as Dialog from '@radix-ui/react-dialog'
import { Link } from '@inertiajs/react'
import { Info, PencilSimple, TrashSimple } from 'phosphor-react'
import { EmailListsResult } from '../Index'
import { useState } from 'react'
import { DeleteModal } from '@/Components/DeleteModal'

type Props = {
  emailLists: EmailListsResult
}

type ListRowProps = {
  list: EmailListsResult['data'][0]
}

const ListRow = ({ list }: ListRowProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const textStyle = list.deleted_at === null ? 'text-gray-300' : 'text-red-400'

  return (
    <tr key={list.id} className="border-b-zinc-800">
      <td className={`py-2 text-medium ${textStyle}`}>{list.id}</td>
      <td className={`py-2 text-medium ${textStyle}`}>{list.title}</td>
      <td className={`py-2 text-medium ${textStyle}`}>
        {list.subscribers.length}
      </td>
      <td className="flex items-center justify-center text-gray-300">
        {list.deleted_at === null ? (
          <div className="flex items-center gap-3">
            <Link
              className="transition-all duration-150 hover:text-blue-500"
              href={route('lists.show', { list: list.id })}
            >
              <Info size={16} />
            </Link>
            <Link
              className="transition-all duration-150 hover:text-blue-500"
              href={route('lists.edit', { list: list.id })}
            >
              <PencilSimple size={16} />
            </Link>
            <Dialog.Root open={isDeleteModalOpen}>
              <Dialog.Trigger asChild>
                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="transition-all duration-150 hover:text-red-500"
                >
                  <TrashSimple size={16} />
                </button>
              </Dialog.Trigger>
              <DeleteModal
                entity="list"
                emailList={list}
                closeModal={() => setIsDeleteModalOpen(false)}
              />
            </Dialog.Root>
          </div>
        ) : (
          <div className="text-xs text-gray-100 bg-red-700 badge">deleted</div>
        )}
      </td>
    </tr>
  )
}

export function Table({ emailLists }: Props) {
  return (
    <div className="px-3 py-5 lg:mt-3 overflow-auto lg:p-5 mt-7 rounded-lg lg:h-[15rem] bg-background-tertiary text-content">
      <table className="table overflow-y-scroll text-content table-md">
        <thead>
          <tr className="border-b-zinc-800">
            <th className="text-content text-medium w-[20%]">ID</th>
            <th className="text-content text-medium w-[30%]">List</th>
            <th className="text-content text-medium w-[30%]">Subscribers</th>
            <th className="flex items-center justify-center text-content text-medium">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {emailLists.data.map((list) => (
            <ListRow key={list.id} list={list} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
