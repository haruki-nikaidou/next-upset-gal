import {wheel} from "@/server/utils/odWheel";
import type {File} from "onedrive-tree/dist/fileSystem";
import Fuse from "fuse.js";

const getCache = (await wheel()).getCache;

const query = (path: string) => {
    const fs = getCache();
    return fs.compressedPaths.get(path);
}

const globalFuse = (pathKey: string): File[] => {
    const fuse = new Fuse(getCache().kvObject, {
        keys: ['key'],
    });
    return fuse.search(pathKey).map(({item}) => item.value);
}

const fs = () => getCache().fs;

export {
    query,
    globalFuse,
    fs,
}