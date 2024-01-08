import {File} from "@/server/utils/onedrive/fileSystem";
import {ListItemProps} from "@/components/List/ListItem";
import {byteSizeToString} from "@/server/utils/odTreeToClientOnly";

function filesToItemProps(files: File[]): ListItemProps[] {
    return files.map((file) => {
        return {
            name: file.name,
            size: byteSizeToString(file.size),
            type: "文件"
        }
    })
}