import React from 'react';
import Switch from '../../Switch/Switch';
import Tabs from '../../Tabs/Tabs';

const BackgroundTabs = ({ value, onChange, hasHighlight }) => {
    const tabOptions = [
        {
            label:
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="4" fill="#fff" />
                    <path d="m19.46 8 .79-1.75L22 5.46c.39-.18.39-.73 0-.91l-1.75-.79L19.46 2c-.18-.39-.73-.39-.91 0l-.79 1.75-1.76.79c-.39.18-.39.73 0 .91l1.75.79.79 1.76c.18.39.74.39.92 0zM11.5 9.5L9.91 6c-.35-.78-1.47-.78-1.82 0L6.5 9.5 3 11.09c-.78.36-.78 1.47 0 1.82l3.5 1.59L8.09 18c.36.78 1.47.78 1.82 0l1.59-3.5 3.5-1.59c.78-.36.78-1.47 0-1.82L11.5 9.5zm7.04 6.5-.79 1.75-1.75.79c-.39.18-.39.73 0 .91l1.75.79.79 1.76c.18.39.73.39.91 0l.79-1.75 1.76-.79c.39-.18.39-.73 0-.91l-1.75-.79-.79-1.76c-.18-.39-.74-.39-.92 0z" fill="#1A1921" transform="scale(0.7) translate(3.6, 3.6)" />
                </svg>
            , value: 'Highlight'
        },
        {
            label:
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="4" fill="currentColor" />
                </svg>
            , value: 'Solid'
        },
        {
            label:
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="4" ry="4" fill="none" stroke="currentColor" stroke-width="2" />
                </svg>
            , value: 'Transparent'
        },
    ];

    const filteredTabOptions = hasHighlight ? tabOptions : tabOptions.filter(option => option.value !== 'Highlight');

    return (
        <div className='flex flex-row flex-wrap justify-between items-center gap-2'>
            <span className='font-semibold text-base mb-2 md:mb-0'>Background</span>
            <Tabs
                tabsId="background"
                className="px-0 h-full hidden md:flex bg-transparent flex-wrap !justify-start"
                options={filteredTabOptions}
                bgColor="#21212A"
                onChange={onChange}
                value={value}
            />
        </div>
    );
};

export default BackgroundTabs;
