import React from 'react';
import Button from '../../Button/Button';
import Tabs from '../../Tabs/Tabs';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

const DisplayPriceInTabs = () => {
    const tabOptions = [
        {
            label:
                <span className='text-sm'>XRP</span>
            , value: 'XRP'
        },
        {
            label:
                <span className='text-sm'>HOUND</span>
            , value: 'HOUND'
        },
        {
            label:
                <span className='text-sm'>USD</span>
            , value: 'USD'
        },
    ];
    return (
        <div className='flex flex-row justify-between align-middle gap-2'>
            <div className='flex flex-col gap-2'>
                <span className='font-semibold text-base'>Display price in</span>
                <Tabs className="px-0 h-full hidden md:flex bg-transparent flex-wrap !justify-start" options={tabOptions} bgColor="#21212A"/>
            </div>

        </div>
    );
};

export default DisplayPriceInTabs;
