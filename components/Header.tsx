/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { Code, MantineProvider } from '@mantine/core';
import { Storage } from '@plasmohq/storage';
export default function Header() {
    const storage = new Storage();
    const [primaryKey, setPrimaryKey] = useState('');
    const [secondaryKey, setSecondaryKey] = useState('');
    const shortcut = storage.get('shortcut');
    Promise.resolve(shortcut).then(async (s) => {
        if (s == null) {
            await storage.set('shortcut', 'ALT + Q');
            setPrimaryKey('ALT');
            setSecondaryKey('Q');
        }
        else {
            setPrimaryKey(s.split('+')[0].trim());
            setSecondaryKey(s.split('+')[1].trim());
        }
    });
    return (
        <>
            <img className='right' src='https://i.ibb.co/LrVY3Rx/icon.png' width={25} height={25} /><h1 className='inline'>Youtube No Shorts</h1><img className='left' src='https://i.ibb.co/LrVY3Rx/icon.png' width={25} height={25} />
            <h1>This extension is useful if you don't like youtube shorts layout and you want to replace it with the old one</h1>
            <h1>How to do this?</h1>
            <h1>You can set an option to always replace shorts videos or you can use the shortcut <MantineProvider theme={{ colorScheme: 'dark' }}><Code block>{primaryKey + ' + ' + secondaryKey}</Code></MantineProvider> you set from <a href='/options.html' target='_blank'>settings</a></h1>
        </>
    );
}