/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { Code, MantineProvider } from '@mantine/core';
import { useStorage } from '@plasmohq/storage/hook';
export default function Header() {
    const [primaryKey, setPrimaryKey] = useState('');
    const [secondaryKey, setSecondaryKey] = useState('');
    const shortcut = useStorage('shortcut', 'ALT + Q')[0];
    useEffect(() => {
        setPrimaryKey(shortcut.split('+')[0].trim());
        setSecondaryKey(shortcut.split('+')[1].trim());
    }, [shortcut]);
    return (
        <>
            <img className='right' src='https://i.ibb.co/LrVY3Rx/icon.png' width={25} height={25} /><h1 className='inline'>Youtube No Shorts</h1><img className='left' src='https://i.ibb.co/LrVY3Rx/icon.png' width={25} height={25} />
            <h1>This extension is useful if you don't like youtube shorts layout and you want to replace it with the old one</h1>
            <h1>How to do this?</h1>
            <h1>You can set an option to always replace shorts videos or you can use the shortcut <MantineProvider theme={{ colorScheme: 'dark' }}><Code block>{primaryKey + ' + ' + secondaryKey}</Code></MantineProvider> you set from <a href='/options.html' target='_blank'>settings</a></h1>
        </>
    );
}