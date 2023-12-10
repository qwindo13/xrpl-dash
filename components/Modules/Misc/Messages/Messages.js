import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ModuleCard from '@/components/UI/ModuleCard/ModuleCardcomponents';
import TitleSwitch from '@/components/UI/ModuleCard/Settings/TitleSwitchcomponents';
import BackgroundTabs from "@/components/UI/ModuleCard/Settings/BackgroundTabscomponents";
import SearchBarSwitch from "@/components/UI/ModuleCard/Settings/SearchBarSwitchcomponents";
import InputField from "@/components/UI/InputField/InputFieldcomponents";
import Button from "@/components/UI/Button/Buttoncomponents";
import MessagePreview from "@/components/Chat/MessagePreview/MessagePreviewcomponents";
import ChatBox from "@/components/Chat/ChatBox/ChatBoxcomponents";
import Tooltip from "@/components/UI/Tooltip/Tooltipcomponents";
import TxModal from "@/components/Modals/TxModal/TxModalcomponents";
import Dropdown from "@/components/UI/Dropdown/Dropdowncomponents";
import Switch from "@/components/UI/Switch/Switchcomponents";
import SearchBar from "@/components/UI/SearchBar/SearchBarcomponents";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';

const defaultSettings = {
    displayTitle: true,
    backgroundSetting: "Transparent",
    displaySearchBar: true,
};

// Dummy messages data
const messagesData = [
    {
        userName: "RippleTrader",
        messagePreview: "Just made a successful XRPL transaction. Here's the tx hash: a1b2c3d4...",
        messageTimestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(), // 2 minutes ago
        unreadCount: 4,
    },
    {
        userName: "CryptoNinja",
        messagePreview: "Hey, do you have any XRPL validators you recommend?",
        messageTimestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 minutes ago
        unreadCount: 1,
    },
    {
        userName: "XRPMaximalist",
        messagePreview: "The recent XRP Ledger upgrade is impressive. The throughput has increased!",
        messageTimestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
        unreadCount: 0,
    },
    {
        userName: "LedgerLover",
        messagePreview: "Thinking of starting my own XRPL node. Any tips?",
        messageTimestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        unreadCount: 3,
    },
    {
        userName: "DecentralDan",
        messagePreview: "Did you catch the latest proposal for the XRP Ledger? Looks promising.",
        messageTimestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
        unreadCount: 2,
    },
    {
        userName: "CryptoQueen",
        messagePreview: "I just received some airdropped tokens on the XRPL. Exciting times!",
        messageTimestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
        unreadCount: 5,
    },
    {
        userName: "ValidatorVic",
        messagePreview: "My XRPL validator just achieved a new milestone in terms of uptime. Proud moment!",
        messageTimestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 days ago
        unreadCount: 0,
    },
    {
        userName: "CoinCollector",
        messagePreview: "I'm exploring some new NFT projects on the XRPL. Know any good ones?",
        messageTimestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
        unreadCount: 7,
    }
];

const FullMessage = ({ userName, message, onClose }) => {
    return (
        <motion.div className="@container absolute top-0 left-0 w-full h-full p-4 bg-[#21212A] flex flex-col gap-4 justify-between">
            <motion.div className="w-full flex items-center gap-2">
                <Button onClick={onClose} className="!p-0 bg-transparent mr-2" disableAnimation><KeyboardBackspaceRoundedIcon /></Button>
                <motion.div layoutId={`avatar-${userName}`} className="rounded-full bg-default-avatar h-8 w-8 aspect-square" />
                <motion.h1 layoutId={`userName-${userName}`}>{userName}</motion.h1>
            </motion.div>

            <motion.div className="flex grow flex-col gap-4 overflow-auto">
                <ChatBox
                    compactMode
                    timestamp={new Date().toISOString()}
                    userName={userName}
                    type="received"
                    messages={[
                        'Hi there! I’m interested in buying NFTs on XRPL. Can you guide me on how to get started?'
                    ]}
                />
                <ChatBox
                    compactMode
                    timestamp={new Date().toISOString()}
                    userName={userName}
                    type="sent"
                    messages={[
                        'Hello! How can I help you with XRPL?',
                        'Can you clarify your question?',
                    ]}
                />
            </motion.div>
            <div className="w-full flex flex-col @md:flex-row gap-4 items-center">
                <InputField placeholder="Type something..." className="bg-[#A6B0CF] bg-opacity-5 text-sm" sendIcon />
                <div className="flex flex-col w-full @md:w-auto">
                    <div className="flex flex-row justify-between items-center gap-4">
                        <Tooltip tooltipContent="Enable it to send this message as a XRPL transaction." position="top-center" className="text-xs">
                            <span className="text-sm w-auto flex gap-2 whitespace-nowrap gradient-text">Send with XRPL</span>
                        </Tooltip>
                        <Switch size="sm" />
                    </div>
                    <div>
                        <span className="text-xs w-auto flex gap-2 whitespace-nowrap opacity-40">Send as a XRPL transaction</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Messages = () => {

    const [moduleSettings, setModuleSettings] = useState(defaultSettings);
    const updateSettings = (key, value) => {
        setModuleSettings((prevSettings) => ({
            ...prevSettings,
            [key]: value,
        }));
    };

    const backgroundClass = moduleSettings.backgroundSetting === 'Solid' ? '' :
        moduleSettings.backgroundSetting === 'Highlight' ? 'bg-[#525567] ' :
            moduleSettings.backgroundSetting === 'Transparent' ? 'bg-transparent backdrop-blur-lg border border-white border-opacity-5 ' : '';

    const [selectedMessage, setSelectedMessage] = useState(null);
    const handlePreviewClick = (message) => {
        setSelectedMessage(message);
    };
    const handleClose = () => {
        setSelectedMessage(null);
    };

    return (
        <ModuleCard
            title="Messages"
            settings={
                <>
                    <TitleSwitch
                        value={moduleSettings.displayTitle}
                        onChange={(value) => updateSettings("displayTitle", value)}
                    />
                    <SearchBarSwitch
                        value={moduleSettings.displaySearchBar}
                        onChange={(value) => updateSettings("displaySearchBar", value)}
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
            <div className="w-full h-auto flex flex-col">

                {/* SEARCH BAR */}
                {moduleSettings.displaySearchBar && (
                    <div className="mb-4">
                        <SearchBar placeholder='Search by address, username, or messages' />
                    </div>
                )}
                
                {/* PREVIEW MESSAGES */}
                <motion.div layout>
                    {messagesData.map((message, index) => (
                        <MessagePreview
                            key={index}
                            userName={message.userName}
                            messagePreview={message.messagePreview}
                            messageTimestamp={message.messageTimestamp}
                            unreadCount={message.unreadCount}
                            onClick={() => handlePreviewClick(message)}
                            isSelected={selectedMessage && selectedMessage.userName === message.userName}

                        />
                    ))}
                </motion.div>

                {/* FULL MESSAGE */}
                {selectedMessage && (
                    <FullMessage
                        userName={selectedMessage.userName}
                        message={selectedMessage.messagePreview}
                        onClose={handleClose}
                    />
                )}

            </div>
        </ModuleCard>
    );
};

export default Messages;
