/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { Switch, TextInput, Button, MantineProvider } from '@mantine/core';
import { Storage } from '@plasmohq/storage';
import '../styles/Options.css';
import versionStatus from '~versionStatus';
export default function Header() {
    const storage = new Storage();
    const [checked, setChecked] = useState('0');
    const [shortcutValue, setShortcutValue] = useState('');
    const [disabled, setDisabled] = useState(false);
    useEffect(() => {
        const checked = storage.get('checked');
        const shortcut = storage.get('shortcut');
        Promise.resolve(checked).then(async c => {
            if (c == null) {
                await storage.set('checked', '0');
                c = '0';
            }
            if (c == '1') {
                setDisabled(true);
            }
            setChecked(c);
        });
        Promise.resolve(shortcut).then(async s => {
            if (s == null) {
                await storage.set('shortcut', 'ALT + Q');
                s = 'ALT + Q';
            }
            setShortcutValue(s);
        });
    }, []);
    return (
        <MantineProvider theme={{ colorScheme: 'dark' }}>
            <Button id='enable' onClick={() => {
                document.getElementById('__plasmo').classList.remove('disabled');
                document.getElementById('enable').style.display = 'none';
                document.getElementById('disable').style.display = 'block';
            }}>ENABLE</Button>
            <br />
            <br />
            <Button id='disable' onClick={() => {
                document.getElementById('__plasmo').classList.add('disabled');
                document.getElementById('enable').style.display = 'flex';
                document.getElementById('disable').style.display = 'none';
            }}>DISABLE</Button>
            <br />
            <br />
            <Switch checked={checked == '1' ? true : false} label="Always replace youtube shorts layout with normal one" onClick={(e) => {
                if (e.currentTarget.checked) {
                    setDisabled(true);
                }
                else {
                    setDisabled(false);
                }
                setChecked(e.currentTarget.checked == true ? '1' : '0');
            }} />
            <br />
            <TextInput disabled={disabled} size='lg' placeholder='Shortcut...' id='shortcut' value={shortcutValue || 'ALT + Q'} onChange={(e) => e.preventDefault()} onKeyDown={(e) => {
                e.preventDefault();
                if (e.key.toUpperCase() != ' ' && e.key.toUpperCase() != 'ALT') {
                    document.getElementsByClassName('mantine-rwipcq')[0].classList.remove('error');
                    setShortcutValue('ALT' + ' + ' + e.key.toUpperCase());
                }
                else {
                    document.getElementsByClassName('mantine-rwipcq')[0].classList.add('error');
                    setTimeout(() => {
                        document.getElementsByClassName('mantine-rwipcq')[0].classList.remove('error');
                    }, 500);
                }
            }} />
            <div id="buttons">
                <Button onClick={async () => {
                    await storage.set('shortcut', shortcutValue);
                    await storage.set('checked', checked);
                    document.getElementsByTagName('button')[2].style.backgroundColor = 'green';
                    setTimeout(() => {
                        document.getElementsByTagName('button')[2].style.backgroundColor = 'blue';
                    }, 500);
                }}>Save</Button>
                <br />
                <br />
                <Button onClick={async () => {
                    setChecked('0');
                    setShortcutValue('ALT + Q');
                    await storage.set('checked', '0');
                    await storage.set('shortcut', 'ALT + Q');
                    setDisabled(false);
                    document.getElementsByTagName('button')[3].style.backgroundColor = 'green';
                    setTimeout(() => {
                        document.getElementsByTagName('button')[3].style.backgroundColor = 'red';
                    }, 500);
                }}>Reset</Button>
                <br />
                <br />
                <Button onClick={async () => {
                    const status = await versionStatus();
                    document.getElementById('status').style.display = 'block';
                    if (status == 'Stable') {
                        document.getElementById('status').innerHTML = 'You are using the latest version';
                    }
                    else if (status == 'Outdated') {
                        document.getElementById('status').innerHTML = 'You are using an outdated version';
                    }
                    else if (status == 'Beta') {
                        document.getElementById('status').innerHTML = 'You are using a beta version';
                    }
                    document.getElementsByTagName('button')[4].style.backgroundColor = 'green';
                    setTimeout(() => {
                        document.getElementsByTagName('button')[4].style.backgroundColor = 'blueviolet';
                    }, 500);
                }}>Check for updates</Button>
                <h1 id='status'>...</h1>
            </div>
        </MantineProvider>
    );
}