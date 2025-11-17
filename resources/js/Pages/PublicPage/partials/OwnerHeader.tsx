import { router } from '@inertiajs/react';
import { HeaderButton } from '@/Pages/PublicPage/partials/HeaderButton';
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
    <header className="sm:rounded-xl flex items-center justify-between bg-white sm:p-4 z-50 sm:mb-24 m-5">
      <HeaderButton
        onClick={handleGoBack}
        variant="outline"
        text="Back to Editor"
      />

      <div className="flex items-center justify-end gap-5 md:gap-6">
        <HeaderButton onClick={onCopyLink} text="Share Link" />
      </div>
    </header>
  );
};
