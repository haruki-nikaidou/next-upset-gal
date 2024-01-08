import {wheel} from "@/server/utils/odWheel";
import type {File} from "onedrive-tree/dist/fileSystem";
import Fuse from "fuse.js";

const w = (await wheel)();

const getCache = w.getCache;

const query = (path: string) => {
    const fs = getCache();
    return fs.compressedPaths.get(path);
}

const globalFuse = (pathKey: string): {
    key: string,
    value: File,
}[] => {
    const fuse = new Fuse(getCache().kvObject, {
        keys: ['key'],
    });
    return fuse.search(pathKey).map(item => item.item);
}

const fs = () => w.getCache().fs;

const clientOnly = () => w.getCache().clientOnly;

export function wheelState() {
    return {
        query,
        globalFuse,
        fs,
        clientOnly
    }
}