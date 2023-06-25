import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import SearchBar from "../UI/SearchBar/SearchBar";
import Button from "../UI/Button/Button";
import Dropdown from "../UI/Dropdown/Dropdown";
import Tabs from "../UI/Tabs/Tabs";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

export default function ControlPanel() {
    const rotateAnimation = useAnimation();

    const handleToggle = (isOpen) => {
        rotateAnimation.start({ rotate: isOpen ? 45 : 0 });
    };

    const DropdownItem = ({ text }) => (
        <div className="flex px-4 py-3 rounded-xl bg-[#21212A] text-sm font-semibold">
            {text}
        </div>
    );


    return (
        
        <div className="w-full flex flex-col md:flex-row gap-4 md:items-center md:h-12">
            <div className="relative pr-4">
                <div className="text-xs absolute -top-2 font-semibold opacity-60">Choose Dash:</div>
                <Dropdown className="w-auto" isBlurred  trigger={
                    <Button className="!px-0 !text-2xl bg-transparent" disableAnimation endIcon={<KeyboardArrowDownRoundedIcon />}>Explore</Button>
                }>
                    <Link href="/"><span className="text-2xl">Explore</span></Link>
                    <Link href="/trading"> <span className="text-2xl">Trading</span></Link>
                    <Link href="/custom"><span className="text-2xl">Custom</span></Link>
                </Dropdown>
            </div>
            <div className="flex flex-row w-full h-12 gap-4 items-center">

                <SearchBar className="h-full" placeholder={"Search for modules, tokens, etc..."} />
                <Dropdown isBlurred  className="aspect-square !bg-[#111015] !bg-opacity-60 !backdrop-blur-xl h-max !w-72 !gap-4" position="right" onToggle={handleToggle} trigger={
                    <Button className="h-full aspect-square p-0 items-center flex flex-col !rounded-2xl">
                        <motion.div className="flex" animate={rotateAnimation}>
                            <AddRoundedIcon />
                        </motion.div>
                    </Button>
                }>
                    <div className="flex flex-col gap-2 w-full">
                        <span className="text-xs font-semibold text-white opacity-60 ">Fungible Tokens (XRP or issued tokens)</span>
                        <DropdownItem text="Price Info" />
                        <DropdownItem text="Richlist" />
                    </div>
                    <div className="flex flex-col gap-2 w-full ">
                        <span className="text-xs font-semibold text-white opacity-60 ">Trades Modules</span>
                        <DropdownItem text="Quick Swap" />
                    </div>
                </Dropdown>
            </div>
        </div>
    );
};