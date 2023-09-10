import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';

const Nft = ({ displayName, displayPrice, className, imageSize, selected, onClick, videoFlag, src }) => {
    const [isImageLoaded, setImageLoaded] = useState(false);

    return (
        <motion.div
            className={`border ${className} ${selected ? 'border-opacity-100' : 'border-white border-opacity-5'} transition-colors duration-200 p-2 w-fit h-fit rounded-2xl flex flex-col gap-4 cursor-pointer`} onClick={onClick}
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
                                    className={`rounded-xl ${imageSize}`} 
                                    src={src}
                                    alt="NFT"
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                    }}
                                    width={500}
                                    height={500}
                                    onLoad={() => setImageLoaded(true)}
                                    cover
                                />
                            </>
                        )
                }
            </motion.div>

            {displayName &&
                <motion.div layout className="flex flex-col px-2">
                    <span className="text-xs font-semibold opacity-60">Houndies</span>
                    <span className="text-base font-semibold">Houndie #1313</span>
                </motion.div>
            }

            {displayPrice &&
                <motion.div layout className="p-3 bg-[#A6B0CF] bg-opacity-5 rounded-xl flex flex-row justify-between">
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-semibold opacity-60">Price</span>
                        <span className="text-sm font-semibold">333 XRP</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-semibold opacity-60">Bids</span>
                        <span className="text-sm font-semibold">No bids yet</span>
                    </div>
                </motion.div>
            }

        </motion.div>
    );

};

export default Nft;
