import { HTMLAttributes } from 'react';

export default function InputError({
  message,
  className = '',
  ...props
}: HTMLAttributes<HTMLParagraphElement> & { message?: string | undefined }) {
  return message ? (
    <p {...props} className={'text-sm text-medium-red ' + className}>
      {message}
    </p>
  ) : null;
}
