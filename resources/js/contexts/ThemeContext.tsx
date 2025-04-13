import { ThemeProps } from '@/types/theme';
import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

type ThemeContextType = {
  handleThemeSelect: (theme: ThemeProps) => void;
  currentTheme: ThemeProps | null;
  handleChangeTheme: (theme: ThemeProps) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeProps | null>(null);

  const handleChangeTheme = (theme: ThemeProps) => {
    setCurrentTheme(theme);
  };

  const handleThemeSelect = async (theme: ThemeProps) => {
    const previousTheme = currentTheme;

    setCurrentTheme(theme);

    const formData = new FormData();
    formData.append('theme_id', String(theme.id));

    formData.append('_method', 'PATCH');

    try {
      const response = await axios.post(
        route('profile.theme.update'),
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (response.status === 200) {
        toast?.success(response.data.message);
      }
    } catch (error) {
      toast?.error('Failed to update theme. Rolling back...');

      setCurrentTheme(previousTheme);

      console.error('Error updating theme:', error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{ currentTheme, handleChangeTheme, handleThemeSelect }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext };
