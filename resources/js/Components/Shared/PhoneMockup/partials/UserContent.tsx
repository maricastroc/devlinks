import { PHONE_DIMENSIONS } from '@/utils/constants';
import { PhoneMockupProps } from '..';
import { AvatarCard } from '../../AvatarCard';
import { getInitials } from '@/utils/getInitials';
import { SocialLink } from '../../SocialLink';
import { LinkCard } from '../../LinkCard';
import { OverflowMenu } from '../../OverflowMenu';

export function UserContent({
  user,
  previewData,
  links,
  socialLinks
}: Pick<PhoneMockupProps, 'user' | 'previewData' | 'links' | 'socialLinks'>) {
  const displayName = previewData?.name || `@${previewData?.username}`;

  const displayBio = previewData?.bio || user?.bio;

  const displayAvatar = previewData?.photo || user?.avatar_url;

  const displayUsername = previewData?.username || user?.username;

  const displaySocialLinks = socialLinks || user?.social_links;

  const visibleSocialLinks = displaySocialLinks?.slice(0, 3) || [];

  const overflowSocialLinks = displaySocialLinks?.slice(3) || [];

  const hasOverflow = overflowSocialLinks.length > 0;

  const handleSocialLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <div
        className="absolute rounded-full z-40 flex items-center justify-center bg-gray-200 left-1/2 transform -translate-x-1/2"
        style={{
          height: PHONE_DIMENSIONS.content.avatar.size,
          width: PHONE_DIMENSIONS.content.avatar.size,
          top: PHONE_DIMENSIONS.content.avatar.top
        }}
      >
        {displayAvatar ? (
          <AvatarCard
            isPublicPage={false}
            avatarUrl={displayAvatar as string}
            user={user}
            name={user?.name}
            username={displayUsername}
            className="w-full h-full bg-center bg-cover rounded-full bg-opacity-20"
          />
        ) : (
          <span className="text-3xl font-bold text-gray-600">
            {getInitials(user?.name || displayUsername)}
          </span>
        )}
      </div>

      <div
        className="absolute z-40 w-full flex flex-col items-center"
        style={{
          top: PHONE_DIMENSIONS.content.content.top
        }}
      >
        <div className="w-full max-w-[17.2rem]">
          {displayName && (
            <div className="font-bold text-center">
              <p className="text-lg truncate">{displayName}</p>
            </div>
          )}

          {displayBio && (
            <div className="text-center mt-2">
              <p className="text-sm text-gray-600 line-clamp-2">{displayBio}</p>
            </div>
          )}
        </div>

        {displaySocialLinks && displaySocialLinks.length > 0 && (
          <div className="max-w-[16.5rem] flex flex-wrap items-center justify-center gap-2 mt-4">
            {visibleSocialLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleSocialLinkClick(link.url || '')}
                className="hover:scale-105 transition-transform"
              >
                <SocialLink link={link} />
              </button>
            ))}

            {hasOverflow && <OverflowMenu links={overflowSocialLinks} />}
          </div>
        )}

        <div className="mt-6 w-full max-w-[16.5rem]">
          <div
            className="py-2 overflow-y-auto flex flex-col items-center custom-scrollbar"
            style={{
              maxHeight: PHONE_DIMENSIONS.content.scroll.maxHeight
            }}
          >
            <div className="w-full flex flex-col gap-3">
              {links?.map((link) => <LinkCard key={link.id} link={link} />)}

              {(!links || links.length === 0) && (
                <div className="text-center py-8 text-gray-500">
                  <p>No links added yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
