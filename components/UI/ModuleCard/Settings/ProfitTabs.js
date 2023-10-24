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

        <div className='flex flex-row flex-wrap justify-between items-center gap-2'>
            <span className='font-semibold text-base mb-2 md:mb-0'>Show Profit</span>
            <Tabs
                tabsId="profit"
                className="px-0 h-full hidden md:flex bg-transparent flex-wrap !justify-start"
                options={tabOptions}
                bgColor="#21212A"
                onChange={onChange}
            />

        </div>
    );
};

export default ProfitTabs;
