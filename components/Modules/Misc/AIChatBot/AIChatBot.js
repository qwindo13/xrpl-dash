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
            moduleSettings.backgroundSetting === 'Transparent' ? 'bg-transparent backdrop-blur-lg border border-white border-opacity-5 !p-0 flex-col' : '';

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
            disableTitle="false"
            className={`${backgroundClass}`}
        >

            <div
                onMouseMove={handleMouseMove}
                className="group w-full h-full relative overflow-hidden flex flex-col rounded-xl justify-between"
            >
                {/* Gradient */}
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                        background: useMotionTemplate`
                          radial-gradient(
                            400px circle at ${mouseX}px ${mouseY}px,
                            rgba(151, 80, 159, 0.05),
                            transparent 80%
                          )
                        `,
                    }}
                />
                {/* Title */}
                {moduleSettings.displayTitle && (
                    <div className="w-full flex flex-row justify-between items-start p-4 relative">
                        <h3 className="font-semibold text-xl">Hound AI Bot</h3>
                    </div>
                )}

                <div className="flex flex-col h-full overflow-hidden justify-between">
                    
                    {/* Image */}
                    <motion.div layout className="flex w-full h-auto justify-center overflow-hidden z-[2] hidden">
                        <motion.img layout src="/images/3dhound.png" className="w-auto h-full shrink object-cover min-h-0 min-w-0 rounded-full" />
                    </motion.div>

                    {/* Chat Container */}
                    <motion.div layout className="flex flex-col gap-4 w-full h-auto justify-center overflow-y-auto z-[2] p-4 shrink">
                        <ChatBox
                            chatBot
                            timestamp={new Date().toISOString()}
                            userName="You"
                            type="sent"
                            messages={[
                                "What's the current marketcap of XRP? ",
                            ]}
                        />

                        <ChatBox
                            chatBot
                            timestamp={new Date().toISOString()}
                            avatarUrl={"/images/3dhound.png"}
                            userName="Hound Bot"
                            type="received"
                            messages={[
                                "As of the latest data, the market capitalization of XRP is approximately $10 billion USD.",
                            ]}
                        />
                    </motion.div>

                    <div className="p-4 shrink-0 z-[2]">
                        <InputField sendIcon placeholder="Type something..." className="text-sm bg-[#A6B0CF] bg-opacity-5 backdrop-blur-xl rounded-xl" />
                    </div>
                </div>



            </div>
        </ModuleCard>
    );
};

export default AIChatBot;
