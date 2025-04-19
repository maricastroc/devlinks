import { api } from '@/libs/axios';
import { ThemeProps } from '@/types/theme';
import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

type ThemeContextType = {
  handleThemeSelect: (theme: ThemeProps) => void;
  currentTheme: ThemeProps | null;
  handleChangeTheme: (theme: ThemeProps) => void;
  showThemeDropdown: boolean;
  handleShowThemeDropdown: (value: boolean) => void;
  isLoading: boolean;
  updateThemeStyles: (
    selectedType: string,
    selectedColor: string,
    theme: ThemeProps,
    styleConfig: {
      background?: {
        type: 'solid' | 'gradient';
        value: string;
      };
      linkCard?: {
        borderRadius?: string;
        border?: string;
        backgroundColor?: string;
        color?: string;
      };
      icon?: {
        filter?: string;
      };
    }
  ) => Promise<ThemeProps | undefined>;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [currentTheme, setCurrentTheme] = useState<ThemeProps | null>(null);

  const [showThemeDropdown, setShowThemeDropdown] = useState(false);

  const handleShowThemeDropdown = (value: boolean) => {
    setShowThemeDropdown(value);
  };

  const handleChangeTheme = (theme: ThemeProps) => {
    setCurrentTheme(theme);
  };

  const handleThemeSelect = async (theme: ThemeProps) => {
    const previousTheme = currentTheme;

    setCurrentTheme(theme);

    try {
      setIsLoading(true);

      const response = await api.put(`profile/theme`, {
        theme_id: String(theme.id)
      });

      if (response.status === 200) {
        toast?.success(response.data.message);
      }
    } catch (error) {
      toast?.error('Failed to update theme. Rolling back...');

      setCurrentTheme(previousTheme);

      console.error('Error updating theme:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateThemeStyles = async (
    selectedType: string,
    selectedColor: string,
    theme: ThemeProps,
    styleConfig: {
      background?: {
        type: 'solid' | 'gradient';
        value: string;
      };
      linkCard?: {
        borderRadius?: string;
        border?: string;
        backgroundColor?: string;
        color?: string;
      };
      icon?: {
        filter?: string;
      };
    }
  ) => {
    try {
      setIsLoading(true);

      if (!theme) return;

      const {
        color: currentColor,
        background: currentBackground,
        button: currentButton,
        primary_text: currentPrimaryText,
        secondary_text: currentSecondaryText,
        avatar: currentAvatar,
        icon: currentIcon,
        link_card: currentLinkCard
      } = theme.styles;

      const newStyles = {
        color: currentColor,
        background: styleConfig.background
          ? {
              backgroundImage:
                styleConfig.background.type === 'gradient'
                  ? styleConfig.background.value
                  : '',
              backgroundColor:
                styleConfig.background.type === 'solid'
                  ? styleConfig.background.value
                  : (currentBackground as any)?.backgroundColor || '',
              color: (currentBackground as any)?.color || '#FFFFFF'
            }
          : currentBackground,
        button: currentButton,
        primary_text: currentPrimaryText,
        secondary_text: currentSecondaryText,
        avatar: currentAvatar,
        icon: styleConfig.icon?.filter
          ? { filter: styleConfig.icon.filter }
          : currentIcon,
        link_card: {
          ...(currentLinkCard as any),
          ...styleConfig.linkCard
        }
      };

      const response = await api.put('profile/theme', {
        custom_styles: newStyles,
        custom_bg_type: selectedType,
        custom_bg_color: selectedColor
      });

      const updatedTheme: ThemeProps = {
        ...theme,
        id: response.data.theme_id,
        styles: response.data.custom_styles || newStyles
      };

      setCurrentTheme(updatedTheme);
      toast.success(response.data.message);

      return response.data.theme;
    } catch (error) {
      console.error('Failed to update theme styles:', error);
      toast.error('Erro ao atualizar o tema.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        showThemeDropdown,
        isLoading,
        handleShowThemeDropdown,
        handleChangeTheme,
        handleThemeSelect,
        updateThemeStyles
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext };
