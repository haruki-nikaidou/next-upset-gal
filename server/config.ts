import path from "node:path";
import * as fs from "fs";

const OneDriveConfigPath = path.join(__dirname, 'config.json');
export const OneDriveConfig = JSON.parse(fs.readFileSync(OneDriveConfigPath, 'utf8'));