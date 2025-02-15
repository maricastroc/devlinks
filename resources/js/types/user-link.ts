import { PlatformProps } from './platform';
import { UserProps } from './user';

export type UserLinkProps = {
  id: number | string;
  user_id?: number;
  user?: UserProps;
  platform_id: number;
  platform: PlatformProps;
  url?: string | null;
};
