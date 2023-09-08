import React, { useEffect, useState } from "react";
import Image from 'next/image';
import ModuleCard from '@/components/UI/ModuleCard/ModuleCardcomponents';
import Button from "@/components/UI/Button/Buttoncomponents";
import SearchBar from "@/components/UI/SearchBar/SearchBarcomponents";
import Dropdown from "@/components/UI/Dropdown/Dropdowncomponents";
import TitleSwitch from '@/components/UI/ModuleCard/Settings/TitleSwitchcomponents';
import NftNameSwitch from "@/components/UI/ModuleCard/Settings/NftNameSwitchcomponents";
import NftPriceSwitch from "@/components/UI/ModuleCard/Settings/NftPriceSwitchcomponents";
import BackgroundTabs from "@/components/UI/ModuleCard/Settings/BackgroundTabscomponents";
import SearchBarSwitch from '@/components/UI/ModuleCard/Settings/SearchBarSwitchcomponents';
import Nft from "@/components/UI/Nft/Nftcomponents";
import WalletPrompt from "@/components/UI/WalletPrompt/WalletPromptcomponents";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

const defaultSettings = {
    displayTitle: true,
    displaySearchBar: true,
    backgroundSetting: "Transparent",
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
            title="Explore NFTs"
            settings={
                <>
                    <TitleSwitch
                        value={moduleSettings.displayTitle}
                        onChange={(value) => updateSettings("displayTitle", value)}
                    />
                    <SearchBarSwitch
                        value={moduleSettings.displaySearchBar}
                        onChange={(value) => updateSettings("displaySearchBar", value)}
                    />
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
            disableTitle={!moduleSettings.displayTitle}
            className={`${backgroundClass}`}
        >
            {xrpAddress !== null ? (

                <div className="@container w-full flex flex-col gap-4">

                    {moduleSettings.displaySearchBar && (
                        <div className="w-full flex flex-row gap-4">
                            <SearchBar
                                className="!bg-[#A6B0CF] !bg-opacity-5 rounded-xl w-full"
                                placeholder={'Search by NFTs'}
                            />
                            <div className="w-fit">
                                <Dropdown
                                    trigger={
                                        <Button
                                            className="bg-[#A6B0CF] hover:bg-opacity-5 !bg-opacity-5 rounded-xl text-medium w-fit h-full justify-between "
                                            disableAnimation
                                            endIcon={<KeyboardArrowDownRoundedIcon sx={{ fontSize: 16 }} />}
                                        >
                                            Trending
                                        </Button>
                                    }
                                    position = "right"
                                    className="!w-fit"
                                >
                                    <span className="font-semibold text-sm">Recently listed</span>
                                    <span className="font-semibold text-sm">Price: low to high</span>
                                   <span className="font-semibold text-sm">Price: high to low</span>
                                  
                                </Dropdown>
                            </div>
                        </div>

                    )}

                    <div className="grid @sm:grid-cols-2 @md:grid-cols-3 @lg:grid-cols-3 @xl:grid-cols-3 @2xl:grid-cols-4 gap-4 ">
                        {Array.from({ length: 12 }).map((_, index) => (
                            <Nft
                                className="w-full"
                                src='/images/nft.webp'
                                displayName={moduleSettings.displayNftName}
                                displayPrice={moduleSettings.displayNftPrice}
                            />
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
