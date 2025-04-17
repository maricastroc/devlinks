import { UserLinkProps } from '@/types/user-link';
import { CUSTOM_PLATFORM_NAME } from './constants';

export function getLinkLabel(link: UserLinkProps): string {
  if (
    link.platform.base_url.includes('wa.me') ||
    link.platform.base_url.includes('whatsapp') ||
    link.platform.base_url.includes('t.me') ||
    link.platform.base_url.includes('telegram')
  ) {
    return 'Your WhatsApp number';
  }
  if (link.platform.base_url.startsWith('mailto:')) {
    return 'Your email';
  }
  if (link.platform.name === CUSTOM_PLATFORM_NAME) {
    return 'Your link URL';
  }

  return 'Your username';
}
