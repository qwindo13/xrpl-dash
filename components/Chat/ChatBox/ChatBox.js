import React from 'react';
import Image from 'next/image';

const Message = ({ type, content }) => {
    const baseStyles = "py-2 px-4 rounded-2xl bg-[#21212A] w-auto max-w-2xl";
    const receivedStyles = "rounded-tl-none";
    const sentStyles = "bg-[#85A8D8] ml-auto text-white rounded-tr-none";

    const styles = type === "received" ? `${baseStyles} ${receivedStyles}` : `${baseStyles} ${sentStyles}`;

    return (
        <div className={styles}>
            {content}
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

const ChatBox = ({ avatarUrl, timestamp, userName, type, messages }) => {
    return (
        <div className={`flex w-auto gap-4 p-4 ${type === 'sent' ? 'flex-row-reverse' : ''}`}>
            {/* Avatar */}
            {avatarUrl ? (
                <Image
                    src={avatarUrl}
                    alt={userName}
                    className=" rounded-full aspect-square"
                    width={40}
                    height={40}
                />
            ) : (
                <div className="rounded-full bg-default-avatar h-10 w-10 aspect-square" />
            )}

            {/* Messages and Timestamp */}
            <div className="w-auto flex flex-col gap-2">
                <div className={`flex gap-4 items-center ${type === 'sent' ? 'justify-end' : 'justify-start'}`}>
                    <span className="font-semibold">{userName}</span>
                    <span className="text-sm text-gray-400">{formatTimestamp(timestamp)}</span>
                </div>
                {messages.map((message, index) => (
                    <Message key={index} type={type} content={message} />
                ))}
            </div>
        </div>
    );
};

export default ChatBox;