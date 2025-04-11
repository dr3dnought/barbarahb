'use client';

import { formatDate } from 'date-fns/format';
import { type ComponentRef, useEffect, useRef, useState } from 'react';
import { env } from '~/env';
import { cn } from '~/lib/utils';
import { items } from '../config/items';
import { Card } from './Card';

const Gallery: React.FC = () => {
    const [isMounted, setIsMounted] = useState(false);

    const mainRef = useRef<ComponentRef<'main'>>(null);
    const ulRef = useRef<ComponentRef<'ul'>>(null);

    useEffect(() => {
        if (!isMounted) return setIsMounted(true);

        mainRef.current?.scrollTo(0, 500);
        new Promise(resolve => setTimeout(resolve, 100)).finally(() => {
            mainRef.current?.scrollTo(0, 0);
        });
    }, [isMounted]);

    return (
        <main
            ref={mainRef}
            className={cn(
                'flex h-lvh flex-col items-stretch justify-start gap-y-8 overflow-auto px-8 pt-24 pb-32',
                'fade-in animate-in fill-mode-backwards delay-150 duration-500',
            )}
        >
            <span className={'text-center'}>
                <h1 className={'font-heading font-semibold text-5xl'}>Happy Birthday!</h1>
                <h3 className={'mt-4 text-lg'}>
                   Celebrating your day on {formatDate(env.NEXT_PUBLIC_TARGET_DATE, 'MMMM d, y')}
                </h3>
            </span>
            <ul ref={ulRef} className={'flex flex-col items-center'}>
                {items.map((item, index) => (
                    <Card key={index.toString()} {...item} />
                ))}
            </ul>
        </main>
    );
};
Gallery.displayName = 'Gallery';

export default Gallery;
