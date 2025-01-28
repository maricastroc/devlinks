import { CampaignProps } from "@/types/campaign"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { format } from "date-fns"

type Props = {
  campaign: CampaignProps
}

const StatItem = ({ value, label }: { value: string | number, label: string }) => (
  <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-background-tertiary">
    <h2 className="text-4xl text-white">{value}</h2>
    <p>{label}</p>
  </div>
)

export const Statistics = ({ campaign }: Props) => {
  const { name, email_list, send_at } = campaign;

  return (
    <>
      <div className="flex items-start mb-10 gap-2 p-3 text-white bg-accent-green-dark rounded-xl text-[0.95rem]">
        <FontAwesomeIcon icon={faCircleCheck} fontSize={18} className="mt-1" />
        <p className="leading-6">
  Your campaign, <span className="font-bold">{name}</span>, was sent to 
  <span className="font-bold"> {email_list.subscribers.length} subscribers</span> of 
  the <span className="font-bold">{email_list.title}</span> list on 
  <span className="font-bold"> {format(send_at, 'MMMM d, yyyy, hh:mm a')}</span>.
</p>
      </div>

      <div className="grid grid-cols-[1fr,1fr,1fr] w-full gap-6">
        <StatItem value={2} label="Opens" />
        <StatItem value={2} label="Unique Opens" />
        <StatItem value="2%" label="Open Rate" />
        <StatItem value={2} label="Clicks" />
        <StatItem value={2} label="Unique Clicks" />
        <StatItem value="2%" label="Clicks Rate" />
      </div>
    </>
  );
}
