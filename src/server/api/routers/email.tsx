import { render } from '@react-email/components';
import { z } from 'zod';
import { PromoCodeEmail } from '~/emails/promo-code';
import { env } from '~/env';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const emailRouter = createTRPCRouter({
    sendPromoCode: publicProcedure
        .input(z.object({ email: z.string().email(), promo: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const html = await render(<PromoCodeEmail baseUrl={env.BASE_URL} promo={input.promo} />);

            await ctx.email.send({
                nameFrom: 'Anniversary',
                emailFrom: env.SMTP_AUTH_USER,
                emailTo: input.email,
                subject: 'Promo Code',
                content: html,
            });

            return null;
        }),
});
