import path from "node:path";
import * as fs from "fs";

const OneDriveConfigPath = path.join(__dirname, 'config.json');
const OneDriveConfig = JSON.parse(fs.readFileSync(OneDriveConfigPath, 'utf8'));

export default OneDriveConfig;