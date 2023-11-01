import React from 'react';
import Image from 'next/image';

const AvatarInfoCard = ({ avatarUrl, avatarWidth = "40", avatarHeight = "40", name, additionalInfo }) => {
    return (
        <div className="p-4 max-w-sm flex gap-4 items-center w-full overflow-hidden">
            {avatarUrl ? (
                <Image
                    src={avatarUrl}
                    alt={name}
                    className="mx-auto rounded-full aspect-square"
                    width={avatarWidth}
                    height={avatarHeight}
                />
            ) : (
                <div
                    className="mx-auto rounded-full bg-default-avatar aspect-square"
                    style={{
                        width: `${avatarWidth}px`,
                        height: `${avatarHeight}px`
                    }}
                ></div>
            )}
            <div className='flex flex-col w-full'>
                <h2 className="text-lg font-semibold">{name}</h2>
                <p className="text-sm opacity-40 truncate">{additionalInfo}</p>
            </div>

        </div>
    );
};

export default AvatarInfoCard;
