import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SideMenu from "./SideMenu";
import Button from "../UI/Button/Button";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { config } from "@/configcomponents";
import { useCookies } from "react-cookie";

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

function NotificationBadge({ show, count }) {
    return (
        <div className="">
            {show && (
                <>
                    <motion.div 
                        className="absolute top-0 right-0 rounded-full border-4 h-2 w-2 double border-negative"
                        initial={{ scale: 1, opacity: 0.8 }}
                        animate={{ scale: 1.4, opacity: 0 }}
                        transition={{
                            repeat: Infinity,
                            duration: 1
                        }}
                    />
                    <span className="absolute top-0 right-0 bg-negative text-white text-xs rounded-full h-2 w-2 flex items-center justify-center ">
                        {count > 9 ? '9+' : count}
                    </span>
                </>
            )}
        </div>
    );
}
export default function Header({ fixed }) {
    const [xrpAddress, setXrpAddress] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [userData, setUserData] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const api_url = config.api_url;

    useEffect(() => {
        const address = localStorage.getItem('address')
        if (address !== null && address !== undefined && address !== '' && cookies.token !== undefined && cookies.token !== null && cookies.token !== '') {
            setXrpAddress(address)
        }
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
            console.log(cachedJson);
            const compare = cachedJson.address.localeCompare(address);
            if (compare !== 0) {
                sessionStorage.removeItem('userData');
                cached = null;
            }
        }
        if (xrpAddress !== '' && cached === null && xrpAddress !== null) {
            fetch(`${api_url}/checkUserExists`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies.token}`
                },
                body: JSON.stringify({
                    address: xrpAddress
                })
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.exists) {
                        setUserData(data.data);
                        sessionStorage.setItem('userData', JSON.stringify(data.data));
                    } else {
                        //redirect to login
                        removeCookie("token");
                        localStorage.removeItem("address");
                        window.location.href = "/auth/login";

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
                            <Link href="#" className="h-6 w-6 self-center relative">
                                <ChatOutlinedIcon />
                                <NotificationBadge show />
                            </Link>

                            <Link href="/settings/profile" className="h-6 w-6 self-center relative">
                                <SettingsOutlinedIcon />
                            </Link>
                            <Link href="#" className="h-6 w-6 self-center relative"> 
                            <NotificationsNoneRoundedIcon /> 
                            <NotificationBadge show />
                            </Link>
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

