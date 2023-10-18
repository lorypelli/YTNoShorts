import { version } from './package.json';
export default async function versionStatus() {
    let res: Response | { current_version: { version: string } } = await fetch('https://addons.mozilla.org/api/v5/addons/addon/ytnoshorts/');
    res = await res.json() as { current_version: { version: string } };
    const latestVersion = replacePoints(res.current_version.version);
    const userVersion = replacePoints(version);
    if (userVersion != latestVersion) {
        if (userVersion < latestVersion) {
            return 'Outdated';
        }
        else if (userVersion > latestVersion) {
            return 'Beta';
        }
    }
    else if (userVersion == latestVersion) {
        return 'Stable';
    }

}
function replacePoints(s: string) {
    return parseInt(s.replaceAll('.', ''));
}