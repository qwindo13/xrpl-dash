import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import chroma from "chroma-js";
import ModuleCard from "@/components/UI/ModuleCard/ModuleCardcomponents";
import TitleSwitch from "@/components/UI/ModuleCard/Settings/TitleSwitchcomponents";
import WalletDetailsSwitch from "@/components/UI/ModuleCard/Settings/WalletDetaisSwitchcomponents";
import BackgroundTabs from "@/components/UI/ModuleCard/Settings/BackgroundTabscomponents";
import DonutChart from "./DonutChart";
import { config } from "@/configcomponents";

const BACKGROUND_SETTINGS = {
    SOLID: "Solid",
    HIGHLIGHT: "Highlight",
    TRANSPARENT: "Transparent",
};

const defaultSettings = {
    displayTitle: true,
    displayWalletDetails: false,
    backgroundSetting: BACKGROUND_SETTINGS.SOLID,
};

const testData = [
    { value: 60, token: "XRP", xrpValue: "100", balance: "10,000" },
    { value: 30, token: "HOUND", xrpValue: "10", balance: "300,000,000" },
    { value: 10, token: "SOLO", xrpValue: "200", balance: "10,000" },
    { value: 5, token: "CSC", xrpValue: "400", balance: "10,000" },
    { value: 5, token: "CSC", xrpValue: "500", balance: "10,000" },
    { value: 5, token: "CSC", xrpValue: "1", balance: "10,000" },
];

const columns = [
    { label: "", width: "w-4" },
    { label: "Token", sortKey: "token", width: "w-2/12" },
    { label: "Balance", sortKey: "balance", width: "w-3/12" },
    { label: "XRP Value", sortKey: "change", width: "w-2/12" },
    { label: "Percentage (%)", sortKey: "value", width: "w-2/12" },
];

// Sort data from highest to lowest
const sortedData = [...testData].sort((a, b) => b.value - a.value);

// Define the gradient colors
const gradientColors = [
    "#f280a3",
    "#c86ba0",
    "#9b569d",
    "#75619a",
    "#4f6c97",
    "#85a8d8",
];

// Create a color scale
const colorScale = chroma
    .scale(gradientColors)
    .mode("lch")
    .colors(sortedData.length);

// Sort the color scale in descending order so the largest value corresponds to the last color
const sortedColorScale = colorScale.reverse();

