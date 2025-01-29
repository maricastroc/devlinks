import { CampaignProps } from './campaign';
import { SubscriberProps } from './subscriber';

export type CampaignMailProps = {
  id: number;
  campaign_id: number;
  subscriber_id: number;
  subscriber: SubscriberProps;
  campaign: CampaignProps;
  opens: number;
  clicks: number;
  send_at: Date;
};
