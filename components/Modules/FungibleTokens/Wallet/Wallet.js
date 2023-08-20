import React, { useState, useEffect, useMemo, useCallback } from "react";
import chroma from "chroma-js";
import { motion } from "framer-motion";
import DonutChart from "./DonutChart";
import ModuleCard from "@/components/UI/ModuleCard/ModuleCardcomponents";
import WalletPrompt from "@/components/UI/WalletPrompt/WalletPromptcomponents";
import TitleSwitch from "@/components/UI/ModuleCard/Settings/TitleSwitchcomponents";
import BackgroundTabs from "@/components/UI/ModuleCard/Settings/BackgroundTabscomponents";
import WalletDetailsSwitch from "@/components/UI/ModuleCard/Settings/WalletDetaisSwitchcomponents";
import { config } from "@/configcomponents";

function formatNumber(num) {
  return new Intl.NumberFormat('en-US').format(num);
}

const columns = [
  { label: "Token", sortKey: "token", width: "w-2/12" },
  { label: "Balance", sortKey: "balance", width: "w-3/12" },
  { label: "Value (XRP)", sortKey: "xrpValue", width: "w-2/12" },
  { label: "%", sortKey: "value", width: "w-2/12" },
];

const defaultSettings = {
  displayTitle: true,
  displayWalletDetails: false,
  backgroundSetting: "Transparent",
};


const Wallet = () => {
  const [moduleSettings, setModuleSettings] = useState(defaultSettings);
  const [sortConfig, setSortConfig] = useState(null);
  const [data, setData] = useState([]);
  const [xrpAddress, setXrpAddress] = useState(null);
  const [totXrp, setTotXrp] = useState(0);
  const [totFiat, setTotFiat] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const address = localStorage.getItem("address");
    setXrpAddress(address);
  }, []);

  const updateSettings = (key, value) => {
    setModuleSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value,
    }));
  };

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

  const sortBy = useCallback(
    (key) => {
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
    },
    [sortConfig]
  );

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

  const backgroundClass = moduleSettings.backgroundSetting === 'Solid' ? '' :
    moduleSettings.backgroundSetting === 'Highlight' ? 'bg-[#6E7489] ' :
      moduleSettings.backgroundSetting === 'Transparent' ? 'bg-transparent backdrop-blur-lg border border-white border-opacity-5' : '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (xrpAddress === null) {
          return;
        }
        const url = `${config.api_url}/wallettrustlines/${xrpAddress}`;
        const response = await fetch(url);
        const data = await response.json();
        const tls = data.trustlines;
        let totalxrp = data.xrpBalance - 10;
        const tokensToFetch = [
          {
            token: "XRP",
            balance: data.xrpBalance - 10,
            xrpValue: Math.round((data.xrpBalance - 10) * 100) / 100,
            value: 0,
          },
        ];
        for (let i = 0; i < tls.length; i++) {
          let token = tls[i].currency;
          let balance = Math.round(tls[i].balance * 100) / 100;
          const issuer = tls[i].account;
          const url = `${config.api_url}/token/${token}:${issuer}`;
          const response = await fetch(url);
          const data = await response.json();
          const price = data.price;
          const xrpValue = Math.round(balance * price * 100) / 100;
          totalxrp += xrpValue;
          if (token.length > 3) {
            token = hexToString(token);
          }
          tokensToFetch.push({
            token: token,
            balance: balance,
            xrpValue: xrpValue,
            value: 0,
          });
        }

        //get value (percentage) of each token
        for (let i = 0; i < tokensToFetch.length; i++) {
          tokensToFetch[i].value = Math.round(
            (tokensToFetch[i].xrpValue / totalxrp) * 100
          );
        }

        // Sort data from highest to lowest based on xrpValue
        tokensToFetch.sort((a, b) => {
          if (a.xrpValue < b.xrpValue) return 1;
          if (a.xrpValue > b.xrpValue) return -1;
          return 0;
        });

        setData(tokensToFetch);
        setTotXrp(Math.round(totalxrp * 100) / 100);
        // setTotFiat(Math.round(totalxrp * 0.7 * 100) / 100);
        const xrpprice = await fetch(`${config.api_url}/xrpprice`);
        const xrppricedata = await xrpprice.json();
        setTotFiat(Math.round(totalxrp * xrppricedata.price * 100) / 100);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (xrpAddress !== null) {
      fetchData().then(() => {
        setLoading(false);
      });
    }
  }, [xrpAddress]);

  const colorScale = ['#f280a3', '#c86ba0', '#9b569d', '#75619a', '#4f6c97', '#85a8d8'].reverse();

  const DonutChartWrapper = useMemo(
    () =>
      // eslint-disable-next-line react/display-name
      React.memo(({ moduleSettings, totXrp, totFiat, loading }) => (
        <motion.div
          layout
          className={`aspect-square h-full ${moduleSettings.displayWalletDetails ? "w-6/12" : "w-10/12"
            }`}
        >
          <DonutChart
            // data={data} do not send tokens with balance 0
            data={data.filter((token) => token.balance > 0)}
            colorScale={colorScale}
            valueXRP={`${totXrp} XRP`}
            valueFiat={`$${totFiat}`}
            loading={loading}
          />
        </motion.div>
      )),
    [totXrp]
  );

  DonutChartWrapper.displayName = "DonutChartWrapper";

  const Table = useMemo(
    () =>
      // eslint-disable-next-line react/display-name
      React.memo(({ data }) => (
        <motion.div layout className="flex flex-col w-full">
          <div className="flex flex-row justify-between pb-2">
            <div className="w-5 h-5"></div>
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
              <div key={index} className="flex flex-row justify-between items-center">
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
                <div className="text-left w-3/12">{formatNumber(item.balance)}</div>
                <div className="text-left w-2/12">{formatNumber(item.xrpValue)}</div>
                <div className="text-left w-2/12">{item.value}%</div>
              </div>
            ))}
          </div>
        </motion.div>
      )),
    [data, sortConfig, colorScale, sortBy]
  );

  Table.displayName = "Table";

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
            onChange={(value) => { console.log(value); updateSettings("backgroundSetting", value) }}
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
      {xrpAddress !== null ? (
        <div
          className={`w-full h-full flex flex-col items-center ${moduleSettings.displayWalletDetails ? "" : ""
            }`}
        >
          <DonutChartWrapper
            moduleSettings={moduleSettings}
            totXrp={formatNumber(totXrp)}
            totFiat={formatNumber(totFiat)}
            loading={loading}
          />
          {moduleSettings.displayWalletDetails && <Table data={data} />}
        </div>
      ) : (
        <WalletPrompt />
      )}
    </ModuleCard>
  );
}
export default Wallet;