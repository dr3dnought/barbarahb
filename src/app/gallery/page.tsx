import { formatDate } from 'date-fns/format';
import * as motion from 'motion/react-client';
import Image from 'next/image';
import { env } from '~/env';
import redTile from '~/public/assets/red-tile.png';
import type { SearchParams } from '~/shared/lib/types';
import { Redirect } from '~/shared/ui/redirect';
import { Gallery } from '~/widgets/Gallery';

export default async ({ searchParams }: SearchParams<{ transition?: string }>) => {
    const { transition } = await searchParams;

    return (
        <>
            {transition !== undefined && (
                <>
                    <Redirect href={'/gallery'} delay={1000} />
                    <motion.div
                        className={'pointer-events-none absolute z-200 h-lvh w-screen select-none overflow-hidden'}
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <Image src={redTile.src} className={'scale-150 object-cover'} fill priority alt={''} />
                    </motion.div>
                </>
            )}
            {transition === undefined && (
                <main className={'flex h-lvh flex-col items-stretch justify-start gap-y-8 overflow-auto px-8 py-24'}>
                    <span className={'text-center'}>
                        <h1 className={'font-heading font-semibold text-5xl'}>Happy Birthday!</h1>
                        <h3 className={'mt-4 text-lg'}>
                            Celebrating your day on {formatDate(env.NEXT_PUBLIC_TARGET_DATE, 'MMMM d, y')}
                        </h3>
                    </span>
                    <Gallery />
                </main>
            )}
        </>
    );
};
