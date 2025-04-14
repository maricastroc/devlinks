import { FormErrors } from '@/Pages/Dashboard/Index';
import { PlatformProps } from '@/types/platform';
import { UserLinkProps } from '@/types/user-link';
import { CUSTOM_PLATFORM_NAME } from './constants';

type PlatformName = keyof typeof urlValidationRules;

const urlValidationRules = {
  GitHub: 'https://www.github.com/',
  'Frontend Mentor': 'https://www.frontendmentor.io/profile/',
  Twitter: 'https://www.twitter.com/',
  LinkedIn: 'https://www.linkedin.com/in/',
  YouTube: 'https://www.youtube.com/',
  Facebook: 'https://www.facebook.com/',
  Twitch: 'https://www.twitch.tv/',
  'Dev.to': 'https://www.dev.to/',
  Codewars: 'https://www.codewars.com/users/',
  Codepen: 'https://www.codepen.io/',
  freeCodeCamp: 'https://www.freecodecamp.org/',
  GitLab: 'https://www.gitlab.com/',
  'Stack Overflow': 'https://www.stackoverflow.com/users/',
  Hashnode: 'https://www.hashnode.com/@'
} as const;

const validateUrl = (platform: string, url: string | undefined) => {
  if (!url) {
    return { isValid: false, message: 'The link cannot be empty.' };
  }

  const validPlatform = Object.keys(urlValidationRules).includes(platform)
    ? (platform as PlatformName)
    : null;

  if (validPlatform && urlValidationRules[validPlatform]) {
    return url.startsWith(urlValidationRules[validPlatform])
      ? { isValid: true, message: '' }
      : {
          isValid: false,
          message: `URL must start with ${urlValidationRules[validPlatform]}`
        };
  }

  return { isValid: true, message: '' };
};

export const validateLinks = (
  links: UserLinkProps[],
  platforms: PlatformProps[]
): FormErrors => {
  const errors: FormErrors = {};

  links.forEach((link) => {
    const linkErrors: {
      url?: string;
      platform_id?: string;
      custom_name?: string;
    } = {};

    const platform = platforms.find((p) => p.id === link.platform_id);

    if (!platform) {
      linkErrors.platform_id = 'Invalid platform selected.';
    }

    if (platform?.name === CUSTOM_PLATFORM_NAME) {
      if (!link.custom_name?.trim()) {
        linkErrors.custom_name = 'Platform name is required for custom links.';
      } else if (link.custom_name.trim().length < 2) {
        linkErrors.custom_name = 'Platform name must be at least 2 characters.';
      } else if (link.custom_name.trim().length > 30) {
        linkErrors.custom_name = 'Platform name cannot exceed 30 characters.';
      }
    }

    try {
      if (!link?.url?.trim()) {
        linkErrors.url = 'The link cannot be empty.';
      } else {
        new URL(link.url);

        if (platform?.name === CUSTOM_PLATFORM_NAME) {
          if (!link.url.match(/^https?:\/\//)) {
            linkErrors.url = 'URL must start with http:// or https://';
          }
        }
      }
    } catch {
      linkErrors.url = 'Invalid URL format';
    }

    if (platform && platform.name !== CUSTOM_PLATFORM_NAME) {
      const urlValidation = validateUrl(platform.name, link.url as string);

      if (!urlValidation.isValid) {
        linkErrors.url = urlValidation.message;
      }
    }

    if (Object.keys(linkErrors).length > 0) {
      errors[link.id] = linkErrors;
    }
  });

  return Object.keys(errors).length > 0 ? errors : {};
};
