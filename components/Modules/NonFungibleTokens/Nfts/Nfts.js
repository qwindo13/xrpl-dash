import React, { useEffect, useState } from "react";
import Image from 'next/image';
import ModuleCard from '@/components/UI/ModuleCard/ModuleCardcomponents';
import TitleSwitch from '@/components/UI/ModuleCard/Settings/TitleSwitchcomponents';
import BackgroundTabs from "@/components/UI/ModuleCard/Settings/BackgroundTabscomponents";
import Nft from "@/components/UI/Nft/Nftcomponents";
import WalletPrompt from "@/components/UI/WalletPrompt/WalletPromptcomponents";

const defaultSettings = {
    displayTitle: true,
    backgroundSetting: "Solid",
};

const Nfts = ({ data }) => {

    const [moduleSettings, setModuleSettings] = useState(defaultSettings);
    const updateSettings = (key, value) => {
        setModuleSettings((prevSettings) => ({
            ...prevSettings,
            [key]: value,
        }));
    };

    const [xrpAddress, setXrpAddress] = useState(null);

    useEffect(() => {
        const address = localStorage.getItem("address");
        setXrpAddress(address);
    }, []);


    const backgroundClass = moduleSettings.backgroundSetting === 'Solid' ? '' :
        moduleSettings.backgroundSetting === 'Highlight' ? 'bg-[#525567] ' :
            moduleSettings.backgroundSetting === 'Transparent' ? 'bg-transparent backdrop-blur-lg border border-white border-opacity-5' : '';

    return (
        <ModuleCard
            title="My Badges"
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
            disableTitle="{!moduleSettings.displayTitle}"
            className={`${backgroundClass}`}
        >
            {xrpAddress !== null ? (
                <div className="@container w-full">

                    <div className="grid @sm:grid-cols-2 @md:grid-cols-3 @lg:grid-cols-3 @xl:grid-cols-4 @2xl:grid-cols-6 gap-4 ">
                        {Array.from({ length: 12 }).map((_, index) => (
                                <Nft displayName displayPrice className="w-full" src='/images/nft.webp' />
                        ))}
                    </div>
                </div>
            ) : (
                <WalletPrompt />
            )}
        </ModuleCard>
    );
};

export default Nfts;