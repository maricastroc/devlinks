import { Link } from "@inertiajs/react"
import { PencilSimple, TrashSimple } from "phosphor-react"
import { SubscribersResult } from "../../Show"
import { useState } from "react"
import { DeleteModal } from "@/Components/DeleteModal"
import * as Dialog from '@radix-ui/react-dialog';

type Props = {
  subscribers: SubscribersResult
}

export function SubscribersTable({ subscribers }: Props) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  
  return (
    <div className="px-5 py-5 rounded-lg mt-7 bg-background-tertiary text-content">
          <div className="overflow-y-auto max-h-[43vh]">
            {subscribers?.data?.length ? (
              <table className="table w-full text-content">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="py-2 text-content text-medium">Name</th>
                    <th className="py-2 text-content text-medium">E-mail</th>
                    <th className="py-2 text-content text-medium">Actions</th>
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
                        <td className="text-gray-300">
                        <div className="flex items-center gap-3">
                          <Link
                            className={
                              'hover:text-blue-500 transition-all duration-150'
                            }
                            href={route('subscribers.edit', { subscriber: subscriber.id, list: subscriber.email_list_id })}
                          >
                            <PencilSimple size={16} />
                          </Link>
                          <Dialog.Root open={isDeleteModalOpen}>
                            <Dialog.Trigger asChild>
                            <button
                            onClick={() => setIsDeleteModalOpen(true)}
                            className={
                              'hover:text-red-500 transition-all duration-150'
                            }
                          >
                            <TrashSimple size={16} />
                          </button>
                            </Dialog.Trigger>
                            <DeleteModal entity="subscriber" subscriber={subscriber} closeModal={() => setIsDeleteModalOpen(false)} />
                          </Dialog.Root>
                        </div>
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
  )
}