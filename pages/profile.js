import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import AppLayout from '@/components/Layouts/AppLayoutcomponents';
import Button from '@/components/UI/Button/Buttoncomponents';
import Tooltip from '@/components/UI/Tooltip/Tooltipcomponents';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { BsDiscord } from "react-icons/bs";


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
const xrpAddress = "rULPgrpm8dvQYovTPLj8hvck6NhkhBFscc";

export default function Profile() {
    return (
        <AppLayout>
            <div className='flex flex-col w-full gap-16'>
                <div className='relative w-full h-40 md:h-72 rounded-2xl bg-[#21212A]'>
                    <div className='absolute left-4 md:left-8 -bottom-8'>
                        <div className='w-32 h-32 md:w-36 md:h-36 rounded-full bg-default-avatar border-2 border-[#1A1921]' />
                    </div>
                    <div className='absolute right-4 bottom-4 md:right-8 md:bottom-8'>
                        <div className='flex flex-row p-4 gap-8 bg-[#A6B0CF] bg-opacity-5 backdrop-blur-sm rounded-xl'>
                            <Link href="#"><TwitterIcon /></Link>
                            <Link href="#"><TelegramIcon /></Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col text-left gap-2">
                    <div className='flex flex-row gap-4 items-center'>
                        <span className="text-2xl font-semibold">Username123</span>
                        <Button className="text-xs">Edit Profile</Button>
                    </div>
        
                    <Tooltip copyContent={xrpAddress}>
                        <span className="text-lg font-semibold opacity-60 cursor-pointer">{truncateAddress(xrpAddress)}</span> 
                    </Tooltip>
                </div>
            </div>
        </AppLayout>
    );
}
