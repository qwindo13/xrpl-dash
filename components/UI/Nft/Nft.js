import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';

function truncateAddress(address, maxLength = 12) {
    if (!address) {
        return '';
    }

    if (address.length <= maxLength) {
        return address;
    }

    const halfLength = maxLength / 2;
    const start = address.slice(0, halfLength);
    const end = address.slice(-halfLength);
    return `${start}...${end}`;
}


const Nft = ({ displayName, displayPrice, className, imageSize, selected, onClick, videoFlag, src, name, price = 0 }) => {
    const [isImageLoaded, setImageLoaded] = useState(false);
    if (typeof window !== 'undefined') {
        const xrpAddress = localStorage.getItem("address")
    }

    return (
        <motion.div layout
            className={`border ${className} ${selected ? 'border-opacity-100' : 'border-white border-opacity-5'} transition-colors duration-300 p-2 w-fit h-fit rounded-2xl flex flex-col gap-4 cursor-pointer`} onClick={onClick}
        >
            <motion.div layout className={`w-fit h-fit relative grow ${imageSize}`}>
                {
                    videoFlag ? (
                        <video className='w-full h-full rounded-xl ' autoPlay loop muted playsInline src={src} />
                    ) :
                        (
                            <>
                                {!isImageLoaded && <div className="w-full h-full rounded-xl bg-[#A6B0CF] bg-opacity-5 animate-pulse"></div>}
                                <Image
                                    className={`rounded-xl object-cover ${imageSize}`} 
                                    src={src}
                                    alt="NFT"
                                    style={{
                                        width: '100px',
                                        height: '200px',
                                    }}
                                    width={500}
                                    height={500}
                                    onLoad={() => setImageLoaded(true)}
                                    cover
                                    //allow for all domains
                                    unoptimized
                                />
                            </>
                        )
                }
            </motion.div>

            {displayName &&
                <motion.div layout className="flex flex-col px-2">
                    {/* <span className="text-xs font-semibold opacity-60">Houndies</span> */}
                    <span className="text-base font-semibold">{name || 'nft'}</span>
                </motion.div>
            }

            {displayPrice &&
                <motion.div layout className="p-3 bg-[#A6B0CF] bg-opacity-5 rounded-xl flex flex-row justify-between">
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-semibold opacity-60">Owned by</span>
                        <span className="text-sm font-semibold">{truncateAddress(xrpAddress)}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-semibold opacity-60">Price</span>
                        <span className="text-sm font-semibold">{price} XRP</span>
                    </div>
                </motion.div>
            }

        </motion.div>
    );

};

export default Nft;
