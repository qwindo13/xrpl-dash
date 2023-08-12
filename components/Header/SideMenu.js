import React, { useState } from 'react';
import Link from "next/link";
import Button from "../UI/Button/Button";
import Tooltip from "../UI/Tooltip/Tooltip"
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Modal from "../UI/Modal/Modal";
import { useBalance } from '@/hooks/useBalance';

function formatNumber(num) {
  return new Intl.NumberFormat('en-US').format(num);
}

function SideMenu({ openModal, xrpAddress, truncateAddress, showModal, closeModal, className }) {
    const [isLoading, setIsLoading] = useState(true);
    const {xrpbalance: balance} = useBalance()
 
    return (
        <Modal showModal={showModal} closeModal={closeModal} className={className}>
            <div className="flex flex-col md:flex-col justify-between gap-8">
                <div className="w-full flex flex-row justify-between items-center">
                    <Button onClick={openModal} className="!px-0 text-2xl bg-transparent font-semibold" disableAnimation>
                        <div className="rounded-full h-12 w-12 mr-4 bg-default-avatar" title={xrpAddress}></div>
                        <div className="flex flex-col text-left">
                            <span className="text-lg font-semibold">@username123</span>
                            <Tooltip copyContent={xrpAddress}>
                                <span className="text-base font-semibold opacity-60">{truncateAddress(xrpAddress)}</span>
                            </Tooltip>
                        </div>
                        
                    </Button>
                    <Button
                        onClick={() => {
                            localStorage.removeItem('address')
                            window.location.href = '/auth/login'
                        }}
                        className="hidden md:flex opacity-60">
                        <LogoutRoundedIcon />
                    </Button>
                </div>
                <div className="flex flex-col">
                    <span className="text-base font-semibold opacity-60">Wallet Balance</span>
                    {isLoading ? (
                        <span className='text-3xl font-semibold'>{formatNumber((Math.round(balance * 100) / 100) - 10)} XRP</span>
                    ) : (
                        <span className="h-8 animate-pulse bg-[#A6B0CF] bg-opacity-5 rounded-lg w-6/12" />

                    )}
                </div>
                <div className="flex flex-col gap-4">
                    <Link href="/profile"><span className="text-2xl font-semibold">My profile</span></Link>
                    <Link href="/settings/profile"><span className="text-2xl font-semibold">Settings</span></Link>
                </div>
            </div>

        </Modal>
    );
}

export default SideMenu;
