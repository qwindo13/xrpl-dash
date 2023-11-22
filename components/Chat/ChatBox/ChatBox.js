import React from 'react';
import Image from 'next/image';
import Avatar from '@/components/UI/Avatar/Avatarcomponents';
import Button from '@/components/UI/Button/Buttoncomponents';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';

const Message = ({ type, content, avatarUrl, userName, timestamp, chatBot }) => {
    const baseStyles = "p-4 rounded-xl bg-[#21212A] w-auto max-w-2xl";
    const receivedStyles = "rounded-tl-none bg-[#A6B0CF] bg-opacity-5 backdrop-blur-xl";
    const sentStyles = "bg-[#85A8D8] ml-auto text-white rounded-tr-none";

    const styles = type === "received" ? `${baseStyles} ${receivedStyles}` : `${baseStyles} ${sentStyles}`;

    return (
        <div className={styles}>
            {chatBot && (
                <div className='flex w-full justify-between items-center mb-2'>
                    <div className="flex items-center gap-2 ">
                        {avatarUrl ? (
                            <Image
                                src={avatarUrl}
                                alt={userName}
                                className="rounded-full aspect-square"
                                width={32}
                                height={32}
                            />
                        ) : (
                            <Avatar className="h-40 w-40" />
                        )}
                        <div>
                            <div className="font-semibold">{userName}</div>
                        </div>
                    </div>
                    {type === "received" && (
                        <Button className="!p-0 bg-transparent">
                            <RefreshRoundedIcon sx={{ fontSize: 18 }}/>
                        </Button>
                    )}
                </div>
            )}
            <div className={`text-sm font-normal`}>{content}</div>
        </div>
    );
};


const formatTimestamp = (timestamp) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    const diffInSeconds = (now - messageDate) / 1000;

    if (diffInSeconds < 60) {
        return 'Just now';
    } else if (diffInSeconds < 3600) { // less than an hour
        return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    } else if (diffInSeconds < 86400 && now.getDate() === messageDate.getDate()) { // less than a day
        return `Today at ${messageDate.getHours()}:${messageDate.getMinutes()}`;
    } else if (diffInSeconds < 86400 * 2 && now.getDate() - 1 === messageDate.getDate()) { // yesterday
        return `Yesterday at ${messageDate.getHours()}:${messageDate.getMinutes()}`;
    } else {
        return `${messageDate.getDate()}/${messageDate.getMonth() + 1}/${messageDate.getFullYear()}`;
    }
}

const ChatBox = ({ avatarUrl, timestamp, userName, type, messages, chatBot }) => {
    const formattedTimestamp = formatTimestamp(timestamp);

    return (
        <div className={`flex w-auto ${type === 'sent' ? 'flex-row-reverse' : ''}`}>
            {!chatBot && (
                <>
                    {/* Avatar */}
                    {avatarUrl ? (
                        <Image
                            src={avatarUrl}
                            alt={userName}
                            className="rounded-full aspect-square"
                            width={40}
                            height={40}
                        />
                    ) : (
                        <div className="rounded-full bg-default-avatar h-10 w-10 aspect-square" />
                    )}
                </>
            )}

            {/* Messages and Timestamp */}
            <div className="w-auto flex flex-col gap-2">
                {!chatBot && (
                    <div className={`flex gap-4 items-center ${type === 'sent' ? 'justify-end' : 'justify-start'}`}>
                        <span className="font-semibold">{userName}</span>
                        <span className="text-sm text-gray-400">{formattedTimestamp}</span>
                    </div>
                )}
                {messages.map((message, index) => (
                    <Message
                        key={index}
                        type={type}
                        content={message}
                        avatarUrl={chatBot ? avatarUrl : null}
                        userName={chatBot ? userName : null}
                        timestamp={chatBot ? formattedTimestamp : null}
                        chatBot={chatBot}
                    />
                ))}
            </div>
        </div>
    );
};


export default ChatBox;