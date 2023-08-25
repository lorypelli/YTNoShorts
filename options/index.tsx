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
        Promise.resolve(checked).then(c => {
            if (c == '1') {
                setDisabled(true);
            }
            setChecked(c);
        });
        Promise.resolve(shortcut).then(s => {
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
            <TextInput disabled={disabled} size='lg' placeholder='Shortcut...' id='shortcut' value={shortcutValue || 'ALT'} onChange={(e) => e.preventDefault()} onKeyDown={(e) => {
                e.preventDefault();
                if (e.key.toUpperCase() == 'ALT') {
                    return;
                }
                setShortcutValue('ALT' + ' + ' + e.key.toUpperCase());
            }} />
            <Button onClick={async () => {
                await storage.set('shortcut', document.getElementById('shortcut').value);
                await storage.set('checked', checked);
            }}>Save</Button>
            <br />
            <br />
            <Button onClick={async () => {
                setChecked('0');
                setShortcutValue('ALT');
                if (checked == '0') {
                    setDisabled(false);
                }
            }}>Reset</Button>
        </MantineProvider>
    );
}