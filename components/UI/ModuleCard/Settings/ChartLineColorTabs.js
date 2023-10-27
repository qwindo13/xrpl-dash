import React from 'react';
import Tabs from '../../Tabs/Tabs';

const ChartLineColorTabs = ({ value, onChange }) => {
    const tabOptions = [
        {
            label:
                <div className='h-4 w-4 rounded-full bg-[#85A8D8]' />
            , value: '#85A8D8'
        },
        {
            label:
            <div className='h-4 w-4 rounded-full bg-[#F280A3]' />
            , value: '#F280A3'
        },
        {
            label:
            <div className='h-4 w-4 rounded-full bg-[#97509F]' />
            , value: '#97509F'
        },
    ];
    return (
        <div className='flex flex-row flex-wrap justify-between items-center gap-2'>
            <span className='font-semibold text-base mb-2 md:mb-0'>Line Color</span>
            <Tabs 
                tabsId="line-color" 
                className="px-0 h-full bg-transparent flex-wrap !justify-start" 
                options={tabOptions} 
                bgColor="#21212A" 
                onChange={onChange} 
            />
        </div>
    );
};

export default ChartLineColorTabs;
