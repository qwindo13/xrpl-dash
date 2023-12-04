import { useState } from "react";
import { motion } from "framer-motion";
import AppLayout from "@/components/Layouts/AppLayoutcomponents";
import SearchBar from "@/components/UI/SearchBar/SearchBarcomponents";
import Button from "@/components/UI/Button/Buttoncomponents";
import InputField from "@/components/UI/InputField/InputFieldcomponents";
import MessagePreview from "@/components/Chat/MessagePreview/MessagePreviewcomponents";
import AvatarInfoCard from "@/components/Chat/AvatarInfoCard/AvatarInfoCardcomponents";
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

    return (
        <AppLayout

        >
            <div className="h-[80vh] w-full flex gap-8 overflow-hidden">

                {/* Messages List */}
                <div className="w-1/4 h-full  flex flex-col gap-8 overflow-y-scroll">
                    <h1 className="text-2xl">Messages</h1>
                    <SearchBar placeholder='Search messages' />
                    <div className="flex flex-col gap-4">
                        {messagesData.map((message, index) => (
                            <MessagePreview
                                key={index}
                                userName={message.userName}
                                messagePreview={message.messagePreview}
                                messageTimestamp={message.messageTimestamp}
                                unreadCount={message.unreadCount}
                            />
                        ))}
                    </div>
                </div>

                {/* Open Chat */}
                <div className="grow h-auto overflow-y-auto flex flex-col border-l border-white border-opacity-5 pl-8">
                    <div className="flex w-full justify-between sticky top-0 ">
                        <h1 className="text-2xl">Chat</h1>
                        <Button className='bg-transparent p-0' onClick={() => setShowDetailsColumn(!showDetailsColumn)}>
                            <MoreHorizRoundedIcon />
                        </Button>
                    </div>
                    <div className="flex flex-col overflow-y-auto grow">
                        <ChatBox
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
                    <InputField placeholder="Type something..."/>
                </div>

                {/* Chat Details - Conditionally rendered */}
                {showDetailsColumn && (
                    <div className="w-1/4 h-auto overflow-y-auto bg-[#21212A] p-4">
                        <h1 className="text-2xl">Details</h1>
                    </div>
                )}

            </div>
        </AppLayout>
    );
}

{/* Chat function should be reserved to premium users
    Idea - only allow premium users to see received messages
*/}