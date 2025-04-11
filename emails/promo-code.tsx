import { Body, Container, Font, Head, Html, Img, Link, Preview, Section, Tailwind } from '@react-email/components';
import { env } from '~/env';

type PromoCodeEmailProps = {
    baseUrl: string;
    promo: string;
};

export const PromoCodeEmail: React.FC<PromoCodeEmailProps> & { PreviewProps: PromoCodeEmailProps } = ({
    baseUrl,
    promo,
}) => {
    const container: React.CSSProperties = {
        background: 'linear-gradient(180deg, #fafaf9 0%, #fce7f3 100%)',
        backgroundImage: `url(${baseUrl}/shadow/all.png), url(${baseUrl}/shadow/background.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <Html>
            <Tailwind>
                <Head>
                    <Font
                        fontFamily={'Alice'}
                        fallbackFontFamily={['Georgia', 'Times New Roman', 'serif']}
                        webFont={{
                            url: 'https://fonts.gstatic.com/s/alice/v20/OpNCnoEEmtHa6GcOrg4.woff2',
                            format: 'woff2',
                        }}
                        fontWeight={400}
                        fontStyle={'normal'}
                    />
                </Head>
                <Preview>Receive your gift</Preview>
                <Body>
                    <Container className={'h-[36rem]'} style={container}>
                        <Section className={'mx-auto flex h-full w-fit flex-col items-center px-8 py-16'}>
                            <Container className={'my-8'}>
                                <Img src={`${baseUrl}/text/receive-your-gift.png`} className={'mx-auto my-2 w-56'} />
                                <Img src={`${baseUrl}/text/scan-qr-code.png`} className={'mx-auto my-2 w-24'} />
                            </Container>

                            <Img
                                src={`${baseUrl}/assets/qr-${env.NODE_ENV.toLowerCase()}.png`}
                                className={'mx-auto size-48'}
                            />

                            <Container className={'my-8 text-center'}>
                                <Img
                                    src={`${baseUrl}/text/or-click-the-link-below.png`}
                                    className={'mx-auto my-1.5 w-36'}
                                />
                                <Link
                                    href={`${baseUrl}/promo?value=${promo}`}
                                    className={'my-0 text-sm'}
                                >{`${baseUrl}/promo`}</Link>
                            </Container>

                            <Img src={`${baseUrl}/text/2025.png`} className={'mx-auto mt-24 mb-6 w-7'} />
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

PromoCodeEmail.PreviewProps = {
    baseUrl: 'http://localhost:3001',
    promo: env.NEXT_PUBLIC_GIFT_PROMO,
};

export default PromoCodeEmail;
