import React, { useState } from "react";
import Image from 'next/image';
import { motion } from "framer-motion";
import ModuleCard from '@/components/UI/ModuleCard/ModuleCardcomponents';
import BackgroundTabs from "@/components/UI/ModuleCard/Settings/BackgroundTabscomponents";
import TitleSwitch from '@/components/UI/ModuleCard/Settings/TitleSwitchcomponents';
import Button from '@/components/UI/Button/Buttoncomponents';
import Dropdown from '@/components/UI/Dropdown/Dropdowncomponents';
import InputField from "@/components/UI/InputField/InputFieldcomponents";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded';
import useResizeObserver from '@/hooks/useResizeObserver';

const defaultSettings = {
    displayTitle: true,
    backgroundSetting: "Transparent",
};

const QuickSwap = ({onClickRemove, onClickStatic, isPinned=false}) => {
    const [moduleSettings, setModuleSettings] = useState(defaultSettings);
    const [payWithToken, setPayWithToken] = useState(null);
    const [receiveToken, setReceiveToken] = useState(null);
    const [payRef, payDimensions] = useResizeObserver();
    const [receiveRef, receiveDimensions] = useResizeObserver();

    const updateSettings = (key, value) => {
        setModuleSettings((prevSettings) => ({
            ...prevSettings,
            [key]: value,
        }));
    };
    const handleSwap = () => {
        const temp = payWithToken;
        setPayWithToken(receiveToken);
        setReceiveToken(temp);
    };
    const backgroundClass = moduleSettings.backgroundSetting === 'Solid' ? '' :
        moduleSettings.backgroundSetting === 'Highlight' ? 'bg-[#525567] ' :
            moduleSettings.backgroundSetting === 'Transparent' ? 'bg-transparent backdrop-blur-lg border border-white border-opacity-5' : '';

    return (
        <ModuleCard
            onClickRemove={onClickRemove}
            onClickStatic={onClickStatic}
            isPinned={isPinned}
            title="Quick Swap"
            settings={
                <>
                    <TitleSwitch
                        value={moduleSettings.displayTitle}
                        onChange={(value) => updateSettings("displayTitle", value)}
                    />
                    <BackgroundTabs
                        value={moduleSettings.backgroundSetting}
                        onChange={(value) => updateSettings("backgroundSetting", value)}
                    />
                </>
            }
            disableTitle={!moduleSettings.displayTitle}
            className={`${backgroundClass}`}

        >
            <div className='w-full flex flex-col gap-0 relative'>

                {/* Pay Section */}
                <div
                    ref={payRef}
                    className={`w-full flex flex-col justify-between rounded-xl border border-white border-opacity-5 p-4 ${moduleSettings.backgroundSetting === 'Transparent' ? 'border-none bg-[#21212A]' : ''}`}
                >
                    <div className='flex flex-row justify-between'>
                        <span className='text-sm opacity-60 font-semibold'>Pay with</span>
                    </div>
                    <div className='flex flex-row justify-between items-center'>
                        <Dropdown
                            trigger={
                                <Button className="!px-0 text-2xl bg-transparent font-semibold" disableAnimation endIcon={<KeyboardArrowDownRoundedIcon />}>
                                    {/* Display image only if width is more than 350px */}
                                    {payDimensions.width > 350 && (
                                        <div className="rounded-full mr-4">
                                            <Image src="/images/greyhound-logo.svg" height={30} width={30} />
                                        </div>
                                    )}
                                    <motion.div layout>{payWithToken || "HOUND"}</motion.div>
                                </Button>
                            }
                        >
                            {/* Dropdown items */}
                        </Dropdown>
                        <span className='text-2xl font-semibold'>999,999.99</span>
                    </div>
                    <div className='flex flex-row justify-between items-center'>
                        <span className='text-xs opacity-60 font-semibold'>Balance: 999,999,999</span>
                        <span className='text-xs opacity-60 font-semibold'>≈ $9999.99</span>
                    </div>
                </div>

                {/* Swap Button */}
                <div className={`w-full h-4 z-[1] bg-[#21212A] ${moduleSettings.backgroundSetting === 'Transparent' ? 'bg-transparent' : ''}`}></div>
                <div className={`absolute top-[116px] left-[calc(50%-20px)] z-0 w-[35px] h-[35px] rounded-full border border-[#2C2C35]  ${moduleSettings.backgroundSetting === 'Transparent' ? 'bg-[#1A1921] border-none' : 'bg-[#21212A]'}`}></div>
                <div className='absolute z-[1] top-[110px] left-[calc(50%-14px)]'>
                    <Button className="!px-0 text-2xl bg-transparent font-semibold" disableAnimation onClick={handleSwap}>
                        <SwapVertRoundedIcon />
                    </Button>
                </div>

                {/* Receive Section */}
                <div
                    ref={receiveRef}
                    className={`w-full flex flex-col justify-between rounded-xl border border-white border-opacity-5 p-4 ${moduleSettings.backgroundSetting === 'Transparent' ? 'border-none bg-[#21212A]' : ''}`}
                >
                    <div className='flex flex-row justify-between'>
                        <span className='text-sm opacity-60 font-semibold'>Receive</span>
                    </div>
                    <div className='flex flex-row justify-between items-center'>
                        <Dropdown
                            trigger={
                                <Button className="!px-0 text-2xl bg-transparent font-semibold" disableAnimation endIcon={<KeyboardArrowDownRoundedIcon />}>
                                    {/* Display image only if width is more than 350px */}
                                    {receiveDimensions.width > 350 && (
                                        <div className="rounded-full mr-4">
                                            <Image src="/images/solo-logo.svg" height={30} width={30} />
                                        </div>
                                    )}
                                    <motion.div layout> {receiveToken || "SOLO"}</motion.div>
                                </Button>
                            }
                        >
                            {/* Dropdown items */}
                        </Dropdown>
                        <span className='text-2xl font-semibold'>999,999.99</span>
                    </div>
                    <div className='flex flex-row justify-between items-center'>
                        <span className='text-xs opacity-60 font-semibold'>Balance: 999,999,999</span>
                        <span className='text-xs opacity-60 font-semibold'>≈ $9999.99</span>
                    </div>
                </div>

                {/* Swap Button */}
                <div className="flex w-full pt-4 justify-end">
                    <Button className="bg-white !text-[#1A1921]">Swap</Button>
                </div>
            </div>

        </ModuleCard>
    );
};

export default QuickSwap;
