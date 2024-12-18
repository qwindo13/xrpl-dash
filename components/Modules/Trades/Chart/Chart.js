import React, { useEffect, useState, useRef } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import ModuleCard from "@/components/UI/ModuleCard/ModuleCardcomponents";
import TitleSwitch from "@/components/UI/ModuleCard/Settings/TitleSwitchcomponents";
import ChartRangeSwitch from "@/components/UI/ModuleCard/Settings/ChartRangeSwitchcomponents";
import BackgroundTabs from "@/components/UI/ModuleCard/Settings/BackgroundTabscomponents";
import ChartTypeTabs from "@/components/UI/ModuleCard/Settings/ChartTypeTabscomponents";
import ChartLineColorTabs from "@/components/UI/ModuleCard/Settings/ChartLineColorTabscomponents";
import Tabs from "@/components/UI/Tabs/Tabscomponents";
import mockChartLine from "@/data/mockChartLinecomponents";
import mockChartCandle from "@/data/mockChartCandlecomponents";
import TokenDropdown from "@/components/UI/ModuleCard/Settings/TokenDropdowncomponents";
import { config } from "@/configcomponents";

const defaultSettings = {
  displayTitle: true,
  displayRange: true,
  backgroundSetting: "Solid",
  chartType: "line",
  chartLineColor: "#85A8D8",
  token: "XRP",
  selectedRange: "7d",
};

const xrpMap = "USD:rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq";

