import { useState, useEffect } from "react";
import { Cookies } from 'react-cookie';
import Image from "next/image";
import Link from "next/link";
import SideMenu from "./SideMenu";
import Button from "../UI/Button/Button";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';

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

export default function Header({fixed}) {
    const [xrpAddress, setXrpAddress] = useState('')
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        const cookies = new Cookies();
        const xrpAddressCookie = cookies.get('xrpAddress')
        setXrpAddress(xrpAddressCookie)
    }, [])

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
          <nav className={`w-full z-10 relative px-4 md:px-8 py-2 md:py-4 mx-auto justify-center ${fixed ? 'sticky top-0 bg-[#1A1921] bg-opacity-80 backdrop-blur-lg' : ''}`}>
                <div className="flex flex-row justify-between items-center">
                    <div className="">
                        <Link href={"/"}>
                            <Image src="/images/logo.svg" alt="" width={200} height={70} className="hidden md:block py-2 pr-4 mr-4" />
                            <Image src="/images/logo-icon.svg" alt="" width={65} height={70} className=" md:hidden py-2 pr-4 mr-4" />
                        </Link>
                    </div>
                    <div className="relative flex flex-row items-center justify-between gap-8 lg:gap-16 overflow-visible">
                        <div className="flex flex-row gap-8 items-center ">
                            <Link href="#" className="h-6 w-6 self-center"> <LightbulbOutlinedIcon /> </Link>
                            <Link href="/settings/profile" className="h-6 w-6 self-center"> <SettingsOutlinedIcon /> </Link>
                            <Link href="#" className="h-6 w-6 self-center"> <NotificationsNoneRoundedIcon /> </Link>
                        </div>
                        <div className="flex flex-row gap-8">
                            {xrpAddress ?
                                <div className="flex flex-row gap-2 items-center">
                                    <Button onClick={openModal} className="!px-0 text-2xl bg-transparent font-semibold" disableAnimation>
                                        <div className="rounded-full h-10 w-10 mr-4 bg-default-avatar" title={xrpAddress}></div>
                                        <span className="hidden md:flex text-base font-semibold">{truncateAddress(xrpAddress)}</span>
                                    </Button>
                                </div>

                                :
                                <Link href="/auth/login">
                                    <Button className="bg-white !text-[#1A1921]">
                                        Connect Wallet
                                    </Button>
                                </Link>}
                        </div>



                    </div>
                </div>

            </nav>
            <SideMenu
                openModal={openModal}
                xrpAddress={xrpAddress}
                truncateAddress={truncateAddress}
                showModal={showModal}
                closeModal={closeModal}
                className="!absolute md:top-8 md:right-8 md:max-w-md !p-4" />
        </>


    );
};

