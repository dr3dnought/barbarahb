import { createCallerFactory, createTRPCRouter } from '~/server/api/trpc';
import { emailRouter } from './routers/email';

export const appRouter = createTRPCRouter({
    email: emailRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
