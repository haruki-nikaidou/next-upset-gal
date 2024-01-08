import { appRouter } from "@/server/trpc/trpcServer";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
const handler = (req: Request) => {
    console.log(req)
    return fetchRequestHandler({
        endpoint: "/api/trpc",
        req,
        router: appRouter,
        createContext: () => ({}),
    })
};
export { handler as GET, handler as POST };