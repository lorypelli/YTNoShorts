/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { Code, MantineProvider } from '@mantine/core';
import { Storage } from '@plasmohq/storage';
import '../styles/Header.css';
export default function Header() {
    const storage = new Storage();
    const [shortcutValue, setShortcutValue] = useState('');
    const shortcut = storage.get('shortcut');
    Promise.resolve(shortcut).then(async s => {
        if (s == null) {
            await storage.set('shortcut', 'ALT + Q');
            setShortcutValue('ALT + Q');
        }
        else {
            setShortcutValue(s);
        }
    });
    return (
        <>
            <h1>Youtube No Shorts</h1>
            <h1>This extension is useful if you don't like youtube shorts layout and you want to replace it with the old one</h1>
            <h1>How to do this?</h1>
            <h1>You can set an option to always replace shorts videos or you can use the shortcut <MantineProvider theme={{ colorScheme: 'dark' }}><Code block>{shortcutValue}</Code></MantineProvider> you set from <a href='/options.html' target='_blank' style={{ color: '#FFFFFF' }}>settings</a></h1>
        </>
    );
}