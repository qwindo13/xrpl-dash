import Image from 'next/image';
import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import ModuleCard from '@/components/UI/ModuleCard/ModuleCardcomponents';
import TitleSwitch from '@/components/UI/ModuleCard/Settings/TitleSwitchcomponents';
import LogoSwitch from '@/components/UI/ModuleCard/Settings/LogoSwitchcomponents';
import TokenDropdown from '@/components/UI/ModuleCard/Settings/TokenDropdowncomponents';
import DisplayPriceInTabs from '@/components/UI/ModuleCard/Settings/DisplayPriceInTabscomponents';
import BackgroundTabs from '@/components/UI/ModuleCard/Settings/BackgroundTabscomponents';
const axios = require('axios');

const defaultSettings = {
    displayTitle: false,
    displayLogo: true,
    backgroundSetting: "Solid"
};

const PriceInfo = () => {

    const [moduleSettings, setModuleSettings] = useState(defaultSettings);
    const [token, setToken] = useState('');
    const [price, setPrice] = useState('');
    const [priceChange, setPriceChange] = useState(0);
    const [subLabel, setSubLabel] = useState('');
    const [currency, setCurrency] = useState('XRP');
    const [image, setImage] = useState('/images/hound.png');
    const [toFetch, setToFetch] = useState('534F4C4F00000000000000000000000000000000:rsoLo2S1kiGeCcn6hCUXVrCpGMWLrRrLZz');
    const [website, setWebsite] = useState('');

    const apiUrl = "https://api.xrpldashboard.com:3000"
    // const apiUrl = "http://localhost:3000"


    const fetchToken = async () => {
        const res = await axios.get(`${apiUrl}/token/${toFetch}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        });
        const data = res.data;
        console.log(data);
        setToken(data.name);
        setPrice(Math.round(data.price * 1000) / 1000);
        setPriceChange(Math.round(data.twenty_four_hour_changes.price.change * 1000) / 1000);
        setSubLabel(data.issuerName);
        setImage(data.icon);
        setWebsite(data.website_link || '');
    };

    useEffect(() => {
        fetchToken();
    }, [toFetch]);

    const handleTokenSelect = (selectedToken) => {
        // Do something with the selected token
        console.log("Selected Token:", selectedToken);
        setToFetch(selectedToken);
      };



    const updateSettings = (key, value) => {
        setModuleSettings((prevSettings) => ({
            ...prevSettings,
            [key]: value,
        }));
    };

    const [logoValue, setLogoValue] = useState('');

    const backgroundClass = moduleSettings.backgroundSetting === 'Solid' ? '' :
        moduleSettings.backgroundSetting === 'Highlight' ? 'bg-[#525567] ' :
            moduleSettings.backgroundSetting === 'Transparent' ? 'bg-transparent backdrop-blur-lg border border-white border-opacity-5' : '';

    return (
        <ModuleCard
            title={`Price - ${token}`}
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
                    <LogoSwitch
                        value={moduleSettings.displayLogo}
                        onChange={(value) => updateSettings("displayLogo", value)}
                    />
                    <TokenDropdown onSelect={handleTokenSelect}/>
                    <DisplayPriceInTabs />
                </>
            }
            disableTitle={!moduleSettings.displayTitle}
            className={`${backgroundClass}`}
        >
            <div className='w-full h-full flex flex-row gap-4'>
                {moduleSettings.displayLogo && (
                    <div className="h-auto w-1/3 flex bg-[#A6B0CF] bg-opacity-5 rounded-xl items-center justify-center overflow-hidden p-4">
                        <Image className="w-full h-full object-contain" src={image} alt="ripple Image" width={46} height={46} loader={({ src }) => src} />
                    </div>
                )}
                <motion.div layout className='h-auto w-3/1 flex flex-col gap-4 justify-between'>
                    <div className='flex flex-col'>
                        <a href={website} target="_blank" className="flex flex-row items-center gap-2">
                            <span className="text-xs font-semibold text-white opacity-60">{subLabel}</span>
                        </a>
                        <span className="text-2xl font-bold">{token}</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className="text-2xl font-bold">{price} {currency}</span>
                        <span className={`text-xs font-semibold opacity-50 flex flex-row items-center gap-2 ${priceChange < 0 ? 'text-negative' : 'text-positive'}`} >
                            <div style={{ transform: priceChange < 0 ? 'rotate(180deg)' : 'rotate(0)' }}>
                                <svg width="7" height="5" viewBox="0 0 7 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.58808 0.833414L5.75475 3.00008C6.01864 3.26397 6.07753 3.56591 5.93142 3.90591C5.78586 4.24647 5.52558 4.41675 5.15058 4.41675L0.858917 4.41675C0.483917 4.41675 0.223639 4.24647 0.078084 3.90591C-0.0680275 3.56591 -0.00913858 3.26397 0.25475 3.00008L2.42142 0.833414C2.50475 0.750081 2.59503 0.687582 2.69225 0.645915C2.78947 0.604248 2.89364 0.583414 3.00475 0.583414C3.11586 0.583414 3.22003 0.604248 3.31725 0.645915C3.41447 0.687582 3.50475 0.750081 3.58808 0.833414Z" fill="#6DCE5C" fillOpacity="0.5" />
                                </svg>
                            </div>
                            {priceChange}% (in the last 24h)
                        </span>
                    </div>
                </motion.div>
            </div>
        </ModuleCard>
    );
};

export default PriceInfo;
