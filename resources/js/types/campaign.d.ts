import { EmailListProps } from './emailList';
import { TemplateProps } from './template';
import { UserProps } from './user';

export type CampaignProps = {
  id: number;
  user_id: number;
  email_list_id: number;
  template_id: number;
  name: string;
  subject: string;
  body: string;
  track_open: boolean;
  track_click: boolean;
  send_at: Date;
  deleted_at: string | null;
  email_list: EmailListProps;
  user: UserProps;
  template: TemplateProps;
  customize_send_at: boolean;
  status?: string;
};
