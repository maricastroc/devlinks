import { PlatformProps } from './platform';
import { UserProps } from './user';

export type UserLinkProps = {
  id: number;
  user_id?: number;
  user?: UserProps;
  platform_id: number;
  platform: PlatformProps;
  url?: string | null;
  custom_name?: string;
  custom_icon?: string;
  custom_color?: string;
};
