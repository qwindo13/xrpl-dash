import React, { useState,useEffect } from "react";
import Image from 'next/image';
import Link from "next/link";
import { motion } from "framer-motion";
import ModuleCard from '@/components/UI/ModuleCard/ModuleCardcomponents';
import TitleSwitch from '@/components/UI/ModuleCard/Settings/TitleSwitchcomponents';
import BackgroundTabs from "@/components/UI/ModuleCard/Settings/BackgroundTabscomponents";
import ProfitTabs from "@/components/UI/ModuleCard/Settings/ProfitTabscomponents";
import { config } from "@/configcomponents";
import WalletPrompt from "@/components/UI/WalletPrompt/WalletPromptcomponents";
import propImage from 'public/images/hound.png'


const defaultSettings = {
    displayTitle: true,
    backgroundSetting: "Transparent",
    profitSetting: "Most profitable",
};

const ProfitnLose = () => {
    const [moduleSettings, setModuleSettings] = useState(defaultSettings);
    const [xrpAddress, setXrpAddress] = useState(null);
    const [data, setData] = useState(null);
    const [img1, setImg1] = useState(null);
    const [img2, setImg2] = useState(null);
    const api_url = config.api_url;
    
    const hexToString = (hex) => {
        let string = "";
        for (let i = 0; i < hex.length; i += 2) {
            const code = parseInt(hex.substr(i, 2), 16);
            if (code !== 0) {
            string += String.fromCharCode(code);
            }
        }
        return string;
    };

    useEffect(() => {
        const address = localStorage.getItem("address");
        setXrpAddress(address);
    }, []);

    useEffect(() => {
        if (xrpAddress) {
            fetch(`${api_url}/pnl/${xrpAddress}`)
                .then((res) => res.json())
                .then((data) => {
                    if (!data.hasOwnProperty('data')) {
                        return;
                    }
                    if (!data.data.hasOwnProperty('comparison')) {
                        return;
                    }
                    setData(data.data.comparison);
                    //fetch token:issuer from api/token endpoint and set the images
                    fetch(`${api_url}/token/${data.data.comparison[0].currency}:${data.data.comparison[0].issuer}`)
                        .then((res) => res.json())
                        .then((data) => {
                            if (data.hasOwnProperty('error')) {
                                return;
                            }
                            if (!data.hasOwnProperty('data')) {
                                return;
                            }
                            // setImg1(data.icon);
                            if (data.hasOwnProperty('icon')) {
                                setImg1(data.icon);
                            } else {
                                // set the image as first letter of the currency, https://ui-avatars.com/api/?name=G&rounded=true
                                //if currency.length > 3, then convert it to string
                                if (data.data.comparison[0].currency.length > 3) {
                                    setImg1(`https://ui-avatars.com/api/?name=${hexToString(data.data.comparison[0].currency[0])}&rounded=true`);
                                } else {
                                    setImg1(`https://ui-avatars.com/api/?name=${data.data.comparison[0].currency[0]}&rounded=true`);
                                }
                            }
                        }
                    );
                    fetch(`${api_url}/token/${data.data.comparison[data.data.comparison.length - 1].currency}:${data.data.comparison[data.data.comparison.length - 1].issuer}`)
                        .then((res) => res.json())
                        .then((data) => {
                            setImg2(data.icon);
                        }
                    );
                });
        }
    }, [xrpAddress]);

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
            title={`${moduleSettings.profitSetting.split(" ")[0]} profitable`}
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
            {/* <div className='w-full flex flex-col  relative justify-center h-full'>
                <Link href='#' target="_blank" rel="noopener noreferrer" className="flex flex-row items-center gap-2">
                    <span className="text-2xl font-bold">
                        HOUND
                    </span>
                </Link>
                <span className="text-lg font-semibold text-positive opacity-50">+3,144 XRP</span>
            </div> */}
            {
                moduleSettings.profitSetting.includes('Most') && data !== null && <>
                {img1 && (
                    <div className="h-full w-auto flex bg-[#A6B0CF] bg-opacity-5 rounded-xl items-center justify-center overflow-hidden p-4">
                        <img className="w-full h-full aspect-square object-contain rounded-full" src={img1 || propImage} alt={data[0].currency} width={200} height={200} quality={100} />
                    </div>
                )}
                <div className='w-full flex flex-col  relative justify-center h-full'>
                    <Link href='#' target="_blank" rel="noopener noreferrer" className="flex flex-row items-center gap-2">
                        <span className="text-2xl font-bold">
                            {
                                //if length of currency is greater than 3, convert to string
                                data[0].currency.length > 3 ? hexToString(data[0].currency) : data[0].currency
                            }
                        </span>
                    </Link>
                    <span className="text-lg font-semibold text-positive opacity-50">
                        {
                            data[0].change > 0 ? '+' : ''
                        } 
                        {Math.round(data[0].change * 100) / 100} XRP
                    </span>
                </div>
            </>
            }
            {
                moduleSettings.profitSetting.includes('Least') && data !== null && <>
                {img2 && (
                    <div className="h-full w-auto flex bg-[#A6B0CF] bg-opacity-5 rounded-xl items-center justify-center overflow-hidden p-4">
                        <img className="w-full h-full aspect-square object-contain rounded-full" src={img1 || propImage} alt={data[0].currency} width={200} height={200} quality={100} />
                    </div>
                )}
                <div className='w-full flex flex-col  relative justify-center h-full'>
                    <Link href='#' target="_blank" rel="noopener noreferrer" className="flex flex-row items-center gap-2">
                        <span className="text-2xl font-bold">
                            {
                                //if length of currency is greater than 3, convert to string
                                data[data.length - 1].currency.length > 3 ? hexToString(data[data.length - 1].currency) : data[data.length - 1].currency
                            }
                        </span>
                    </Link>
                    <span className="text-lg font-semibold text-negative opacity-50">
                        {
                            data[data.length - 1].change > 0 ? '+' : ''
                        }
                        {Math.round(data[data.length - 1].change * 100) / 100} XRP
                    </span>
                </div>
            </>
            }
            {
                data === null && xrpAddress !== null &&
                <div className='w-full flex flex-col  relative justify-center h-full'>
                    <Link href='#' target="_blank" rel="noopener noreferrer" className="flex flex-row items-center gap-2">
                        <span className="text-2xl font-bold">
                            Loading...
                        </span>
                    </Link>
                    <span className="text-lg font-semibold text-negative opacity-50">
                        Loading...
                    </span>
                </div>
            }
            {
                xrpAddress === null &&
                <WalletPrompt />
            }
        </ModuleCard>
    );
};

export default ProfitnLose;
