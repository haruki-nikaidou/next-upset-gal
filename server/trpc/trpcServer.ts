import { procedure, router } from '../utils/trpc';
import { z } from 'zod';
export const appRouter = router({
    greeting: procedure.output(z.string()).query(() => 'hello tRPC v10!'),
});
export type AppRouter = typeof appRouter;