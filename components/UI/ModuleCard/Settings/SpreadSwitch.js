import React from 'react';
import Switch from '../../Switch/Switch';

const SpreadSwitch = ({ value, onChange }) => {
    return (
        <div className='flex flex-row justify-between align-middle gap-2'>
            <div className='flex flex-col'>
                <span className='font-semibold text-base'>Spread</span>
                <span className='opacity-60 font-semibold text-xs'>Display the difference between the highest bid and the lowest bid</span>
            </div>
            <div className='h-auto flex items-center'>
                <Switch value={value} onChange={onChange} />
            </div>
        </div>
    );
};

export default SpreadSwitch;
