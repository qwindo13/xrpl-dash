import React from 'react';
import Tabs from '../../Tabs/Tabs';
import CandlestickChartRoundedIcon from '@mui/icons-material/CandlestickChartRounded';
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded';

const ChartTypeTabs = ({ value, onChange }) => {
    const tabOptions = [
        {
            label:
                <ShowChartRoundedIcon />
            , value: 'line'
        },
        {
            label:
            <CandlestickChartRoundedIcon />
            , value: 'candle'
        },
    ];
    return (
        <div className='flex flex-row flex-wrap justify-between items-center gap-2'>
            <span className='font-semibold text-base mb-2 md:mb-0'>Chart Type</span>
            <Tabs 
                tabsId="chart-type" 
                className="px-0 h-full bg-transparent flex-wrap !justify-start" 
                options={tabOptions} 
                bgColor="#21212A" 
                onChange={onChange} 
                value={value}
            />
        </div>
    );
};

export default ChartTypeTabs;
