import React, { useState, useEffect } from "react";
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

const ProfitnLose = ({onClickRemove,onClickStatic,isPinned=false}) => {
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
                        .then((tokenData) => {
                            if (tokenData.hasOwnProperty('error')) {
                                console.log(`Error: ${tokenData.error}`); // `Error: ${data.error}
                                return;
                            }
                            // setImg1(data.icon);
                            if (tokenData.hasOwnProperty('icon')) {
                                console.log(tokenData.icon)
                                setImg1(tokenData.icon);
                            } else {
                                console.log('no icon')
                                // set the image as first letter of the currency, https://ui-avatars.com/api/?name=G&rounded=true
                                //if currency.length > 3, then convert it to string
                                if (data.data.comparison[0].currency.length > 3) {
                                    setImg1(`https://ui-avatars.com/api/?name=${hexToString(data.data.comparison[0].currency)[0]}&rounded=true`);
                                } else {
                                    setImg1(`https://ui-avatars.com/api/?name=${data.data.comparison[0].currency[0]}&rounded=true`);
                                }
                            }
                        }
                        );
                    fetch(`${api_url}/token/${data.data.comparison[data.data.comparison.length - 1].currency}:${data.data.comparison[data.data.comparison.length - 1].issuer}`)
                        .then((res) => res.json())
                        .then((tokenData) => {
                            if (tokenData.hasOwnProperty('error')) {
                                return;
                            }
                            // setImg2(data.icon);
                            if (tokenData.hasOwnProperty('icon')) {
                                setImg2(tokenData.icon);
                            } else {
                                console.log(data.data.comparison[data.data.comparison.length - 1].currency)
                                console.log(data.data.comparison[0].currency)
                                if (data.data.comparison[data.data.comparison.length - 1].currency.length > 3) {
                                    setImg2(`https://ui-avatars.com/api/?name=${hexToString(data.data.comparison[data.data.comparison.length - 1].currency)[0]}&rounded=true`);
                                } else {
                                    setImg2(`https://ui-avatars.com/api/?name=${data.data.comparison[data.data.comparison.length - 1].currency[0]}&rounded=true`);
                                }
                            }
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

    useEffect(() => {
        console.log(img1)
        console.log(img2)
    }, [img1, img2])

    return (
        <ModuleCard
            onClickRemove={onClickRemove}
            onClickStatic={onClickStatic}
            isPinned={isPinned}
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

            {/* MOST PROFIT */}
            {
                moduleSettings.profitSetting.includes('Most') && data !== null &&
                <>
                    <div className="flex flex-row items-center">
                        {img1 && (
                            <div className="h-24 w-24 flex rounded-xl items-center justify-center overflow-hidden mr-4">
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
                            <span className="text-lg font-semibold text-positive opacity-50 flex flex-row items-center gap-2">
                                <svg width="7" height="5" viewBox="0 0 7 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.58808 0.833414L5.75475 3.00008C6.01864 3.26397 6.07753 3.56591 5.93142 3.90591C5.78586 4.24647 5.52558 4.41675 5.15058 4.41675L0.858917 4.41675C0.483917 4.41675 0.223639 4.24647 0.078084 3.90591C-0.0680275 3.56591 -0.00913858 3.26397 0.25475 3.00008L2.42142 0.833414C2.50475 0.750081 2.59503 0.687582 2.69225 0.645915C2.78947 0.604248 2.89364 0.583414 3.00475 0.583414C3.11586 0.583414 3.22003 0.604248 3.31725 0.645915C3.41447 0.687582 3.50475 0.750081 3.58808 0.833414Z" fill='#6DCE5C' fillOpacity="0.5" />
                                </svg>
                                <span>{Math.round(data[0].change * 100) / 100} XRP</span>
                            </span>
                        </div>
                    </div>
                </>
            }

            {/* LEAST PROFIT */}
            {
                moduleSettings.profitSetting.includes('Least') && data !== null &&
                <>
                    <div className="flex flex-row items-center">
                        {img2 && (
                            <div className="h-24 w-24 flex rounded-xl items-center justify-center overflow-hidden mr-4">
                                <img className="w-full h-full aspect-square object-contain rounded-full" src={img2 || propImage} alt={data[0].currency} width={200} height={200} quality={100} />
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

                            <span className="text-lg font-semibold text-negative opacity-50 flex flex-row gap-2 items-center">
                                <svg width="7" height="5" viewBox="0 0 7 5" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-180">
                                    <path d="M3.58808 0.833414L5.75475 3.00008C6.01864 3.26397 6.07753 3.56591 5.93142 3.90591C5.78586 4.24647 5.52558 4.41675 5.15058 4.41675L0.858917 4.41675C0.483917 4.41675 0.223639 4.24647 0.078084 3.90591C-0.0680275 3.56591 -0.00913858 3.26397 0.25475 3.00008L2.42142 0.833414C2.50475 0.750081 2.59503 0.687582 2.69225 0.645915C2.78947 0.604248 2.89364 0.583414 3.00475 0.583414C3.11586 0.583414 3.22003 0.604248 3.31725 0.645915C3.41447 0.687582 3.50475 0.750081 3.58808 0.833414Z" fill='#CE5C6D' fillOpacity="0.5" />
                                </svg>
                                {data[data.length - 1].change > 0 ? '+' : ''}
                                {Math.round(data[data.length - 1].change * 100) / 100} XRP
                            </span>
                        </div>
                    </div>
                </>
            }
            {
                data === null && xrpAddress !== null &&
                <div className="flex flex-row items-center animate-pulse">
                    <div className="h-24 w-24 flex rounded-full aspect-square items-center justify-center overflow-hidden mr-4 bg-[#A6B0CF] bg-opacity-5" />
                    <div className='w-full flex flex-col  relative justify-center h-full'>
                        <span className="h-6 bg-[#A6B0CF] bg-opacity-5 rounded  w-24 mb-2" />
                        <span className="h-2.5 bg-[#A6B0CF] bg-opacity-5 rounded  w-24" />
                    </div>
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
