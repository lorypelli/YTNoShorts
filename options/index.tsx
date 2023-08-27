/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { Switch, TextInput, Button, MantineProvider } from '@mantine/core';
import { Storage } from '@plasmohq/storage';
import '../styles/Options.css';
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
            }
            if (c == '1') {
                setDisabled(true);
            }
            setChecked(c);
        });
        Promise.resolve(shortcut).then(async s => {
            if (s == null) {
                await storage.set('shortcut', 'ALT + Q');
            }
            setShortcutValue(s);
        });
    }, []);
    return (
        <MantineProvider theme={{ colorScheme: 'dark' }}>
            <Switch checked={checked == '1' ? true : false} label="Always replace youtube shorts layout with normal one" onClick={(e) => {
                if (e.currentTarget.checked == true) {
                    setDisabled(true);
                }
                else {
                    setDisabled(false);
                }
                setChecked(e.currentTarget.checked == true ? '1' : '0');
            }} />
            <h1>Shortcut</h1>
            <TextInput disabled={disabled} size='lg' placeholder='Shortcut...' id='shortcut' value={shortcutValue || 'ALT + Q'} onChange={(e) => e.preventDefault()} onKeyDown={(e) => {
                e.preventDefault();
                setShortcutValue('ALT' + ' + ' + e.key.toUpperCase());
            }} />
            <Button onClick={async () => {
                await storage.set('shortcut', document.getElementById('shortcut').value);
                await storage.set('checked', checked);
                document.getElementsByTagName('button')[0].style.backgroundColor = 'green';
                setTimeout(() => {
                    document.getElementsByTagName('button')[0].style.backgroundColor = 'blue';
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
                document.getElementsByTagName('button')[1].style.backgroundColor = 'green';
                setTimeout(() => {
                    document.getElementsByTagName('button')[1].style.backgroundColor = 'red';
                }, 500);
            }}>Reset</Button>
        </MantineProvider>
    );
}