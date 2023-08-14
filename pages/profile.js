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
// const xrpAddress = "rULPgrpm8dvQYovTPLj8hvck6NhkhBFscc";

export default function Profile() {
    const [xrpAddress, setXrpAddress] = useState('');
    const [userData, setUserData] = useState({});
    const router = useRouter();
    const { address } = router.query;
    
    useEffect(() => {
        if (address) {
            setXrpAddress(address);
        }
    }, [address]);
    const api_url = config.api_url;

    useEffect(() => {
        if (localStorage.getItem('address')) {
            setXrpAddress(localStorage.getItem('address'));
            //send post req to api/checkUserExists with address
            fetch(`${api_url}/checkUserExists`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    address: localStorage.getItem('address'),
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.exists) {
                        setUserData(data.data);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            // setLoggedin(false);
            router.push('/auth/login');
        }
    }, []);

    return (
        <AppLayout>
            <div className='flex flex-col w-full gap-16'>
                <div className='relative w-full h-40 md:h-72 rounded-2xl bg-[#21212A]'>
                    <div className='absolute left-4 md:left-8 -bottom-8'>
                        <div className='w-32 h-32 md:w-36 md:h-36 rounded-full bg-default-avatar border-2 border-[#1A1921]' />
                    </div>
                    <div className='absolute right-4 bottom-4 md:right-8 md:bottom-8'>
                        <div className='flex flex-row px-4 py-2 gap-8 bg-[#A6B0CF] bg-opacity-5 backdrop-blur-sm rounded-xl'>
                            <Link href={`https://twitter.com/${userData.twitter}`} target='_blank'><TwitterIcon sx={{ fontSize: 18 }} /></Link>
                            <Link href={`tg://user?id=${userData.telegram}`} target='_blank'><TelegramIcon sx={{ fontSize: 18 }} /></Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col text-left gap-2">
                    <div className='flex flex-row gap-4 items-center'>
                        <span className="text-2xl font-semibold">{ userData.username || `Username`}</span>
                        <Link href="/settings/profile"><Button className="text-xs">Edit Profile</Button></Link>
                    </div>
        
                    <Tooltip copyContent={xrpAddress}>
                        <span className="text-lg font-semibold opacity-60 cursor-pointer">{truncateAddress(xrpAddress)}</span> 
                    </Tooltip>
                </div>
                {userData.bio}
            </div>
        </AppLayout>
    );
}
