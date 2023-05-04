import React from 'react';
import Switch from '../../Switch/Switch';

const TitleSwitch = () => {
    return (
        <div className='flex flex-row justify-between align-middle gap-2'>
            <div className='flex flex-col'>
                <span className='font-semibold text-base'>Title</span>
                <span className='opacity-60 font-semibold text-xs'>Display title on top of the module</span>
            </div>
            <div className='h-auto flex items-center'>
                <Switch />
            </div>
        </div>
    );
};

export default TitleSwitch;
