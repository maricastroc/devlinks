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
  updateBackgroundOnly: (
    selectedType: string,
    selectedColor: string,
    theme: ThemeProps,
    backgroundConfig: {
      type: 'solid' | 'gradient';
      value: string;
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

  const updateBackgroundOnly = async (
    selectedType: string,
    selectedColor: string,
    theme: ThemeProps,
    backgroundConfig: {
      type: 'solid' | 'gradient';
      value: string;
    }
  ) => {
    try {
      setIsLoading(true);

      if (!theme) return;

      const {
        color,
        background,
        button,
        primary_text,
        secondary_text,
        avatar,
        icon,
        link_card
      } = theme.styles;

      const newStyles = {
        color: color,
        background: {
          backgroundImage:
            backgroundConfig.type === 'gradient' ? backgroundConfig.value : '',
          backgroundColor:
            backgroundConfig.type === 'solid'
              ? backgroundConfig.value
              : background,
          color: (background as any)?.color
        },
        button: {
          color: (button as any)?.color || '#F5F6F8',
          ':hover': {
            backgroundColor:
              (button as any)?.hover?.backgroundColor || 'transparent'
          }
        },
        primary_text: {
          color: (primary_text as any)?.color || '#1E2330'
        },
        secondary_text: {
          color: (secondary_text as any)?.color || '#5E5F60'
        },
        link_card: {
          backgroundColor: (link_card as any)?.backgroundColor || '#FFFFFF',
          color: (link_card as any)?.color || '#1E2330',
          border: (link_card as any)?.border || '1px solid transparent',
          borderRadius: (link_card as any)?.borderRadius || '16px'
        },
        avatar: {
          backgroundColor: (avatar as any)?.backgroundColor || '#1E2330',
          color: (avatar as any)?.color || '#FFFFFF'
        },
        icon: {
          filter:
            (icon as any)?.filter ||
            'brightness(0) saturate(100%) invert(12%) sepia(9%) saturate(1554%) hue-rotate(183deg) brightness(93%) contrast(93%)'
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
      console.error('Failed to update background:', error);
      toast.error('Erro ao atualizar o plano de fundo.');
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
        updateBackgroundOnly
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext };
