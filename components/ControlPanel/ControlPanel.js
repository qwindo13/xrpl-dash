import React, { useState } from "react";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import SearchBar from "../UI/SearchBar/SearchBar";
import Button from "../UI/Button/Button";
import Dropdown from "../UI/Dropdown/Dropdown";
import Modal from "../UI/Modal/Modal";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

export default function ControlPanel( { onSelectTitle } ) {
    const rotateAnimation = useAnimation();

    const handleToggle = (isOpen) => {
        rotateAnimation.start({ rotate: isOpen ? 45 : 0 });
    };

    const ModuleItem = ({ title, desc }) => (
        <div className="flex flex-col p-4 rounded-xl bg-transparent border border-white border-opacity-5 font-semibold gap-2 w-full cursor-pointer" onClick={() => onSelectTitle(title)}>
            <span className="text-base">{title}</span>
            <span className="text-xs opacity-60">{desc}</span>
        </div>
    );

    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false);
    const openModal = () => setShowModal(true);



    return (

        <>
            <div className="w-full flex flex-col md:flex-row gap-4 md:items-center md:h-12">
                <div className="relative pr-4">
                    <div className="text-xs absolute -top-2 font-semibold opacity-60">Choose Dash:</div>
                    <Dropdown className="w-auto" isBlurred trigger={<Button className="!px-0 !text-2xl bg-transparent" disableAnimation endIcon={<KeyboardArrowDownRoundedIcon />}>Explore</Button>}>
                        <Link href="/"><span className="text-2xl">Explore</span></Link>
                        <Link href="/trading"> <span className="text-2xl">Trading</span></Link>
                        <Link href="/custom"><span className="text-2xl">Custom</span></Link>
                    </Dropdown>
                </div>
                <div className="flex flex-row w-full h-12 gap-4 items-center">

                    <SearchBar className="h-full" placeholder={"Search for modules, tokens, etc..."} />
                    {/* 
                    <Dropdown className="aspect-square !bg-[#111015] !bg-opacity-60 !backdrop-blur-xl h-max !w-72 !gap-4" position="right" onToggle={handleToggle} trigger={<Button className="h-full aspect-square p-0 items-center flex flex-col !rounded-2xl">
                        <motion.div className="flex" animate={rotateAnimation}>
                            <AddRoundedIcon />
                        </motion.div>
                    </Button>}>
                        <div className="flex flex-col gap-2 w-full">
                            <span className="text-xs font-semibold text-white opacity-60 ">Fungible Tokens (XRP or issued tokens)</span>
                            <ModuleItem text="Price Info" />
                            <ModuleItem text="Richlist" />
                        </div>
                        <div className="flex flex-col gap-2 w-full ">
                            <span className="text-xs font-semibold text-white opacity-60 ">Trades Modules</span>
                            <ModuleItem text="Quick Swap" />
                        </div>
                    </Dropdown>
                    */}
                    <Button onClick={openModal} className='aspect-square flex justify-center !rounded-2xl'>
                        <AddRoundedIcon />
                    </Button>
                </div>
            </div>

            <Modal showModal={showModal} closeModal={closeModal} className='md:h-[480px]'>
                { /* STEP 1*/}
                <div >
                    <h2 className="text-xl font-semibold mb-2">Add a module</h2>
                    <span className="text-base font-semibold opacity-60">Customize your XRPLDash by adding modules that provide specific functionalities and data.</span>

                    <div className="flex flex-col mt-8 gap-4">
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