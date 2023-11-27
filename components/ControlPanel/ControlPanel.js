import React, { useEffect, useState } from "react";
import Link from "next/link";
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
import { config } from "@/configcomponents";
import { useCookies } from "react-cookie";

{/* MENU ITEM FOR LAYOUT MENU */ }
const LayoutItem = ({ href, label, icon, custom, refreshCustomLayouts }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(label);
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [loading, setLoading] = useState(false);
    const api_url = config.api_url;

    const handleEditClick = (event) => {
        event.preventDefault();
        setIsEditing(!isEditing);
    };
    const handleCheckClick = (e) => {
        setIsEditing(false);
        // Here, you can also add any logic to save or confirm the changes made in the input
        updateCustomLayoutName(e);
    };

    const deleteCustomLayout = (e) => {
        e.preventDefault();
        setLoading(true);
        if (cookies.token) {
            fetch(`${api_url}/deleteCustomLayout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: cookies.token,
                    layout_name: label.toLowerCase(),
                }),
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    if (res.success) {
                        if (window.location.pathname === `/custom/${label.toLowerCase()}`) {
                            alert("Layout deleted successfully");
                            window.location.replace("/");
                        } else {
                            alert("Layout deleted successfully");
                            refreshCustomLayouts();
                        }
                    } else {
                        console.log(res);
                        alert("Something went wrong, please try again! err-1");
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    alert("Something went wrong, please try again! err-1");
                    setLoading(false);
                })
        }
    }

    const updateCustomLayoutName = (e) => {
        e.preventDefault();
        setLoading(true);
        //check if new name is valid, it should not be empty and should not contain any special characters
        const regex = /^[a-zA-Z0-9]+$/;
        if (inputValue === "" || !regex.test(inputValue)) {
            alert("Invalid layout name");
            setIsEditing(true);
            return;
        }
        if (cookies.token) {
            fetch(`${api_url}/updateCustomLayoutName`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: cookies.token,
                    layout_name: label.toLowerCase(),
                    new_layout_name: inputValue.toLowerCase(),
                }),
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    if (res.success) {
                        console.log("success");
                        alert("Layout name updated successfully");
                        refreshCustomLayouts();
                        setIsEditing(false);
                        setLoading(false);
                    } else {
                        console.log(res);
                        alert("Something went wrong, please try again! Make sure you are not using a layout name that already exists. err-2");
                        setIsEditing(true);
                        setLoading(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    alert("Something went wrong, please try again! Make sure you are not using a layout name that already exists. err-2");
                    setIsEditing(true);
                    setLoading(false);
                });
        }
    }

    return (
            <div
                className="px-4 py-2 rounded-xl hover:bg-[#A6B0CF]  hover:bg-opacity-5 w-full flex justify-between !leading-none items-center transition-all duration-200"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => window.location.replace(href)}
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
                            <CheckRoundedIcon onClick={(e) => handleCheckClick(e)} sx={{ fontSize: 18 }} />
                        </div>
                    ) : (
                        <span className="text-lg ">{inputValue}</span>
                    )}
                </div>

                {custom && !isEditing &&
                    <div className="flex gap-2">
                        <Button onClick={(e) => handleEditClick(e)} className={`!p-0 !bg-transparent transition-all duration-200 ${isHovered ? "opacity-100" : "opacity-0"}`}>
                            <EditIcon sx={{ fontSize: 18 }} />
                        </Button>
                        <Button className={`!p-0 !bg-transparent transition-all duration-200 ${isHovered ? "opacity-100" : "opacity-0"}`} onClick={(e) => deleteCustomLayout(e)} disableAnimation>
                            <ClearRoundedIcon sx={{ fontSize: 18 }} />
                        </Button>
                    </div>
                }
            </div>
    );
};

export default function ControlPanel({ onSelectTitle,customLayout,refreshCustomLayouts }) {

    const ModuleItem = ({ title, desc }) => (
        <div className="flex flex-col p-3 rounded-xl bg-transparent border border-white border-opacity-5 font-semibold gap-2 w-full cursor-pointer" onClick={() => onSelectTitle(title)}>
            <span className="text-base">{title}</span>
            <span className="text-xs opacity-60">{desc}</span>
        </div>
    );

    const [showModal, setShowModal] = useState(false);
    const [showNameModal, setShowNameModal] = useState(false);
    const [name, setName] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const api_url = config.api_url;

    const closeModal = () => setShowModal(false);
    const openModal = () => setShowModal(true);
    const closeNameModal = () => {
        setShowNameModal(false);
        setName("");
    }
    const openNameModal = () => setShowNameModal(true);

    const addNewLayout = (e) => {
        e.preventDefault();
        //check if new name is valid, it should not be empty and should not contain any special characters
        const regex = /^[a-zA-Z0-9]+$/;
        if (name === "" || !regex.test(name)) {
            alert("Invalid layout name");
            return;
        }

        //check all layout names, if name already exists, alert user
        if (customLayout) {
            for (let i = 0; i < customLayout.length; i++) {
                if (customLayout[i].name.toLowerCase() === name.toLowerCase()) {
                    alert("Layout name already exists");
                    return;
                }
            }
        }
        if (cookies.token) {
            fetch(`${api_url}/addCustomLayout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: cookies.token,
                    layout_name: name.toLowerCase(),
                    layout: [
                            {
                              "modules": []
                            },
                            {
                              "layout": []
                            }
                    ]
                }),
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    if (res.success) {
                        console.log("success");
                        alert("Layout created successfully");
                        refreshCustomLayouts();
                        closeNameModal();
                    } else {
                        console.log(res);
                        alert("Something went wrong, please try again! Make sure you are not using a layout name that already exists. err-2");
                        closeNameModal();
                    }
                })
                .catch((err) => {
                    console.log(err);
                    alert("Something went wrong, please try again! Make sure you are not using a layout name that already exists. err-2");
                    closeNameModal();
                });
        }
    }



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
                            {/* <LayoutItem
                                custom
                                icon={<DashboardRoundedIcon sx={{ fontSize: 20 }} />}
                                href="/custom"
                                label="Custom"
                            /> */}
                            {
                                customLayout ?
                                    customLayout.map((item, index) => (
                                        <LayoutItem
                                            key={index}
                                            custom
                                            icon={<DashboardRoundedIcon sx={{ fontSize: 20 }} />}
                                            href={`/custom/${item.name}`}
                                            label={item.name}
                                            refreshCustomLayouts={refreshCustomLayouts}
                                        />
                                    ))
                                    :
                                    <div className="flex flex-col gap-2">
                                        <span className="text-sm font-semibold text-white opacity-60 ">You don&apos;t have any layouts yet.</span>
                                        <span className="text-sm font-semibold text-white opacity-60 ">Create a new one by clicking on the button below.</span>
                                    </div>
                            }

                        </div>
                        <div className="border-top border-white pt-4">
                            {/* <Button className='w-full !text-base bg-white !text-[#1A1921] '> <AddRoundedIcon sx={{ fontSize: 20 }} className="mr-2" />New layout</Button> */}
                            {
                                customLayout ? customLayout.length < 3 ?
                                    <Button className='w-full !text-base bg-white !text-[#1A1921] ' onClick={openNameModal}> <AddRoundedIcon sx={{ fontSize: 20 }} className="mr-2" />New layout</Button>
                                    :
                                    <Button className='w-full !text-base bg-gray-400 !text-[#1A1921] ' disabled> <AddRoundedIcon sx={{ fontSize: 20 }} className="mr-2" />New layout</Button>
                                    :
                                    <Button className='w-full !text-base bg-gray-400 !text-[#1A1921] ' disabled> <AddRoundedIcon sx={{ fontSize: 20 }} className="mr-2" />New layout</Button>
                            }
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

            <Modal
                title="New Layout"
                description="Create a new layout by giving it a name."
                showModal={showNameModal}
                closeModal={closeNameModal}
                className='md:h-[480px] !overflow-scroll'
            >
                {/* an input and a submit button */}
                <div className="flex flex-col gap-4">
                    <span className="text-sm font-semibold text-white opacity-60 ">Enter a name for your new layout</span>
                    <div className="flex flex-col gap-2 mt-4">
                        <input
                            autoFocus
                            type="text"
                            maxLength={15}
                            className="text-lg bg-transparent w-full"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Button className='w-full !text-base bg-white !text-[#1A1921] ' onClick={addNewLayout}> <AddRoundedIcon sx={{ fontSize: 20 }} className="mr-2" />Create</Button>
                    </div>
                </div>
            </Modal>

        </>
    );
};