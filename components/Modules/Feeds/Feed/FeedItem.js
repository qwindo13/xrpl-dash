import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNowStrict } from 'date-fns';

// Helper function to create the content based on type and subtype
const getContent = (type, subtype, user, content) => {
    switch (type) {
        case 'socials':
            return (
                <div>
                    {user.handle} <span className="opacity-60">tweeted</span>
                    <div>{content.text}</div>
                </div>
            );
        case 'wallets':
            if (subtype === 'transaction') {
                return (
                    <div>
                        {user.address} <span className="opacity-60">just moved </span> {content.otherInfo.amount} to {content.otherInfo.addressTo}
                    </div>
                );
            } else if (subtype === 'balance_update') {
                return (
                    <div>
                        Balance Update for Address: {user.address}, Previous: {content.balance.previous}, Current: {content.balance.current}, Change: {content.balance.change}
                    </div>
                );
            }
        case 'projects':
            return (
                <div>
                    Project Address: {user.address}, Info Type: {content.infoType},
                    {content.otherInfo && content.otherInfo.NFT && content.otherInfo.NFT.name && `NFT Name: ${content.otherInfo.NFT.name}`}
                    {content.otherInfo && content.otherInfo.NFT && content.otherInfo.NFT.price && `, Price: ${content.otherInfo.NFT.price}`}
                </div>
            );
        default:
            return null;
    }
};

const FeedItem = ({ type, subtype, href = '', user, content, time }) => {
    const formattedTime = formatDistanceToNowStrict(new Date(time), { addSuffix: true });
    const itemContent = getContent(type, subtype, user, content);
    return (
        <Link href={href}>
            <div className="w-full h-auto rounded-xl p-4 flex flex-row gap-4 bg-[#A6B0CF] bg-opacity-5">
                {user.image &&
                    <div className="rounded-full h-10 w-10 bg-[#A6B0CF] bg-opacity-30 overflow-hidden">
                        <Image src={user.image} className="h-full w-full aspect-square" alt={user.imageAlt} width={40} height={40} />
                    </div>
                }
                <div className="w-fit flex-grow">
                    <div className="font-semibold text-base mb-2">{itemContent}</div>
                    <div className="text-xs opacity-60">{formattedTime}</div>
                </div>
                {content.otherInfo && content.otherInfo.rightImg &&
                    <div className="rounded-lg h-10 w-10 bg-[#A6B0CF] bg-opacity-30">
                        <Image src={content.otherInfo.rightImg} className="h-full w-full " alt={content.otherInfo.rightImgAlt} width={40} height={40} />
                    </div>
                }

            </div>
        </Link>
    );
};

export default FeedItem;
