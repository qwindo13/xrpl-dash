import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

import ModuleCard from '@/components/UI/ModuleCard/ModuleCardcomponents';
import TitleSwitch from '@/components/UI/ModuleCard/Settings/TitleSwitchcomponents';
import BackgroundTabs from "@/components/UI/ModuleCard/Settings/BackgroundTabscomponents";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';

const defaultSettings = {
    displayTitle: true,
    backgroundSetting: "Transparent",
};

// Initialize Supabase client
const supabase = createClient('https://ehfevvrxtibigpwvonjr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoZmV2dnJ4dGliaWdwd3ZvbmpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg0MzQyNzIsImV4cCI6MjAyNDAxMDI3Mn0.xkOo5VYLRm-uyIM3WYNLG8_EObQ7zvUWHFK6Y3ggrmw');

const PulsingDot = () => {
    return (
        <div className='relative h-1'>
            <motion.div
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: [1, 2], opacity: [1, 0] }}
                transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop",
                }}
                className="w-2 h-2 bg-green-500 rounded-full absolute"
            />
            <div className="w-2 h-2 bg-green-500 rounded-full absolute"></div>

        </div>
    );
};

const getStatus = (eventDate) => {
    // Check if eventDate is null or falsy
    if (!eventDate) {
        return (
            <div className="flex flex-row items-center gap-2">
                <span className="font-semibold">TBD</span>
            </div>
        );
    }

    const event = new Date(eventDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // If the event date is in the future, show as LIVE
    return event > today ? (
        <div className="flex flex-row items-center gap-4">
            <PulsingDot />
            <span className="text-green-500 font-semibold">LIVE</span>
        </div>
    ) : <span className="opacity-40 font-semibold">ENDED</span>; // Otherwise, show as ENDED
};

const AirdropItem = ({ src, title, description, date }) => {
    return (
        <div className="w-full h-auto rounded-xl p-4 flex flex-row bg-[#A6B0CF] bg-opacity-5 overflow-hidden justify-between gap-8 cursor-pointer">

            {/* PREVIEW */}
            <div className="flex items-center w-10/12">
                <img height={50} width={50} className="h-10 w-10 rounded-lg cover" src={src} alt="logo" />
                <div className="flex flex-col ml-4 w-full h-auto overflow-hidden">
                    <h3 className="font-semibold truncate">{title}</h3>
                    <span className="text-sm opacity-40 hidden md:flex truncate w-full ">{description}</span>
                </div>
            </div>
            <div className="w-2/12 flex items-center justify-end">
                {getStatus(date)}
            </div>

            {/* FULL CONTENT */}
        </div>
    );
}

const Airdrops = () => {

    const [moduleSettings, setModuleSettings] = useState(defaultSettings);
    const [airdrops, setAirdrops] = useState([]);
    const [sortCriteria, setSortCriteria] = useState({ field: '', direction: 'asc' });

    const updateSettings = (key, value) => {
        setModuleSettings((prevSettings) => ({
            ...prevSettings,
            [key]: value,
        }));
    };

    const backgroundClass = moduleSettings.backgroundSetting === 'Solid' ? '' :
        moduleSettings.backgroundSetting === 'Highlight' ? 'bg-[#525567] ' :
            moduleSettings.backgroundSetting === 'Transparent' ? 'bg-transparent backdrop-blur-lg border border-white border-opacity-5' : '';

    useEffect(() => {
        const fetchAirdrops = async () => {
            let { data, error } = await supabase
                .from('airdrops')
                .select('*')
                .eq('network', 'XRPL');

            if (error) console.log("error", error);
            else setAirdrops(data);
        };

        fetchAirdrops();
    }, []);

    const getStatusValue = (eventDate) => {
        if (!eventDate) return 3; // Assign a high value to TBD to ensure it sorts last
        const event = new Date(eventDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return event > today ? 1 : 2; // LIVE events (1) sort before ENDED events (2)
    };
    
    const sortAirdrops = (field) => {
        const isAsc = sortCriteria.field === field && sortCriteria.direction === 'asc';
        const sortedAirdrops = [...airdrops].sort((a, b) => {
            let aValue, bValue;
            if (field === 'status') {
                aValue = getStatusValue(a.airdrop_date);
                bValue = getStatusValue(b.airdrop_date);
            } else {
                aValue = a[field];
                bValue = b[field];
            }
    
            if (aValue < bValue) return isAsc ? -1 : 1;
            if (aValue > bValue) return isAsc ? 1 : -1;
            return 0;
        });
    
        setAirdrops(sortedAirdrops);
        setSortCriteria({
            field,
            direction: isAsc ? 'desc' : 'asc',
        });
    };

    return (
        <ModuleCard
            title="XRPL Airdrops"
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
            <div className="flex flex-col gap-4 w-full overflow-hidden">
                <div className="w-full flex justify-between uppercase text-xs">
                    <div className="w-10/12 opacity-40 cursor-pointer flex gap-1 items-center" onClick={() => sortAirdrops('project_name')}>Project {sortCriteria.field === 'project_name' ? (sortCriteria.direction === 'asc' ? <KeyboardArrowUpRoundedIcon sx={{ fontSize: 14 }} /> : <KeyboardArrowDownRoundedIcon sx={{ fontSize: 14 }}/>) : ''}</div>
                    <div className="w-2/12 opacity-40 justify-end flex gap-1 items-center cursor-pointer" onClick={() => sortAirdrops('status')}>Status {sortCriteria.field === 'status' ? (sortCriteria.direction === 'asc' ? <KeyboardArrowUpRoundedIcon sx={{ fontSize: 14 }} /> : <KeyboardArrowDownRoundedIcon sx={{ fontSize: 14 }}/>) : ''}</div>
                </div>
                <div className="w-full h-full flex flex-col gap-4">
                    {airdrops.map((airdrop) => (
                        <AirdropItem key={airdrop.id} src={airdrop.project_logo} title={airdrop.project_name} description={airdrop.description} date={airdrop.airdrop_date} />
                    ))}
                </div>
            </div>
        </ModuleCard >
    );
};

export default Airdrops;
