import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import ModuleCard from '@/components/UI/ModuleCard/ModuleCardcomponents';
import TitleSwitch from '@/components/UI/ModuleCard/Settings/TitleSwitchcomponents';
import LogoSwitch from '@/components/UI/ModuleCard/Settings/LogoSwitchcomponents';
import TokenDropdown from '@/components/UI/ModuleCard/Settings/TokenDropdowncomponents';
import DisplayPriceInTabs from '@/components/UI/ModuleCard/Settings/DisplayPriceInTabscomponents';
import BackgroundTabs from '@/components/UI/ModuleCard/Settings/BackgroundTabscomponents';
import useResizeObserver from '@/hooks/useResizeObserver';
import propImage from 'public/images/hound.png'
import { useCoinPrices } from '@/hooks/useCoinsPrices';
const axios = require('axios');
import { config } from '../../../../config';


const defaultSettings = {
    displayTitle: false,
    displayLogo: true,
    backgroundSetting: "Solid"
};

const PriceInfo = () => {
    const [ref, dimensions] = useResizeObserver();
    const [moduleSettings, setModuleSettings] = useState(defaultSettings);
    const [token, setToken] = useState('');
    const [price, setPrice] = useState('');
    const [priceInXrp, setPriceInXrp] = useState('');
    const [priceChange, setPriceChange] = useState(0);
    const [subLabel, setSubLabel] = useState('');
    const [currency, setCurrency] = useState('XRP');
    const [image, setImage] = useState(propImage);
    const [toFetch, setToFetch] = useState('534F4C4F00000000000000000000000000000000:rsoLo2S1kiGeCcn6hCUXVrCpGMWLrRrLZz');
    const [website, setWebsite] = useState('');
    const [loading, setLoading] = useState(true);
    const [toggleSettings, setToggleSettings] = useState(false);
    const { houndPrice, xrpPrice } = useCoinPrices();

    const apiUrl = config.api_url;

    const fetchToken = async () => {
        const res = await axios.get(`${apiUrl}/token/${toFetch}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        });
        const data = res.data;
        // console.log(data);
        setToken(data.name);

        let priceString = data.price.toString().split('.')[1];
        if (priceString[0] === '0') {
            //after decimal, there can be multiple digits, check for 0s and get the number of 0s, should be from start of string and not in between
            let numberOfZeros = 0;
            for (let i = 0; i < priceString.length; i++) {
                if (priceString[i] === '0') {
                    numberOfZeros++;
                } else {
                    break;
                }
            }
            console.log(numberOfZeros);
            //round the number according to the number of 0s, if 0s are 2, round to 3 decimal places so that 0s are not lost
            let roundedPrice = Math.round(data.price * Math.pow(10, numberOfZeros + 2)) / Math.pow(10, numberOfZeros + 2);
            setPrice(roundedPrice.toFixed(numberOfZeros + 3));
            setPriceInXrp(roundedPrice.toFixed(numberOfZeros + 3))
        } else {
            //round to 3 decimal places
            setPrice(Math.round(data.price * 1000) / 1000);
            setPriceInXrp(Math.round(data.price * 1000) / 1000);
        }
        setPriceChange(Math.round(data.twenty_four_hour_changes.price.change * 1000) / 1000);
        setSubLabel(data.issuerName);
        setImage(data.icon);
        setWebsite(data.website_link || '');
        setLoading(false);
        setToggleSettings(false);
    };

    useEffect(() => {
        fetchToken();
    }, [toFetch]);

    useEffect(() => {
        if (dimensions.width < 300) {
            setModuleSettings(prevSettings => ({ ...prevSettings, displayLogo: false }));
        } else {
            setModuleSettings(prevSettings => ({ ...prevSettings, displayLogo: true }));
        }
    }, [dimensions]);

    const handleTokenSelect = (selectedToken) => {
        if (selectedToken === toFetch) return;
        // Do something with the selected token
        setToFetch(selectedToken);
        setLoading(true);
        setToggleSettings(true)
    };

    const updateSettings = (key, value) => {
        setModuleSettings((prevSettings) => ({
            ...prevSettings,
            [key]: value,
        }));
    };

    const backgroundClass = moduleSettings.backgroundSetting === 'Solid' ? '' :
        moduleSettings.backgroundSetting === 'Highlight' ? 'bg-[#525567] ' :
            moduleSettings.backgroundSetting === 'Transparent' ? 'bg-transparent backdrop-blur-lg border border-white border-opacity-5' : '';

    const handleCurrencySelect = (selectedCurrency) => {
        // setCurrency(selectedCurrency);
        if (currency !== selectedCurrency) {
            setCurrency(selectedCurrency);
            setToggleSettings(true)
        }
    };

    //change the price according to the currency selected
    useEffect(() => {
        //the default price of the token is displayed in XRP, if they select USD, then we need to convert the price to USD and if they select HOUND, then we need to convert the price to HOUND
        if (currency === 'USD') {
            let price = Math.round(priceInXrp * (xrpPrice) * 1000) / 1000;
            setPrice(price.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 3, maximumFractionDigits: 10 }));
        } else if (currency === 'HOUND') {
            let price = priceInXrp / houndPrice;
            // setPrice(price.toLocaleString('en-US', { style: 'currency', currency: 'USD',minimumFractionDigits: 3, maximumFractionDigits: 3 }));
            setPrice(price.toFixed(3));
        } else {
            setPrice(priceInXrp);
        }
        setToggleSettings(false)
    }, [currency, houndPrice, priceInXrp, xrpPrice]);

    return (
        <ModuleCard
            title={`Price - ${token || subLabel}`}
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
                        disabled={dimensions.width < 300}
                    />
                    <TokenDropdown
                        onSelect={handleTokenSelect}
                        num={5}
                        selectToken={token || subLabel}
                    />
                    <DisplayPriceInTabs
                        onTokenChange={handleCurrencySelect}
                        selectToken={currency}
                    />
                </>
            }
            disableTitle={!moduleSettings.displayTitle}
            className={`${backgroundClass}`}
            callToggleSettings={toggleSettings}
        >
            <div ref={ref} className='w-full h-full flex flex-row gap-4'>
                {!loading && moduleSettings.displayLogo && (
                    <div className="h-full w-auto flex bg-[#A6B0CF] bg-opacity-5 rounded-xl items-center justify-center overflow-hidden p-4">
                        <Image className="w-full h-full aspect-square object-contain rounded-full" src={image || propImage} alt={token} width={200} height={200} quality={100} />
                    </div>
                )}

                <motion.div className='h-auto flex flex-col gap-4 justify-between'>
                    {loading ?

                        <>
                            <div className='flex flex-col animate-pulse'>
                                <span className="h-2.5 bg-[#A6B0CF] bg-opacity-5 rounded-lg  w-24 mb-2" />
                                <span className="h-6 bg-[#A6B0CF] bg-opacity-5 rounded-lg   w-24 mb-2" />
                            </div>
                            <div className='flex flex-col animate-pulse'>
                                <span className="h-6 bg-[#A6B0CF] bg-opacity-5 rounded-lg   w-32 mb-2" />
                                <span className="h-2.5 bg-[#A6B0CF] bg-opacity-5 rounded-lg  w-36 mb-2" />
                            </div>
                        </>
                        :
                        <>
                            <div className='flex flex-col'>
                                <Link href={website} target="_blank" rel="noopener noreferrer" className="flex flex-row items-center gap-2">
                                    <span className="text-xs font-semibold text-white opacity-60">{subLabel}</span>
                                </Link>
                                <span className="text-2xl font-bold">
                                    {token !== undefined ?
                                        token : subLabel}
                                </span>
                            </div>
                            <div className='flex flex-col'>
                                <span className="text-2xl font-bold">{price} {currency}</span>
                                <span className={`text-xs font-semibold opacity-50 flex flex-row items-center gap-2 whitespace-nowrap	 ${priceChange < 0 ? 'text-negative' : 'text-positive'}`}>
                                    <div style={{ transform: priceChange < 0 ? 'rotate(180deg)' : 'rotate(0)' }}>
                                        <svg width="7" height="5" viewBox="0 0 7 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.58808 0.833414L5.75475 3.00008C6.01864 3.26397 6.07753 3.56591 5.93142 3.90591C5.78586 4.24647 5.52558 4.41675 5.15058 4.41675L0.858917 4.41675C0.483917 4.41675 0.223639 4.24647 0.078084 3.90591C-0.0680275 3.56591 -0.00913858 3.26397 0.25475 3.00008L2.42142 0.833414C2.50475 0.750081 2.59503 0.687582 2.69225 0.645915C2.78947 0.604248 2.89364 0.583414 3.00475 0.583414C3.11586 0.583414 3.22003 0.604248 3.31725 0.645915C3.41447 0.687582 3.50475 0.750081 3.58808 0.833414Z" fill={`${priceChange < 0 ? '#CE5C6D' : '#6DCE5C'}`} fillOpacity="0.5" />
                                        </svg>
                                    </div>
                                    {priceChange}% (in the last 24h)
                                </span>
                            </div>
                        </>
                    }
                </motion.div>
            </div>
        </ModuleCard>
    );
};

export default PriceInfo;
