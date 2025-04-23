import { ThemeProps } from './theme';
import { UserLinkProps } from './user-link';

export type UserProps = {
  id?: number;
  email?: string;
  password?: string;
  name?: string;
  avatar_url?: string | File | null;
  public_email?: string;
  username?: string;
  template: string;
  theme?: ThemeProps;
  theme_id?: number;
  user_links: UserLinkProps[];
  social_links: UserLinkProps[];
  bio?: string;
  custom_bg_type?: string;
  custom_bg_color?: string;
  custom_font?: string;
};
