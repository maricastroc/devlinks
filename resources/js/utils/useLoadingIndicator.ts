import { Inertia } from '@inertiajs/inertia';
import { useEffect } from 'react';
import { Dispatch, SetStateAction } from 'react';

export function useLoadingIndicator(
  setIsLoading: Dispatch<SetStateAction<boolean>>
) {
  useEffect(() => {
    const start = () => setIsLoading(true);
    const end = () => setIsLoading(false);

    Inertia.on('start', start);
    Inertia.on('finish', end);
  }, [setIsLoading]);
}
