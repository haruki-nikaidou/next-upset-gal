'use client';

import {useEffect, useState} from "react";
import List, {ListApi} from "@/components/List/List";
import PathBar from "@/components/Explorer/PathBar";
import Search from "@/components/Search/Search";
import {ListItemProps} from "@/components/List/ListItem";

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
    // const [showSearchResults, setShowSearchResults] = useState(false);
    // const [searchResults, setSearchResults] = useState<(ExplorerFile | ExplorerDirectory)[]>([]);
    const [searchInputBinding, setSearchInputBinding] = useState('');

    const [currentPathDepth, setCurrentPathDepth] = useState(0);

    const [pageStack, setPageStack] = useState<number[]>([0]);
    const [pathStack, setPathStack] = useState<ExplorerDirectory[]>([props.root]);
    const [pathBarPath, setPathBarPath] = useState<string[]>([props.root.name]);

    const refreshPathBarPath = () => {
        setPathBarPath(pathStack.map((path) => path.name));
    }

    const pushStack = (index: number, path: ExplorerDirectory) => {
        pageStack.push(index);
        pathStack.push(path);
        setPageStack(pageStack);
        setPathStack(pathStack);
        refreshPathBarPath();
    };
    const popStack = (): [number?, ExplorerDirectory?] => [pageStack.pop(), pathStack.pop()];

    let listApi: ListApi;

    const itemOnClick = (item: ListItemProps) => {
        if (item.type === 'directory') {
            pushStack(listApi.getPage(), findDirectoryByName(pathStack[currentPathDepth],item.name)!);
            setCurrentPathDepth(currentPathDepth + 1);
        }
    }

    return (
        <div className="space-y-2">
            <Search onSearch={search => {setSearchInputBinding(search)}}/>
            <PathBar path={pathBarPath} onClick={(index) => {
                const [page, path] = popStack();
                setCurrentPathDepth(index);
                if (page !== undefined && path !== undefined) {
                    pushStack(page, path);
                }
                refreshPathBarPath();
            }} />
            <List items={pathStack[currentPathDepth].children.map(item => {
                return {
                    name: item.name,
                    size: item.size,
                    type: item.type,
                    onClick: (e,item) => {
                        itemOnClick(item);
                    }
                }
            })} onInit={(api) => {listApi = api}} />
        </div>
    )
}

function findDirectoryByName(directory: ExplorerDirectory, name: string): ExplorerDirectory | undefined {
    for (const child of directory.children) {
        if (child.type === 'directory') {
            if (child.name === name) {
                return child;
            }
        }
    }
    return undefined;
}