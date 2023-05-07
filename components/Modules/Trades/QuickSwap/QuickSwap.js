import Image from 'next/image';
import React, { useState } from "react";
import ModuleCard from '@/components/UI/ModuleCard/ModuleCardcomponents';
import TitleSwitch from '@/components/UI/ModuleCard/Settings/TitleSwitchcomponents';
import Button from '@/components/UI/Button/Buttoncomponents';
import Dropdown from '@/components/UI/Dropdown/Dropdowncomponents';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded';

const defaultSettings = {
    displayTitle: true,
};

const QuickSwap = () => {

    const [moduleSettings, setModuleSettings] = useState(defaultSettings);

    const updateSettings = (key, value) => {
        setModuleSettings((prevSettings) => ({
            ...prevSettings,
            [key]: value,
        }));
    };

    return (
        <ModuleCard
            title="Quick Swap"
            settings={
                <>
                    <TitleSwitch
                        value={moduleSettings.displayTitle}
                        onChange={(value) => updateSettings("displayTitle", value)}
                    />
                </>
            }
            disableTitle={!moduleSettings.displayTitle}
        >

            <div className='w-full flex flex-col gap-0 relative'>

                {/* Pay Section */}
                <div className='w-full flex flex-col justify-between rounded-xl border border-white border-opacity-5 p-4 '>
                    <div className='flex flex-row justify-between'>
                        <span className='text-sm opacity-60 font-bold'>Pay with</span>
                    </div>
                    <div className='flex flex-row justify-between items-center'>
                        <Dropdown trigger={
                            <Button className="!px-0 text-2xl bg-transparent font-semibold" disableAnimation endIcon={<KeyboardArrowDownRoundedIcon />}>
                                <div className="rounded-full mr-4"><Image src="/images/greyhound-logo.svg" height={30} width={30} /></div>
                                HOUND
                            </Button>
                        }>
                            <p>Dropdown item 1</p>
                            <p>Dropdown item 2</p>
                            <p>Dropdown item 3</p>
                        </Dropdown>
                        <span className='text-2xl font-semibold'>999,999.99</span>
                    </div>
                    <div className='flex flex-row justify-between items-center'>
                        <span className='text-xs opacity-60 font-semibold'>Balance: 999,999,999</span>
                        <span className='text-xs opacity-60 font-semibold'>≈ $9999.99</span>
                    </div>
                </div>
                
                {/* Swap Button */}
                <div className="w-full h-4 z-10 bg-[#21212A]"></div>
                <div className="absolute top-[116px] left-[calc(50%-20px)] z-0 w-[35px] h-[35px] rounded-full border border-[#2C2C35] bg-[#21212A]"></div>
                <div className='absolute z-10 top-[110px] left-[calc(50%-14px)]'><Button className="!px-0 text-2xl bg-transparent font-semibold" disableAnimation> <SwapVertRoundedIcon/> </Button></div>

                {/* Receive Section */}
                <div className='w-full flex flex-col justify-between rounded-xl border border-white border-opacity-5 p-4 '>
                    <div className='flex flex-row justify-between'>
                        <span className='text-sm opacity-60 font-bold'>Receive</span>
                    </div>
                    <div className='flex flex-row justify-between items-center'>
                        <Dropdown trigger={
                            <Button className="!px-0 text-2xl bg-transparent font-semibold" disableAnimation endIcon={<KeyboardArrowDownRoundedIcon />}> Explore</Button>
                        }>
                            <p>Dropdown item 1</p>
                            <p>Dropdown item 2</p>
                            <p>Dropdown item 3</p>
                        </Dropdown>
                        <span className='text-2xl font-semibold'>999,999.99</span>
                    </div>
                    <div className='flex flex-row justify-between items-center'>
                        <span className='text-xs opacity-60 font-semibold'>Balance: 999,999,999</span>
                        <span className='text-xs opacity-60 font-semibold'>≈ $9999.99</span>
                    </div>
                </div>
            </div>
        </ModuleCard>
    );
};

export default QuickSwap;
