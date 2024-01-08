import {publicProcedure} from "@/server/utils/trpc";
import {z} from "zod";
import {odFileToClientOnly} from "@/server/utils/odTreeToClientOnly";
import {wheelState} from "@/server/utils/wheelState";

const searchRouter = publicProcedure.input(z.string()).query(
    (opts)=> {
        const result = wheelState().globalFuse(opts.input);
        return result.map((item) => {
            return {
                key: item.key,
                value: odFileToClientOnly(item.value),
            }
        });
    }

)

export const search = searchRouter;
export type SearchRouterType = typeof search;