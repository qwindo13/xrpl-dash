import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import SideMenu from "./SideMenu";
import Button from "../UI/Button/Button";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { config } from "@/configcomponents";

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

export default function Header({ fixed }) {
    const [xrpAddress, setXrpAddress] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [userData, setUserData] = useState('');
    const api_url = config.api_url;

    useEffect(() => {
        const address = localStorage.getItem('address')
        setXrpAddress(address)
    }, [])

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        let cached = sessionStorage.getItem('userData');
        if (cached !== null) {
            const address = localStorage.getItem('address');
            const cachedJson = JSON.parse(cached);
            const compare = cachedJson.address.localeCompare(address);
            if (compare !== 0) {
                sessionStorage.removeItem('userData');
                cached = null;
            } 
        }
        if (xrpAddress !== '' && cached === null) {
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
                        sessionStorage.setItem('userData', JSON.stringify(data.data));
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else if (cached !== null) {
            setUserData(JSON.parse(cached));
        }
    }, [xrpAddress]);

    return (
        <>
            <nav className={`w-full z-10 relative px-4 md:px-8 py-2 md:py-4 mx-auto justify-center ${fixed ? 'sticky top-0 bg-[#1A1921] bg-opacity-80 backdrop-blur-lg' : ''}`}>
                <div className="flex flex-row justify-between items-center">
                    <div className="">
                        <Link href={"/"}>
                            <Image src="/images/logo.svg" alt="XRPLDash Logo" width={200} height={70} className="hidden md:block py-2 pr-4 mr-4 " />
                            <Image src="/images/logo-icon.svg" alt="XRPLDash Icon" width={40} height={43} className=" md:hidden" />
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
                                        <div className="rounded-full h-10 w-10 md:mr-4 bg-default-avatar" title={xrpAddress} style={userData.pfp_nft_url ? { backgroundImage: `url(${userData.pfp_nft_url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}></div>
                                        <span className="hidden md:flex text-base font-semibold">{userData.username}</span>
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
                className="!absolute md:top-8 md:bottom-8 md:right-8 md:max-w-md !p-4"
                userData={userData}
            />
        </>


    );
};

