import { Head, Link } from '@inertiajs/react';
import Logo from '/public/assets/images/logo-devlinks-large.svg';
import SmallLogo from '/public/assets/images/logo-devlinks-small.svg';

export default function ErrorPage() {
  return (
    <div className="relative flex flex-col items-center min-h-screen md:pt-0 md:mt-0 bg-light-gray sm:justify-center md:justify-start">
      <Head title="Shared" />
      <div className="mb-16 md:hidden">
        <Link href="/">
          <img className="mt-6 scale-75 md:mt-0" src={Logo} alt="" />
        </Link>
      </div>

      <div className="z-50 hidden mt-12 mb-0 md:block">
        <Link href="/">
          <img
            style={{
              filter: 'saturate(0%) brightness(518%)'
            }}
            className="mt-6 scale-75 md:mt-0"
            src={Logo}
            alt=""
          />
        </Link>
      </div>

      <div className="hidden md:block absolute top-0 right-0 w-full h-[20rem] rounded-bl-3xl rounded-br-3xl bg-medium-purple z-10" />
      <div className="md:p-12 mb-20 z-50 md:shadow-lg bg-light-gray md:bg-white sm:max-w-md md:w-[24rem] md:rounded-xl md:flex md:items-center md:justify-center md:mt-20 lg:mt-10 md:pb-20">
        <div className="flex flex-col items-center justify-center w-auto">
          <div className="flex items-center justify-center h-[7rem] w-[7rem] rounded-full border-4 border-medium-purple">
            <img className="scale-110 opacity-30" src={SmallLogo} alt="" />
          </div>
          <h2 className="text-[1.75rem] mt-4 font-bold text-dark-gray">
            User not found
          </h2>
          <p className="mt-4 text-center text-md text-medium-gray">
            We couldn’t find any information related to this user in our system.
          </p>
        </div>
      </div>
    </div>
  );
}
