import { procedure, router } from './utils/trpc';
export const appRouter = router({
    greeting: procedure.query(() => 'hello tRPC v10!'),
});
export type AppRouter = typeof appRouter;