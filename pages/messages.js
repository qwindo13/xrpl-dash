import { useEffect, useState } from "react";
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
import { config } from "@/configcomponents";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useCookies } from "react-cookie";


export default function Chat() {
    const { sendMessage, lastMessage, readyState } = useWebSocket(config.ws_url, {
        onOpen: () => console.log("WS opened"),
        shouldReconnect: (closeEvent) => true,
        onClose: () => console.log("WS closed"),
      });
    const [cookies] = useCookies(["token"]);
    const [uData, setUData] = useState(null);
    const [conversations, setConversations] = useState(null);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState(null);
    const [inputMessage, setInputMessage] = useState("");


    useEffect(() => {
        if (lastMessage !== null) {
            // console.log("Received message", lastMessage);
            const message = JSON.parse(lastMessage.data);
            if (message.type === "authenticate") {
                if (message.success) {
                    console.log("Authenticated successfully");
                    setUData(message);
                } else {
                    console.log("Authentication failed");
                }
            
            } else if (message.type === "getConversations") {
                if ("error" in message) {
                    console.log("Error", message.error);
                } else if ("users" in message) {
                    const msgs = message.users.map((user) => {
                        return {
                            userName: user.username,
                            messagePreview: user.last_message.content,
                            messageTimestamp: new Date(user.last_message.created).toISOString(),
                            avatar: user.pfp,
                            conversation_id: user.last_message.conversation_id,
                        }
                    });
                    setConversations(msgs)
                    if (msgs.length > 0) {
                        setSelectedMessage(msgs[0]);
                    }
                    setLoading(false);
                }
            } else if (message.type === "createDm") {
                console.log("Created DM", message.data);
            } else if (message.type === "getMessages") {
                //append messages to the conversation
                console.log("Received messages", message);
                if ("error" in message) {
                    console.log("Error", message.error);
                } else if ("messages" in message) {
                    const convos = {};
                    message.messages.forEach((msg) => {
                        if (msg.conversation_id in convos) {
                            convos[msg.conversation_id].push(msg);
                        } else {
                            convos[msg.conversation_id] = [msg];
                        }
                    });

                    for (const convo in convos) {
                        convos[convo].reverse();
                    }
                    setMessages(convos);
                    console.log("Messages", convos);
                }
            } else if (message.type === "sendMessage") {
                if (message.success) {
                    // Create a copy of the messages state
                    const convos = {...messages};
                    if (message.data.conversation_id in convos) {
                        convos[message.data.conversation_id].push(message.data);
                    } else {
                        convos[message.data.conversation_id] = [message.data];
                    }
                    setMessages(convos);
                    //update the conversation preview
                    const convoIndex = conversations.findIndex((convo) => convo.conversation_id === message.data.conversation_id);
                    const convo = {...conversations[convoIndex]};
                    convo.messagePreview = message.data.content;
                    convo.messageTimestamp = new Date(message.data.created).toISOString();
                    // Create a copy of the conversations state
                    const newConversations = [...conversations];
                    newConversations[convoIndex] = convo;
                    setConversations(newConversations);
                }
            } else if (message.type === "subscribeChatUser") {
                console.log("Subscribed to chat user", message);
                if ("error" in message) {
                    console.log("Error", message.error);
                } else if ("success" in message && "data" in message) {
                    const convos = { ...messages };
                    if (message.data.conversation_id in convos) {
                        convos[message.data.conversation_id].push(message.data);
                    } else {
                        convos[message.data.conversation_id] = [message.data];
                    }
                    setMessages(convos);
                    //update the conversation preview
                    const convoIndex = conversations.findIndex((convo) => convo.conversation_id === message.data.conversation_id);
                    const convo = { ...conversations[convoIndex] };
                    convo.messagePreview = message.data.content;
                    convo.messageTimestamp = new Date(message.data.created).toISOString();
                    // Create a copy of the conversations state
                    const newConversations = [...conversations];
                    newConversations[convoIndex] = convo;
                    setConversations(newConversations);
                }
            }
        }
    }, [lastMessage]);

    useEffect(() => {
        if (readyState === ReadyState.OPEN && cookies.token) {
            if (cookies.token !== undefined && cookies.token !== null && cookies.token !== "" && cookies.token !== "null" && cookies.token !== "undefined") {
                console.log(`Authenticating: ${cookies.token}`)
                sendMessage(JSON.stringify({ type: "authenticate", token: cookies.token }));
            }
        }
    }, [readyState, cookies, sendMessage]);

    useEffect(() => {
        if (uData !== null) {
            //send message to getConversation
            sendMessage(JSON.stringify({ type: "getConversations", token: cookies.token }));
            sendMessage(JSON.stringify({ type: "subscribeChatUser", token: cookies.token }));
            // sendMessage(JSON.stringify({ type: "createDm", token: cookies.token, recipient: "rJAFQ2d6mUTgHHtLogPx5BB5NRT97ASFDy" }));
        }
    }, [uData]);

    useEffect(() => {
        if (conversations !== null) {
            //get chats of all the conversations
            const convoIds = conversations.map((convo) => convo.conversation_id);
            const uniqueConvoIds = [...new Set(convoIds)];
            console.log("Unique convo ids", uniqueConvoIds);
            sendMessage(JSON.stringify({ type: "getMessages", token: cookies.token, conversation_ids: uniqueConvoIds }));
            // uniqueConvoIds.forEach((convoId) => {
            //     sendMessage(JSON.stringify({ type: "getMessages", token: cookies.token, conversation_id: convoId }));
            // });
        }
    }, [conversations]);

    useEffect(() => {
        console.log(messages);
    }, [messages]);
    
    // State to control the display of the third column
    const [showDetailsColumn, setShowDetailsColumn] = useState(false);

    const handleSendMessage = (message) => {
        console.log("Sending message", message);
        sendMessage(JSON.stringify({ type: "sendMessage", token: cookies.token, conversation_id: selectedMessage.conversation_id, content: message }));
        setInputMessage("");
    }


    const FullMessage = ({ userName, message, onClose, conversation_id, avatarUrl = undefined }) => {
        return (
            <motion.div layout className="@container grow w-auto h-auto overflow-y-auto flex flex-col p-4 gap-8 bg-[#21212A] rounded-2xl">
                <motion.div layout className="flex w-full justify-between sticky top-0 ">
                    <motion.div className="w-full flex items-center gap-4">
                        {/* <motion.div className="rounded-full bg-default-avatar h-10 w-10 aspect-square" /> */}
                        {avatarUrl !== "" || avatarUrl !== undefined ? (
                            <AvatarInfoCard
                                avatarUrl={avatarUrl}
                                userName={userName}
                                className="rounded-full aspect-square"
                            />
                        ) : (
                            <motion.div layoutId={`avatar-${userName}`} className="rounded-full bg-default-avatar aspect-square" />
                        )}
                        <motion.h1 className="text-xl">{userName}</motion.h1>
                    </motion.div>
                    <Button className='bg-transparent p-0' onClick={() => setShowDetailsColumn(!showDetailsColumn)}>
                        <MoreHorizRoundedIcon />
                    </Button>
                </motion.div>
                <div className="flex flex-col overflow-y-auto grow">
                    {
                        messages && messages[conversation_id].map((msg, index) => {
                            return (
                                <ChatBox
                                    key={index}
                                    compactMode
                                    timestamp={msg.created}
                                    userName={msg.sender}
                                    type={msg.sender_id === uData.uid ? "sent" : "received"}
                                    messages={[
                                        msg.content,
                                    ]}
                                />
                            );
                        })
                    }
                </div>
                <div className=" w-full flex flex-col-reverse @md:flex-row gap-4 items-center">
                    {/* <InputField placeholder="Type something..." className="bg-[#A6B0CF] bg-opacity-5 text-sm" sendIcon value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onClick={() => handleSendMessage(inputMessage)} /> */}
                    <InputField
                        placeholder="Type something..."
                        className="bg-[#A6B0CF] bg-opacity-5 text-sm"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onClick={() => handleSendMessage(inputMessage)}
                        sendIcon
                    />

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
                        {conversations && conversations.map((message, index) => (
                            <MessagePreview
                                key={index}
                                userName={message.userName}
                                messagePreview={message.messagePreview}
                                messageTimestamp={message.messageTimestamp}
                                unreadCount={message.unreadCount}
                                onClick={() => handlePreviewClick(message)}
                                isSelected={selectedMessage && selectedMessage.userName === message.userName}
                                avatarUrl={message.avatar}
                            />
                        ))}
                    </motion.div>
                </div>

                {/* Full Message */}
                {selectedMessage && messages && (
                    <FullMessage
                        userName={selectedMessage.userName}
                        message={selectedMessage.messagePreview}
                        onClose={handleClose}
                        avatarUrl={selectedMessage.avatar}
                        conversation_id={selectedMessage.conversation_id}
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