import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import toast from 'react-hot-toast';
import Logo from '/public/assets/images/logo-devlinks-large.svg';
import { AvatarCard } from '@/Components/Shared/AvatarCard';
import { LoadingComponent } from '@/Components/Shared/LoadingComponent';
import { SocialLink } from '@/Components/Shared/SocialLink';
import { OwnerHeader } from './partials/OwnerHeader';
import { LinkList } from './partials/LinkList';
import { UserLinkProps } from '@/types/user-link';
import { UserProps } from '@/types/user';
import { useLoadingIndicator } from '@/utils/useLoadingIndicator';
import { OverflowMenu } from '@/Components/Shared/OverflowMenu';

type Props = {
  socialLinks: UserLinkProps[];
  userLinks: UserLinkProps[];
  user: UserProps;
  username: string;
  authUser: UserProps | null;
};

export default function Shared({
  userLinks,
  user,
  username,
  socialLinks,
  authUser
}: Props) {
  const isOwner = authUser?.id && authUser?.id === user.id;

  const [isLoading, setIsLoading] = useState(false);

  const visibleSocialLinks = socialLinks?.slice(0, 3) || [];

  const overflowSocialLinks = socialLinks?.slice(3) || [];

  const hasOverflow = overflowSocialLinks.length > 0;

  useLoadingIndicator(setIsLoading);

  const handleCopyLink = async () => {
    const currentUrl = window.location.href;

    try {
      await navigator.clipboard.writeText(currentUrl);
      toast?.success('Copied to clipboard!');
    } catch (err) {
      toast?.success('An unexpected error ocurred.');
    }
  };

  const handleSocialLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`relative flex flex-col min-h-screen`}>
      <Head title="Shared" />
      {isLoading && <LoadingComponent hasOverlay />}

      {isOwner ? (
        <OwnerHeader onCopyLink={handleCopyLink} />
      ) : (
        <div className="w-full py-6 z-[12] flex justify-center">
          <Link
            href={route('login')}
            className="p-2 px-5 font-semibold transition-all"
          >
            <img
              src={Logo}
              alt="Default Logo"
              style={{
                filter: 'saturate(0%) brightness(500%)',
                scale: '0.8'
              }}
            />
          </Link>
        </div>
      )}

      <div
        className={`block absolute bg-medium-purple top-0 right-0 w-full h-[18rem] md:h-[19rem] md:rounded-bl-3xl md:rounded-br-3xl z-10`}
      />

      <div
        className={`flex bg-white shadow-xl rounded-[1.5rem] flex-col flex-grow items-center justify-start z-[12] p-6 px-4 md:p-10 mb-24 w-[90vw] max-w-[350px] mx-auto`}
      >
        <div className="flex flex-col items-center justify-center w-full text-center">
          <AvatarCard
            avatarUrl={user.avatar_url as string}
            user={user}
            username={username}
          />
          <h2 className={`text-heading-m mt-4 font-bold text-dark-gray`}>
            {user?.name}
          </h2>
          <p className={`mt-1 text-medium-gray text-body-m`}>{user?.bio}</p>

          {socialLinks && socialLinks.length > 0 && (
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

          <LinkList links={userLinks} />
        </div>
      </div>
    </div>
  );
}
