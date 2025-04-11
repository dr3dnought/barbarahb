import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
    shared: {
        /* Node */
        NODE_ENV: z.enum(['development', 'test', 'production']),
    },
    server: {
        /* URL */
        BASE_URL: z.preprocess(str => {
            if (str) return str;
            return process.env.COOLIFY_URL ?? `http://localhost:${process.env.PORT ?? 3000}`;
        }, z.string().url()),

        /* Email */
        SMTP_HOST: z.string(),
        SMTP_PORT: z.coerce.number(),
        SMTP_AUTH_USER: z.string().email(),
        SMTP_AUTH_PASSWORD: z.string(),
    },
    client: {
        /* Countdown */
        NEXT_PUBLIC_TARGET_DATE: z
            .string()
            .datetime()
            .transform(value => new Date(value))
            .pipe(z.date()),
        NEXT_PUBLIC_COUNTDOWN_EXPIRE_OFFSET: z.coerce.number().default(10),
        NEXT_PUBLIC_DEBUG_COUNTDOWN: z
            .union([z.string(), z.boolean()])
            .refine(value => typeof value === 'boolean' || ['true', 'false', '0', '1'].includes(value))
            .transform(value => {
                switch (value) {
                    case true:
                    case 'true':
                    case '1':
                        return true;
                    default:
                        return false;
                }
            })
            .pipe(z.boolean()),

        /* Gift */
        NEXT_PUBLIC_RECIPIENT_EMAIL: z.string().email(),
        NEXT_PUBLIC_POIZON_URL: z.string().url(),
        NEXT_PUBLIC_GIFT_PROMO: z.string(),
    },
    runtimeEnv: {
        /* Node */
        NODE_ENV: process.env.NODE_ENV,

        /* URL */
        BASE_URL: process.env.BASE_URL,

        /* Email */
        SMTP_HOST: process.env.SMTP_HOST,
        SMTP_PORT: process.env.SMTP_PORT,
        SMTP_AUTH_USER: process.env.SMTP_AUTH_USER,
        SMTP_AUTH_PASSWORD: process.env.SMTP_AUTH_PASSWORD,

        /* Countdown */
        NEXT_PUBLIC_TARGET_DATE: process.env.NEXT_PUBLIC_TARGET_DATE,
        NEXT_PUBLIC_COUNTDOWN_EXPIRE_OFFSET: process.env.NEXT_PUBLIC_COUNTDOWN_EXPIRE_OFFSET,
        NEXT_PUBLIC_DEBUG_COUNTDOWN: process.env.NEXT_PUBLIC_DEBUG_COUNTDOWN,

        /* Gift */
        NEXT_PUBLIC_RECIPIENT_EMAIL: process.env.NEXT_PUBLIC_RECIPIENT_EMAIL,
        NEXT_PUBLIC_POIZON_URL: process.env.NEXT_PUBLIC_POIZON_URL,
        NEXT_PUBLIC_GIFT_PROMO: process.env.NEXT_PUBLIC_GIFT_PROMO,
    },
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    emptyStringAsUndefined: true,
});
