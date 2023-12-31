import { useState } from "react";
import { motion } from "framer-motion";
import AppLayout from "@/components/Layouts/AppLayoutcomponents";
import SearchBar from "@/components/UI/SearchBar/SearchBarcomponents";
import Button from "@/components/UI/Button/Buttoncomponents";
import InputField from "@/components/UI/InputField/InputFieldcomponents";
import MessagePreview from "@/components/Chat/MessagePreview/MessagePreviewcomponents";
import AvatarInfoCard from "@/components/Chat/AvatarInfoCard/AvatarInfoCardcomponents";
import Tooltip from "@/components/UI/Tooltip/Tooltipcomponents";
import Switch from "@/components/UI/Switch/Switchcomponents";
import ChatBox from "@/components/Chat/ChatBox/ChatBoxcomponents";
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';

export default function Chat() {

    // State to control the display of the third column
    const [showDetailsColumn, setShowDetailsColumn] = useState(false);

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
            <motion.div layout className="@container grow w-auto h-auto overflow-y-auto flex flex-col p-4 gap-8 bg-[#21212A] rounded-2xl">
                <motion.div layout className="flex w-full justify-between sticky top-0 ">
                    <motion.div className="w-full flex items-center gap-4">
                        <motion.div className="rounded-full bg-default-avatar h-10 w-10 aspect-square" />
                        <motion.h1 className="text-xl">{userName}</motion.h1>
                    </motion.div>
                    <Button className='bg-transparent p-0' onClick={() => setShowDetailsColumn(!showDetailsColumn)}>
                        <MoreHorizRoundedIcon />
                    </Button>
                </motion.div>
                <div className="flex flex-col overflow-y-auto grow">
                    <ChatBox
                        compactMode
                        timestamp={new Date().toISOString()}
                        userName="John Doe"
                        type="received"
                        messages={[
                            'Hello! How can I help you with XRPL?',
                            'Can you clarify your question?',
                            // ... More received messages
                        ]}
                    />

                    <ChatBox
                        compactMode
                        timestamp={new Date().toISOString()}
                        userName="You"
                        type="sent"
                        messages={[
                            'Hi! I have a question regarding transactions.',
                            'Sure, I was wondering about the fees.',
                            // ... More sent messages
                        ]}
                    />
                </div>
                <div className=" w-full flex flex-col-reverse @md:flex-row gap-4 items-center">
                    <InputField placeholder="Type something..." className="bg-[#A6B0CF] bg-opacity-5 text-sm rounded-xl" sendIcon />
                    <div className="flex flex-col w-full @md:w-auto">
                        <motion.div layout className="flex flex-row justify-between items-center gap-4">
                            <Tooltip tooltipContent="Enable it to send this message as a XRPL transaction." position="top-center" className="text-xs">
                                <span className="text-sm w-auto flex gap-2 whitespace-nowrap gradient-text">Send with XRPL</span>
                            </Tooltip>
                            <Switch size="sm" />
                        </motion.div>
                        <div>
                            <span className="text-xs w-auto flex gap-2 whitespace-nowrap opacity-40">Send as a XRPL transaction</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    };

    const [selectedMessage, setSelectedMessage] = useState(messagesData[0]);

    const handlePreviewClick = (message) => {
        setSelectedMessage(message);
    };
    const handleClose = () => {
        setSelectedMessage(null);
    };


    return (
        <AppLayout

        >
            <div className="h-[85vh] w-full flex gap-8 overflow-hidden">

                {/* Messages List */}
                <div className="w-1/4 h-full  flex flex-col gap-8 overflow-y-scroll pt-4">
                    <h1 className="text-2xl">Messages</h1>
                    {/* SEARCH BAR */}
                    <div className="mb-4">
                        <SearchBar placeholder='Search by address, username, or messages' />
                    </div>

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
                </div>

                {/* Full Message */}
                {selectedMessage && (
                    <FullMessage
                        userName={selectedMessage.userName}
                        message={selectedMessage.messagePreview}
                        onClose={handleClose}
                    />
                )}

                {/* Chat Details */}
                {showDetailsColumn && (
                    <motion.div layout className="w-1/4 h-auto overflow-y-auto bg-transparent p-4">
                        <h1 className="text-2xl">Details</h1>
                    </motion.div>
                )}

            </div>
        </AppLayout>
    );
}

{/* Chat function should be reserved to premium users
    Idea - only allow premium users to see received messages
*/}