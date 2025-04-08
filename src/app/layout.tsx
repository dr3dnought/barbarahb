import '~/styles/globals.css';

import type { Metadata } from 'next';
import { Alice, Playfair_Display, Poppins } from 'next/font/google';
import { Shadow } from '~/entities/Shadow';
import { CountdownProvider } from '~/features/CountdownProvider';
import { TRPCReactProvider } from '~/trpc/react';

export const metadata: Metadata = {
    title: 'Hamster Day!',
    appleWebApp: { title: 'Happy Birthday!' },
    manifest: '/manifest.json',
    icons: [
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '96x96',
            url: '/favicon-96x96.png',
        },
        {
            rel: 'icon',
            type: 'image/svg+xml',
            url: '/favicon.svg',
        },
        {
            rel: 'shortcut icon',
            url: '/favicon.ico',
        },
        {
            rel: 'apple-touch-icon',
            type: 'image/png',
            sizes: '180x180',
            url: '/apple-touch-icon.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '96x96',
            url: '/favicon-96x96.png',
        },
    ],
};

const playfairDisplay = Playfair_Display({
    subsets: ['latin', 'cyrillic'],
    weight: ['600'],
    variable: '--font-playfair-display',
});

const alice = Alice({
    subsets: ['latin', 'cyrillic'],
    weight: ['400'],
    variable: '--font-alice',
});

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['500'],
    variable: '--font-poppins',
});

export default ({ children }: React.PropsWithChildren) => {
    return (
        <html lang={'en'} className={`${playfairDisplay.variable} ${alice.variable} ${poppins.variable} font-alice`}>
            <body className={'h-lvh overflow-hidden bg-gradient-to-b from-stone-50 to-pink-100'}>
                <TRPCReactProvider>
                    <CountdownProvider>{children}</CountdownProvider>
                </TRPCReactProvider>
                <Shadow />
            </body>
        </html>
    );
};
