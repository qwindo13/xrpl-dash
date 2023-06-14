import React from 'react';
import Switch from '../../Switch/Switch';
import Tabs from '../../Tabs/Tabs';

const BackgroundTabs = ({ value, onChange }) => {
    const tabOptions = [
        {
            label:
                <span className='text-sm'>Solid</span>
            , value: 'Solid'
        },
        {
            label:
                <span className='text-sm'>Highlight</span>
            , value: 'Highlight'
        },
        {
            label:
                <span className='text-sm'>Transparent</span>
            , value: 'Transparent'
        },
    ];
    return (

        <div className='flex flex-row justify-between align-middle gap-2'>
        <div className='flex flex-col gap-2'>
            <span className='font-semibold text-base'>Background</span>
            <Tabs tabsId="background" className="px-0 h-full hidden md:flex bg-transparent flex-wrap !justify-start" options={tabOptions} bgColor="#21212A" onChange={onChange} />
        </div>

    </div>
    );
};

export default BackgroundTabs;
