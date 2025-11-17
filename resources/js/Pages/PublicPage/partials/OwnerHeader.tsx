import { router } from '@inertiajs/react';
import { HeaderButton } from '@/Pages/PublicPage/partials/HeaderButton';
import { CaretLeft, Export } from 'phosphor-react';
import { useEffect, useState } from 'react';

type Props = {
  onCopyLink: () => void;
};

export const OwnerHeader = ({ onCopyLink }: Props) => {
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    setCanGoBack(window.history.length > 1);
  }, []);

  const handleGoBack = () => {
    if (canGoBack) {
      window.history.back();
    } else {
      router.get(route('web.dashboard.index'));
    }
  };

  return (
    <header className="md:rounded-xl flex items-center justify-between bg-white p-4 z-50 mb-24 m-5">
      <HeaderButton
        onClick={handleGoBack}
        variant="outline"
        icon={<CaretLeft size={20} />}
        text="Back to Editor"
      />

      <div className="flex items-center justify-end gap-5 md:gap-6">
        <HeaderButton
          onClick={onCopyLink}
          icon={<Export size={20} />}
          text="Share Link"
        />
      </div>
    </header>
  );
};
