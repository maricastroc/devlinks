import { UserProps } from './user';

export type TemplateProps = {
  user_id: number;
  id: number;
  name: string;
  body: string;
  deleted_at: string | null;
  user: UserProps;
};
