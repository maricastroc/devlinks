import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { TemplateProps } from '@/types/template';
import SecondaryButton from '@/Components/SecondaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CampaignProps } from '@/types/campaign';
import { CheckCircle } from 'phosphor-react';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { format } from 'date-fns';
import { Statistics } from './Partials/Statistics';
import { SubscribersResult } from '@/Pages/EmailLists/Show';
import Opened from './Partials/Opened';

type Props = {
  campaign: CampaignProps;
  subscribers: SubscribersResult;
};

export default function Index({ campaign, subscribers }: Props) {
  const [activeTab, setActiveTab] = useState('statistics')

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Lists
        </h2>
      }
    >
      <Head title="List" />

      <div className="flex flex-col gap-2">
      <Link
          href={route('dashboard')}
          className="mt-10 lg:mt-7 mb-2 ml-1 text-xs text-gray-400 w-[8rem]"
        >
          {`Campaigns > `}
          <Link
            href={route('campaign.statistics', { campaign: campaign.id })}
            className="text-gray-200"
          >
            Show
          </Link>
        </Link>
        <section
          className={`mb-8 p-5 py-7 lg:p-8 w-[90vw] lg:min-h-[28rem] max-w-[50rem] rounded-xl bg-background-secondary flex flex-col items-start justify-start`}
        >
          <div className='flex items-start justify-start gap-4 mb-8 text-left text-[0.95rem]'>
            <button onClick={() => setActiveTab('statistics')} className={`${activeTab === 'statistics' ? 'text-white border-b-2 font-bold border-b-accent-blue-mid pb-1' : 'text-gray-400'}`}>Statistics</button>
            <button onClick={() => setActiveTab('opened')} className={`${activeTab === 'opened' ? 'text-white border-b-2 font-bold border-b-accent-blue-mid pb-1' : 'text-gray-400'}`}>Opened</button>
            <button onClick={() => setActiveTab('clicked')} className={`${activeTab === 'clicked' ? 'text-white border-b-2 font-bold border-b-accent-blue-mid pb-1' : 'text-gray-400'}`}>Clicked</button>
          </div>

          {activeTab === 'statistics' && (
            <Statistics campaign={campaign} />
          )}

          {activeTab === 'opened' && (
            <Opened subscribers={subscribers} emailList={campaign.email_list}/>
          )}
        </section>
      </div>
    </AuthenticatedLayout>
  );
}
