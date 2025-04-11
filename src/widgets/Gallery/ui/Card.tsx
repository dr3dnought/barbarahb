'use client';

import { type Variants, motion } from 'motion/react';
import Image from 'next/image';
import { useMemo } from 'react';
import { cn } from '~/lib/utils';
import { useToggle } from '~/shared/lib/hooks';
import { getOS } from '~/shared/lib/user-agent';
import { clipPath } from '../config/clipPath';

const cardVariants: Variants = {
    offscreen: {
        y: 200,
    },
    onscreen: {
        y: 48,
        rotate: -6,
        transition: {
            type: 'spring',
            bounce: 0.4,
            duration: 0.8,
        },
    },
};

const hue = (h: number) => `hsl(${h}, 100%, 60%)`;

export type CardProps = {
    title: string;
    description: React.ReactNode;

    hueA: number;
    hueB: number;
} & (
    | {
          src: string;
          cover?: never;
      }
    | {
          src?: never;
          cover: React.ReactNode;
      }
);

const Card: React.FC<CardProps> = ({ src, cover, title, description, hueA, hueB }) => {
    const os = useMemo(() => getOS(), []);

    const [textMode, toggleTextMode] = useToggle(false);
    const background = `linear-gradient(235deg, ${hue(hueA)}, ${hue(hueB)})`;

    return (
        <motion.li
            lang={'ru'}
            className={'relative flex w-80 items-center justify-center overflow-hidden pt-4'}
            initial={'offscreen'}
            whileInView={'onscreen'}
            viewport={{ amount: 0.8 }}
        >
            <div className={'absolute inset-x-0 bottom-0 h-40 w-full'} style={{ clipPath, background }} />

            <motion.div
                onClick={toggleTextMode}
                className={'h-72 w-64'}
                style={{ transformOrigin: '10% 60%' }}
                variants={cardVariants}
                tabIndex={-1}
            >
                <div
                    className={cn(
                        'bg-gradient-to-b from-stone-50 to-stone-200 shadow-xl',
                        'absolute inset-0 size-full rounded-3xl p-2',
                        'backface-hidden transition-transform duration-1000',
                        textMode && os === 'iOS' && '-rotate-x-45 rotate-y-180 rotate-z-12',
                        textMode && os !== 'iOS' && 'rotate-x-45 rotate-y-180 rotate-z-12',
                        !textMode && 'rotate-x-0 rotate-y-0 rotate-z-0',
                    )}
                >
                    <div
                        className={cn(
                            'relative overflow-hidden',
                            'size-full rounded-2xl bg-gradient-to-b from-stone-200 to-stone-300',
                            'flex flex-col items-center justify-center gap-y-2 px-4 py-6',
                        )}
                    >
                        {cover}
                        {src !== undefined && (
                            <>
                                <Image src={src} className={'z-10 object-cover'} fill alt={''} />
                                <div
                                    className={
                                        'absolute z-30 size-full bg-gradient-to-b from-60% from-transparent to-stone-900/40'
                                    }
                                />
                            </>
                        )}
                    </div>
                </div>
                <div
                    className={cn(
                        'bg-gradient-to-b from-stone-50 to-stone-200 shadow-xl',
                        'absolute inset-0 size-full rounded-3xl p-2',
                        'backface-hidden transition-transform duration-1000',
                        textMode ? 'rotate-x-0 rotate-y-0 rotate-z-0' : '-rotate-y-180 rotate-x-45 rotate-z-12',
                    )}
                >
                    <div
                        className={cn(
                            'size-full rounded-2xl bg-gradient-to-b from-stone-200 to-stone-300',
                            'flex flex-col items-center gap-y-2 px-4 py-6',
                        )}
                    >
                        <h5 className={'font-heading font-semibold text-xl'}>{title}</h5>
                        <span className={'hyphens-auto text-sm text-stone-500'}>{description}</span>
                    </div>
                </div>
            </motion.div>
        </motion.li>
    );
};
Card.displayName = 'Card';

export { Card };
