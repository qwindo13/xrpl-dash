import React, { useState } from "react";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import SearchBar from "../UI/SearchBar/SearchBar";
import Button from "../UI/Button/Button";
import Dropdown from "../UI/Dropdown/Dropdown";
import Modal from "../UI/Modal/Modal";
import EditIcon from '@mui/icons-material/Edit';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import PriceChart from '@/components/Modules/Trades/Chart/Chartcomponents';

{/* MENU ITEM FOR LAYOUT MENU */ }
const LayoutItem = ({ href, label, icon, custom }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(label);
    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };
    const handleCheckClick = () => {
        setIsEditing(false);
        // Here, you can also add any logic to save or confirm the changes made in the input
    };
    return (
        <Link href={href} className="w-full">
            <div
                className="px-4 py-2 rounded-xl hover:bg-[#A6B0CF]  hover:bg-opacity-5 w-full flex justify-between !leading-none items-center transition-all duration-200"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="flex items-center gap-2 leading-normal">
                    {icon}
                    {isEditing ? (
                        <div className="flex items-center gap-2 w-full">
                            <input
                                autoFocus
                                type="text"
                                value={inputValue}
                                maxLength={15}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="text-lg bg-transparent w-full"
                            />
                            <CheckRoundedIcon onClick={handleCheckClick} sx={{ fontSize: 18 }} />
                        </div>
                    ) : (
                        <span className="text-lg ">{inputValue}</span>
                    )}
                </div>

                {custom && !isEditing &&
                    <div className="flex gap-2">
                        <Button onClick={handleEditClick} className={`!p-0 !bg-transparent transition-all duration-200 ${isHovered ? "opacity-100" : "opacity-0"}`}>
                            <EditIcon sx={{ fontSize: 18 }} />
                        </Button>
                        <Button className={`!p-0 !bg-transparent transition-all duration-200 ${isHovered ? "opacity-100" : "opacity-0"}`}>
                            <ClearRoundedIcon sx={{ fontSize: 18 }} />
                        </Button>
                    </div>
                }
            </div>
        </Link>
    );
};

export default function ControlPanel({ onSelectTitle }) {

    const ModuleItem = ({ title, desc }) => (
        <div className="flex flex-col p-3 rounded-xl bg-transparent border border-white border-opacity-5 font-semibold gap-2 w-full cursor-pointer" onClick={() => onSelectTitle(title)}>
            <span className="text-base">{title}</span>
            <span className="text-xs opacity-60">{desc}</span>
        </div>
    );

    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false);
    const openModal = () => setShowModal(true);

    return (

        <>
            <div className="w-full flex flex-col md:flex-row gap-4 md:items-center md:h-12 pt-[2px]">

                {/* LAYOUT MENU DROPDOWN */}
                <div className="relative">
                    <div className="text-xs absolute -top-2 font-semibold opacity-60 hidden ">Select Layout</div>
                    <Dropdown className="w-60 !gap-0 !overflow-hidden !max-h-96 !overflow-y-scroll" isBlurred trigger={<Button className="!px-0 !text-2xl bg-transparent" disableAnimation endIcon={<KeyboardArrowDownRoundedIcon />}>Discover</Button>}>
                        <div className="">
                            <h5 className=" opacity-60 text-xs mb-4">XRPLDash Layouts</h5>
                            <LayoutItem
                                icon={<LanguageRoundedIcon sx={{ fontSize: 20 }} />}
                                href="/"
                                label="Discover" // Other names could be Hub, Main, Feed or Home
                            />
                            <LayoutItem
                                icon={<AutoGraphRoundedIcon sx={{ fontSize: 20 }} />}
                                href="/trading"
                                label="Trading"
                            />
                        </div>
                        <div className="border-t border-white border-opacity-5 mt-4 pt-4">
                            <h5 className="opacity-60 text-xs mb-4">Your Layouts</h5>
                            <LayoutItem
                                custom
                                icon={<DashboardRoundedIcon sx={{ fontSize: 20 }} />}
                                href="/custom"
                                label="Custom"
                            />

                        </div>
                        <div className="border-top border-white pt-4">
                            <Button className='w-full !text-base bg-white !text-[#1A1921] '> <AddRoundedIcon sx={{ fontSize: 20 }} className="mr-2" />New layout</Button>
                        </div>
                    </Dropdown>
                </div>

                <div className="flex flex-row w-full h-12 gap-4 items-center">

                    <SearchBar className="h-full" placeholder={"Search for modules, tokens, etc..."} />
                    <Button onClick={openModal} className='aspect-square flex justify-center !rounded-2xl'>
                        <AddRoundedIcon />
                    </Button>
                </div>
            </div>

            <Modal
                title="Add a Module"
                description="Customize your XRPLDash by adding modules that provide specific functionalities and data."
                showModal={showModal}
                closeModal={closeModal}
                className='md:h-[480px] !overflow-scroll'
            >
                { /* STEP 1*/}
                <div >
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2 mt-4">
                            <span className="text-sm font-semibold text-white opacity-60 ">Fungible Tokens (XRP or issued tokens)</span>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                <ModuleItem title="Price Info" desc="Get real-time prices of XRPL issued tokens" />
                                <ModuleItem title="Profit and Loss" desc="Monitor and analyze profit and loss data for XRPL issued tokens" />
                                <ModuleItem title="Richlist" desc="Discover the richlist of a specific XRPL Token, showing top token holders" />
                                <ModuleItem title="Wallet" desc="Track your crypto portfolio with a donut chart and table view" />
                            </div>

                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            <span className="text-sm font-semibold text-white opacity-60 ">Non Fungible Tokens (NFTs)</span>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                <ModuleItem title="Single NFT" desc="Showcase individual, unique Non-Fungible Tokens (NFTs) owned by you" />
                                <ModuleItem title="Multiple NFTs" desc="Showcase multiple Non-Fungible Tokens (NFTs) owned by you" />
                                <ModuleItem title="Badges" desc="Exhibit the badges you've earned on the platform" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            <span className="text-sm font-semibold text-white opacity-60 ">Trades Modules</span>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                <ModuleItem title="Quick Swap" desc="Exhibit the badges you've earned on the platform" />
                                <ModuleItem title="Price Chart" desc="Track the Price of a specific XRPL issued token" />
                                <ModuleItem title="Marketcap Chart" desc="Track the Marketcap of a specific XRPL issued token" />
                                <ModuleItem title="Volume Chart" desc="Track the Volume of a specific XRPL issued token" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            <span className="text-sm font-semibold text-white opacity-60 ">Miscellaneous Modules</span>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                <ModuleItem title="Bitcoin Halving Countdown" desc="Track the time left until the next Bitcoin halving event." />
                                <ModuleItem title="Fear and Greed Index" desc="Monitor the current market sentiment based on investor emotions" />
                            </div>
                        </div>
                    </div>
                </div>

                { /* STEP 2*/}

                <div className="hidden">
                    <h2 className="text-xl font-semibold mb-2">Customize Module</h2>
                    <span className="text-base font-semibold opacity-60">Customize your XRPLDash by adding modules that provide specific functionalities and data.</span>

                    <div className="grid grid-rows-2 md:grid-cols-2 mt-8 gap-4">

                        <div>

                        </div>

                    </div>
                </div>

            </Modal>

        </>
    );
};