import Image from "next/image";
import Link from "next/link";
import Button from "../UI/Button/Button";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';

export default function Header() {
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
                        <Link href="/login"> <Button>Connect Wallet</Button></Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

