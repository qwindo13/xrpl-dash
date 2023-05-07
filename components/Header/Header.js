import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "../UI/Button/Button";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { useState,useEffect } from "react";
import { Cookies } from 'react-cookie';

export default function Header() {
    const [xrpAddress, setXrpAddress] = useState('')

    useEffect(() => {
        const cookies = new Cookies();
        const xrpAddressCookie = cookies.get('xrpAddress')
        setXrpAddress(xrpAddressCookie)
    }, [])

    return (
        <nav className="w-full">
            <div className="flex flex-row justify-between items-center">
                <div className="">
                    <Link href={"/"}>
                        <Image src="/images/logo.svg" alt="" width={200} height={50} className="hidden md:block py-2 pr-4 mr-4" />
                        <Image src="/images/logo-icon.svg" alt="" width={50} height={50} className=" md:hidden py-2 pr-4 mr-4"/>
                    </Link>
                </div>
                <div className="flex flex-row items-center justify-between gap-8 lg:gap-16 ">
                    <div className="flex flex-row gap-8 items-center">
                        <Link href="#" className="h-6 w-6"> <LightbulbOutlinedIcon /> </Link>
                        <Link href="#" className="h-6 w-6"> <SettingsOutlinedIcon /> </Link>
                        <Link href="#" className="h-6 w-6"> <NotificationsNoneRoundedIcon /> </Link>
                    </div>
                    <div className="flex flex-row gap-8">
                        {
                            xrpAddress ?

                                //show xrp address in a box
                                <div className="flex flex-row gap-2 items-center">
                                    <div className="bg-white rounded-md p-2">
                                        <p className="text-[#1A1921] text-sm">
                                            {xrpAddress}
                                        </p>
                                    </div>

                                    <Button className="bg-white !text-[#1A1921]" 
                                    onClick={() => {
                                        const cookies = new Cookies()
                                        cookies.remove('xrpAddress')
                                        window.location.href = '/auth/login'
                                    }}>
                                        Logout
                                    </Button>
                                </div>
                                :
                                <Link href="/auth/login">
                                    <Button className="bg-white !text-[#1A1921]">
                                        Login
                                    </Button>
                                </Link>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

