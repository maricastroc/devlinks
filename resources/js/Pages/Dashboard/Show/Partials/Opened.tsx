import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { EmailListProps } from '@/types/emailList';
import SearchInput from '@/Components/SearchInput';
import { Table } from './Table';
import { PaginationSection } from './PaginationSection';
import { CampaignMailsResult } from '../Index';

type Props = {
  emailList: EmailListProps;
  campaignMails: CampaignMailsResult;
};

export default function Opened({ emailList, campaignMails }: Props) {
  const [search, setSearch] = useState('');

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

      <Table campaignMails={campaignMails} />

      <PaginationSection
        emailList={emailList}
        campaignMails={campaignMails}
        search={search}
      />
    </div>
  );
}
