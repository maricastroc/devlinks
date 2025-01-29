import { CampaignProps } from '@/types/campaign';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import { CampaignMailsResult, StatisticsProps } from '../Index';

type Props = {
  campaign: CampaignProps;
  campaignMails: CampaignMailsResult;
  statistics: StatisticsProps;
};

const StatItem = ({
  value,
  label
}: {
  value: string | number;
  label: string;
}) => (
  <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-background-tertiary">
    <h2 className="text-4xl text-white">{value}</h2>
    <p>{label}</p>
  </div>
);

export const Statistics = ({ campaign, campaignMails, statistics }: Props) => {
  const { name, email_list, send_at } = campaign;

  const sentReport = () => {
    return (
      <div className="flex items-start mb-10 gap-2 p-3 text-white bg-accent-green-dark rounded-xl text-[0.95rem]">
        <FontAwesomeIcon icon={faCircleCheck} fontSize={18} className="mt-1" />
        <p className="leading-6">
          Your campaign, <span className="font-bold">{name}</span>, was sent to
          <span className="font-bold">
            {' '}
            {campaignMails?.total} subscribers
          </span>{' '}
          of the <span className="font-bold">{email_list.title}</span> list on
          <span className="font-bold">
            {' '}
            {format(send_at, 'MMMM d, yyyy, hh:mm a')}
          </span>
          .
        </p>
      </div>
    );
  };

  const unsentReport = () => {
    return (
      <div className="flex items-start mb-10 gap-2 p-3 text-white bg-accent-green-dark rounded-xl text-[0.95rem]">
        <FontAwesomeIcon icon={faCircleCheck} fontSize={18} className="mt-1" />
        <p className="leading-6">
          Your campaign, <span className="font-bold">{name}</span>, is scheduled
          to be sent to
          <span className="font-bold">
            {' '}
            {campaign?.email_list?.subscribers?.length} subscribers
          </span>{' '}
          of the <span className="font-bold">{email_list.title}</span> list on
          <span className="font-bold">
            {' '}
            {format(send_at, 'MMMM d, yyyy, hh:mm a')}
          </span>
          .
        </p>
      </div>
    );
  };

  return (
    <>
      {campaign.status === 'sent' ? sentReport() : unsentReport()}

      <div className="grid grid-cols-[1fr,1fr,1fr] w-full gap-6">
        <StatItem value={statistics.total_opens} label="Opens" />
        <StatItem value={statistics.unique_opens} label="Unique Opens" />
        <StatItem value={statistics.open_rate} label="Open Rate" />
        <StatItem value={statistics.total_clicks} label="Clicks" />
        <StatItem value={statistics.unique_clicks} label="Unique Clicks" />
        <StatItem value={statistics.click_rate} label="Clicks Rate" />
      </div>
    </>
  );
};
