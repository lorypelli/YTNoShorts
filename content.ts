import type { PlasmoCSConfig } from 'plasmo';
import { Storage } from '@plasmohq/storage';
export const config: PlasmoCSConfig = {
    matches: [
        'https://www.youtube.com/*'
    ]
};
const storage = new Storage();
setInterval(async () => {
    const url = window.location.href;
    const checked = await storage.get('checked') || false;
    const extension = await storage.get('extension') || false;
    const shortcut = await storage.get('shortcut') || 'ALT + Q';
    if (url && url.startsWith('https://www.youtube.com/')) {
        if (url.includes('/shorts')) {
            if (checked && !extension) {
                window.location.href = `https://www.youtube.com/watch?v=${url.split('/')[4]}`;
            }
            else if (!checked && !extension) {        
                window.addEventListener('keydown', async (e) => {
                    e.preventDefault();
                    if ((e.altKey && shortcut.split('+')[0].trim() == 'ALT' || e.ctrlKey && shortcut.split('+')[0].trim() == 'CONTROL' || e.shiftKey && shortcut.split('+')[0].trim() == 'SHIFT') && e.key.toUpperCase() == shortcut.split('+')[1].trim()) {
                        window.location.href = `https://www.youtube.com/watch?v=${url.split('/')[4]}`;
                    }
                });
            }
        }
    }
}, 1000);