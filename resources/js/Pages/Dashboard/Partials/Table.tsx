import * as Dialog from '@radix-ui/react-dialog'
import { Link } from '@inertiajs/react'
import { Info, PencilSimple, TrashSimple } from 'phosphor-react'
import { useState } from 'react'
import { DeleteModal } from '@/Components/DeleteModal'
import { CampaignsResults } from '../Index'

type Props = {
  campaigns: CampaignsResults
}

type CampaignRowProps = {
  campaign: CampaignsResults['data'][0]
}

const CampaignRow = ({ campaign }: CampaignRowProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const textStyle =
    campaign.deleted_at === null ? 'text-gray-300' : 'text-red-400'

  return (
    <tr key={campaign.id} className="border-b-zinc-800">
      <td className={`py-2 text-medium ${textStyle}`}>{campaign.id}</td>
      <td className={`py-2 text-medium ${textStyle}`}>{campaign.name}</td>
      <td className={`py-2 text-medium ${textStyle}`}>
        {campaign.email_list.title}
      </td>
      <td className={`py-2 text-medium ${textStyle}`}>
        {campaign.template.name}
      </td>
      <td className="text-gray-300">
        {campaign.deleted_at === null ? (
          <div className="flex items-center h-full gap-3">
            <Link
              className="transition-all duration-150 hover:text-blue-500"
              href={route('lists.show', { list: campaign.id })}
            >
              <Info size={16} />
            </Link>
            <Link
              className="transition-all duration-150 hover:text-blue-500"
              href={route('lists.edit', { list: campaign.id })}
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
                entity="campaign"
                campaign={campaign}
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

export function Table({ campaigns }: Props) {
  return (
    <div className="px-3 py-5 lg:mt-3 overflow-auto lg:p-5 mt-7 rounded-lg lg:h-[18rem] bg-background-tertiary text-content">
      <table className="table overflow-y-scroll text-content table-md">
        <thead>
          <tr className="border-b-zinc-800">
            <th className="text-content text-medium w-[10%]">ID</th>
            <th className="text-content text-medium w-[30%]">Name</th>
            <th className="text-content text-medium w-[30%]">List</th>
            <th className="text-content text-medium w-[30%]">Template</th>
            <th className="flex items-center justify-center text-content text-medium">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {campaigns.data.map((campaign) => (
            <CampaignRow key={campaign.id} campaign={campaign} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
