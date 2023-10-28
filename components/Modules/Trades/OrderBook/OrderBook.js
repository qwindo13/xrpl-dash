import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import ModuleCard from '@/components/UI/ModuleCard/ModuleCardcomponents';
import TitleSwitch from '@/components/UI/ModuleCard/Settings/TitleSwitchcomponents';
import SpreadSwitch from "@/components/UI/ModuleCard/Settings/SpreadSwitchcomponents";
import BackgroundTabs from "@/components/UI/ModuleCard/Settings/BackgroundTabscomponents";

const defaultSettings = {
    displayTitle: true,
    backgroundSetting: "Solid",
    displaySpread: false
};

const data = {
    sell: [
        { price: 1.20, amount: 7000 },
        { price: 1.22, amount: 1500 },
        { price: 1.24, amount: 6200 },
        { price: 1.26, amount: 3500 },
        { price: 1.28, amount: 4200 },
        { price: 1.30, amount: 1000 },
        { price: 1.32, amount: 4600 },
        { price: 1.34, amount: 3900 },
        { price: 1.36, amount: 5300 },
        { price: 1.38, amount: 2000 }
    ],
    buy: [
        { price: 1.18, amount: 6400 },
        { price: 1.16, amount: 500 },
        { price: 1.14, amount: 3100 },
        { price: 1.12, amount: 4800 },
        { price: 1.10, amount: 6700 },
        { price: 1.08, amount: 2300 },
        { price: 1.06, amount: 5500 },
        { price: 1.04, amount: 3700 },
        { price: 1.02, amount: 2900 },
        { price: 1.00, amount: 7100 }
    ]
};

// Calculate the cumulative amounts for sell and buy orders
let cumulativeSell = 0;
data.sell = data.sell.map(order => {
    cumulativeSell += order.amount;
    return { ...order, cumulativeAmount: cumulativeSell };
});

let cumulativeBuy = 0;
data.buy = data.buy.map(order => {
    cumulativeBuy += order.amount;
    return { ...order, cumulativeAmount: cumulativeBuy };
});

// Calculate the highest cumulative amount
const maxCumulative = Math.max(
    data.sell[data.sell.length - 1].cumulativeAmount,
    data.buy[data.buy.length - 1].cumulativeAmount
);

const spreadValue = data.sell[0].price - data.buy[0].price;
const spreadPercentage = ((spreadValue / data.buy[0].price) * 100).toFixed(2); // Using 2 decimal places for percentage



const OrderBook = () => {

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
            title="Order Book - XRP"
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
                    <SpreadSwitch
                        value={moduleSettings.displaySpread}
                        onChange={(value) => updateSettings("displaySpread", value)}
                    />
                </>
            }
            disableTitle={!moduleSettings.displayTitle}
            className={`${backgroundClass}`}
        >
            <div className="relative w-full h-full flex flex-col gap-4 items-center">
                <div className="flex justify-between items-center w-full uppercase">
                    <span className="text-xs opacity-60">Amount (XRP)</span>
                    <span className="text-xs opacity-60">Price (USD)</span>
                </div>
                <div className="flex flex-col w-full h-full justify-between">
                    {data.sell.map((order, index) => (
                        <div key={index} className="flex justify-between items-center h-full">
                            <div className="relative flex-1 h-full flex items-center">
                                <motion.div
                                    className="absolute bg-negative bg-opacity-40 h-full"
                                    style={{ width: `${(order.cumulativeAmount / maxCumulative) * 100}%` }}
                                ></motion.div>
                                <span className="z-[3] px-4">{order.amount}</span>
                            </div>
                            <div className="flex-initial ml-4">
                                <span className="text-negative">{order.price}</span>
                            </div>
                        </div>
                    ))}
                    {moduleSettings.displaySpread &&
                        <div className="text-center flex flex-col items-center p-4">
                            <span className="text-2xl">{spreadPercentage}%</span>
                            <span className="opacity-60">Spread</span>
                        </div>
                    }
                    {data.buy.map((order, index) => (
                        <div key={index} className="flex justify-between items-center h-full">
                            <div className="relative flex-1 h-full flex items-center">
                                <motion.div
                                    className="absolute bg-positive bg-opacity-40 h-full"
                                    style={{ width: `${(order.cumulativeAmount / maxCumulative) * 100}%` }}
                                ></motion.div>
                                <span className="z-[3] px-4">{order.amount}</span>
                            </div>
                            <div className="flex-initial ml-4">
                                <span className="text-positive">{order.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </ModuleCard>
    );
};

export default OrderBook;
