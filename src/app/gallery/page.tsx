import * as motion from 'motion/react-client';
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
                        className={'pointer-events-none absolute z-200 h-lvh w-screen bg-[#FE0000]'}
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    />
                </>
            )}
            {transition === undefined && <Gallery />}
        </>
    );
};
