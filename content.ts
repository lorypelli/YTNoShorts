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
    let checked = await storage.get<boolean>('checked');
    let extension = await storage.get<boolean>('extension');
    let shortcut = await storage.get('shortcut');
    if (checked == null) {
        await storage.set('checked', false);
        checked = false;
    }
    if (extension == null) {
        await storage.set('extension', true);
        extension = true;
    }
    if (shortcut == null) {
        await storage.set('shortcut', 'ALT + Q');
        shortcut = 'ALT + Q';
    }
    if (url && url.startsWith('https://www.youtube.com/')) {
        const split = url.split('/')[4];
        if (url.includes('/shorts') && split.trim() != 'shorts') {
            if (checked && extension) {
                window.location.replace(`https://www.youtube.com/watch?v=${split}`);
            }
            else if (!checked && extension) {    
                if (split.trim() != 'shorts') {
                    window.addEventListener('keydown', async (e) => {
                        e.preventDefault();
                        if ((e.altKey && shortcut.split('+')[0].trim() == 'ALT' || e.ctrlKey && shortcut.split('+')[0].trim() == 'CONTROL' || e.shiftKey && shortcut.split('+')[0].trim() == 'SHIFT') && e.key.toUpperCase() == shortcut.split('+')[1].trim()) {
                            window.location.replace(`https://www.youtube.com/watch?v=${split}`);
                        }
                    });
                }
            }
        }
    }
}, 1000);