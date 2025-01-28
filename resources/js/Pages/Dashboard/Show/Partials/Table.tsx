import { SubscribersResult } from '@/Pages/EmailLists/Show';

type Props = {
  subscribers: SubscribersResult;
};

type SubscriberRowProps = {
  subscriber: SubscribersResult['data'][0];
};

const SubscriberRow = ({ subscriber }: SubscriberRowProps) => {
  return (
    <tr key={subscriber.id} className="border-b border-zinc-800">
      <td
        className={`flex items-center justify-center py-2 w-[8%] text-medium text-gray-300`}
      >
        {'2'}
      </td>
      <td className={`py-2 text-medium text-gray-300 w-[46%]`}>
        {subscriber.name}
      </td>
      <td className={`py-2 text-medium text-gray-300 w-[46%]`}>
        {subscriber.email}
      </td>
    </tr>
  );
};

export function Table({ subscribers }: Props) {
  return (
    <div className="px-3 py-5 lg:mt-5 lg:max-h-[42vh] overflow-auto rounded-lg lg:p-5 mt-7 bg-background-tertiary text-content">
      {subscribers?.data?.length ? (
        <table className="table w-full text-content">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="flex items-center justify-center py-2 text-medium w-[8%]">
                Clicks
              </th>
              <th className="py-2 text-medium w-[46%]">Name</th>
              <th className="py-2 text-medium w-[46%]">E-mail</th>
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
          <p className="text-gray-400">
            We couldn&apos;t find any subscribers.
          </p>
        </div>
      )}
    </div>
  );
}
