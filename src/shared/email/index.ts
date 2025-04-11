import { z } from 'zod';

import { transport } from './transport';

const emailSchema = z.object({
    emailFrom: z.string().email(),
    nameFrom: z.string(),
    emailTo: z.union([z.string().email(), z.array(z.string().email())]),
    subject: z.string(),
    content: z.string(),
});

type EmailSchema = z.infer<typeof emailSchema>;

export const email = {
    send: async (input: EmailSchema) => {
        emailSchema.parse(input);

        await transport.sendMail({
            from: `${input.nameFrom} <${input.emailFrom}>`,
            to: Array.isArray(input.emailTo) ? input.emailTo.join(', ') : input.emailTo,
            subject: input.subject,
            html: input.content,
        });
    },
};
