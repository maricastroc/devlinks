import { useEffect, useState } from 'react';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import EmptyMockup from '/public/assets/images/illustration-empty.svg';
import PrimaryButton from '@/Components/PrimaryButton';
import { LinkBox } from '@/Components/LinkBox';
import { PlatformProps } from '@/types/platform';
import { PhoneMockup } from '@/Components/PhoneMockup';
import { handleReqError } from '@/utils/handleReqError';
import axios from 'axios';
import { notyf } from '@/libs/notyf';
import { UserLinkProps } from '@/types/user-link';
import { z } from 'zod';
import $ from 'jquery';
import { UserProps } from '@/types/user';

const linkSchema = z.object({
  platform_id: z.number(),
  url: z.string().url({ message: 'Invalid URL. Please, use a valid format.' })
});

const linksSchema = z
  .array(linkSchema)
  .nonempty({ message: 'You need to add at least one link.' });

type Props = {
  platforms: PlatformProps[];
  userLinks: UserLinkProps[] | [];
  user: UserProps;
};

type FormErrors = Record<
  string | number,
  { url?: string; platform_id?: string }
>;

export default function Dashboard({ platforms, userLinks, user }: Props) {
  const [links, setLinks] = useState<UserLinkProps[] | []>(userLinks || []);

  const [processing, setProcessing] = useState(false);

  const [filteredPlatforms, setFilteredPlatforms] = useState<
    PlatformProps[] | []
  >([]);

  const [errors, setErrors] = useState<FormErrors>({});

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationResult = linksSchema.safeParse(links);

    if (!validationResult.success) {
      const formattedErrors = validationResult.error.format();

      setErrors(
        links.reduce(
          (acc, link, index) => {
            const error = formattedErrors[index];

            const urlError =
              error && 'url' in error ? error?.url?._errors[0] : '';

            const platformError =
              link.platform_id === -1 ||
              !platforms.some((p) => p.id === link.platform_id)
                ? 'Invalid platform selected.'
                : '';

            if (urlError || platformError) {
              acc[Number(link.id)] = {
                url: urlError,
                platform_id: platformError
              };
            } else {
              acc[Number(link.id)] = { url: '', platform_id: '' };
            }

            return acc;
          },
          {} as { [key: number]: { url?: string; platform_id?: string } }
        )
      );

      return;
    }

    setProcessing(true);
    setErrors({});

    try {
      const response = await axios.post('/user-links', {
        links: links.map((link) => ({
          platform_id: link.platform_id,
          url: link.url
        }))
      });

      if (response?.data?.message) {
        notyf?.success(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        handleReqError(error);
      }
    } finally {
      setProcessing(false);
    }
  };

  const addNewLink = () => {
    setLinks((prevLinks) => [
      ...prevLinks,
      {
        id: Date.now(),
        platform_id: -1,
        platform: {
          id: -1,
          name: '',
          icon_url: '',
          color: ''
        },
        url: ''
      }
    ]);
  };

  const handleRemove = (id: number) => {
    setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
  };

  const handleSelect = (platform: PlatformProps, linkId: number) => {
    setLinks((prevLinks) =>
      prevLinks.map((link) =>
        link.id === linkId
          ? { ...link, platform_id: platform.id, platform: platform }
          : link
      )
    );
  };

  const handleChangeUrl = (linkId: number, value: string) => {
    setLinks((prevLinks) =>
      prevLinks.map((prevLink) =>
        prevLink.id === linkId ? { ...prevLink, url: value } : prevLink
      )
    );
  };

  useEffect(() => {
    if (links) {
      const filteredPlatforms = platforms.filter((platform) => {
        return !links.some((link) => link.platform_id === platform.id);
      });

      setFilteredPlatforms(filteredPlatforms);
    }
  }, [links]);

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="lg:m-6 flex lg:grid lg:grid-cols-[1fr,1.5fr] w-full lg:gap-6">
        <div className="items-center justify-center hidden w-full p-10 bg-white rounded-md lg:flex">
          <PhoneMockup links={links} user={user} />
        </div>

        <div className="flex flex-col w-full p-6 m-4 mt-6 bg-white rounded-md lg:m-0 md:m-6 md:p-10">
          <h2 className="mb-1 text-[1.5rem] md:text-[2rem] font-bold text-dark-gray">
            Customize your links
          </h2>
          <p className="mb-8 md:mb-10 text-medium-gray">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>

          <SecondaryButton onClick={addNewLink}>+ Add New Link</SecondaryButton>

          {links?.length > 0 ? (
            <div className="flex flex-col gap-4 mt-6">
              {links.map((link, index) => (
                <LinkBox
                  key={link.id}
                  platforms={filteredPlatforms}
                  link={link}
                  index={index}
                  handleRemove={handleRemove}
                  handleChangeUrl={handleChangeUrl}
                  errorUrl={errors[String(link.id)]?.url}
                  errorPlatform={errors[String(link.id)]?.platform_id}
                  handleSelect={(platform) =>
                    handleSelect(platform, Number(link.id))
                  }
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 mt-10 text-center rounded-md bg-light-gray">
              <img src={EmptyMockup} alt="" className="mt-6" />
              <h2 className="mt-6 mb-2 text-[1.4rem] md:text-[2rem] font-black text-dark-gray">
                Let's get you started
              </h2>
              <p className="mt-2 mb-8 max-w-[32rem] text-medium-gray">
                Use the “Add new link” button to get started. Once you have more
                than one link, you can reorder and edit them. We’re here to help
                you share your profiles with everyone!
              </p>
            </div>
          )}

          <hr className="my-6 md:my-8" />

          <div className="flex justify-end md:items-end">
            <PrimaryButton
              onClick={submit}
              className="md:w-[6rem]"
              disabled={!links?.length || processing}
            >
              Save
            </PrimaryButton>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
