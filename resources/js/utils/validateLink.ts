import { FormErrors } from '@/Pages/Dashboard/Index';
import { PlatformProps } from '@/types/platform';
import { UserLinkProps } from '@/types/user-link';
import { CUSTOM_PLATFORM_NAME } from './constants';

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
      username?: string;
    } = {};

    const platform = platforms.find((p) => p.id === link.platform_id);

    if (!platform) {
      linkErrors.platform_id = 'Invalid platform selected.';
    }

    if (platform?.name === CUSTOM_PLATFORM_NAME) {
      const customName = link.custom_name?.trim();

      if (!customName) {
        linkErrors.custom_name = 'Platform name is required for custom links.';
      } else if (customName.length < 2) {
        linkErrors.custom_name = 'Platform name must be at least 2 characters.';
      } else if (customName.length > 30) {
        linkErrors.custom_name = 'Platform name cannot exceed 30 characters.';
      }
    }

    try {
      if (!link?.username?.trim()) {
        linkErrors.username = 'Username cannot be empty.';
      }

      if (platform?.name === CUSTOM_PLATFORM_NAME) {
        if (!link?.username?.match(/^https?:\/\//)) {
          linkErrors.username = 'URL must start with http:// or https://';
        }
      }
    } catch {
      linkErrors.url = `Your URL must start with: ${platform?.base_url}`;
    }

    if (Object.keys(linkErrors).length > 0) {
      errors[link.id] = linkErrors;
    }
  });

  return Object.keys(errors).length > 0 ? errors : {};
};
