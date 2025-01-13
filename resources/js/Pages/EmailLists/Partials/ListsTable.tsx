import { EmailListProps } from "@/types/emailList"
import { Link } from '@inertiajs/react'
import { Info, PencilSimple, TrashSimple } from "phosphor-react"

type Props = {
  emailLists: EmailListProps[]
}

export function ListsTable({ emailLists }: Props) {
  return (
    <div className="px-5 py-5 mt-7 rounded-lg lg:h-[15rem] bg-background-tertiary text-content">
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
                            href={route('lists.show', { emailList: list.id })}
                          >
                            <Info size={16} />
                          </Link>
                          <Link
                            className={
                              'hover:text-blue-500 transition-all duration-150'
                            }
                            href={route('lists.edit', { emailList: list.id })}
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
  )
}