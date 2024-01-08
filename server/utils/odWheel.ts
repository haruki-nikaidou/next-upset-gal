import {OnedriveTree, auth} from "./onedrive/index";
import path from "node:path";
import * as fs from "fs";
import OnedriveForestFs from "@/server/utils/onedrive/forest";
import {ExplorerDirectory} from "@/components/Explorer/Explorer";
import {odTreeToClientOnly} from "@/server/utils/odTreeToClientOnly";
import {CompressedPaths} from "@/server/utils/onedrive/fileSystem";
import type {File} from "onedrive-tree/dist/fileSystem";

interface OdConfig {
    refreshToken: string;
    clientId: string;
    clientSecret: string;
}

type ConfigFile = {
    od: OdConfig[];
}

type Cached = {
    fs: OnedriveForestFs,
    clientOnly: ExplorerDirectory,
    compressedPaths: CompressedPaths,
    kvObject: {
        key: string,
        value: File,
    }[]
}


export type Wheel = {
    stop: () => void,
    getCache: () => Cached,
}

export async function wheelGen(): Promise<Wheel> {
    const configPath = path.join(__dirname, "../../../../config.json");
    console.log("Config File:",configPath)

    try {
        fs.readFileSync(configPath, "utf-8");
    } catch (err) {
        console.error("Failed to read config file!");
        console.error(err);
        process.exit(1);
    }

    const configFile = fs.readFileSync(configPath, "utf-8");
    const WheelCycleLength = 10 * 60 * 1000; // 10 minutes
    const Alters = 3;

    let currentDrive = 0;

    const config: ConfigFile = JSON.parse(configFile);

    console.log("Config loaded!")

    let drives: Cached[] = [await getDrives()];

    async function refreshDrives() {
        drives[currentDrive + 1] = await getDrives();
    }

    async function getDrives(): Promise<Cached> {
        console.log("Refreshing drives...")
        const roots = await Promise.all(config.od.map(async (odConfig) => {
            const accessToken = await auth.fetchAccessToken(odConfig);
            console.log("Access token fetched!")
            const drive = {
                driveId: await auth.getOneDriveDriveId(accessToken),
                accessToken,
            }
            return await OnedriveTree(drive);
        }));
        const fs = new OnedriveForestFs(roots);
        console.log("Drives refreshed!")
        return {
            fs,
            clientOnly: odTreeToClientOnly(fs.root),
            compressedPaths: fs.index,
            kvObject: Array.from(
                fs.index.entries(),
                ([key, value]) => ({
                        key,
                        value,
                    }
                )
            )
        };
    }

    console.log("Starting wheel...")
    const errorHook = (err: any) => {
        console.error("Failed to refresh drives!");
        console.error(err);
    };
    const timer = setInterval(async () => {
        try {
            await refreshDrives();
            currentDrive = (currentDrive + 1) % Alters;
        } catch (err) {
            errorHook(err);
        }
    }, WheelCycleLength);
    return {
        stop: () => {
            clearInterval(timer);
        },
        getCache: () => {
            return drives[currentDrive];
        },
    }
}

export const wheel = wheelGen();