import { useState, useEffect } from 'react';
import { UserLinkProps } from '@/types/user-link';
import { PlatformProps } from '@/types/platform';
import { CUSTOM_PLATFORM_NAME } from './constants';

export const useLinks = (
  userLinks: UserLinkProps[],
  platforms: PlatformProps[]
) => {
  const [links, setLinks] = useState<UserLinkProps[]>(userLinks || []);

  const [filteredPlatforms, setFilteredPlatforms] = useState<PlatformProps[]>(
    []
  );

  const handleAddLink = () => {
    setLinks((prev) => [
      ...prev,
      {
        id: Date.now(),
        platform_id: -1,
        platform: {
          id: -1,
          name: '',
          icon_url: '',
          color: '',
          is_social: false,
          base_url: ''
        },
        custom_name: '',
        url: '',
        order: links.length + 1
      }
    ]);
  };

  const handleRemoveLink = (id: number) =>
    setLinks((prev) => prev.filter((link) => link.id !== id));

  const handleUpdatePlatform = (platform: PlatformProps, linkId: number) => {
    setLinks((prev) =>
      prev.map((link) =>
        link.id === linkId
          ? { ...link, platform_id: platform.id, platform }
          : link
      )
    );
  };

  const handleUpdateUrl = (linkId: number, value: string) => {
    setLinks((prev) =>
      prev.map((link) => (link.id === linkId ? { ...link, url: value } : link))
    );
  };

  const handleUpdateCustomName = (linkId: number, value: string) => {
    setLinks((prev) =>
      prev.map((link) =>
        link.id === linkId ? { ...link, custom_name: value } : link
      )
    );
  };

  useEffect(() => {
    const filtered = platforms.filter((platform) => {
      const isCustomPlatform = platform.name === CUSTOM_PLATFORM_NAME;

      const isPlatformInUse = links.some(
        (link) => link.platform_id === platform.id
      );

      return isCustomPlatform || !isPlatformInUse;
    });

    setFilteredPlatforms(filtered);
  }, [links, platforms]);
  return {
    links,
    setLinks,
    filteredPlatforms,
    handleAddLink,
    handleRemoveLink,
    handleUpdatePlatform,
    handleUpdateCustomName,
    handleUpdateUrl
  };
};
