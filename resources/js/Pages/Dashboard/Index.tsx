import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import EmptySvg from '/public/assets/empty_campaign.svg';
import { EmptyContainer } from '@/Components/EmptyContainer';
import { CampaignProps } from '@/types/campaign';
import { useEffect, useState } from 'react';
import TertiaryButton from '@/Components/TertiaryButton';
import SearchInput from '@/Components/SearchInput';
import Checkbox from '@/Components/Checkbox';
import { Table } from './Partials/Table';
import { PaginationSection } from './Partials/PaginationSection';

export type CampaignsResults = {
  data: CampaignProps[];
  total: number;
  current_page: number;
  per_page: number;
  next_page_url: string;
  prev_page_url: string;
  to: number;
  from: number;
};

type Props = {
  campaigns: CampaignsResults;
};

export default function Dashboard({ campaigns }: Props) {
  const [search, setSearch] = useState('');

  const [withTrashed, setWithTrashed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search === '') {
        router.get(
          route('dashboard'),
          {},
          {
            preserveState: true,
            preserveScroll: true,
            replace: true
          }
        );
      } else {
        router.get(
          route('dashboard', {
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

  useEffect(() => {
    const timer = setTimeout(() => {
      router.get(
        route('dashboard', {
          search,
          withTrashed: withTrashed ? 1 : 0
        }),
        {},
        {
          preserveState: true,
          preserveScroll: true,
          replace: true
        }
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [search, withTrashed]);

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      {(campaigns?.data.length > 0 && search === '') || search !== '' ? (
        <div className="flex flex-col pb-12">
          <Link
            href={route('dashboard')}
            className="w-[2rem] mt-10 mb-2 ml-1 text-xs text-gray-400"
          >
            Campaigns
          </Link>
          <section className="w-[90vw] max-w-[55rem] lg:max-w-[60rem] p-5 py-7 lg:p-8 rounded-xl bg-background-secondary">
            <div className="flex flex-col lg:grid lg:grid-cols-[1fr,3.9fr] gap-4">
              <TertiaryButton
                isBigger
                onClick={() => router.get(route('campaigns.create'))}
              >
                Create Campaign
              </TertiaryButton>
              <SearchInput
                id="search"
                name="search"
                className="block w-full py-2"
                placeholder="Search by name, ID, list or template"
                value={search}
                search={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearch(e.target.value);
                }}
                onReset={() => setSearch('')}
              />
            </div>

            <div className="block mt-4">
              <label className="flex items-center">
                <Checkbox
                  name="remember"
                  checked={withTrashed}
                  onChange={() => setWithTrashed(!withTrashed)}
                />
                <span className="text-sm text-gray-600 ms-2 dark:text-gray-400">
                  Show deleted records?
                </span>
              </label>
            </div>

            <Table campaigns={campaigns} />

            <PaginationSection
              withTrashed={withTrashed}
              search={search}
              campaigns={campaigns}
            />
          </section>
        </div>
      ) : (
        <EmptyContainer
          imagePath={EmptySvg}
          url="/"
          content="It looks like you haven't created any campaigns yet."
          title="Create Campaign"
        />
      )}
    </AuthenticatedLayout>
  );
}
