import type { PlasmoCSConfig } from 'plasmo';
import { Storage } from '@plasmohq/storage';
const storage = new Storage();
export const config: PlasmoCSConfig = {
    matches: [
        'https://www.youtube.com/shorts/*'
    ]
};
const checked = storage.get('checked');
const url = window.location.href;
if (url && url.startsWith('https://www.youtube.com/')) {
    if (url.includes('/shorts')) {
        Promise.resolve(checked).then(async c => {
            if (c == null) {
                await storage.set('checked', '0');
                c = '0';
            }
            if (await storage.get('shortcut') == null) {
                await storage.set('shortcut', 'ALT + Q');
            }
            if (c == '1') {
                window.location.href = `https://www.youtube.com/watch?v=${url.split('/')[4]}`;
            }
            else if (c == '0') {
                window.addEventListener('keydown', async e => {
                    if (e.altKey && e.key.toUpperCase() == (await storage.get('shortcut')).split('+')[1].trim()) {
                        window.location.href = `https://www.youtube.com/watch?v=${url.split('/')[4]}`;
                    }
                });
            }
        });
    }
}