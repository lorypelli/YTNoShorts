/* eslint-disable prefer-const */
import React, { useEffect, useState } from 'react';
import { Button } from '@mantine/core';
import { useStorage } from '@plasmohq/storage/hook';
export default function Disable() {
    const [extDisabled, setExtDisabled] = useState(false);
    const [extension, setExtension] = useStorage('extension', true);
    useEffect(() => {
        setExtDisabled(extension);
    }, [extension]);
    return (
        <>
            <h1>Extension is currently {extDisabled ? 'disabled' : 'enabled'}</h1>
            <Button id='disable' onClick={async () => {
                setExtension(!extDisabled);
                setExtDisabled(!extDisabled);
            }}>{!extDisabled ? 'DISABLE' : 'ENABLE'}</Button>
        </>
    );
}