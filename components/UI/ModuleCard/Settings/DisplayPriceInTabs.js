import React, { useEffect, useState } from 'react';
import Tabs from '../../Tabs/Tabs';

const DisplayPriceInTabs = ({ onTokenChange }) => {

    const [selectedToken, setSelectedToken] = useState("XRP");

    useEffect(() => {
        onTokenChange(selectedToken);
    }, [selectedToken, onTokenChange]);

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
                <Tabs tabsId="price" className="px-0 h-full hidden md:flex bg-transparent flex-wrap !justify-start" options={tabOptions} bgColor="#21212A" selectedTab={selectedToken} setSelectedTab={setSelectedToken} />
            </div>

        </div>
    );
};

export default DisplayPriceInTabs;
