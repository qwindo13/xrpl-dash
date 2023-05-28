import React, { useState, useEffect, useRef } from 'react';
import AppLayout from '@/components/Layouts/AppLayoutcomponents';
import Button from '@/components/UI/Button/Buttoncomponents';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Trading() {

    return (
        <AppLayout>
            <div className='flex flex-col w-full gap-16'>
                <div className='relative w-full h-40 md:h-72 rounded-2xl bg-[#21212A]'>
                    <div className='absolute left-4 md:left-8 -bottom-8'>
                        <div className='w-32 h-32 md:w-36 md:h-36 rounded-full bg-default-avatar border-4 border-[#1A1921]' />
                    </div>
                    <div className='absolute right-4 bottom-4 md:right-8 md:bottom-8'>
                        <div className='flex flex-row p-4 gap-8 bg-[#A6B0CF] bg-opacity-5 backdrop-blur-sm rounded-xl'>
                            <TwitterIcon />
                            <TelegramIcon />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col text-left gap-4">
                    <div className='flex flex-row gap-4 items-center'>
                        <span className="text-2xl font-semibold">Username123</span>
                        <Button className="text-xs">Edit Profile</Button>
                    </div>

                    <span className="text-lg font-semibold opacity-60">rULPgrpm8dvQYovTPLj8hvck6NhkhBFscc</span>
                </div>
            </div>
        </AppLayout>
    );
}
