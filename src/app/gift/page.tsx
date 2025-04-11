import { formatDate } from 'date-fns/format';
import { redirect } from 'next/navigation';
import { env } from '~/env';
import { ConverseCard } from '~/features/ConverseCard';
import type { SearchParams } from '~/shared/lib/types';

export default async ({ searchParams }: SearchParams<{ promo?: string }>) => {
    const { promo } = await searchParams;

    if (promo !== env.NEXT_PUBLIC_GIFT_PROMO) redirect(`/promo?value=${promo}`);

    return (
        <main className={'flex h-lvh flex-col items-stretch justify-start gap-y-8 overflow-auto px-8 py-24'}>
            <span className={'text-center'}>
                <h1 className={'font-heading font-semibold text-5xl'}>Anniversary</h1>
                <h3 className={'mt-4 text-lg'}>
                    Celebrating our love on {formatDate(env.NEXT_PUBLIC_TARGET_DATE, 'MMMM d, y')}
                </h3>
                <h5 className={'text-stone-500 text-xs leading-none'}>Almost March 26</h5>
            </span>
            <div className={'relative flex flex-1 flex-col items-center justify-center'}>
                <ConverseCard />
            </div>
        </main>
    );
};
