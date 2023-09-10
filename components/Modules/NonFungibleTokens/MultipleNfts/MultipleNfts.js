import React, { useEffect, useState } from "react";
import ModuleCard from '@/components/UI/ModuleCard/ModuleCardcomponents';
import Button from "@/components/UI/Button/Buttoncomponents";
import SearchBar from "@/components/UI/SearchBar/SearchBarcomponents";
import Accordion from "@/components/UI/Accordion/Accordioncomponents";
import Dropdown from "@/components/UI/Dropdown/Dropdowncomponents";
import TitleSwitch from '@/components/UI/ModuleCard/Settings/TitleSwitchcomponents';
import NftNameSwitch from "@/components/UI/ModuleCard/Settings/NftNameSwitchcomponents";
import NftPriceSwitch from "@/components/UI/ModuleCard/Settings/NftPriceSwitchcomponents";
import BackgroundTabs from "@/components/UI/ModuleCard/Settings/BackgroundTabscomponents";
import SearchBarSwitch from '@/components/UI/ModuleCard/Settings/SearchBarSwitchcomponents';
import Nft from "@/components/UI/Nft/Nftcomponents";
import WalletPrompt from "@/components/UI/WalletPrompt/WalletPromptcomponents";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';

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

    const [filterVisible, setFilterVisible] = useState(false);


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


                <div className="w-full flex flex-col gap-4">
                    {moduleSettings.displaySearchBar && (
                        <div className="w-full flex flex-row gap-4">
                            <div className="relative inline-block h-full aspect-square">
                                <Button className='flex justify-center h-full !rounded-xl' onClick={() => setFilterVisible(!filterVisible)}><TuneRoundedIcon sx={{ fontSize: 18 }} /></Button>
                            </div>

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
                                    position="right"
                                    className="!w-fit"
                                >
                                    <span className="font-semibold text-sm">Recently listed</span>
                                    <span className="font-semibold text-sm">Price: low to high</span>
                                    <span className="font-semibold text-sm">Price: high to low</span>

                                </Dropdown>
                            </div>
                        </div>

                    )}

                    <div className="flex flex-row w-full gap-2">
                        {filterVisible && (
                            <div className="w-1/3 h-fit bg-[#A6B0CF] bg-opacity-5 rounded-xl p-4">
                                <ul>
                                    <li>
                                        <Accordion title="Price" className="border-none !p-0">

                                        </Accordion>

                                    </li>
                                </ul>
                            </div>
                        )}

                        <div className="@container w-full ">
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
                    </div>
                </div>

            ) : (
                <WalletPrompt />
            )
            }
        </ModuleCard >
    );
};

export default Nfts;
