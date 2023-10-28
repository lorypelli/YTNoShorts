/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { Switch, TextInput, Button, MantineProvider } from '@mantine/core';
import { Storage } from '@plasmohq/storage';
import '../styles/Options.css';
import versionStatus from '~versionStatus';
export default function Header() {
    const storage = new Storage();
    const [checkedValue, setCheckedValue] = useState('0');
    const [shortcutValue, setShortcutValue] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [extDisabled, setExtDisabled] = useState('0');
    const [saved, setSaved] = useState(false);
    useEffect(() => {
        const checked = storage.get('checked');
        const shortcut = storage.get('shortcut');
        const extension = storage.get('extension');
        Promise.resolve(checked).then(async c => {
            if (c == null) {
                await storage.set('checked', '0');
                c = '0';
            }
            if (c == '1') {
                setDisabled(true);
            }
            setCheckedValue(c);
        });
        Promise.resolve(shortcut).then(async s => {
            if (s == null) {
                await storage.set('shortcut', 'ALT + Q');
                s = 'ALT + Q';
            }
            setShortcutValue(s);
        });
        Promise.resolve(extension).then(async e => {
            if (e == null) {
                await storage.set('extension', '0');
                e = '0';
            }
            if (e == '1') {
                document.getElementById('__plasmo').classList.add('disabled');
                document.getElementById('enable').style.display = 'block';
                document.getElementById('disable').style.display = 'none';
            }
            else {
                document.getElementById('__plasmo').classList.remove('disabled');
                document.getElementById('enable').style.display = 'none';
                document.getElementById('disable').style.display = 'block';
            }
            setExtDisabled(e);
        });
    }, []);
    useEffect(() => {
        function beforeUnloadHandler(e: BeforeUnloadEvent) {
            if (!saved && !(extDisabled == '1' ? true : false)) {
                e.preventDefault();
                e.returnValue = '';
            }
        }
        window.addEventListener('beforeunload', beforeUnloadHandler);
        return () => {
            window.removeEventListener('beforeunload', beforeUnloadHandler);
        };
    }, [saved, extDisabled]);
    return (
        <MantineProvider theme={{ colorScheme: 'dark' }}>
            <Button id='enable' onClick={async () => {
                document.getElementById('__plasmo').classList.remove('disabled');
                document.getElementById('enable').style.display = 'none';
                document.getElementById('disable').style.display = 'block';
                await storage.set('extension', '0');
                setExtDisabled('0');
                if (await storage.get('shortcut') == shortcutValue && await storage.get('checked') == checkedValue) {
                    setSaved(true);
                }
            }}>ENABLE</Button>
            <br />
            <br />
            <Button id='disable' onClick={async () => {
                document.getElementById('__plasmo').classList.add('disabled');
                document.getElementById('enable').style.display = 'block';
                document.getElementById('disable').style.display = 'none';
                document.getElementById('status').style.display = 'none';
                await storage.set('extension', '1');
                setExtDisabled('1');
            }}>DISABLE</Button>
            <br />
            <br />
            <Switch checked={checkedValue == '1' ? true : false} label="Always replace youtube shorts layout with normal one" onClick={(e) => {
                if (e.currentTarget.checked) {
                    setDisabled(true);
                }
                else {
                    setDisabled(false);
                }
                setCheckedValue(e.currentTarget.checked == true ? '1' : '0');
            }} />
            <br />
            <TextInput disabled={disabled} size='lg' placeholder='Shortcut...' id='shortcut' value={shortcutValue || 'ALT + Q'} onChange={(e) => e.preventDefault()} onKeyDown={(e) => {
                e.preventDefault();
                if (e.currentTarget.value != shortcutValue) {
                    setSaved(false);
                }
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
                    setSaved(true);
                    await storage.set('shortcut', shortcutValue);
                    await storage.set('checked', checkedValue);
                    document.getElementsByTagName('button')[2].style.backgroundColor = 'green';
                    setTimeout(() => {
                        document.getElementsByTagName('button')[2].style.backgroundColor = 'blue';
                    }, 500);
                }}>Save</Button>
                <br />
                <br />
                <Button onClick={async () => {
                    setSaved(true);
                    setCheckedValue('0');
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