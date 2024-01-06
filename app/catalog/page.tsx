import Explorer, {ExplorerDirectory} from "@/components/Explorer/Explorer";

const exampleRoot: ExplorerDirectory = {
    name: 'root',
    type: 'directory',
    size: '0',
    children: [
        {
            name: 'dir1',
            type: 'directory',
            size: '0',
            children: []
        }
    ]
}

export default function CatalogPage() {
    return (
        <main className="max-w-6xl ml-auto mr-auto p-4 w-full">
            <div className="glass higher-blur space-y-4">
                <h1 className="text-2xl">
                    资源目录
                </h1>
                <Explorer root={exampleRoot} />
            </div>
        </main>
    )
}