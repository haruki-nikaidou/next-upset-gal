import Explorer, {ExplorerDirectory} from "@/components/Explorer/Explorer";
import {wheelState} from "@/server/utils/wheelState";

export default async function CatalogPage() {
    return (
        <main className="max-w-6xl ml-auto mr-auto p-4 w-full">
            <div className="glass higher-blur space-y-4">
                <h1 className="text-2xl">
                    资源目录
                </h1>
                <Explorer root={wheelState().clientOnly()}/>
            </div>
        </main>
    )
}