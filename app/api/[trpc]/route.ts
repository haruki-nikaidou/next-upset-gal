import { appRouter } from "@/server/trpc/trpcServer";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
const handler = (req: Request) =>
    fetchRequestHandler({
        endpoint: "/api",
        req,
        router: appRouter,
        createContext: () => ({}),
    });
export { handler as GET, handler as POST };