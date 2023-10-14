import { version as userVersion } from './package.json';
export async function checkLatest() {
    let res: Response | { current_version: { version: string } } = await fetch('https://addons.mozilla.org/api/v5/addons/addon/ytnoshorts/');
    res = await res.json() as { current_version: { version: string } };
    const latestVersion = res.current_version.version;
    if (userVersion == latestVersion) return true;
    else return false;
}