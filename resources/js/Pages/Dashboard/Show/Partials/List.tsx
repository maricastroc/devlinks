import { useEffect, useState } from 'react';
import SearchInput from '@/Components/SearchInput';
import { Table } from './Table';
import { PaginationSection } from './PaginationSection';
import { CampaignMailsResult } from '../Index';
import { CampaignProps } from '@/types/campaign';
import { router } from '@inertiajs/react';

type Props = {
  campaign: CampaignProps;
  campaignMails: CampaignMailsResult;
  variant: 'clicks' | 'opens';
};

export default function List({ campaign, campaignMails, variant }: Props) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search === '') {
        router.get(
          route('campaign.statistics', {
            campaign: campaign.id
          }),
          {},
          {
            preserveState: true,
            preserveScroll: true,
            replace: true
          }
        );
      } else {
        router.get(
          route('campaign.statistics', {
            campaign: campaign.id,
            search
          }),
          {},
          {
            preserveState: true,
            preserveScroll: true,
            replace: true
          }
        );
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="flex flex-col w-full mt-[-0.8rem]">
      <SearchInput
        id="search"
        name="search"
        className="w-full py-5"
        placeholder="Search by name or email"
        value={search}
        search={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearch(e.target.value);
        }}
        onReset={() => setSearch('')}
      />

      <Table variant={variant} campaignMails={campaignMails} />

      <PaginationSection
        campaign={campaign}
        campaignMails={campaignMails}
        search={search}
      />
    </div>
  );
}
