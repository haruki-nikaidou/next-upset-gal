import {OnedriveTree, auth, DirectoryNode} from "./onedrive/index";
import path from "node:path";
import * as fs from "fs";

const configPath = path.join(__dirname, "../../config.json");

interface OdConfig {
    refreshToken: string;
    clientId: string;
    clientSecret: string;
}

type ConfigFile = {
    od: OdConfig[];
}

const configFile = fs.readFileSync(configPath, "utf-8");
const WheelCycleLength = 10 * 60 * 1000; // 10 minutes
const Alters = 3;

let currentDrive = 0;

const config: ConfigFile = JSON.parse(configFile);

async function getDrives() {
    return await Promise.all(config.od.map(async (odConfig) => {
        const accessToken = await auth.fetchAccessToken(odConfig);
        const drive =  {
            driveId: await auth.getOneDriveDriveId(accessToken),
            accessToken,
        }
        return await OnedriveTree(drive);
    }))
}

let drives: DirectoryNode[][] = [await getDrives()];

async function refreshDrives() {
    drives[currentDrive + 1] = await getDrives();
}

export async function wheel() {
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
        getDrives: () => {
            return drives[currentDrive];
        },
    }
}