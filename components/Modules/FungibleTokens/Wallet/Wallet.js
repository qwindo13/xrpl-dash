import React, { useState } from "react";
import { motion } from "framer-motion";
import ModuleCard from '@/components/UI/ModuleCard/ModuleCardcomponents';
import TitleSwitch from '@/components/UI/ModuleCard/Settings/TitleSwitchcomponents';
import WalletDetailsSwitch from "@/components/UI/ModuleCard/Settings/WalletDetaisSwitchcomponents";
import DonutChart from "./DonutChart";
import chroma from 'chroma-js';
import BackgroundTabs from "@/components/UI/ModuleCard/Settings/BackgroundTabscomponents";

const defaultSettings = {
    displayTitle: true,
    displayWalletDetails: false,
    backgroundSetting: "Solid"
};

const testData = [
    { value: 60, token: 'XRP', xrpValue: "100", balance: '10,000' },
    { value: 30, token: 'HOUND', xrpValue: "10", balance: '300,000,000' },
    { value: 10, token: 'SOLO', xrpValue: "200", balance: '10,000' },
    { value: 5, token: 'CSC', xrpValue: "400", balance: '10,000' },
    { value: 5, token: 'CSC', xrpValue: "500", balance: '10,000' },
    { value: 5, token: 'CSC', xrpValue: "1", balance: '10,000' },
];

const columns = [
    { label: '', width: 'w-4' },
    { label: 'Token', sortKey: 'token', width: 'w-2/12' },
    { label: 'Balance', sortKey: 'balance', width: 'w-3/12' },
    { label: 'XRP Value', sortKey: 'change', width: 'w-2/12' }, 
    { label: 'Percentage (%)', sortKey: 'value', width: 'w-2/12' },
];

// Sort data from highest to lowest
const sortedData = [...testData].sort((a, b) => b.value - a.value);

// Define the gradient colors
const gradientColors = ['#f280a3', '#c86ba0', '#9b569d', '#75619a', '#4f6c97', '#85a8d8'];

// Create a color scale
const colorScale = chroma.scale(gradientColors).mode('lch').colors(sortedData.length);

// Sort the color scale in descending order so the largest value corresponds to the last color
const sortedColorScale = colorScale.reverse();


const Wallet = () => {
    const [moduleSettings, setModuleSettings] = useState(defaultSettings);
    const [sortConfig, setSortConfig] = useState(null);
    const [data, setData] = useState(testData);

    const updateSettings = (key, value) => {
        setModuleSettings((prevSettings) => ({
            ...prevSettings,
            [key]: value,
        }));
    };

    const sortBy = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });

        setData((prevData) => {
            return [...prevData].sort((a, b) => {
                if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
                if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
                return 0;
            });
        });
    };

    const renderSortingIcon = (key) => {
        if (!sortConfig || sortConfig.key !== key) {
            return;
        }
        const iconRotation = sortConfig.direction === 'descending' ? '0' : '180';
        return (
            <svg
                width="7"
                height="5"
                viewBox="0 0 7 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: `rotate(${iconRotation}deg)` }}
            >
                <path
                    d="M3.58808 0.833414L5.75475 3.00008C6.01864 3.26397 6.07753 3.56591 5.93142 3.90591C5.78586 4.24647 5.52558 4.41675 5.15058 4.41675L0.858917 4.41675C0.483917 4.41675 0.223639 4.24647 0.078084 3.90591C-0.0680275 3.56591 -0.00913858 3.26397 0.25475 3.00008L 2.42142 0.833414C2.50475 0.750081 2.59503 0.687582 2.69225 0.645915C2.78947 0.604248 2.89364 0.583414 3.00475 0.583414C3.11586 0.583414 3.22003 0.604248 3.31725 0.645915C3.41447 0.687582 3.50475 0.750081 3.58808 0.833414Z"
                    fill="#fff"
                    fillOpacity="1"
                />
            </svg>
        );
    };
    const backgroundClass = moduleSettings.backgroundSetting === 'Solid' ? '' :
    moduleSettings.backgroundSetting === 'Highlight' ? 'bg-[#6E7489] ' :
        moduleSettings.backgroundSetting === 'Transparent' ? 'bg-transparent backdrop-blur-lg border border-white border-opacity-5' : '';


    return (
        <ModuleCard
            title="Wallet"
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
                    <WalletDetailsSwitch
                        value={moduleSettings.displayWalletDetails}
                        onChange={(value) => updateSettings("displayWalletDetails", value)}
                    />

                </>
            }
            disableTitle={!moduleSettings.displayTitle}
            className={`${backgroundClass}`}

        >
            <div className={`w-full h-full flex flex-col gap-4 items-center ${moduleSettings.displayWalletDetails ? '' : ''}`}>
                {/* Show donut chart here */}
                <motion.div layout className={` aspect-square h-full ${moduleSettings.displayWalletDetails ? 'w-6/12' : 'w-10/12'}`}>
                    <DonutChart data={testData} colorScale={colorScale} valueXRP="9,999.99 XRP" valueFiat="$9,999.99" />
                </motion.div>
                {/* Table */}
                {moduleSettings.displayWalletDetails && (
                    <motion.div layout className="flex flex-col w-full">
                        <div className="flex flex-row justify-between pb-2">
                            {columns.map((column) => {
                                const isActive = sortConfig && sortConfig.key === column.sortKey;
                                return (
                                    <div
                                        key={column.sortKey}
                                        className={`cursor-pointer text-left text-xs font-semibold flex flex-row items-center gap-2 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-60'
                                            } ${column.width}`}
                                        onClick={() => sortBy(column.sortKey)}
                                    >
                                        {column.label}
                                        {isActive && renderSortingIcon(column.sortKey)}
                                    </div>
                                );
                            })}
                        </div>
                        <div className='flex flex-col '>
                            {data.map((item, index) => (
                                <div key={index} className="flex flex-row justify-between items-center">
                                    <span className="h-5 w-5 rounded-lg" style={{ display: 'inline-block', width: '20px', height: '20px', backgroundColor: chroma(colorScale[index % colorScale.length]).alpha(0.6) }}></span>
                                    <div className="text-left w-2/12 flex items-center">
                                        <span>{item.token}</span>
                                    </div>
                                    <div className="text-left w-3/12">{item.balance}</div>
                                    <div className="text-left w-2/12">{item.xrpValue}</div>
                                    <div className="text-left w-2/12">{item.value}%</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </ModuleCard>
    );
};

export default Wallet;
