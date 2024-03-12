/* eslint-disable react/jsx-no-target-blank */
import { IconBrandGithub } from '@tabler/icons-react';
export default function Footer() {
    return (
        <>
            <h1>Extension made by <br />RVG|𝓵𝓸𝓻𝔂</h1>
            <a href='https://github.com/lorypelli' target='_blank'>
                <IconBrandGithub width={25} height={25} color='#FFFFFF' className='icon' />
            </a>
        </>
    );
}