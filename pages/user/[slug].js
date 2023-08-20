import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AppLayout from '@/components/Layouts/AppLayoutcomponents';
import Button from '@/components/UI/Button/Buttoncomponents';
import Tooltip from '@/components/UI/Tooltip/Tooltipcomponents';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { BsDiscord } from "react-icons/bs";
import { config } from '@/configcomponents';


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

export default function Profile() {
    const [isLoading, setLoading] = useState(true);
    const [userData, setUserData] = useState({});
    const [isOwner, setIsOwner] = useState(false);
    const router = useRouter();
    const xrpAddress = router.query.slug;
    const api_url = config.api_url;

    useEffect(() => {
        if (!xrpAddress) return;
        else {
            setLoading(true); // Start loading

            fetch(`${api_url}/checkUserExists`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    address: xrpAddress,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.exists) {
                        setUserData(data.data);
                    }
                    setLoading(false); // Stop loading once data is fetched
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false); // Stop loading if there's an error
                });
        }
    }, [xrpAddress]);

    useEffect(() => {
        const addy = localStorage.getItem('address');
        if (addy === xrpAddress) {
            setIsOwner(true);
        }
    }, [xrpAddress]);

    return (
        <AppLayout className='overflow-hidden'>
            <div className='flex flex-col w-full gap-16'>
                {isLoading ? (
                    // Skeleton Loader for the Banner
                    <div className="relative w-full h-40 md:h-72 rounded-2xl bg-[#A6B0CF] bg-opacity-5 animate-pulse">
                        {/* Skeleton Loader for the Avatar inside Banner */}
                        <div className='absolute left-4 md:left-8 -bottom-8'>
                            <div className='w-32 h-32 md:w-36 md:h-36 rounded-full border-2 border-[#1A1921] bg-[#A6B0CF] bg-opacity-5 animate-pulse'></div>
                        </div>
                    </div>
                ) : (
                    <div className='relative w-full h-40 md:h-72 rounded-2xl bg-[#21212A]' style={userData.banner_nft_url ? { backgroundImage: `url(${userData.banner_nft_url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
                        <div className='absolute left-4 md:left-8 -bottom-8'>
                            <div className='w-32 h-32 md:w-36 md:h-36 rounded-full bg-default-avatar border-2 border-[#1A1921]' style={userData.pfp_nft_url ? { backgroundImage: `url(${userData.pfp_nft_url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}} />
                        </div>
                        <div className='absolute right-4 bottom-4 md:right-8 md:bottom-8'>

                            {(userData.twitter || userData.telegram) && (
                                <div className='flex flex-row px-4 py-2 gap-8 bg-[#A6B0CF] bg-opacity-5 backdrop-blur-sm rounded-xl'>
                                    {userData.twitter && <Link href={`https://twitter.com/${userData.twitter}`} target='_blank'><TwitterIcon sx={{ fontSize: 18 }} /></Link>}
                                    {userData.telegram && <Link href={`tg://user?id=${userData.telegram}`} target='_blank'><TelegramIcon sx={{ fontSize: 18 }} /></Link>}
                                </div>
                            )}

                        </div>
                    </div>
                )}
                <div className="flex flex-col text-left gap-2">
                    {isOwner ? (
                        isLoading ? (
                            <div className='flex flex-row gap-4 items-center animate-pulse'>
                                <div className="bg-[#A6B0CF] bg-opacity-5 rounded w-32 h-6 "></div>
                            </div>
                        ) : (
                            <div className='flex flex-row gap-4 items-center'>
                                <span className="text-2xl font-semibold">{userData.username || truncateAddress(xrpAddress)}</span>
                                <Link href="/settings/profile"><Button className="text-xs">Edit Profile</Button></Link>
                            </div>
                        )
                    ) : (
                        isLoading ? (
                            <div className='flex flex-row gap-4 items-center animate-pulse'>
                                <div className="bg-[#A6B0CF] bg-opacity-5 rounded w-32 h-6 "></div>
                                <div className="bg-[#A6B0CF] bg-opacity-5 rounded w-24 h-6"></div>
                            </div>
                        ) : (
                            <div className='flex flex-row gap-4 items-center'>
                                <span className="text-2xl font-semibold">{userData.username || truncateAddress(xrpAddress)}</span>
                            </div>
                        )
                    )}
                    {isLoading ? (
                        <div className="bg-[#A6B0CF] bg-opacity-5 rounded w-40 h-5 animate-pulse"></div>
                    ) : (
                        <Tooltip copyContent={xrpAddress} className="w-fit">
                            <span className="text-lg font-semibold opacity-60 cursor-pointer">{xrpAddress}</span>
                        </Tooltip>
                    )}
                </div>
                {isLoading ? (
                    <div className='animate-pulse flex flex-col w-auto gap-2'>
                        <span className="bg-[#A6B0CF] bg-opacity-5 rounded w-[440px] h-5" />
                        <span className="bg-[#A6B0CF] bg-opacity-5 rounded w-96 h-5" />
                    </div>
                ) : (
                    <span>{userData.bio}</span>
                )}

            </div>
        </AppLayout>
    );
}
