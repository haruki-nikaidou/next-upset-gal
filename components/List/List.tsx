import {ListItemProps} from "@/components/List/ListItem";
import React from "react";

export interface ListProps<InitReturn> {
    items: ListItemProps[];
    itemPerPage?: number;
    onInit?: (list: ListApi) => InitReturn;
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
                                    className={}
                            >
                                {index}
                            </button>
                        )
                    })
                }
            </>
        )
    }
}