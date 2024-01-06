'use client';

import React from "react";

export interface ListItemProps {
    name: string;
    size: string;
    type: string;
    onClick?: (event: React.MouseEvent<HTMLDivElement>, item: ListItemProps) => void;
    onContextMenu?: (event: React.MouseEvent<HTMLDivElement>, item: ListItemProps) => void;
}

export default function ListItem(props: ListItemProps) {
    return (
        <div className="w-full text-left leading-6 p-4 duration-200 hover:bg-white hover:bg-opacity-30 cursor-pointer"
             onClick={(e) => props.onClick?.(e, props)}
             onContextMenu={(e) => props.onContextMenu?.(e, props)}
        >
            <p className="text-lg text-gray-900">{props.name}</p>
            <p className="text-sm text-gray-800">大小：{props.size}，类型：{props.type}</p>
        </div>
    )
}