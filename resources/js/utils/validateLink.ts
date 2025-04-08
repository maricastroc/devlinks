import { FormErrors } from '@/Pages/Dashboard';
import { PlatformProps } from '@/types/platform';
import { UserLinkProps } from '@/types/user-link';

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

  if (links.length === 0) {
    errors.__error = {
      url: 'You need to add at least one link.'
    };
    return errors;
  }

  links.forEach((link) => {
    const linkErrors: { url?: string; platform_id?: string } = {};

    const platform = platforms.find((p) => p.id === link.platform_id);

    if (!platform) {
      linkErrors.platform_id = 'Invalid platform selected.';
    }

    try {
      if (link?.url) {
        new URL(link.url);
      }
    } catch {
      linkErrors.url = 'Invalid URL format';
    }

    const urlValidation = validateUrl(
      platform?.name as string,
      link.url as string
    );

    if (!urlValidation.isValid) {
      linkErrors.url = urlValidation.message;
    }

    if (Object.keys(linkErrors).length > 0) {
      errors[link.id] = linkErrors;
    }
  });

  return Object.keys(errors).length > 0 ? errors : {};
};
