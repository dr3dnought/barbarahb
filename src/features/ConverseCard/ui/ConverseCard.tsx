'use client';

import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRotationPermission, useRotationTransform } from '~/entities/Rotation';
import { env } from '~/env';
import { cn } from '~/lib/utils';
import converseShadow from '~/public/assets/converse-shadow.png';
import { Button } from '~/shared/ui/button';

type ConverseCardProps = {
    blur?: boolean;
};

const ConverseCard: React.FC<ConverseCardProps> = ({ blur }) => {
    const transform = useRotationTransform();

    return (
        <div className={cn('perspective-midrange absolute transition-all duration-500', blur && 'blur-xs')}>
            <div
                className={'transform-3d h-96 w-72'}
                style={{
                    transform,
                    WebkitTransform: transform,
                }}
            >
                <div
                    className={cn(
                        'transform-3d absolute h-full w-full',
                        'bg-gradient-to-b from-stone-50 to-stone-100 shadow-xl',
                        'rounded-3xl p-2',
                    )}
                >
                    <div className={'absolute inset-2 m-auto rounded-2xl bg-gradient-to-b from-pink-100 to-pink-200'} />
                    <div
                        className={'translate-z-8 absolute inset-0 m-auto flex size-fit flex-col items-center gap-y-8'}
                    >
                        <a
                            href={env.NEXT_PUBLIC_POIZON_URL}
                            className={cn(' transition-all duration-500', blur && 'pointer-events-none blur-sm')}
                            target={'_blank'}
                            rel={'noreferrer'}
                        >
                            <Image
                                src={converseShadow.src}
                                width={converseShadow.width}
                                height={converseShadow.height}
                                className={cn('size-72 transition-all duration-500', blur && 'blur-2xl')}
                                alt={''}
                            />
                        </a>
                        <p className={'-translate-y-16 text-xl'}>Converse 1970s All Star</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
ConverseCard.displayName = 'ConverseCard';

export default () => {
    const [granted, request] = useRotationPermission();
    const { isPending, mutate } = useMutation({ mutationFn: request });

    return (
        <>
            {!granted && (
                <Button onClick={() => mutate()} className={'absolute z-50 text-xl'} loading={isPending}>
                    Выдать разрешение
                </Button>
            )}
            <ConverseCard blur={!granted} />
        </>
    );
};
