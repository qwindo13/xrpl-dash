import Image from "next/image";
import Link from "next/link";
import Button from "../UI/Button/Button";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';

export default function Header() {
    return (
        <nav className="w-full">
            <div className="flex flex-row justify-between">
                <div className="">
                    <Link href={"/"}>
                        <Image src="/images/logo.svg" alt="" width={200} height={50} className="py-2 pr-4 mr-4" />
                    </Link>
                </div>
                <div className="flex flex-row items-center justify-between gap-16">
                    <div className="flex flex-row gap-8">
                        <Link href="#" className="h-6 w-6"> <LightbulbOutlinedIcon /> </Link>
                        <Link href="#" className="h-6 w-6"> <SettingsOutlinedIcon /> </Link>
                        <Link href="#" className="h-6 w-6"> <NotificationsNoneRoundedIcon /> </Link>
                    </div>
                    <div className="flex flex-row gap-8">
                        <Link href="#"> <Button>Connect Wallet</Button></Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

