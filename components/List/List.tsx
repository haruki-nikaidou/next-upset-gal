'use client';

import ListItem, {ListItemProps} from "@/components/List/ListItem";
import React from "react";
import styles from './list.module.css'

export interface ListProps<InitReturn> {
    items: ListItemProps[];
    itemPerPage?: number;
    onInit?: (list: ListApi) => InitReturn;
    emptyText?: string;
}

export interface ListApi {
    pageTo: (page: number) => void;
    getPage: () => number;
}

export default function List(props: ListProps<any>) {
    const itemPerPage = props.itemPerPage ?? 10;
    const pages: ListItemProps[][] = [];
    for (let i = 0; i < props.items.length; i += itemPerPage) {
        pages.push(props.items.slice(i, i + itemPerPage));
    }
    const [page, setPage] = React.useState(0);
    const previousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    }
    const nextPage = () => {
        if (page < pages.length - 1) {
            setPage(page + 1);
        }
    }

    // display buttons to switch pages
    // for any page, display buttons that can switch to +-2 pages and that can switch to the first and last page
    const buttonIndexes: number[] = [];
    for (let i = page - 2; i <= page + 2; i++) {
        if (i >= 0 && i < pages.length) {
            buttonIndexes.push(i + 1);
        }
    }
    if (buttonIndexes[0] !== 1) {
        buttonIndexes.unshift(1);
    }
    if (buttonIndexes[buttonIndexes.length - 1] !== pages.length) {
        buttonIndexes.push(pages.length);
    }

    // buttons
    const Buttons = () => {
        return (
            <>
                {
                    buttonIndexes.map((index) => {
                        return (
                            <button key={index}
                                    onClick={() => setPage(index - 1)}
                                    className={index === page + 1 ? styles.selected : undefined}
                            >
                                {index}
                            </button>
                        )
                    })
                }
            </>
        )
    }

    // goto page input
    const [inputPage, setInputPage] = React.useState(page + 1);
    const handleInputPageChange = (event: React.FormEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        if (parseInt(value) > 0) {
            setInputPage(parseInt(value));
        } else if (value !== '') {
            setInputPage(page + 1);
        }
    }

    // api
    const api: ListApi = {
        pageTo: (page: number) => {
            setPage(page);
        },
        getPage: () => {
            return page;
        }
    }
    props.onInit?.(api);

    if (pages.length === 0) {
        return (
            <div className={'glass glass-on-glass w-full h-64 flex items-center justify-center'}>
                <h2 className="text-neutral-500">
                    {props.emptyText ?? '什么结果都没有哦，是不是弄错了什么？'}
                </h2>
            </div>
        )
    }

    return (
        <div className={'glass higher-blur glass-on-glass'}>
            <div className={`${styles.list}`}>
                {
                    pages[page].map((item, index) => {
                        return (
                            <ListItem title={item.title} size={item.size} resourceType={item.resourceType}
                                        key={'__list' + index + Math.random()} onClick={item.onClick} onContextMenu={item.onContextMenu}/>

                        )
                    })
                }
            </div>
            <div className={`${styles.control}`}>
                <div className={`${styles.buttonGroup}`}>
                    <button
                        disabled={page === 0}
                        onClick={previousPage}
                    > {'<'} </button>
                    {<Buttons />}
                    <button
                        disabled={page === pages.length - 1}
                        onClick={nextPage}
                    > {'>'} </button>
                </div>
                <div className={`${styles.goto}`}>
                    <button
                        onClick={() => {
                            if (inputPage > 0 && inputPage <= pages.length) {
                                setPage(inputPage - 1);
                            } else {
                                setInputPage(page + 1);
                            }
                        }}
                    >跳</button>
                    <span>到第</span>
                    <input
                        value={inputPage}
                        onInput={(e) => {
                            handleInputPageChange(e);
                        }}
                    />
                    <span>页</span>
                </div>
            </div>
        </div>
    )
}