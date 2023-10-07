import React, { useEffect, useState, useRef } from "react";
import Image from 'next/image';
import ModuleCard from '@/components/UI/ModuleCard/ModuleCardcomponents';
import TitleSwitch from '@/components/UI/ModuleCard/Settings/TitleSwitchcomponents';
import BackgroundTabs from "@/components/UI/ModuleCard/Settings/BackgroundTabscomponents";

const API_URL = 'https://api.alternative.me/fng/?limit=2';

const defaultSettings = {
    displayTitle: false,
    backgroundSetting: "Solid",
};


const FearGreedIndex = ({onClickRemove,onClickStatic}) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [moduleSettings, setModuleSettings] = useState(defaultSettings);
    const updateSettings = (key, value) => {
        setModuleSettings((prevSettings) => ({
            ...prevSettings,
            [key]: value,
        }));
    };

    const getBackgroundColor = (value) => {
        let rgbaColor;
        if (value >= 0 && value <= 20) rgbaColor = "rgba(206, 92, 109, 0.6)";
        else if (value >= 21 && value <= 40) rgbaColor = "rgba(231,174,55, 0.6)";
        else if (value >= 41 && value <= 60) rgbaColor = "rgba(243, 215, 28, 0.6)";
        else if (value >= 61 && value <= 80) rgbaColor = "rgba(176,	211, 560, 0.6)";
        else if (value >= 81 && value <= 100) rgbaColor = "rgba(109, 206, 92, 0.6)";
        return `radial-gradient(circle at center, ${rgbaColor} 0%, transparent 120%)`;
    };
    
    

    const backgroundClass = moduleSettings.backgroundSetting === 'Solid' 
    ? 'border-white border-opacity-0'
    : moduleSettings.backgroundSetting === 'Highlight'
    ? `backdrop-blur-lg`
    : moduleSettings.backgroundSetting === 'Transparent' 
    ? 'bg-transparent backdrop-blur-lg border border-white border-opacity-5' 
    : '';

    const backgroundStyle = moduleSettings.backgroundSetting === 'Highlight' ? 
    { 
        background: getBackgroundColor(data[0]?.value || 0) 
    } : {};



    // State to hold the circle's position
    const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });

    const calculateCirclePosition = (value) => {
        const path = document.querySelector("#motionPath");
        const pathLength = path.getTotalLength();
        const position = path.getPointAtLength((value / 100) * pathLength); // converting value to a percentage of path length
        return { x: position.x, y: position.y };
    };

    useEffect(() => {
        // Set default position to 0% when component mounts
        setCirclePosition(calculateCirclePosition(0));

        const fetchData = async () => {
            try {
                const response = await fetch(API_URL);
                const result = await response.json();
                setData(result.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (data[0]) {
            const value = data[0].value;
            setCirclePosition(calculateCirclePosition(value));
        }
    }, [data]);



    return (
        <ModuleCard
            onClickRemove={onClickRemove}
            onClickStatic={onClickStatic}
            title="Fear and Greed Index"
            settings={
                <>
                    <TitleSwitch
                        value={moduleSettings.displayTitle}
                        onChange={(value) => updateSettings("displayTitle", value)}
                    />
                    <BackgroundTabs
                        hasHighlight
                        value={moduleSettings.backgroundSetting}
                        onChange={(value) => updateSettings("backgroundSetting", value)}
                    />
                </>
            }
            disableTitle={!moduleSettings.displayTitle}
            className={`${backgroundClass}`}
            contentClassName="!overflow-visible"
            style={backgroundStyle}
        >
            <div className="relative w-full h-full">
                <div className="w-full h-full flex items-center aspect-auto justify-center">
                    <svg className="w-full h-auto max-h-full overflow-visible" viewBox="0 0 177 89" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path id="path1" d="M173.262 88C174.967 88 176.354 86.6173 176.294 84.9135C175.747 69.3495 171.069 54.2074 162.739 41.0369C161.829 39.5992 159.909 39.2385 158.502 40.1946V40.1946C157.091 41.1536 156.731 43.073 157.639 44.5176C165.272 56.6598 169.575 70.5911 170.116 84.9137C170.181 86.6174 171.557 88 173.262 88V88Z" fill="#6DCE5C"></path>
                        <path id="path2" d="M156.897 37.9461C158.276 36.9419 158.582 35.0049 157.527 33.664C147.855 21.3698 135.074 11.8665 120.501 6.13374C118.919 5.51151 117.158 6.35475 116.589 7.9564V7.9564C116.019 9.56129 116.861 11.3189 118.444 11.9467C131.848 17.2616 143.611 26.0103 152.545 37.3081C153.6 38.6424 155.522 38.9473 156.897 37.9461V37.9461Z" fill=" #B0D33C"></path>
                        <path id="path3" d="M113.03 6.79368C113.529 5.1655 112.613 3.4359 110.968 2.99624C95.9311 -1.02229 80.0941 -0.998203 65.0696 3.06605C63.4258 3.51072 62.5154 5.24312 63.0192 6.86979V6.86979C63.5221 8.49352 65.2439 9.3971 66.8859 8.95738C80.732 5.24947 95.3122 5.22729 109.17 8.89306C110.813 9.32777 112.532 8.41894 113.03 6.79368V6.79368Z" fill="#F3D71C"></path>
                        <path id="path4" d="M60.1455 7.80322C59.5852 6.19848 57.8286 5.34566 56.2435 5.95929C41.7314 11.5772 28.9667 20.9284 19.2489 33.0606C18.1823 34.3922 18.4716 36.3318 19.842 37.3481V37.3481C21.2083 38.3612 23.1323 38.0731 24.1989 36.7482C33.1738 25.6002 44.9213 16.992 58.2681 11.7833C59.8547 11.1641 60.707 9.41116 60.1455 7.80322V7.80322Z" fill="#E7AE37"></path>
                        <path id="path5" d="M17.7126 40.3161C16.3039 39.3625 14.3841 39.7265 13.4772 41.1658C5.1935 54.313 0.544063 69.4152 0.00210452 84.935C-0.0573952 86.6388 1.3307 88.0212 3.03561 88.0208V88.0208C4.74051 88.0203 6.11617 86.6374 6.18018 84.9337C6.71672 70.6522 10.9931 56.7581 18.5827 44.6376C19.4882 43.1915 19.1255 41.2726 17.7126 40.3161V40.3161Z" fill="#CE5C6D"></path>

                        <path id="motionPath" d="M3.09,85v-.09a84.74,84.74,0,0,1,13-41.95h0a58.31,58.31,0,0,1,5.47-7.76c.15-.16.3-.32.44-.49A85.13,85.13,0,0,1,57.28,8.9h0A53,53,0,0,1,66,6.07,85.18,85.18,0,0,1,110.08,6c2.84.74,7,2.2,9.14,3h0l.25.09h0A85.06,85.06,0,0,1,155,35.46l.09.11c1.09,1.37,3.86,5.27,4.93,7a1.4,1.4,0,0,0,.1.16s0,0,0,.06A84.44,84.44,0,0,1,173.1,82.94a4.42,4.42,0,0,1-1.33,3.51"
                            stroke="" fill=""></path>

                        <circle
                            cx={circlePosition.x}
                            cy={circlePosition.y}
                            r="8"
                            strokeWidth="2"
                            fill="#FFFFFF"
                            stroke="#21212A"
                        />
                    </svg>

                    {data[0] && (
                        <div className="absolute text-center mt-8" >
                            <h5 className="font-semibold text-2xl">{data[0].value}</h5>
                            <span className="opacity-60 font-normal text">{data[0].value_classification}</span>
                        </div>
                    )}


                </div>
            </div>

        </ModuleCard>
    );
};

export default FearGreedIndex;
