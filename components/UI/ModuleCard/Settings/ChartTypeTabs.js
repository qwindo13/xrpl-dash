import React from 'react';
import Tabs from '../../Tabs/Tabs';

const ChartTypeTabs = ({ value, onChange }) => {
    const tabOptions = [
        {
            label:
                <span className='text-sm'>Lines</span>
            , value: 'lines'
        },
        {
            label:
            <span className='text-sm'>Candles</span>
            , value: 'candles'
        },
    ];
    return (
        <div className='flex flex-row flex-wrap justify-between items-center gap-2'>
            <span className='font-semibold text-base mb-2 md:mb-0'>Chart Type</span>
            <Tabs 
                tabsId="background" 
                className="px-0 h-full bg-transparent flex-wrap !justify-start" 
                options={tabOptions} 
                bgColor="#21212A" 
                onChange={onChange} 
            />
        </div>
    );
};

export default ChartTypeTabs;
