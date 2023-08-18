import React, { useState } from "react";
import Image from 'next/image';
import Link from "next/link";
import { motion } from "framer-motion";
import ModuleCard from '@/components/UI/ModuleCard/ModuleCardcomponents';
import TitleSwitch from '@/components/UI/ModuleCard/Settings/TitleSwitchcomponents';
import BackgroundTabs from "@/components/UI/ModuleCard/Settings/BackgroundTabscomponents";
import ProfitTabs from "@/components/UI/ModuleCard/Settings/ProfitTabscomponents";


const defaultSettings = {
    displayTitle: true,
    backgroundSetting: "Transparent",
};

const ProfitnLose = () => {
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
            title="Most profitable"
            settings={
                <>
                    <TitleSwitch
                        value={moduleSettings.displayTitle}
                        onChange={(value) => updateSettings("displayTitle", value)}
                    />
                    <ProfitTabs 
                    value={moduleSettings.profitSetting}
                    onChange={(value) => updateSettings("profitSetting", value)}
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
            <div className='w-full flex flex-col  relative justify-center h-full'>

                <Link href='#' target="_blank" rel="noopener noreferrer" className="flex flex-row items-center gap-2">
                    <span className="text-2xl font-bold">
                        HOUND
                    </span>
                </Link>
                <span className="text-lg font-semibold text-positive opacity-50">+3,144 XRP</span>
            </div>


        </ModuleCard>
    );
};

export default ProfitnLose;
