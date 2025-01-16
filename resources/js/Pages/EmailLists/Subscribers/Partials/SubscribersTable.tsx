import { Link } from '@inertiajs/react'
import { PencilSimple, TrashSimple } from 'phosphor-react'
import { SubscribersResult } from '../../Show'
import { useState } from 'react'
import { DeleteModal } from '@/Components/DeleteModal'
import * as Dialog from '@radix-ui/react-dialog'

type Props = {
  subscribers: SubscribersResult
}

type SubscriberRowProps = {
  subscriber: SubscribersResult['data'][0]
}

const SubscriberRow = ({ subscriber }: SubscriberRowProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const textStyle = subscriber.deleted_at === null ? 'text-gray-300' : 'text-red-400'

  return (
    <tr key={subscriber.id} className="border-b border-zinc-800">
      <td className={`py-2 text-medium ${textStyle}`}>{subscriber.name}</td>
      <td className={`py-2 text-medium ${textStyle}`}>{subscriber.email}</td>
      <td className="text-gray-300">
        <div className="flex items-center gap-3">
          {subscriber.deleted_at === null && (
            <>
              <Link
                className="transition-all duration-150 hover:text-blue-500"
                href={route('subscribers.edit', {
                  subscriber: subscriber.id,
                  list: subscriber.email_list_id,
                })}
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
                  entity="subscriber"
                  subscriber={subscriber}
                  closeModal={() => setIsDeleteModalOpen(false)}
                />
              </Dialog.Root>
            </>
          )}
        </div>
      </td>
    </tr>
  )
}

export function SubscribersTable({ subscribers }: Props) {
  return (
    <div className="px-3 py-5 overflow-auto rounded-lg lg:p-5 lg:mt-3 mt-7 bg-background-tertiary text-content">
      <div className="overflow-y-auto lg:max-h-[43vh]">
        {subscribers?.data?.length ? (
          <table className="table w-full text-content">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="py-2 text-medium">Name</th>
                <th className="py-2 text-medium">E-mail</th>
                <th className="py-2 text-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.data.map((subscriber) => (
                <SubscriberRow key={subscriber.id} subscriber={subscriber} />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex items-center justify-center">
            <p className="text-gray-400">We couldn&apos;t find any subscribers.</p>
          </div>
        )}
      </div>
    </div>
  )
}
