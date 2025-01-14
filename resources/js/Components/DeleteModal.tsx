import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import axios from 'axios';
import { notyf } from '@/libs/notyf';
import { SubscriberProps } from '@/types/subscriber';
import { EmailListProps } from '@/types/emailList';
import DangerButton from './DangerButton';
import SecondaryButton from './SecondaryButton';
import { Inertia } from '@inertiajs/inertia';

type Props = {
  closeModal: () => void;
  subscriber?: SubscriberProps;
  emailList?: EmailListProps;
  entity: 'subscriber' | 'list';
};

export function DeleteModal({ closeModal, subscriber, emailList, entity }: Props) {
  const [processing, setProcessing] = useState(false);

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setProcessing(true);

      const routeParams =
        entity === 'subscriber'
          ? { list: subscriber?.email_list_id, subscriber: subscriber?.id }
          : { list: emailList?.id };

      const response = await axios.delete(
        route(`${entity === 'list' ? 'lists.destroy' : 'subscribers.destroy'}`, routeParams)
      );

      if (response?.data.message) {
        await new Promise((resolve) => {
          notyf?.success(response?.data?.message);
          setTimeout(resolve, 2000);
        });
      }

      const redirectRoute =
        entity === 'list' ? route('lists.index') : route('lists.show', { list: subscriber?.email_list_id });

      Inertia.visit(redirectRoute);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        notyf?.error(error.response?.data?.message);
      } else {
        console.error('Error:', error);
      }
    } finally {
      setProcessing(false);
      closeModal();
    }
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay onClick={closeModal} className="fixed inset-0 bg-background-primary/30" />

      <Dialog.Content className="fixed z-[999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] bg-background-secondary rounded-lg shadow-lg p-6 md:w-[560px] md:p-8 max-h-[90vh] overflow-y-auto">
        <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Are you sure you want to delete this {entity === 'list' ? 'list' : 'subscriber'}?
        </Dialog.Title>

        <div className="flex flex-col w-full">
          <form onSubmit={handleDelete} className="bg-background-secondary">
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {entity === 'list'
                ? `Deleting "${emailList?.title}" is a permanent action and cannot be undone. This will also remove all associated subscribers.`
                : `Deleting "${subscriber?.name}" is a permanent action and cannot be undone.`}
            </p>

            <div className="flex items-end justify-end gap-3 mt-8">
              <DangerButton className="ms-3" disabled={processing}>
                {entity === 'list' ? 'Delete List' : 'Delete Subscriber'}
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
