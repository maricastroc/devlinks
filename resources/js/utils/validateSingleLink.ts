import { PlatformProps } from '@/types/platform';

type ValidationResult = {
  isValid: boolean;
  message: string;
};

export const validateSingleLink = (
  url: string,
  platform: PlatformProps
): ValidationResult => {
  if (!url?.trim()) {
    return { isValid: false, message: 'The link cannot be empty.' };
  }

  if (!platform) {
    return { isValid: false, message: 'Invalid platform selected.' };
  }

  try {
    new URL(url);

    if (!url.startsWith(platform.base_url)) {
      return {
        isValid: false,
        message: `URL must start with ${platform.base_url}`
      };
    }

    return { isValid: true, message: '' };
  } catch {
    return { isValid: false, message: 'Invalid URL format.' };
  }
};