const Chart = ({ title = "Price Chart", type = "price", onClickRemove, onClickStatic, isPinned=false }) => {
  {
    /* MODULE SETTINGS */
  }
  const [moduleSettings, setModuleSettings] = useState(defaultSettings);
  const updateSettings = (key, value) => {
    setModuleSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value,
    }));
  };
  const [selectedToken, setSelectedToken] = useState("XRP");
  const backgroundClass =
    moduleSettings.backgroundSetting === "Solid"
      ? ""
      : moduleSettings.backgroundSetting === "Highlight"
      ? "bg-[#525567] "
      : moduleSettings.backgroundSetting === "Transparent"
      ? "bg-transparent backdrop-blur-lg border border-white border-opacity-5"
      : "";

  const [chartType, setChartType] = useState(moduleSettings.chartType);
  const [timeRange, setTimeRange] = useState(moduleSettings.selectedRange); // ["1D", "7D", "1M", "1Y"
  const [chartLineColor, setChartLineColor] = useState(moduleSettings.chartLineColor);
  const [refresh, setRefresh] = useState(0);
  const [data, setData] = useState([]); // [time, value]
  const chartContainerRef = useRef(null);
  const chart = useRef(null);
  const resizeObserver = useRef();
  const lineSeriesRef = useRef(null);
  const candleSeriesRef = useRef(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      chart.current = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
        layout: {
          background: {
            type: "solid",
            color: "rgba(0, 0, 0, 0)",
          },
          textColor: "rgba(255, 255, 255, 0.6)",
        },
        grid: {
          vertLines: {
            color: "rgba(0, 0, 0, 0)",
          },
          horzLines: {
            color: "rgba(0, 0, 0, 0)",
          },
        },
        crosshair: {
          mode: CrosshairMode.Normal,
        },
        rightPriceScale: {
          borderColor: "rgba(255, 255, 255, 0)",
        },
        
        timeScale: {
          borderColor: "rgba(255, 255, 255, 0)",
        },
      });

      if (chartType === "candle") {
        candleSeriesRef.current = chart.current.addCandlestickSeries({
          upColor: "#6DCE5C",
          downColor: "#CE5C6D",
          borderDownColor: "#CE5C6D",
          borderUpColor: "#6DCE5C",
          wickDownColor: "#CE5C6D",
          wickUpColor: "#6DCE5C",
        });

        // Data for candle chart
        candleSeriesRef.current.setData(mockChartCandle);
      } else if (chartType === "line") {
        lineSeriesRef.current = chart.current.addLineSeries({
          color: chartLineColor,
          lineWidth: 2,
          priceFormat: {
            type: 'custom',
            formatter: (price) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(price),
          },
        });

        // Data for line chart
        // lineSeriesRef.current.setData(mockChartLine);
        // const api_url = `${config.api_url}/token/ohlc/${moduleSettings.token}/` + moduleSettings.selectedRange;
        let api_url;
        if (selectedToken === "XRP") {
          api_url =
            `${config.api_url}/token/ohlc/${xrpMap}/` +
            moduleSettings.selectedRange + "?isXRP=true"
        } else {
          api_url =
            `${config.api_url}/token/ohlc/${moduleSettings.selectToken}/` +
            moduleSettings.selectedRange + "?isXRP=false"
        }
        fetch(api_url)
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            if (chartType === "line") {
              const lineData = data.map((d) => {
                const unnixt = d.time;
                if (selectedToken === "XRP" && type === "price") {
                  // console.log("XRP");
                  return { time: unnixt, value: Number(1 / d.value) };
                } else if (type === "marketcap") {
                  return { time: unnixt, value: Number(d.marketcap) };
                } else if (type === "volume" && selectedToken === "XRP") {
                  return { time: unnixt, value: Number(d.volumeQ) };
                } else {
                  return { time: unnixt, value: Number(d.volumeB) };
                }
              });
              lineSeriesRef.current.setData(lineData);
              setData(lineData);
              setRefresh(Math.random());
            }
          });
      }
    }

    if (type === "volume") {
      updateSettings("token", "534F4C4F00000000000000000000000000000000:rsoLo2S1kiGeCcn6hCUXVrCpGMWLrRrLZz");
      setSelectedToken("SOLO")
    }

    // if (type !== "price" && moduleSettings.chartType === "candle") {
    //   updateSettings("chartType", "line");
    //   setChartType("line");
    // }

  }, []);

  // Resize chart on container resizes.
  useEffect(() => {
    resizeObserver.current = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      chart.current.applyOptions({ width, height });
      setTimeout(() => {
        chart.current.timeScale().fitContent();
      }, 0);
    });

    resizeObserver.current.observe(chartContainerRef.current);

    return () => resizeObserver.current.disconnect();
  }, [chartContainerRef, refresh]);
  

  useEffect(() => {
    // console.log("moduleSettings", moduleSettings);
    if (chartType !== moduleSettings.chartType) {
      setChartType(moduleSettings.chartType);
    }

    if (timeRange !== moduleSettings.selectedRange) {
      setTimeRange(moduleSettings.selectedRange);
    }

    let token;
    if (moduleSettings.token.split(":")[0].length <= 3) {
      token = moduleSettings.token.split(":")[0];
    } else {
      //convert from hex to ascii in one line
      token = Buffer.from(moduleSettings.token.split(":")[0], "hex").toString(
        "ascii"
      );
    }
    setSelectedToken(token);
  }, [moduleSettings]);

  useEffect(() => {
    let api_url;
    if (selectedToken === "XRP") {
      api_url =
        `${config.api_url}/token/ohlc/${xrpMap}/` +
        moduleSettings.selectedRange + "?isXRP=true"
    } else {
      api_url =
        `${config.api_url}/token/ohlc/${moduleSettings.token}/` +
        moduleSettings.selectedRange + "?isXRP=false"
    }
    fetch(api_url)
      .then((res) => res.json())
      .then((data) => {
        if (chartType === "line") {
          const lineData = data.map((d) => {
            const unnixt = d.time;
            if (selectedToken === "XRP" && type === "price") {
              return { time: unnixt, value: Number(1 / d.value) };
            } else if (type === "marketcap") {
              return { time: unnixt, value: Number(d.marketcap) };
            } else if (type === "volume" && selectedToken === "XRP") {
              return { time: unnixt, value: Number(d.volumeQ) };
            } else if (type === "volume" && selectedToken !== "XRP") {
              return { time: unnixt, value: Number(d.volumeB) };
            } else {
              return { time: unnixt, value: Number(d.value) };
            }
          });

          if (candleSeriesRef.current) {
            chart.current.removeSeries(candleSeriesRef.current);
            candleSeriesRef.current = null;
          }

          if (lineSeriesRef.current) {
            lineSeriesRef.current.setData(lineData);
            setData(lineData);
            setRefresh(Math.random());
          } else {
            lineSeriesRef.current = chart.current.addLineSeries({
              color: chartLineColor,
              lineWidth: 2,
              priceFormat: {
                type: 'custom',
                formatter: (price) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(price),
              },
            });
            lineSeriesRef.current.setData(lineData);
            setData(lineData);
            setRefresh(Math.random());
          }

        } else if (chartType === "candle") {
          const candleData = data.map((d) => {
            const unnixt = d.time;
            // return {
            //   time: unnixt,
            //   open: Number(d.open),
            //   high: Number(d.high),
            //   low: Number(d.low),
            //   close: Number(d.close),
            // };
            if (selectedToken === "XRP") {
              return {
                time: unnixt,
                open: Number(1 / d.open),
                high: Number(1 / d.high),
                low: Number(1 / d.low),
                close: Number(1 / d.close),
              };
            } else {
              return {
                time: unnixt,
                open: Number(d.open),
                high: Number(d.high),
                low: Number(d.low),
                close: Number(d.close),
              };
            }
          });

          if (lineSeriesRef.current) {
            chart.current.removeSeries(lineSeriesRef.current);
            lineSeriesRef.current = null;
          }
          
          if (candleSeriesRef.current) {
            candleSeriesRef.current.setData(candleData);
            setData(candleData);
            setRefresh(Math.random());
          } else {
            candleSeriesRef.current = chart.current.addCandlestickSeries({
              upColor: "#6DCE5C",
              downColor: "#CE5C6D",
              borderDownColor: "#CE5C6D",
              borderUpColor: "#6DCE5C",
              wickDownColor: "#CE5C6D",
              wickUpColor: "#6DCE5C",
            });
            candleSeriesRef.current.setData(candleData);
            setData(candleData);
            setRefresh(Math.random());
          }
        }
      });
  }, [selectedToken, timeRange, chartType]);

  useEffect(() => {
    if (chartType === "line" && lineSeriesRef.current) {
      lineSeriesRef.current.applyOptions({ color: chartLineColor });
    }
  }, [chartLineColor]);

  return (
    <ModuleCard
      title={`${title} (${selectedToken}/${
        selectedToken === "XRP" ? "USD" : "XRP"
      })`}
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
          {type === "price" && (
            <ChartTypeTabs
              value={moduleSettings.chartType}
              onChange={(value) => updateSettings("chartType", value)}
            />
          )}
          {moduleSettings.chartType && (
            <ChartLineColorTabs
              value={moduleSettings.chartLineColor}
              // onChange={(value) => updateSettings("chartLineColor", value)}
              onChange={(value) => {
                updateSettings("chartLineColor", value);
                setChartLineColor(value);
              }}
            />
          )}
          <TokenDropdown
            onSelect={(value) => updateSettings("token", value)}
            num={5}
            // selectToken={moduleSettings.token}
            selectToken={selectedToken}
            // showXrp={true}
            showXrp={type !== "volume" ? true : false}
          />
          <ChartRangeSwitch
            value={moduleSettings.displayRange}
            onChange={(value) => updateSettings("displayRange", value)}
          />
        </>
      }
      disableTitle={!moduleSettings.displayTitle}
      className={`${backgroundClass}`}
      onClickRemove={onClickRemove}
      onClickStatic={onClickStatic}
      isPinned={isPinned}
    >
      <div className="relative w-full h-full flex flex-col">
        {moduleSettings.displayRange && (
          <div className="border border-white border-opacity-5 rounded-xl w-fit p-1">
            <Tabs
              tabsId="price"
              className="px-0 h-full bg-transparent flex-wrap !justify-start"
              options={[
                {
                  label: <span className="text-xs">1D</span>,
                  value: "1d",
                },
                {
                  label: <span className="text-xs">7D</span>,
                  value: "7d",
                },
                {
                  label: <span className="text-xs">30D</span>,
                  value: "30d",
                },
                {
                  label: <span className="text-xs">1Y</span>,
                  value: "1y",
                },
              ]}
              bgColor="rgba(166, 176, 207, 0.05)"
              borderRadius={8}
              onChange={(value) => updateSettings("selectedRange", value)}
              value={moduleSettings.selectedRange}
            />
          </div>
        )}
        <div
          className="relative flex-grow overflow-hidden"
          ref={chartContainerRef}
        />
      </div>
    </ModuleCard>
  );
};

export default Chart;
