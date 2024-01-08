import type {ExplorerDirectory, ExplorerFile} from '@/components/Explorer/Explorer';
import type {File} from "onedrive-tree/dist/fileSystem";
import {Directory} from "@/server/utils/onedrive/fileSystem";

export function odTreeToClientOnly(odTree: Directory): ExplorerDirectory {
    const root: ExplorerDirectory = {
        name: odTree.name,
        children: [],
        type: 'directory',
        size: "",
    };
    for (const odTreeElementIndex of odTree.indexes) {
        if (odTree.files[odTreeElementIndex]) {
            root.children.push(odFileToClientOnly(odTree.files[odTreeElementIndex]))
        } else if (odTree.subdirectories[odTreeElementIndex]) {
            root.children.push(odTreeToClientOnly(odTree.subdirectories[odTreeElementIndex]));
        }
    }
    return root;
}

export function odFileToClientOnly(odFiles: File): ExplorerFile {
    return {
        name: odFiles.name,
        size: byteSizeToString(odFiles.size),
        type: 'file',
    };
}

export function byteSizeToString(size: number): string {
    if (size < 1024) {
        return size + 'B';
    } else if (size < 1024 * 1024) {
        return (size / 1024).toFixed(2) + 'KB';
    } else if (size < 1024 * 1024 * 1024) {
        return (size / 1024 / 1024).toFixed(2) + 'MB';
    } else if (size < 1024 * 1024 * 1024 * 1024) {
        return (size / 1024 / 1024 / 1024).toFixed(2) + 'GB';
    } else {
        return (size / 1024 / 1024 / 1024 / 1024).toFixed(2) + 'TB';
    }
}