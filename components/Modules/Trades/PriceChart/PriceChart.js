import React, { useEffect, useState, useRef } from "react";
import ReactDOM from 'react-dom';
import Image from 'next/image';
import ModuleCard from '@/components/UI/ModuleCard/ModuleCardcomponents';
import TitleSwitch from '@/components/UI/ModuleCard/Settings/TitleSwitchcomponents';
import BackgroundTabs from "@/components/UI/ModuleCard/Settings/BackgroundTabscomponents";
import { createChart, CrosshairMode } from 'lightweight-charts';


const defaultSettings = {
    displayTitle: true,
    backgroundSetting: "Solid",
};

const PriceChart = () => {

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

    const chartContainerRef = useRef();
    const chart = useRef();
    const resizeObserver = useRef();

    // Resize chart on container resizes.
    useEffect(() => {
        resizeObserver.current = new ResizeObserver(entries => {
            const { width, height } = entries[0].contentRect;
            chart.current.applyOptions({ width, height });
            setTimeout(() => {
                chart.current.timeScale().fitContent();
            }, 0);
        });

        resizeObserver.current.observe(chartContainerRef.current);

        return () => resizeObserver.current.disconnect();
    }, []);

    useEffect(() => {
        chart.current = createChart(chartContainerRef.current, {
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
          layout: {
            backgroundColor: '#253248',
            textColor: 'rgba(255, 255, 255, 0.9)',
          },
          grid: {
            vertLines: {
              color: '#334158',
            },
            horzLines: {
              color: '#334158',
            },
          },
          crosshair: {
            mode: CrosshairMode.Normal,
          },
          priceScale: {
            borderColor: '#485c7b',
          },
          timeScale: {
            borderColor: '#485c7b',
          },
        });
    
        console.log(chart.current);
    
        const candleSeries = chart.current.addCandlestickSeries({
          upColor: '#4bffb5',
          downColor: '#ff4976',
          borderDownColor: '#ff4976',
          borderUpColor: '#4bffb5',
          wickDownColor: '#838ca1',
          wickUpColor: '#838ca1',
        });
    
        // candleSeries.setData(priceData);
        const priceData = [
            { time: '2018-10-19', open: 54.62, high: 55.5, low: 54.52, close: 54.9 },
            { time: '2018-10-22', open: 55.08, high: 55.27, low: 54.61, close: 54.98 },
            { time: '2018-10-23', open: 55.09, high: 55.09, low: 54.47, close: 54.71 },
            { time: '2018-10-24', open: 54.54, high: 54.9, low: 54.33, close: 54.61 },
            { time: '2018-10-25', open: 54.22, high: 54.9, low: 54.1, close: 54.82 },
            { time: '2018-10-26', open: 54.64, high: 55.5, low: 54.6, close: 55.27 },
            { time: '2018-10-29', open: 55.3, high: 55.32, low: 54.46, close: 54.98 },
            { time: '2018-10-30', open: 54.98, high: 55.19, low: 54.61, close: 54.69 },
            { time: '2018-10-31', open: 54.4, high: 54.66, low: 53.74, close: 54.61 },
            { time: '2018-11-01', open: 54.65, high: 54.93, low: 54.3, close: 54.9 },
            { time: '2018-11-02', open: 54.91, high: 55.18, low: 54.4, close: 54.73 },
            { time: '2018-11-05', open: 54.73, high: 55.35, low: 54.5, close: 55.04 },
          ];
          candleSeries.setData(priceData);
        // const areaSeries = chart.current.addAreaSeries({
        //   topColor: 'rgba(38,198,218, 0.56)',
        //   bottomColor: 'rgba(38,198,218, 0.04)',
        //   lineColor: 'rgba(38,198,218, 1)',
        //   lineWidth: 2
        // });
    
        // areaSeries.setData(areaData);
    
        const volumeSeries = chart.current.addHistogramSeries({
          color: '#182233',
          lineWidth: 2,
          priceFormat: {
            type: 'volume',
          },
          overlay: true,
          scaleMargins: {
            top: 0.8,
            bottom: 0,
          },
        });
    
        // volumeSeries.setData(volumeData);
        const volumeData = [
            { time: '2018-10-19', value: 111 },
            { time: '2018-10-22', value: 222 },
            { time: '2018-10-23', value: 333 },
            { time: '2018-10-24', value: 444 },
            { time: '2018-10-25', value: 555 },
            { time: '2018-10-26', value: 666 },
            { time: '2018-10-29', value: 777 },
            { time: '2018-10-30', value: 888 },
            { time: '2018-10-31', value: 999 },
            { time: '2018-11-01', value: 111 },
            { time: '2018-11-02', value: 222 },
            { time: '2018-11-05', value: 333 },
          ];
          volumeSeries.setData(volumeData);
      }, []);
    

    return (
        <ModuleCard
            title="Price Chart"
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
                </>
            }
            disableTitle={!moduleSettings.displayTitle}
            className={`${backgroundClass}`}
        >
            <div className="relative w-full h-full">
                <div ref={chartContainerRef} className="chart-container" />
            </div>

        </ModuleCard>
    );
};

export default PriceChart;
