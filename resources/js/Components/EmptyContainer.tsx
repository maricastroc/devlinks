import TertiaryButton from './TertiaryButton';
import { router } from '@inertiajs/react';

type Props = {
  imagePath: string;
  title: string;
  content: string;
  url: string;
};

export function EmptyContainer({ imagePath, title, content, url }: Props) {
  return (
    <div className="flex flex-col items-center justify-center flex-grow h-full py-12">
      <img src={imagePath} alt="" />
      <p className="mt-10 mb-4 text-large text-content">{content}</p>
      <TertiaryButton isBigger onClick={() => router.get(route(url))}>
        {title}
      </TertiaryButton>
    </div>
  );
}
