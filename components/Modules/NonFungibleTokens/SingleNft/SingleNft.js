import React, { useEffect, useState } from "react";
import Image from 'next/image';
import ModuleCard from '@/components/UI/ModuleCard/ModuleCardcomponents';
import NftNameSwitch from "@/components/UI/ModuleCard/Settings/NftNameSwitchcomponents";
import NftPriceSwitch from "@/components/UI/ModuleCard/Settings/NftPriceSwitchcomponents";
import NftsSlider from "@/components/UI/ModuleCard/Settings/NftsSlidercomponents";
import RandomSwitch from "@/components/UI/ModuleCard/Settings/RandomSwitchcomponents";
import BackgroundTabs from "@/components/UI/ModuleCard/Settings/BackgroundTabscomponents";
import Nft from "@/components/UI/Nft/Nftcomponents";
import WalletPrompt from "@/components/UI/WalletPrompt/WalletPromptcomponents";

const defaultSettings = {
    RandomSwitch: true,
    displayNftName: true,
    displayNftPrice: false,
    backgroundSetting: "Solid",
};

const SingleNft = ({ data }) => {

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
            title="NFT - #23123"
            settings={
                <>
                    <RandomSwitch
                        value={moduleSettings.randomNFT}
                        onChange={(value) => updateSettings("randomNFT", value)}
                    />
                    {!moduleSettings.randomNFT && (
                        <NftsSlider
                            value={moduleSettings.backgroundSetting}
                            onChange={(value) => updateSettings("backgroundSetting", value)}
                        />
                    )}

                    <NftNameSwitch
                        value={moduleSettings.displayNftName}
                        onChange={(value) => updateSettings("displayNftName", value)}
                    />
                    <NftPriceSwitch
                        value={moduleSettings.displayNftPrice}
                        onChange={(value) => updateSettings("displayNftPrice", value)}
                    />
                    <BackgroundTabs
                        value={moduleSettings.backgroundSetting}
                        onChange={(value) => updateSettings("backgroundSetting", value)}
                    />

                </>
            }
            disableTitle="true"
            className={`${backgroundClass} !p-0`}
        >


            <Nft
                imageSize="object-cover !w-full !h-full min-h-0"
                className="w-full h-full border-none"
                src='/images/nft.webp'
                displayName={moduleSettings.displayNftName}
                displayPrice={moduleSettings.displayNftPrice}
            />


        </ModuleCard>
    );
};

export default SingleNft;
