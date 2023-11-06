import type { PlasmoCSConfig } from 'plasmo';
import { Storage } from '@plasmohq/storage';
const storage = new Storage();
export const config: PlasmoCSConfig = {
    matches: [
        'https://www.youtube.com/*'
    ]
};
let isImageCreated = false;
let hasImage = false;
const observer = new MutationObserver(list => {
    for (let i = 0; i < list.length; i++) {
        if (list[i].type == 'childList') {
            isImageCreated = false;
            hasImage = false;
        }
    }
});
observer.observe(document.body, {
    childList: true
});
setInterval(async () => {
    const url = window.location.href;
    if (url && url.startsWith('https://www.youtube.com/')) {
        if (url.includes('/shorts')) {
            const checked = await storage.get('checked');
            const shortcut = await storage.get('shortcut');
            const extension = await storage.get('extension');
            if (extension == null) {
                await storage.set('extension', '0');
            }
            if (checked == null) {
                await storage.set('checked', '0');
            }
            if (shortcut == null) {
                await storage.set('shortcut', 'ALT + Q');
            }
            if (checked == '1' && extension == '0') {
                window.location.href = `https://www.youtube.com/watch?v=${url.split('/')[4]}`;
            }
            else if (checked == '0' && extension == '0') {
                if (!isImageCreated) {
                    document.getElementById('shorts-container').addEventListener('scroll', () => {
                        isImageCreated = false;
                        hasImage = false;
                    });
                    const img = document.createElement('img');
                    img.src = 'https://cdn-icons-png.flaticon.com/512/100/100487.png';
                    img.width = 50;
                    img.height = 50;
                    img.style.cursor = 'pointer';
                    const shorts = document.getElementsByTagName('ytd-reel-video-renderer');
                    let j = 0;
                    let x = 0;
                    let q = 0;
                    for (let i = 0; i < shorts.length; i++) {
                        shorts[i].getAttributeNames().forEach(a => {
                            if (a == 'is-active') {
                                shorts[i].childNodes.forEach(b => {
                                    (b as unknown as Element).classList?.forEach(c => {
                                        j += 1;
                                        if (c == 'overlay') {
                                            shorts[i].childNodes[j].childNodes.forEach(d => {
                                                x += 1;
                                                if ((d as unknown as Element).tagName?.toLowerCase() == 'ytd-reel-player-overlay-renderer') {
                                                    shorts[i].childNodes[j].childNodes[x - 1].childNodes.forEach(e => {
                                                        q += 1;
                                                        if ((e as unknown as Element).id == 'actions') {
                                                            shorts[i].childNodes[j].childNodes[x - 1].childNodes[q - 1].childNodes.forEach(f => {
                                                                if (f.tagName?.toLowerCase() == 'img') {
                                                                    hasImage = true;
                                                                }
                                                            });
                                                            if (!hasImage) {
                                                                shorts[i].childNodes[j].childNodes[x - 1].childNodes[q - 1].appendChild(img);
                                                            }
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                });
                            }
                        });
                    }
                    isImageCreated = true;
                    img.onclick = () => {
                        window.location.href = `https://www.youtube.com/watch?v=${url.split('/')[4]}`;
                    };
                }
                window.addEventListener('keydown', async e => {
                    if (e.altKey && e.key.toUpperCase() == (await storage.get('shortcut')).split('+')[1].trim()) {
                        window.location.href = `https://www.youtube.com/watch?v=${url.split('/')[4]}`;
                    }
                });
            }
        }
    }
}, 1000);