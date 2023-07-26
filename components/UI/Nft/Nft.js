import Image from "next/image";
import Link from "next/link";

const Nft = () => {
    return (
        <div className="border border-white border-opacity-5 p-2 w-fit h-fit overflow-hidden rounded-2xl flex flex-col gap-4">
            <div className="w-60 h-60">
            <Image className='w-full h-full rounded-xl' src='/images/nft.webp' height={300} width={300} alt="NFT" />
            </div>
            <div className="flex flex-col px-2">
                <span className="text-xs font-semibold opacity-60">Houndies</span>
                <span className="text-lg font-semibold">Houndie #1313</span>
            </div>
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
        </div>
);

};

export default Nft;
