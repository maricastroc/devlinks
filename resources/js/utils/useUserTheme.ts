import { useEffect } from 'react';
import { ThemeProps } from '@/types/theme';
import { DEFAULT_THEME } from '@/utils/constants';
import { useTheme } from '@/contexts/ThemeContext';

type UseUserThemeProps = {
  userTheme?: ThemeProps | null;
  themes: ThemeProps[];
};

export const useUserTheme = ({ userTheme, themes }: UseUserThemeProps) => {
  const { handleChangeTheme } = useTheme();

  useEffect(() => {
    if (userTheme) {
      handleChangeTheme(userTheme);
    } else {
      const defaultTheme = themes.find((theme) => theme.name === DEFAULT_THEME);

      if (defaultTheme) {
        handleChangeTheme(defaultTheme);
      }
    }
  }, [userTheme, themes, handleChangeTheme]);
};
