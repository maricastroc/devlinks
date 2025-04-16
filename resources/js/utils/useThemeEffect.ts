import { useEffect } from 'react';
import { DEFAULT_THEME } from './constants';
import { ThemeProps } from '@/types/theme';
import { UserProps } from '@/types/user';

type Props = {
  themes: ThemeProps[] | undefined;
  user: UserProps | undefined;
  handleChangeTheme: (theme: ThemeProps) => void;
};

export function useThemeEffect({ user, themes, handleChangeTheme }: Props) {
  useEffect(() => {
    if (user) {
      const theme =
        user?.theme || themes?.find((t) => t.name === DEFAULT_THEME);
      if (theme) handleChangeTheme(theme);
    }
  }, [user?.theme]);
}
