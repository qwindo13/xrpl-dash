import React from 'react';
import Tabs from '../../Tabs/Tabs';

const ProfitTabs = ({ value, onChange }) => {
    const tabOptions = [
        {
            label:
                <span className='text-sm'>Most</span>
            , value: 'Most Profit'
        },
        {
            label:
            <span className='text-sm'>Least</span>
            , value: 'Least profitable'
        },
    ];
    return (

        <div className='flex flex-row justify-between align-middle gap-2'>
            <div className='flex flex-col gap-2'>
                <span className='font-semibold text-base'>Show Profit</span>
                <Tabs tabsId="background" className="px-0 h-full hidden md:flex bg-transparent flex-wrap !justify-start" options={tabOptions} bgColor="#21212A" onChange={onChange} />
            </div>

        </div>
    );
};

export default ProfitTabs;
