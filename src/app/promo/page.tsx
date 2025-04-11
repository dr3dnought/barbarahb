import { formatDate } from 'date-fns/format';
import { ArrowRightIcon } from 'lucide-react';
import Form from 'next/form';
import { env } from '~/env';
import type { SearchParams } from '~/shared/lib/types';

export default async ({ searchParams }: SearchParams<{ value?: string }>) => {
    const { value } = await searchParams;

    return (
        <main className={'flex h-lvh flex-col items-stretch justify-start gap-y-8 overflow-auto px-8 py-24'}>
            <span className={'text-center'}>
                <h1 className={'font-heading font-semibold text-5xl'}>Anniversary</h1>
                <h3 className={'mt-4 text-lg'}>
                    Celebrating our love on {formatDate(env.NEXT_PUBLIC_TARGET_DATE, 'MMMM d, y')}
                </h3>
                <h5 className={'text-stone-500 text-xs leading-none'}>Almost March 26</h5>
            </span>
            <Form action={'/gift'} className={'flex flex-1 flex-col items-center justify-center'}>
                <label
                    className={'flex flex-row items-center gap-x-2 rounded-lg border-2 border-stone-700 px-3.5 py-2'}
                >
                    <input
                        name={'promo'}
                        placeholder={'Promo'}
                        inputMode={'text'}
                        autoComplete={'off'}
                        defaultValue={value}
                        className={'bg-transparent text-2xl outline-none placeholder:text-stone-500'}
                    />
                    <button type={'submit'} className={'cursor-pointer p-1 outline-none'}>
                        <ArrowRightIcon className={'size-6'} />
                    </button>
                </label>
            </Form>
        </main>
    );
};
