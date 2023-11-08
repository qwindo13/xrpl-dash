import React, { useEffect, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import ModuleCard from '@/components/UI/ModuleCard/ModuleCardcomponents';
import TitleSwitch from '@/components/UI/ModuleCard/Settings/TitleSwitchcomponents';
import BackgroundTabs from "@/components/UI/ModuleCard/Settings/BackgroundTabscomponents";
import InputField from "@/components/UI/InputField/InputFieldcomponents";
import ChatBox from "@/components/Chat/ChatBox/ChatBoxcomponents";

const defaultSettings = {
    displayTitle: false,
    backgroundSetting: "Transparent",
};

const AIChatBot = () => {

    const [moduleSettings, setModuleSettings] = useState(defaultSettings);
    const updateSettings = (key, value) => {
        setModuleSettings((prevSettings) => ({
            ...prevSettings,
            [key]: value,
        }));
    };

    const backgroundClass = moduleSettings.backgroundSetting === 'Solid' ? '' :
        moduleSettings.backgroundSetting === 'Highlight' ? 'bg-[#525567] ' :
            moduleSettings.backgroundSetting === 'Transparent' ? 'bg-transparent backdrop-blur-lg border border-white border-opacity-5 !p-0' : '';

    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);
          
    function handleMouseMove(event) {
        let { currentTarget, clientX, clientY } = event;
        let { left, top } = currentTarget.getBoundingClientRect();
          
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <ModuleCard
            title="AI Chat Bot"
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
            <div
                onMouseMove={handleMouseMove}
                className="group w-full h-full relative overflow-hidden flex flex-col gap-4 rounded-xl">
                {/* Gradient */}
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                        background: useMotionTemplate`
                          radial-gradient(
                            400px circle at ${mouseX}px ${mouseY}px,
                            rgba(151, 80, 159, 0.15),
                            transparent 80%
                          )
                        `,
                      }}
                />
                <div className="flex grow w-full z-[1] rounded-full">
                      <img src="/images/3dhound.png" className="w-full h-full shrink object-contain "/>
                </div>
                <div className="p-4 shrink-0">
                    <InputField sendIcon placeholder="Type something..." className="text-sm" />
                </div>

            </div>
        </ModuleCard>
    );
};

export default AIChatBot;
