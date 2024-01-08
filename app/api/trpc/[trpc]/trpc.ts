import { AppRouter } from "@/server/trpc/trpcServer";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
export const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: "http://localhost:3000/api/trpc",
        }),
    ],
});