import type {ExplorerDirectory, ExplorerFile} from '@/components/Explorer/Explorer';
import {FileTree} from 'onedrive-tree';
import type {File} from "onedrive-tree/dist/fileSystem";

export function odTreeToClientOnly(odTree: FileTree): ExplorerDirectory {
    const root: ExplorerDirectory = {
        name: odTree.name,
        children: [],
        type: 'directory',
    };
    for (const child of odTree.children) {
        if (child.type === 'directory') {
            root.children.push(odTreeToClientOnly(child));
        } else {
            const file: ExplorerFile = {
                name: child.name,
                size: child.size,
                type: 'file',
            };
            root.children.push(file);
        }
    }
    return root;
}

export function odFileToClientOnly(odFiles: File): ExplorerFile {
    return {
        name: odFiles.name,
        size: odFiles.size + 'MB',
        type: 'file',
    };
}