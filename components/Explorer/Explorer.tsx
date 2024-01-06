'use client';

import {useState} from "react";
import List from "@/components/List/List";
import PathBar from "@/components/Explorer/PathBar";
import Search from "@/components/Search/Search";

export type ExplorerFile = {
    name: string;
    size: string;
    type: 'file';
}

export type ExplorerDirectory = {
    name: string;
    type: 'directory';
    size: string;
    children: (ExplorerFile | ExplorerDirectory)[];
}

type ExplorerProps = {
    root: ExplorerDirectory;
}

export default function Explorer(props: ExplorerProps) {
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [searchResults, setSearchResults] = useState<(ExplorerFile | ExplorerDirectory)[]>([]);
    const [searchInputBinding, setSearchInputBinding] = useState('');
    const [showSearchBar, setShowSearchBar] = useState(false);

    const [currentPathDepth, setCurrentPathDepth] = useState(0);

    const pageStack: number[] = [0];
    const pageStackGetter = () => pageStack;
    const pathStack: ExplorerDirectory[] = [props.root];
    const pathStackGetter = () => pathStack;
    const pushStack = (index: number, path: ExplorerDirectory) => {
        pageStack.push(index);
        pathStack.push(path);
    };
    const popStack = (): [number?, ExplorerDirectory?] => [pageStack.pop(), pathStack.pop()];

    return (
        <div className="space-y-2">
            <Search />
            <PathBar path={
                pathStack.map((path) => path.name)
            } onClick={(index) => {
                const [page, path] = popStack();
                setCurrentPathDepth(index);
                if (page !== undefined && path !== undefined) {
                    pushStack(page, path);
                }
            }} />
            <List items={pathStack[currentPathDepth].children}  />
        </div>
    )
}