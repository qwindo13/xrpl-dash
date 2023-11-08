import React from 'react';
import Image from 'next/image';

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

const MessagePreview = ({ avatarUrl, userName, messagePreview, messageTimestamp, unreadCount = '0' }) => {
    return (
        <div className='flex w-full hover:bg-[#21212A] transition-all duration-200 rounded-2xl cursor-pointer overflow-hidden gap-4 items-center p-4 leading-none'>
            {avatarUrl ? (
                <Image
                    src={avatarUrl}
                    alt={name}
                    className=" rounded-full aspect-square"
                    width={40}
                    height={40}
                />
            ) : (
                <div className="rounded-full bg-default-avatar h-12 w-12 aspect-square" />
            )}
            <div className='w-full flex flex-col justify-between grow items-center overflow-hidden gap-1 '>
                <div className='w-full flex justify-between items-center gap-4'>
                    <span className="text-base font-semibold">{userName}</span>
                    <span className='opacity-40 text-sm'>{formatTimestamp(messageTimestamp)}</span>
                </div>
                <div className='w-full flex justify-between items-center gap-4'>
                    <p className="text-sm opacity-40 truncate">{messagePreview}</p>
                    {unreadCount > 0 && (
                        <div class="flex items-center justify-center h-6 w-6 rounded-full bg-negative aspect-square"><span class="font-semibold text-xs">{unreadCount}</span></div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessagePreview;
