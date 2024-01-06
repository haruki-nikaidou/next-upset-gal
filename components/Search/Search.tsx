'use client';

import styles from './Search.module.css';
import React from "react";

export interface SearchProps {
    onSearch?: (keyword: string) => void;
}

export default function Search(props: SearchProps) {
    const [input, setInput] = React.useState('');
    return (
        <div className={`${styles.search}`}>
            <input type="text" value={input}
                   placeholder="输入关键词搜索"
                   onInput={(e) => setInput(e.currentTarget.value)}
                   onKeyUp={(e) => {
                       if (e.key === 'Enter') {
                           props.onSearch?.(input);
                       }
                   }}
            />
            <button
                onClick={() => {
                    props.onSearch?.(input);
                }}
            >搜索</button>
        </div>
    );
}