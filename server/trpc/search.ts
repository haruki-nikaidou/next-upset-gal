import {ExplorerDirectory} from "@/components/Explorer/Explorer";
import {procedure} from "@/server/utils/trpc";
import {z} from "zod";
import {odFileToClientOnly} from "@/server/utils/odTreeToClientOnly";
import {fuseSearch} from "@/server/algorithms/fuseSearch";

const searchRouter = procedure.input(z.string()).query(
    (opts)=>{
        fuseSearch(opts.input).map(odFileToClientOnly)
    }
)

export const search = searchRouter;
export type SearchRouterType = typeof search;