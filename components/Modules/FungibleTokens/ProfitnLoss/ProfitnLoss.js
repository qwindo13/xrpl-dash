import React, { useState } from "react";
import Image from 'next/image';
import Link from "next/link";
import { motion } from "framer-motion";
import ModuleCard from '@/components/UI/ModuleCard/ModuleCardcomponents';
import TitleSwitch from '@/components/UI/ModuleCard/Settings/TitleSwitchcomponents';
import Button from '@/components/UI/Button/Buttoncomponents';
import Dropdown from '@/components/UI/Dropdown/Dropdowncomponents';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded';
import useResizeObserver from '@/hooks/useResizeObserver';

const defaultSettings = {
    displayTitle: true,
};

const ProfitnLose = () => {
    const [moduleSettings, setModuleSettings] = useState(defaultSettings);
    const [payWithToken, setPayWithToken] = useState(null);
    const [receiveToken, setReceiveToken] = useState(null);
    const [payRef, payDimensions] = useResizeObserver();
    const [receiveRef, receiveDimensions] = useResizeObserver();

    const updateSettings = (key, value) => {
        setModuleSettings((prevSettings) => ({
            ...prevSettings,
            [key]: value,
        }));
    };
    const handleSwap = () => {
        const temp = payWithToken;
        setPayWithToken(receiveToken);
        setReceiveToken(temp);
    };

    return (
        <ModuleCard
            title="Most profitable"
            settings={
                <>
                    <TitleSwitch
                        value={moduleSettings.displayTitle}
                        onChange={(value) => updateSettings("displayTitle", value)}
                    />
                </>
            }
            disableTitle={!moduleSettings.displayTitle}
        >
            <div className='w-full flex flex-col  relative justify-center h-full'>

                <Link href='#' target="_blank" rel="noopener noreferrer" className="flex flex-row items-center gap-2">
                    <span className="text-2xl font-bold">
                        HOUND
                    </span>
                </Link>
                <span className="text-lg  font-semibold text-positive opacity-50">+3,144 XRP</span>
            </div>


        </ModuleCard>
    );
};

export default ProfitnLose;
