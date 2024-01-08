import {ExplorerDirectory} from "@/components/Explorer/Explorer";
import {procedure} from "@/server/utils/trpc";
import {z} from "zod";
import {odFileToClientOnly} from "@/server/utils/odTreeToClientOnly";
import * as wheelState from "@/server/utils/wheelState";

const searchRouter = procedure.input(z.string()).query(
    (opts)=>{
        wheelState.globalFuse(opts.input).map(odFileToClientOnly)
    }
)

export const search = searchRouter;
export type SearchRouterType = typeof search;