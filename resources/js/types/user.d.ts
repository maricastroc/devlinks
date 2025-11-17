import { UserLinkProps } from './user-link';

export type UserProps = {
  id?: number;
  email?: string;
  password?: string;
  name?: string;
  avatar_url?: string | File | null;
  public_email?: string;
  username?: string;
  user_links: UserLinkProps[];
  social_links: UserLinkProps[];
  bio?: string;
};
