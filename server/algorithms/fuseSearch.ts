import Fuse from 'fuse.js';
import {CompressedPaths, File} from "onedrive-tree/dist/fileSystem";

const GameNames: string[] = [];

const fuse = new Fuse(GameNames, {keys: ['title']});
const compressedPaths: CompressedPaths = new Map();

export function fuseSearch(query: string): File[] {
    const results = fuse.search(query);
    return results.map((result) => compressedPaths.get(result.item)!);
}