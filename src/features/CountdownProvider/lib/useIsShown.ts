import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLocalStorage } from '~/shared/lib/hooks';

export const useIsShown = (countdown: number) => {
    const searchParams = useSearchParams();

    const [debug] = useLocalStorage<boolean>('debug', false);
    const [prevCountdown, setPrevCountdown] = useState(countdown);

    useEffect(() => setPrevCountdown(countdown), [countdown]);

    return !debug && !searchParams.has('debug') && prevCountdown > 0;
};
