import React, { useEffect, useState, useRef } from "react";
import Image from 'next/image';
import ModuleCard from '@/components/UI/ModuleCard/ModuleCardcomponents';
import TitleSwitch from '@/components/UI/ModuleCard/Settings/TitleSwitchcomponents';
import BackgroundTabs from "@/components/UI/ModuleCard/Settings/BackgroundTabscomponents";
import Countdown from "@/components/UI/Countdown/Countdowncomponents";

const defaultSettings = {
    displayTitle: true,
    backgroundSetting: "Solid",
};

const BitcoinHalving = () => {

    const [moduleSettings, setModuleSettings] = useState(defaultSettings);
    const updateSettings = (key, value) => {
        setModuleSettings((prevSettings) => ({
            ...prevSettings,
            [key]: value,
        }));
    };

    const backgroundClass = moduleSettings.backgroundSetting === 'Solid' ? '' :
    moduleSettings.backgroundSetting === 'Highlight' ? 'bg-[#525567] ' :
        moduleSettings.backgroundSetting === 'Transparent' ? 'bg-transparent backdrop-blur-lg border border-white border-opacity-5' : '';

    return (
        <ModuleCard
            title="Bitcoin Halving Countdown"
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
            <div className="relative w-full h-full flex items-center justify-center">
                <Countdown startDate="2024-04-24T15:51:30Z" className={`${moduleSettings.backgroundSetting === 'Transparent' ? 'bg-[#21212A] border-none' : ''}`}/>
            </div>

        </ModuleCard>
    );
};

export default BitcoinHalving;
