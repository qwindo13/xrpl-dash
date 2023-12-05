import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

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

const MessagePreview = ({ avatarUrl, userName, messagePreview, messageTimestamp, unreadCount = '0', onClick }) => {
    return (
        <div
            onClick={onClick}
            className='flex w-full hover:bg-[#21212A] transition-all duration-200 rounded-xl cursor-pointer overflow-hidden gap-4 items-center p-4 leading-none'>
            {avatarUrl ? (
                <Image
                    src={avatarUrl}
                    alt={name}
                    className=" rounded-full aspect-square"
                    width={40}
                    height={40}
                />
            ) : (
                <motion.div layoutId={`avatar-${userName}`}  className="rounded-full bg-default-avatar h-10 w-10 aspect-square" />
            )}
            <div className='w-full flex flex-col justify-between grow items-center overflow-hidden gap-1 '>
                <div className='w-full flex justify-between items-center gap-4'>
                    <motion.span layoutId={`userName-${userName}`} className="text-sm font-semibold">{userName}</motion.span>
                    <span className='opacity-40 text-xs'>{formatTimestamp(messageTimestamp)}</span>
                </div>
                <div className='w-full flex justify-between items-center gap-4'>
                    <motion.p layoutId={`message-${userName}`} className={`text-sm ${unreadCount > 0 ? '!opacity-100' : '!opacity-40'} truncate`}>{messagePreview}</motion.p>
                    {unreadCount > 0 && (
                        <div class="flex items-center justify-center h-4 w-4 rounded-full bg-negative aspect-square"><span class="font-semibold text-xs">{unreadCount}</span></div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessagePreview;
