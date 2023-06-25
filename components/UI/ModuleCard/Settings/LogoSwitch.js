import React from 'react';
import Switch from '../../Switch/Switch';

const LogoSwitch = ({ value, onChange, disabled = false }) => {
    return (
        <div className='flex flex-row justify-between align-middle gap-2'>
            <div className='flex flex-col'>
                <span className='font-semibold text-base'>Logo</span>
                <span className='opacity-60 font-semibold text-xs'>Display logo of the token</span>
            </div>
            <div className='h-auto flex items-center'>
                <Switch value={value} onChange={onChange} disabled={disabled} />
            </div>
        </div>
    );
};

export default LogoSwitch;
