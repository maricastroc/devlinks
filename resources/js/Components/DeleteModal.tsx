import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import axios from 'axios';
import { notyf } from '@/libs/notyf';
import { SubscriberProps } from '@/types/subscriber';
import { EmailListProps } from '@/types/emailList';
import DangerButton from './DangerButton';
import SecondaryButton from './SecondaryButton';
import { Inertia } from '@inertiajs/inertia';
import { TemplateProps } from '@/types/template';
import { CampaignProps } from '@/types/campaign';
import { handleReqError } from '@/utils/handleReqError';

type Props = {
  closeModal: () => void;
  subscriber?: SubscriberProps;
  emailList?: EmailListProps;
  template?: TemplateProps;
  campaign?: CampaignProps;
  entity: 'subscriber' | 'list' | 'template' | 'campaign';
};

export function DeleteModal({
  closeModal,
  subscriber,
  emailList,
  template,
  campaign,
  entity
}: Props) {
  const [processing, setProcessing] = useState(false);

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setProcessing(true);

      const routeParams = (() => {
        switch (entity) {
          case 'subscriber':
            return {
              list: subscriber?.email_list_id,
              subscriber: subscriber?.id
            };

          case 'list':
            return { list: emailList?.id };

          case 'template':
            return { template: template?.id };

          case 'campaign':
            return { campaign: campaign?.id };

          default:
            throw new Error(`Unhandled entity type: ${entity}`);
        }
      })();

      const routeName = (() => {
        switch (entity) {
          case 'list':
            return 'lists.destroy';

          case 'subscriber':
            return 'subscribers.destroy';

          case 'template':
            return 'templates.destroy';

          case 'campaign':
            return 'campaigns.destroy';

          default:
            throw new Error(`Unhandled entity type: ${entity}`);
        }
      })();

      const response = await axios.delete(route(routeName, routeParams));

      if (response?.data.message) {
        await new Promise((resolve) => {
          notyf?.success(response?.data?.message);
          setTimeout(resolve, 2000);
        });
      }

      let redirectRoute;

      switch (entity) {
        case 'list':
          redirectRoute = route('lists.index');
          break;

        case 'subscriber':
          redirectRoute = route('lists.show', {
            list: subscriber?.email_list_id
          });
          break;

        case 'template':
          redirectRoute = route('templates.index');
          break;

        case 'campaign':
          redirectRoute = route('dashboard');
          break;

        default:
          throw new Error(`Unhandled entity type: ${entity}`);
      }

      Inertia.visit(redirectRoute);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.errors) {
        notyf?.error(error.response.data.message);
      } else {
        handleReqError(error);
      }
    } finally {
      setProcessing(false);
      closeModal();
    }
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay
        onClick={closeModal}
        className="fixed inset-0 bg-background-primary/70"
      />

      <Dialog.Content className="fixed z-[999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] bg-background-secondary rounded-lg shadow-lg p-6 md:w-[560px] md:p-8 max-h-[90vh] overflow-y-auto">
        <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-gray-100">
          {`Are you sure you want to delete this ${entity}?`}
        </Dialog.Title>

        <div className="flex flex-col w-full">
          <form onSubmit={handleDelete} className="bg-background-secondary">
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {entity === 'list' &&
                `Deleting "${emailList?.title}" is a permanent action and cannot be undone. This will also remove all associated subscribers.`}
              {entity === 'subscriber' &&
                `Deleting "${subscriber?.name}" is a permanent action and cannot be undone.`}
              {entity === 'template' &&
                `Deleting "${template?.name}" is a permanent action and cannot be undone. This will also remove all associated campaigns.`}
              {entity === 'campaign' &&
                `Deleting "${campaign?.name}" is a permanent action and cannot be undone.`}
            </p>

            <div className="flex items-end justify-end gap-3 mt-8">
              <DangerButton className="ms-3" disabled={processing}>
                {entity === 'list' && `Delete ${emailList?.title}?`}
                {entity === 'subscriber' && `Delete ${subscriber?.name}?`}
                {entity === 'template' && `Delete ${template?.name}?`}
                {entity === 'campaign' && `Delete ${campaign?.name}?`}
              </DangerButton>
              <SecondaryButton disabled={processing} onClick={closeModal}>
                Cancel
              </SecondaryButton>
            </div>
          </form>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
