import Image from 'next/image';
import React, { useState } from "react";
import { motion } from 'framer-motion';
import ModuleCard from '@/components/UI/ModuleCard/ModuleCardcomponents';
import TitleSwitch from '@/components/UI/ModuleCard/Settings/TitleSwitchcomponents';
import TokenDropdown from '@/components/UI/ModuleCard/Settings/TokenDropdowncomponents';
import DisplayPriceInTabs from '@/components/UI/ModuleCard/Settings/DisplayPriceInTabscomponents';

const defaultSettings = {
    displayTitle: false,
};

const PriceInfo = () => {

    const [moduleSettings, setModuleSettings] = useState(defaultSettings);

    const updateSettings = (key, value) => {
        setModuleSettings((prevSettings) => ({
            ...prevSettings,
            [key]: value,
        }));
    };

    return (
        <ModuleCard
            title="Price - HOUND"
            settings={
                <>
                    <TitleSwitch
                        value={moduleSettings.displayTitle}
                        onChange={(value) => updateSettings("displayTitle", value)}
                    />
                    <TokenDropdown />
                    <DisplayPriceInTabs />
                </>
            }
            disableTitle={!moduleSettings.displayTitle}
        >
            <div className='w-full flex flex-row gap-4'>
                <div className="h-auto w-1/3 flex bg-[#272832] rounded-xl p-4 items-center justify-center">
                    <Image className=" w-full aspect-square" src="/images/hound.png" alt="ripple Image" width={46} height={46} />
                </div>
                <div className='h-auto w-3/1 flex flex-col gap-4 justify-between'>
                    <div className='flex flex-col'>
                        <span className="text-xs font-semibold text-white opacity-70">Greyhound</span>
                        <span className="text-xl font-bold">HOUND</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className="text-xl font-bold">0.000042 XRP</span>
                        <span className='text-xs text-[#6DCE5C] font-semibold opacity-50 flex flex-row items-center gap-2'>
                            <svg width="7" height="5" viewBox="0 0 7 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.58808 0.833414L5.75475 3.00008C6.01864 3.26397 6.07753 3.56591 5.93142 3.90591C5.78586 4.24647 5.52558 4.41675 5.15058 4.41675L0.858917 4.41675C0.483917 4.41675 0.223639 4.24647 0.078084 3.90591C-0.0680275 3.56591 -0.00913858 3.26397 0.25475 3.00008L2.42142 0.833414C2.50475 0.750081 2.59503 0.687582 2.69225 0.645915C2.78947 0.604248 2.89364 0.583414 3.00475 0.583414C3.11586 0.583414 3.22003 0.604248 3.31725 0.645915C3.41447 0.687582 3.50475 0.750081 3.58808 0.833414Z" fill="#6DCE5C" fillOpacity="0.5" />
                            </svg>
                            3.5% (in the last 24h)
                        </span>
                    </div>
                </div>
            </div>
        </ModuleCard>
    );
};

export default PriceInfo;
