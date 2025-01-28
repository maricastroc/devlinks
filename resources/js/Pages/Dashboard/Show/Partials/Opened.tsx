import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { EmailListProps } from '@/types/emailList';
import SearchInput from '@/Components/SearchInput';
import { SubscribersResult } from '@/Pages/EmailLists/Show';
import { Table } from './Table';
import { PaginationSection } from './PaginationSection';


type Props = {
  emailList: EmailListProps;
  subscribers: SubscribersResult;
};

export default function Opened({ emailList, subscribers }: Props) {
  const [search, setSearch] = useState('');

  return (
    <div className='flex flex-col w-full mt-[-0.8rem]'>
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

          <Table subscribers={subscribers} />

          <PaginationSection
            emailList={emailList}
            subscribers={subscribers}
            search={search}
          />
    </div>
  );
}
