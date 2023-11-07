/* eslint-disable prefer-const */
import React, { useState } from 'react';
import { Storage } from '@plasmohq/storage';
import { Button } from '@mantine/core';
export default function Disable() {
    const storage = new Storage();
    const [extDisabled, setExtDisabled] = useState('0');
    const extension = storage.get('extension');
    Promise.resolve(extension).then(async (e) => {
        if (e == null) {
            await storage.set('extension', '0');
            setExtDisabled('0');
        }
        else {
            setExtDisabled(e);
        }
    });
    return (
        <>
            <h1>Extension is currently {extDisabled == '1' ? 'disabled' : 'enabled'}</h1>
            <Button id='disable' onClick={async () => {
                await storage.set('extension', extDisabled != '1' ? '1' : '0');
                setExtDisabled(extDisabled != '1' ? '1' : '0');
            }}>{extDisabled != '1' ? 'DISABLE' : 'ENABLE'}</Button>
        </>
    );
}