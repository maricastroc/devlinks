import { CampaignMailsResult } from '../Index';

type Props = {
  campaignMails: CampaignMailsResult;
  variant: 'clicks' | 'opens';
  showOpens: boolean;
  showClicks: boolean;
};

type MailRowProps = {
  campaignMail: CampaignMailsResult['data'][0];
  variant: 'clicks' | 'opens';
  showOpens: boolean;
  showClicks: boolean;
};

const CampaignMailRow = ({ showOpens, showClicks, campaignMail, variant }: MailRowProps) => {
  return (
    <tr key={campaignMail.id} className="border-b border-zinc-800">
      <td
        className={`flex items-center justify-center py-2 w-[8%] text-medium text-gray-300`}
      >
        {variant === 'clicks' ? (showClicks ? campaignMail.clicks : '-') : (showOpens ? campaignMail.opens : '-')}
      </td>
      <td className={`py-2 text-medium text-gray-300 w-[46%]`}>
        {campaignMail.subscriber.name}
      </td>
      <td className={`py-2 text-medium text-gray-300 w-[46%]`}>
        {campaignMail.subscriber.email}
      </td>
    </tr>
  );
};

export function Table({ campaignMails, variant, showOpens, showClicks }: Props) {
  return (
    <div className="px-3 py-5 lg:mt-5 lg:max-h-[42vh] overflow-auto rounded-lg lg:p-5 mt-7 bg-background-tertiary text-content">
      {campaignMails?.data?.length ? (
        <table className="table w-full text-content">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="flex items-center justify-center py-2 text-medium w-[8%]">
                {variant === 'clicks' ? 'Clicks' : 'Opens'}
              </th>
              <th className="py-2 text-medium w-[46%]">Name</th>
              <th className="py-2 text-medium w-[46%]">E-mail</th>
            </tr>
          </thead>
          <tbody>
            {campaignMails.data.map((campaignMail) => (
              <CampaignMailRow
                key={campaignMail.id}
                showClicks={showClicks}
                showOpens={showOpens}
                campaignMail={campaignMail}
                variant={variant}
              />
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
