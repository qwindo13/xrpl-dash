import Image from "next/image";
import Link from "next/link";

const Nft = ({ displayName, displayPrice, imageSize, selected, onClick, videoFlag, src = '/images/nft.webp'}) => {
    return (
        <div 
            className={`border ${selected ? 'border-blue-500 border-opacity-100' : 'border-white border-opacity-5'} p-2 w-fit h-fit rounded-2xl flex flex-col gap-4 cursor-pointer`} onClick={onClick}
        >
            <div className={`w-40 h-40 ${imageSize}`}>
                {/* <img className='w-full h-full rounded-xl' src={src} alt="NFT" /> */}
                {
                    videoFlag ? (
                        <video className='w-full h-full rounded-xl' autoPlay loop muted playsInline src={src} />
                    ) : (
                        <img className='w-full h-full rounded-xl' src={src} alt="NFT" />
                    )
                }
            </div>

            {displayName &&
                <div className="flex flex-col px-2">
                    <span className="text-xs font-semibold opacity-60">Houndies</span>
                    <span className="text-base font-semibold">Houndie #1313</span>
                </div>
            }

            {displayPrice &&
                <div className="p-3 bg-[#A6B0CF] bg-opacity-5 rounded-xl flex flex-row justify-between">
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-semibold opacity-60">Price</span>
                        <span className="text-sm font-semibold">333 XRP</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-semibold opacity-60">Bids</span>
                        <span className="text-sm font-semibold">No bids yet</span>
                    </div>
                </div>
            }

        </div>
    );

};

export default Nft;