const Wallet = () => {
    const [moduleSettings, setModuleSettings] = useState(defaultSettings);
    const [sortConfig, setSortConfig] = useState(null);
    const [data, setData] = useState(testData);
    const [xrpAddress, setXrpAddress] = useState(
        "rD1JczqBRHW2gAwMoJ4zWruMy5EfWAHNGo"
    );
    const [tokensToFetch, setTokensToFetch] = useState([]);
    const [totXrp, setTotXrp] = useState(0);
    const [totFiat, setTotFiat] = useState(0);
    const [loading, setLoading] = useState(true);

    const updateSettings = (key, value) => {
        setModuleSettings((prevSettings) => ({
            ...prevSettings,
            [key]: value,
        }));
    };

    function hexToString(hex) {
        var string = "";
        for (var i = 0; i < hex.length; i += 2) {
            var code = parseInt(hex.substr(i, 2), 16);
            if (code !== 0) {
                string += String.fromCharCode(code);
            }
        }
        return string;
    }

    const sortBy = (key) => {
        let direction = "ascending";
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === "ascending"
        ) {
            direction = "descending";
        }
        setSortConfig({ key, direction });

        setData((prevData) => {
            return [...prevData].sort((a, b) => {
                if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
                if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
                return 0;
            });
        });
    };

    const renderSortingIcon = (key) => {
        if (!sortConfig || sortConfig.key !== key) {
            return null;
        }
        const iconRotation = sortConfig.direction === "descending" ? "0" : "180";
        return (
            <svg
                width="7"
                height="5"
                viewBox="0 0 7 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: `rotate(${iconRotation}deg)` }}
            >
                {/* Icon path */}
            </svg>
        );
    };

    const backgroundClass =
        moduleSettings.backgroundSetting === BACKGROUND_SETTINGS.SOLID
            ? ""
            : moduleSettings.backgroundSetting === BACKGROUND_SETTINGS.HIGHLIGHT
                ? "bg-[#6E7489] "
                : moduleSettings.backgroundSetting === BACKGROUND_SETTINGS.TRANSPARENT
                    ? "bg-transparent backdrop-blur-lg border border-white border-opacity-5"
                    : "";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `${config.api_url}/wallettrustlines/${xrpAddress}`;
                const response = await fetch(url);
                const data = await response.json();
                const tls = data.trustlines;
                const tokens = [
                    {
                        token: "XRP",
                        balance: data.xrpBalance - 10,
                        xrpValue: Math.round((data.xrpBalance - 10) * 100) / 100,
                        value: 0,
                    },
                ];
                setTotXrp(Math.round((data.xrpBalance - 10) * 100) / 100);
                const tokensToFetch = [];
                for (let i = 0; i < tls.length; i++) {
                    let token = tls[i].currency;
                    let balance = Math.round(tls[i].balance * 100) / 100;
                    const issuer = tls[i].account;
                    tokensToFetch.push({
                        token: `${token}:${issuer}`,
                        balance: balance,
                        xrpValue: "100",
                        value: 0,
                    });
                    if (token.length > 3) {
                        token = hexToString(token);
                    }
                    tokens.push({
                        token: token,
                        balance: balance,
                        xrpValue: "100",
                        value: 0,
                    });
                }
                setData(tokens);
                setTokensToFetch(tokensToFetch);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [xrpAddress]);

    useEffect(() => {
        const fetchTokenData = async () => {
            try {
                let totalXrp = totXrp;
                const finalToBeUpdated = [
                    { token: "XRP", balance: totXrp, xrpValue: totXrp, value: 0 },
                ];
                const promises = tokensToFetch.map(async (token) => {
                    const url = `${config.api_url}/token/${token.token}`;
                    const response = await fetch(url);
                    const data = await response.json();
                    let priceString = data.price.toString().split(".")[1];
                    if (priceString === undefined) {
                        priceString = "0";
                    }
                    let price;
                    if (priceString[0] === "0") {
                        //after decimal, there can be multiple digits, check for 0s and get the number of 0s, should be from start of string and not in between
                        let numberOfZeros = 0;
                        for (let i = 0; i < priceString.length; i++) {
                            if (priceString[i] === "0") {
                                numberOfZeros++;
                            } else {
                                break;
                            }
                        }
                        //round the number according to the number of 0s, if 0s are 2, round to 3 decimal places so that 0s are not lost
                        let roundedPrice =
                            Math.round(data.price * Math.pow(10, numberOfZeros + 2)) /
                            Math.pow(10, numberOfZeros + 2);
                        price = roundedPrice.toFixed(numberOfZeros + 3);
                    } else {
                        //round to 3 decimal places
                        price = Math.round(data.price * 1000) / 1000;
                    }
                    // console.log(`${token} price: ${price}`);
                    let toke = token.token.split(":")[0];
                    if (toke.length > 3) {
                        toke = hexToString(toke);
                    }
                    const toBeUpdated = {
                        token: toke,
                        balance: token.balance,
                        xrpValue: Math.round(price * token.balance * 100) / 100,
                        value: 0,
                    };
                    finalToBeUpdated.push(toBeUpdated);
                    totalXrp += Math.round(price * token.balance * 100) / 100;
                });

                await Promise.allSettled(promises).then((data) => {
                    setTotXrp(Math.round(totalXrp * 100) / 100);
                    //get xrp price
                    const url = `${config.api_url}/xrpprice`;
                    const subPromise = fetch(url)
                        .then((response) => response.json())
                        .then((data) => {
                            const price = data.price;
                            setTotFiat(Math.round(totalXrp * price * 100) / 100);
                        });
                    console.log("Final to be updated: ", finalToBeUpdated);
                    setData(finalToBeUpdated);
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchTokenData();
    }, [tokensToFetch]);

    //
    useEffect(() => {
        if (totXrp === 0) {
            return;
        }

        setData((prevData) => {
            const updatedData = [...prevData];
            for (let i = 0; i < updatedData.length; i++) {
                updatedData[i].value = Math.round(
                    (updatedData[i].xrpValue / totXrp) * 100
                );
            }
            return updatedData;
        });

        setData((prevData) => {
            return [...prevData].sort((a, b) => {
                if (a.xrpValue < b.xrpValue) return 1;
                if (a.xrpValue > b.xrpValue) return -1;
                return 0;
            });
        });

        setLoading(false);
    }, [totXrp]);

    const DonutChartWrapper = ({ moduleSettings, totXrp, totFiat, loading }) => (
        <motion.div layout className={`aspect-square h-full ${moduleSettings.displayWalletDetails ? "w-6/12" : "w-10/12"}`}>
            <DonutChart
                data={data}
                colorScale={colorScale}
                valueXRP={`${totXrp} XRP`}
                valueFiat={`$${totFiat}`}
                loading={loading}
            />
        </motion.div>
    );

    const Table = ({ data }) => (
        <motion.div layout className="flex flex-col w-full">
             <div className="flex flex-row justify-between pb-2">
                            {columns.map((column) => {
                                const isActive =
                                    sortConfig && sortConfig.key === column.sortKey;
                                return (
                                    <div
                                        key={column.sortKey}
                                        className={`cursor-pointer text-left text-xs font-semibold flex flex-row items-center gap-2 transition-all duration-300 ${isActive ? "opacity-100" : "opacity-60"
                                            } ${column.width}`}
                                        onClick={() => sortBy(column.sortKey)}
                                    >
                                        {column.label}
                                        {isActive && renderSortingIcon(column.sortKey)}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex flex-col ">
                            {data.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex flex-row justify-between items-center"
                                >
                                    <span
                                        className="h-5 w-5 rounded-lg"
                                        style={{
                                            display: "inline-block",
                                            width: "20px",
                                            height: "20px",
                                            backgroundColor: chroma(
                                                colorScale[index % colorScale.length]
                                            ).alpha(0.6),
                                        }}
                                    ></span>
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
    );

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
            className={backgroundClass}
        >
            <div className={`w-full h-full flex flex-col items-center ${moduleSettings.displayWalletDetails ? "" : ""}`}>
                <DonutChartWrapper
                    moduleSettings={moduleSettings}
                    totXrp={totXrp}
                    totFiat={totFiat}
                    loading={loading}
                />
                {moduleSettings.displayWalletDetails && <Table data={data} />}
            </div>
        </ModuleCard>
    );
};

export default Wallet;
