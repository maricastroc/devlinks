import { useState } from 'react';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import EmptyMockup from '/public/assets/images/illustration-empty.svg';
import PrimaryButton from '@/Components/PrimaryButton';
import { LinkForm } from '@/Components/LinkForm';
import { PlatformProps } from '@/types/platform';
import { PhoneMockup } from '@/Components/PhoneMockup';
import { handleReqError } from '@/utils/handleReqError';
import axios from 'axios';
import { notyf } from '@/libs/notyf';
import { UserLinkProps } from '@/types/user-link';
import { UserProps } from '@/types/user';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { DropResult } from 'react-beautiful-dnd';
import { validateLinks } from '@/utils/validateLink';
import { useLinks } from '@/utils/useLinks';

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
  const [processing, setProcessing] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});

  const { links, setLinks, filteredPlatforms, handleAddLink, handleRemoveLink, handleUpdatePlatform, handleUpdateUrl } =
  useLinks(userLinks, platforms);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
  
    const reorderedLinks = [...links];
    const [movedLink] = reorderedLinks.splice(result.source.index, 1);
    reorderedLinks.splice(result.destination.index, 0, movedLink);
  
    setLinks(reorderedLinks);
  };
  
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateLinks(links, platforms);
    
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }

    setProcessing(true);
    
    setErrors({});

    try {
      const response = await axios.post('/user-links', {
        links: links.map((link, index) => ({
          platform_id: link.platform_id,
          url: link.url,
          order: index + 1
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

          <SecondaryButton onClick={handleAddLink}>+ Add New Link</SecondaryButton>

          {links?.length > 0 ? (
            <div className="flex flex-col overflow-y-scroll gap-4 mt-6 max-h-[30rem]">
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="linksList">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="flex flex-col gap-4 mt-6 max-h-[30rem] overflow-y-scroll"
                    >
                      {links.map((link, index) => (
                        <Draggable
                          key={link.id.toString()}
                          draggableId={link.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <LinkForm
                                platforms={filteredPlatforms}
                                link={link}
                                provided={provided}
                                index={index}
                                handleRemove={handleRemoveLink}
                                handleChangeUrl={handleUpdateUrl}
                                errorUrl={errors[String(link.id)]?.url}
                                errorPlatform={
                                  errors[String(link.id)]?.platform_id
                                }
                                handleSelect={(platform) =>
                                  handleUpdatePlatform(platform, Number(link.id))
                                }
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
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
