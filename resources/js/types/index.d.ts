export type User = {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  username?: string;
};

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    user: User;
  };
};
