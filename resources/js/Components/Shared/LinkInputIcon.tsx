import { PlatformProps } from '@/types/platform';
import { CUSTOM_PLATFORM_NAME } from '@/utils/constants';
import { At, EnvelopeSimple, Link, Phone } from 'phosphor-react';

type Props = {
  platform: PlatformProps;
};

export const LinkInputIcon = ({ platform }: Props) => {
  if (
    platform.base_url.includes('wa.me') ||
    platform.base_url.includes('whatsapp') ||
    platform.base_url.includes('t.me') ||
    platform.base_url.includes('telegram')
  ) {
    return <Phone size={22} />;
  }

  if (platform.base_url.startsWith('mailto:')) {
    return <EnvelopeSimple size={22} />;
  }

  if (platform.name === CUSTOM_PLATFORM_NAME) {
    return <Link size={22} />;
  }

  return <At size={22} />;
};
