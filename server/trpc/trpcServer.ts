import {publicProcedure, router} from '../utils/trpc';
import { z } from 'zod';
import {search} from "@/server/trpc/search";
export const appRouter = router({
    greeting: publicProcedure.output(z.string()).query(() => 'hello tRPC v10!'),
    search
});
export type AppRouter = typeof appRouter;