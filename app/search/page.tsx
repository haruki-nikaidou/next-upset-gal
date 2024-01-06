'use client';

import Logo from "@/components/Logo/Logo";
import Search from "@/components/Search/Search";
import List from "@/components/List/List";
import React from "react";

export default function SearchPage() {
    const [firstSearch, setFirstSearch] = React.useState(false);
    const handleSearch = (input: string) => {
        if (input === '') {
            setFirstSearch(false);
        } else {
            setFirstSearch(true);
        }
    }
    return (
        <main className="w-full p-4 mr-auto ml-auto max-w-5xl flex gap-10 flex-col items-center">
            <Logo />
            <div className="w-full flex flex-col items-center gap-3 glass higher-blur">
                <Search onSearch={handleSearch}/>
                {
                    firstSearch?
                    <List items={[]}/>: undefined
                }
            </div>
        </main>
    )
}