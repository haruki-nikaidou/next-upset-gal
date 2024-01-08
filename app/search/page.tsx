'use client';

import Logo from "@/components/Logo/Logo";
import Search from "@/components/Search/Search";
import List from "@/components/List/List";
import React from "react";
import {trpc} from "@/app/api/[trpc]/trpc";
import {ExplorerDirectory, type ExplorerFile} from "@/components/Explorer/Explorer";
import {ListItemProps} from "@/components/List/ListItem";

interface tRpcResult {
    key: string,
    value: ExplorerFile
}

enum ListEmptyReason {
    SearchEmpty = '什么结果都没有哦，是不是弄错了什么？',
    Searching = '正在搜索中...',
    SearchError = '搜索时出现了错误！'
}

export default function SearchPage() {
    const [firstSearch, setFirstSearch] = React.useState(false);
    const [listEmptyReason, setListEmptyReason] = React.useState(ListEmptyReason.SearchEmpty);
    const [items, setItems] = React.useState<ListItemProps[]>([]);
    const handleSearch = (input: string) => {
        if (input === '') {
            setFirstSearch(false);
        } else {
            const result = trpc.search.query(input);
            setListEmptyReason(ListEmptyReason.Searching);
            setFirstSearch(true);
            const timeOut = setTimeout(() => {
                setListEmptyReason(ListEmptyReason.SearchError);
            }, 5000)
            result.then((result) => {
                clearTimeout(timeOut);
                if (result.length === 0) {
                    setListEmptyReason(ListEmptyReason.SearchEmpty);
                } else {
                    setListEmptyReason(ListEmptyReason.SearchEmpty);
                    setItems(tRpcResultToItems(result));
                }
            }).catch(() => {
                setListEmptyReason(ListEmptyReason.SearchError);
            })
        }
    }

    return (
        <main className="w-full p-4 mr-auto ml-auto max-w-5xl flex gap-10 flex-col items-center">
            <Logo/>
            <div className="w-full flex flex-col items-center gap-3 glass higher-blur">
                <Search onSearch={handleSearch}/>
                {
                    firstSearch ?
                        <List items={items} emptyText={listEmptyReason}/> : undefined
                }
            </div>
        </main>
    )
}

function tRpcResultToItems(result: tRpcResult[]): ListItemProps[] {
    const onClick = (event: React.MouseEvent<HTMLDivElement>, item: ListItemProps) => {
        // developing
        alert(item.append as string);
    }
    return result.map(item => {
        return {
            name: item.value.name,
            size: item.value.size,
            type: "文件",
            append: item.key,
            onClick
        }
    })
}