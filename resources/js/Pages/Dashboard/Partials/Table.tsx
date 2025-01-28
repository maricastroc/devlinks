import * as Dialog from '@radix-ui/react-dialog';
import { Link } from '@inertiajs/react';
import { Info, PencilSimple, TrashSimple } from 'phosphor-react';
import { useState } from 'react';
import { DeleteModal } from '@/Components/DeleteModal';
import { CampaignsResults } from '../Index';
import axios from 'axios';
import { notyf } from '@/libs/notyf';
import { Inertia } from '@inertiajs/inertia';
import { handleReqError } from '@/utils/handleReqError';

type Props = {
  campaigns: CampaignsResults;
};

type CampaignRowProps = {
  campaign: CampaignsResults['data'][0];
};

const CampaignRow = ({ campaign }: CampaignRowProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const textStyle =
    campaign.deleted_at === null ? 'text-gray-300' : 'text-red-400';

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return (
          <div className="text-xs font-semibold text-gray-800 bg-gray-200 badge">
            {status}
          </div>
        );
      case 'sent':
        return (
          <div className="text-xs font-semibold text-gray-100 bg-accent-blue-mid badge">
            {status}
          </div>
        );
      case 'scheduled':
        return (
          <div className="text-xs font-semibold text-gray-100 bg-accent-purple-dark badge">
            {status}
          </div>
        );
      default:
        return (
          <div className="text-xs font-semibold text-gray-800 bg-gray-200 badge">
            {status}
          </div>
        );
    }
  };

  const handleRestore = async () => {
    try {
      const url = route('campaigns.restore', { id: campaign.id });

      const response = await axios({
        method: 'put',
        url,
      });

      if (response?.data.message) {
        await new Promise((resolve) => {
          notyf?.success(response?.data?.message);
          setTimeout(resolve, 2000);
        });

        Inertia.visit(route('dashboard'));
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.errors) {
        notyf?.error(error.response.data.message);
      } else {
        handleReqError(error);
      }
    }
  };

  return (
    <tr key={campaign.id} className="border-b-zinc-800">
      <td className={`py-2 text-medium ${textStyle}`}>{campaign.id}</td>
      <td className={`py-2 text-medium ${textStyle}`}>
        {getStatusBadge(campaign?.status || '')}
      </td>
      <td className={`py-2 text-medium ${textStyle}`}>{campaign.name}</td>
      <td className={`py-2 text-medium ${textStyle}`}>
        {campaign.email_list.title}
      </td>
      <td className={`py-2 text-medium ${textStyle}`}>
        {campaign.template.name}
      </td>
      <td className="flex items-center text-gray-300">
        {campaign.deleted_at === null ? (
          <div className="flex items-center w-full h-full gap-2 justify-evenly">
            <Link
              className="transition-all duration-150 hover:text-blue-500"
              href={route('lists.show', { list: campaign.id })}
            >
              <Info size={16} />
            </Link>
            <Link
              className="transition-all duration-150 hover:text-blue-500"
              href={route('campaigns.edit', { campaign: campaign.id })}
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
          <div className='flex items-center justify-center w-full'>
            <button onClick={handleRestore} className="flex items-center justify-center text-xs text-gray-100 transition-all duration-150 bg-transparent border border-gray-200 hover:border-white hover:text-white badge">restore</button>
          </div>
        )}
      </td>
    </tr>
  );
};

export function Table({ campaigns }: Props) {
  return (
    <div className="px-3 py-5 lg:mt-5 lg:max-h-[45vh] overflow-auto rounded-lg lg:p-5 mt-7 bg-background-tertiary text-content">
      <table className="table overflow-scroll text-content table-md">
        <thead>
          <tr className="border-b-zinc-800">
            <th className="text-content text-medium">ID</th>
            <th className="text-content text-medium">Status</th>
            <th className="text-content text-medium">Name</th>
            <th className="text-content text-medium">List</th>
            <th className="text-content text-medium">Template</th>
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
  );
}
