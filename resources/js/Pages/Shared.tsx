import { Head, Link, router } from '@inertiajs/react';
import { UserLinkProps } from '@/types/user-link';
import { UserProps } from '@/types/user';
import { LinkCard } from '@/Components/PhoneMockup';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Logo from '/public/assets/images/logo-devlinks-large.svg';
import SmallLogo from '/public/assets/images/logo-devlinks-small.svg';
import { notyf } from '@/libs/notyf';

type Props = {
  userLinks: UserLinkProps[];
  user: UserProps;
  authUser: UserProps | null;
};

export default function Shared({ userLinks, user, authUser }: Props) {
  const isOwner = authUser?.id === user.id;

  const handleCopyLink = async () => {
    const currentUrl = window.location.href;

    try {
      await navigator.clipboard.writeText(currentUrl);

      notyf?.success('Copied to clipboard!');
    } catch (err) {
      notyf?.success('An unexpected error ocurred.');
    }
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen md:pt-0 md:mt-0 bg-light-gray sm:justify-center md:justify-start">
      <Head title="Shared" />
      {!isOwner && (
        <div className="mb-16 md:hidden">
          <Link href="/">
            <img className="mt-6 scale-75 md:mt-0" src={Logo} alt="" />
          </Link>
        </div>
      )}

      {!isOwner && (
        <div className="z-50 hidden mt-12 mb-0 md:block">
          <Link href="/">
            <img style={{ filter: 'saturate(0%) brightness(518%)'}} className="mt-6 scale-75 md:mt-0" src={Logo} alt="" />
          </Link>
        </div>
      )}

      {isOwner && (
        <header className="z-50 w-full h-[78px] md:p-4 mb-16">
          <div className="flex items-center justify-between gap-3 p-4 md:bg-white md:rounded-xl">
            <SecondaryButton
              className="p-2 max-w-[10rem]"
              onClick={() => router.get(route('dashboard'))}
            >
              <p className="text-sm font-semibold">Back to Editor</p>
            </SecondaryButton>

            <PrimaryButton className="max-w-[10rem]" onClick={handleCopyLink}>
              <p className="text-sm font-semibold">Share Link</p>
            </PrimaryButton>
          </div>
        </header>
      )}

      <div className="hidden md:block absolute top-0 right-0 w-full h-[20rem] rounded-bl-3xl rounded-br-3xl bg-medium-purple z-10" />

      <div className="md:p-12 mb-20 z-50 md:shadow-lg bg-light-gray md:bg-white sm:max-w-md md:w-[24rem] md:rounded-xl md:flex md:items-center md:justify-center md:mt-20 lg:mt-10 md:pb-20">
        <div className="flex flex-col items-center justify-center w-auto">
          {user.avatar_url ? (
            <img
            className="border-4 border-medium-purple h-[7rem] rounded-full w-[7rem]"
            src={`/${user.avatar_url as string}`}
            alt=""
          />
          ) : (
            <div className='flex items-center justify-center h-[7rem] w-[7rem] rounded-full border-4 border-medium-purple'>
              <img className='scale-110 opacity-30' src={SmallLogo} alt="" />
            </div>
          )}
          <h2 className="text-[1.75rem] mt-4 font-bold text-dark-gray">
            {user?.first_name} {user?.last_name}
          </h2>
          <p className="text-md text-medium-gray">{user?.public_email}</p>

          {userLinks?.length > 0 ? (
            <div className="w-[15rem] mt-10 overflow-y-auto flex flex-col gap-4">
            {userLinks?.map((link) => <LinkCard key={link.id} link={link} />)}
          </div>
          ) : (
            <div className="w-[15rem] mt-10 justify-center items-center overflow-y-auto flex flex-col gap-4">
            <p>There are no links yet.</p>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
