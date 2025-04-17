import { TextAreaField } from '@/Components/Core/TextareaField';
import { ModalHeader } from '@/Components/Shared/ModalHeader';
import * as Dialog from '@radix-ui/react-dialog';
import { Control, Controller } from 'react-hook-form';
import { ProfileFormSchema } from './FormSection';
import PrimaryButton from '@/Components/Core/PrimaryButton';

interface ModalProps {
  onClose: () => void;
  control: Control<ProfileFormSchema>;
}

export function ChangeBioModal({ onClose, control }: ModalProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay
        className="fixed inset-0 z-[990] bg-black bg-opacity-70"
        onClick={onClose}
      />
      <Dialog.Content className="fixed z-[999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[560px] bg-white rounded-lg shadow-lg p-4 md:p-8 focus:outline-none">
        <ModalHeader
          showBackButton={false}
          onClose={onClose}
          title="Change your bio"
        />

        <div className="w-full mt-6">
          <Controller
            name="bio"
            control={control}
            render={({ field }) => (
              <TextAreaField
                label="Bio"
                id="bio"
                name={field.name}
                placeholder="Tell us about yourself..."
                rows={5}
                className="w-full min-w-full"
                value={field.value || ''}
                onChange={field.onChange}
                onBlur={field.onBlur}
                maxLength={80}
              />
            )}
          />
        </div>
        <PrimaryButton className="mt-8" onClick={onClose}>
          Save
        </PrimaryButton>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
