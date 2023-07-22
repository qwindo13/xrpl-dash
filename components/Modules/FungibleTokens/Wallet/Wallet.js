import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ModuleCard from "@/components/UI/ModuleCard/ModuleCardcomponents";
import TitleSwitch from "@/components/UI/ModuleCard/Settings/TitleSwitchcomponents";
import WalletDetailsSwitch from "@/components/UI/ModuleCard/Settings/WalletDetaisSwitchcomponents";
import DonutChart from "./DonutChart";
import chroma from "chroma-js";
import BackgroundTabs from "@/components/UI/ModuleCard/Settings/BackgroundTabscomponents";
import { config } from "@/configcomponents";

const defaultSettings = {
    displayTitle: true,
    displayWalletDetails: false,
    backgroundSetting: "Solid",
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
            return;
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
                <path
                    d="M3.58808 0.833414L5.75475 3.00008C6.01864 3.26397 6.07753 3.56591 5.93142 3.90591C5.78586 4.24647 5.52558 4.41675 5.15058 4.41675L0.858917 4.41675C0.483917 4.41675 0.223639 4.24647 0.078084 3.90591C-0.0680275 3.56591 -0.00913858 3.26397 0.25475 3.00008L 2.42142 0.833414C2.50475 0.750081 2.59503 0.687582 2.69225 0.645915C2.78947 0.604248 2.89364 0.583414 3.00475 0.583414C3.11586 0.583414 3.22003 0.604248 3.31725 0.645915C3.41447 0.687582 3.50475 0.750081 3.58808 0.833414Z"
                    fill="#fff"
                    fillOpacity="1"
                />
            </svg>
        );
    };

    const backgroundClass =
        moduleSettings.backgroundSetting === "Solid"
            ? ""
            : moduleSettings.backgroundSetting === "Highlight"
                ? "bg-[#6E7489] "
                : moduleSettings.backgroundSetting === "Transparent"
                    ? "bg-transparent backdrop-blur-lg border border-white border-opacity-5"
                    : "";

    useEffect(() => {
        const url = `${config.api_url}/wallettrustlines/${xrpAddress}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
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
                // const xrpBalance = data.xrpBalance - 10;
                for (let i = 0; i < tls.length; i++) {
                    let token = tls[i].currency;
                    let balance = Math.round(tls[i].balance * 100) / 100;
                    const issuer = tls[i].account;
                    // tokensToFetch.push(`${token}:${issuer}`);
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
                console.log(tokens);
                setData(tokens);
                setTokensToFetch(tokensToFetch);
            });
    }, [xrpAddress]);

    useEffect(() => {
        let totalXrp = totXrp;
        const finalToBeUpdated = [
            {
                token: "XRP",
                balance: totXrp,
                xrpValue: totXrp,
                value: 0,
            },
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
                let roundedPrice = Math.round(data.price * Math.pow(10, numberOfZeros + 2)) /
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
        Promise.allSettled(promises).then((data) => {
            setTotXrp(Math.round(totalXrp * 100) / 100);
            //get xrp price
            const url = `${config.api_url}/xrpprice`;
            const subPromise = fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    const price = data.price;
                    setTotFiat(Math.round(totalXrp * price * 100) / 100);
                });
            setData(finalToBeUpdated);
        });

    }, [tokensToFetch]);

    //calculate percentage, based on xrp value. Use totXrp as total and calculate percentage for each token
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

        //sort data based on percentage
        setData((prevData) => {
            return [...prevData].sort((a, b) => {
                if (a.xrpValue < b.xrpValue) return 1;
                if (a.xrpValue > b.xrpValue) return -1;
                return 0;
            });
        });

        setLoading(false);
    }, [totXrp]);

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
            <div
                className={`w-full h-full flex flex-col items-center ${moduleSettings.displayWalletDetails ? "" : ""
                    }`}
            >
                {/* Show donut chart here */}
                <motion.div
                    layout
                    className={` aspect-square h-full ${moduleSettings.displayWalletDetails ? "w-6/12" : "w-10/12"
                        }`}
                >
                    <DonutChart
                        data={data}
                        colorScale={colorScale}
                        valueXRP={`${totXrp} XRP`}
                        valueFiat={`$${totFiat}`}
                        loading={loading}
                    />
                </motion.div>
                {/* Table */}
                {moduleSettings.displayWalletDetails && (
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
                )}
            </div>
        </ModuleCard>
    );
};

export default Wallet;
