import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { EmailListProps } from '@/types/emailList';
import { SubscriberProps } from '@/types/subscriber';
import SearchInput from '@/Components/SearchInput';
import { PaginationSection } from './Subscribers/Partials/PaginationSection';
import { Table } from './Subscribers/Partials/Table';
import Checkbox from '@/Components/Checkbox';
import TertiaryButton from '@/Components/TertiaryButton';

type LinksProps = {
  url: string;
  label: string;
  isActive: boolean;
};

export type SubscribersResult = {
  data: SubscriberProps[];
  total: number;
  links: LinksProps;
  current_page: number;
  per_page: number;
  next_page_url: string;
  prev_page_url: string;
  to: number;
  from: number;
};

type Props = {
  emailList: EmailListProps;
  subscribers: SubscribersResult;
};

export default function EmailList({ emailList, subscribers }: Props) {
  const [search, setSearch] = useState('');

  const [withTrashed, setWithTrashed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search === '') {
        router.get(
          route('lists.show', { list: emailList.id }),
          {},
          {
            preserveState: true,
            preserveScroll: true,
            replace: true
          }
        );
      } else {
        router.get(
          route('lists.show', {
            list: emailList.id,
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
        route('lists.show', {
          list: emailList.id,
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
          Lists - Show
        </h2>
      }
    >
      <Head title="List" />
      <div className="flex flex-col pb-12">
        <Link
          href={route('lists.index')}
          className="mt-10 lg:mt-7 mb-2 ml-1 text-xs text-gray-400 w-[5rem]"
        >
          {`Lists > `}
          <Link
            href={route('lists.show', { list: emailList.id })}
            className="text-gray-200"
          >
            Show
          </Link>
        </Link>

        <section className="p-5 py-7 lg:p-8 w-[90vw] max-w-[30rem] lg:max-w-[55rem] lg:w-[55rem] rounded-xl bg-background-secondary">
          <div className="flex flex-col lg:grid lg:grid-cols-[1fr,3.5fr] gap-4">
            <TertiaryButton
              isBigger
              onClick={() =>
                router.get(
                  route('subscribers.create', {
                    list: emailList.id
                  })
                )
              }
            >
              Add Subscriber
            </TertiaryButton>
            <SearchInput
              id="search"
              name="search"
              className="block w-full py-2"
              placeholder="Search by name or email"
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

          <Table subscribers={subscribers} list={emailList} />

          <PaginationSection
            emailList={emailList}
            subscribers={subscribers}
            withTrashed={withTrashed}
            search={search}
          />
        </section>
      </div>
    </AuthenticatedLayout>
  );
}
