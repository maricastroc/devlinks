import { SubscribersResult } from "../Show"

type Props = {
  subscribers: SubscribersResult
}

export function SubscribersTable({ subscribers }: Props) {
  return (
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
  )
}