/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { Switch, TextInput, Button, MantineProvider, Select } from '@mantine/core';
import { useStorage } from '@plasmohq/storage/hook';
import './styles/Options.css';
import versionStatus from '~versionStatus';
export default function Options() {
    const [checkedValue, setCheckedValue] = useState(false);
    const [primaryKey, setPrimaryKey] = useState('');
    const [secondaryKey, setSecondaryKey] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [extDisabled, setExtDisabled] = useState(false);
    const [saved, setSaved] = useState(true);
    const [checked, setChecked] = useStorage('checked', false);
    const [shortcut, setShortcut] = useStorage('shortcut', 'ALT + Q');
    const [extension, setExtension] = useStorage('extension', true);
    useEffect(() => {
        if (!extension) {
            document.getElementById('__plasmo').classList.add('disabled');
            document.getElementById('enable').style.display = 'block';
            document.getElementById('disable').style.display = 'none';
        }
        else {
            document.getElementById('__plasmo').classList.remove('disabled');
            document.getElementById('enable').style.display = 'none';
            document.getElementById('disable').style.display = 'block';
        }
        if (checked) {
            setDisabled(true);
        }
        setExtDisabled(!extension);
        setCheckedValue(checked);
        setPrimaryKey(shortcut.split('+')[0].trim());
        setSecondaryKey(shortcut.split('+')[1].trim());
    }, [extension, checked, shortcut]);
    useEffect(() => {
        function beforeUnloadHandler(e: BeforeUnloadEvent) {
            if (!saved && !extDisabled) {
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
                setExtension(true);
                setExtDisabled(false);
                if (shortcut == primaryKey + ' + ' + secondaryKey && checked == checkedValue) {
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
                setExtension(false);
                setExtDisabled(true);
            }}>DISABLE</Button>
            <br />
            <br />
            <Switch checked={checkedValue} label="Always replace youtube shorts layout with normal one" onClick={(e) => {
                if (e.target.checked != checked) {
                    setSaved(false);
                }
                else {
                    setSaved(true);
                }
                if (e.target.checked) {
                    setDisabled(true);
                }
                else {
                    setDisabled(false);
                }
                setCheckedValue(e.target.checked);
            }} />
            <br />
            <div id='inputs'>
                <Select disabled={disabled} size='lg' data={['ALT', 'CONTROL', 'SHIFT']} value={primaryKey || 'ALT'} onKeyDown={(e) => {
                    if (e.altKey) {
                        setPrimaryKey('ALT');
                    }
                    else if (e.ctrlKey) {
                        setPrimaryKey('CONTROL');
                    }
                    else if (e.shiftKey) {
                        setPrimaryKey('SHIFT');
                    }
                }} onChange={(value) => {
                    setPrimaryKey(value);
                    if (value != shortcut.split('+')[0].trim()) {
                        setSaved(false);
                    }
                    else {
                        setSaved(true);
                    }

                }} /><TextInput disabled={disabled} size='lg' value={secondaryKey || 'Q'} onChange={(e) => e.preventDefault()} onKeyDown={(e) => {
                    e.preventDefault();
                    if (e.target.value != shortcut.split('+')[1].trim()) {
                        setSaved(false);
                    }
                    else {
                        setSaved(true);
                    }
                    if (e.key.toUpperCase() != ' ') {
                        document.getElementsByClassName('mantine-rwipcq')[0].classList.remove('error');
                        setPrimaryKey(primaryKey);
                        setSecondaryKey(e.key.toUpperCase());
                    }
                    else {
                        document.getElementsByClassName('mantine-rwipcq')[0].classList.add('error');
                        setTimeout(() => {
                            document.getElementsByClassName('mantine-rwipcq')[0].classList.remove('error');
                        }, 500);
                    }
                }} />
            </div>
            <div id="buttons">
                <Button onClick={async () => {
                    setSaved(true);
                    setShortcut(primaryKey + ' + ' + secondaryKey);
                    setChecked(checkedValue);
                    document.getElementsByTagName('button')[2].style.backgroundColor = 'green';
                    setTimeout(() => {
                        document.getElementsByTagName('button')[2].style.backgroundColor = 'blue';
                    }, 500);
                }}>Save</Button>
                <br />
                <br />
                <Button onClick={async () => {
                    setSaved(true);
                    setCheckedValue(false);
                    setPrimaryKey('ALT');
                    setSecondaryKey('Q');
                    setChecked(false);
                    setShortcut('ALT + Q');
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
            </div>
            <h1 id='status'>...</h1>
        </MantineProvider>
    );
}