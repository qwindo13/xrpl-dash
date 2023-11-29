import React, { useEffect, useState } from "react";
import Link from "next/link";
import SearchBar from "../UI/SearchBar/SearchBar";
import Button from "../UI/Button/Button";
import Dropdown from "../UI/Dropdown/Dropdown";
import Modal from "../UI/Modal/Modal";
import EditIcon from "@mui/icons-material/Edit";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AutoGraphRoundedIcon from "@mui/icons-material/AutoGraphRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { config } from "@/configcomponents";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

{
  /* MENU ITEM FOR LAYOUT MENU */
}
const LayoutItem = ({ href, label, icon, custom, refreshCustomLayouts, onClickDeleteLayout }) => {
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

  const updateCustomLayoutName = (e) => {
    e.preventDefault();
    setLoading(true);
    setIsEditing(false);
    //check if new name is valid, it should not be empty and should not contain any special characters, lowercase letters only and numbers
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
          layout_name: label,
          new_layout_name: inputValue,
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
            // if (window.location.pathname === `/custom/${label}`) {
            //   window.location.href = `/custom/${inputValue}`;
            // }
          } else {
            console.log(res);
            alert(
              "Something went wrong, please try again! Make sure you are not using a layout name that already exists. err-12"
            );
            
            setIsEditing(true);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          alert(
            "Something went wrong, please try again! Make sure you are not using a layout name that already exists. err-22\n" +
              err
          );
          setIsEditing(true);
          setLoading(false);
        });
    }
  };

  return (
    <>
      <div
        className="px-4 py-2 rounded-xl hover:bg-[#A6B0CF]  hover:bg-opacity-5 w-full flex justify-between !leading-none items-center transition-all duration-200"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center gap-2 leading-normal">
          <span onClick={() => window.location.pathname === `/custom/${label}` ? null : window.location.href = href}>{icon}</span>
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
              <CheckRoundedIcon
                onClick={(e) => updateCustomLayoutName(e)}
                sx={{ fontSize: 18 }}
              />
            </div>
          ) : (
        // onClick={() => window.location.pathname === `/custom/${label}` ? null : window.location.href = href}
            <span className="text-lg" onClick={() => window.location.pathname === `/custom/${label}` ? null : window.location.href = href}>{inputValue}</span>
          )}
        </div>

        {custom && !isEditing && (
          <div className="flex gap-2">
            <Button
              onClick={(e) => handleEditClick(e)}
              className={`!p-0 !bg-transparent transition-all duration-200 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <EditIcon sx={{ fontSize: 18 }} />
            </Button>
            {/* TODO: Add a delete modal when this button is clicked */}
            <Button
              className={`!p-0 !bg-transparent transition-all duration-200 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
              onClick={(e) => onClickDeleteLayout(e, label)}
              disableAnimation
            >
              <ClearRoundedIcon sx={{ fontSize: 18 }} />
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default function ControlPanel({
  onSelectTitle,
  customLayout,
  refreshCustomLayouts,
}) {
  const ModuleItem = ({ title, desc }) => (
    <div
      className="flex flex-col p-3 rounded-xl bg-transparent border border-white border-opacity-5 font-semibold gap-2 w-full cursor-pointer"
      onClick={() => onSelectTitle(title)}
    >
      <span className="text-base">{title}</span>
      <span className="text-xs opacity-60">{desc}</span>
    </div>
  );

  const [showModal, setShowModal] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [label, setLabel] = useState("Discover");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteModalLayoutName, setDeleteModalLayoutName] = useState("");
  const api_url = config.api_url;
  const router = useRouter();

  //check if there is a custom layout name in the url
  useEffect(() => {
    const slug = router.query.slug;
    if (slug) {
      setLabel(slug);
    }
  }, [router.query.slug]);

  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);

  const addNewLayout = (e) => {
    //generate next layout, i.e if they already have 1 layout, then name it custom2, if they have 2 layouts, name it custom3, etc.
    e.preventDefault();
    let name = "";
    if (customLayout) {
      name = `custom${customLayout.length + 1}`;
    } else {
      name = "custom1";
    }
    console.log(name);
    //check if new name is valid, it should not be empty and should not contain any special characters
    const regex = /^[a-zA-Z0-9]+$/;
    if (name === "" || !regex.test(name)) {
      alert("Invalid layout name");
      return;
    }

    //check all layout names, if name already exists, alert user
    if (customLayout) {
      for (let i = 0; i < customLayout.length; i++) {
        if (customLayout[i].name === name) {
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
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          token: cookies.token,
          layout_name: name,
          layout: [
            {
              modules: [],
            },
            {
              layout: [],
            },
          ],
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.success) {
            console.log("success");
            alert("Layout created successfully");
            refreshCustomLayouts();
          } else {
            console.log(res);
            alert(
              "Something went wrong, please try again! Make sure you are not using a layout name that already exists. err-13"
            );
          }
        })
        .catch((err) => {
          console.log(err);
          alert(
            "Something went wrong, please try again! Make sure you are not using a layout name that already exists. err-23"
          );
        });
    }
  };

  const onClickDeleteLayout = (e, layout_name) => {
    e.preventDefault();
    setOpenDeleteModal(true);
    setDeleteModalLayoutName(layout_name);
  }

  const deleteCustomLayout = (e) => {
    e.preventDefault();
    if (cookies.token) {
      fetch(`${api_url}/deleteCustomLayout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: cookies.token,
          layout_name: deleteModalLayoutName,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.success) {
            console.log("success");
            alert("Layout deleted successfully");
            if (window.location.pathname === `/custom/${deleteModalLayoutName}`) {
              window.location.href = `/`;
            } else {
              refreshCustomLayouts();
              setOpenDeleteModal(false);
            }
          } else {
            console.log(res);
            alert("Something went wrong, please try again! err-14");
            setOpenDeleteModal(false);
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Something went wrong, please try again! err-24");
          setOpenDeleteModal(false);
        });
    }
  }

  return (
    <>
      <div className="w-full flex flex-col md:flex-row gap-4 md:items-center md:h-12 pt-[2px]">
        {/* LAYOUT MENU DROPDOWN */}
        <div className="relative">
          <div className="text-xs absolute -top-2 font-semibold opacity-60 hidden ">
            Select Layout
          </div>
          <Dropdown
            className="w-60 !gap-0 !overflow-hidden !max-h-96 !overflow-y-scroll"
            isBlurred
            trigger={
              <Button
                className="!px-0 !text-2xl bg-transparent"
                disableAnimation
                endIcon={<KeyboardArrowDownRoundedIcon />}
              >
                {label}
              </Button>
            }
          >
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
              {customLayout ? (
                customLayout.map((item, index) => (
                  <LayoutItem
                    key={index}
                    custom
                    icon={<DashboardRoundedIcon sx={{ fontSize: 20 }} />}
                    href={`/custom/${item.name}`}
                    label={item.name}
                    refreshCustomLayouts={refreshCustomLayouts}
                    onClickDeleteLayout={onClickDeleteLayout}
                  />
                ))
              ) : (
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-white opacity-60 ">
                    You don&apos;t have any layouts yet.
                  </span>
                  <span className="text-sm font-semibold text-white opacity-60 ">
                    Create a new one by clicking on the button below.
                  </span>
                </div>
              )}
            </div>
            <div className="border-top border-white pt-4">
              {/* <Button className='w-full !text-base bg-white !text-[#1A1921] '> <AddRoundedIcon sx={{ fontSize: 20 }} className="mr-2" />New layout</Button> */}
              {cookies.token && customLayout ? (
                customLayout.length < 3 ? (
                  <Button
                    className="w-full !text-base bg-white !text-[#1A1921] "
                    onClick={addNewLayout}
                  >
                    {" "}
                    <AddRoundedIcon sx={{ fontSize: 20 }} className="mr-2" />
                    New layout
                  </Button>
                ) : (
                  <Button
                    className="w-full !text-base bg-gray-400 !text-[#1A1921] "
                    disabled
                  >
                    {" "}
                    <AddRoundedIcon sx={{ fontSize: 20 }} className="mr-2" />
                    New layout
                  </Button>
                )
              ) : (
                <Button
                  className="w-full !text-base bg-gray-400 !text-[#1A1921] "
                  disabled
                >
                  {" "}
                  <AddRoundedIcon sx={{ fontSize: 20 }} className="mr-2" />
                  New layout
                </Button>
              )}
            </div>
          </Dropdown>
        </div>

        <div className="flex flex-row w-full h-12 gap-4 items-center">
          <SearchBar
            className="h-full"
            placeholder={"Search for modules, tokens, etc..."}
          />
          <Button
            onClick={openModal}
            className="aspect-square flex justify-center !rounded-2xl"
          >
            <AddRoundedIcon />
          </Button>
        </div>
      </div>

      <Modal
        title="Add a Module"
        description="Customize your XRPLDash by adding modules that provide specific functionalities and data."
        showModal={showModal}
        closeModal={closeModal}
        className="md:h-[480px] !overflow-scroll"
      >
        <div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 mt-4">
              <span className="text-sm font-semibold text-white opacity-60 ">
                Fungible Tokens (XRP or issued tokens)
              </span>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <ModuleItem
                  title="Price Info"
                  desc="Get real-time prices of XRPL issued tokens"
                />
                <ModuleItem
                  title="Profit and Loss"
                  desc="Monitor and analyze profit and loss data for XRPL issued tokens"
                />
                <ModuleItem
                  title="Richlist"
                  desc="Discover the richlist of a specific XRPL Token, showing top token holders"
                />
                <ModuleItem
                  title="Wallet"
                  desc="Track your crypto portfolio with a donut chart and table view"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <span className="text-sm font-semibold text-white opacity-60 ">
                Non Fungible Tokens (NFTs)
              </span>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <ModuleItem
                  title="Single NFT"
                  desc="Showcase individual, unique Non-Fungible Tokens (NFTs) owned by you"
                />
                <ModuleItem
                  title="Multiple NFTs"
                  desc="Showcase multiple Non-Fungible Tokens (NFTs) owned by you"
                />
                <ModuleItem
                  title="Badges"
                  desc="Exhibit the badges you've earned on the platform"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <span className="text-sm font-semibold text-white opacity-60 ">
                Trades Modules
              </span>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <ModuleItem
                  title="Quick Swap"
                  desc="Exhibit the badges you've earned on the platform"
                />
                <ModuleItem
                  title="Price Chart"
                  desc="Track the Price of a specific XRPL issued token"
                />
                <ModuleItem
                  title="Marketcap Chart"
                  desc="Track the Marketcap of a specific XRPL issued token"
                />
                <ModuleItem
                  title="Volume Chart"
                  desc="Track the Volume of a specific XRPL issued token"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <span className="text-sm font-semibold text-white opacity-60 ">
                Miscellaneous Modules
              </span>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <ModuleItem
                  title="Bitcoin Halving Countdown"
                  desc="Track the time left until the next Bitcoin halving event."
                />
                <ModuleItem
                  title="Fear and Greed Index"
                  desc="Monitor the current market sentiment based on investor emotions"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="hidden">
          <h2 className="text-xl font-semibold mb-2">Customize Module</h2>
          <span className="text-base font-semibold opacity-60">
            Customize your XRPLDash by adding modules that provide specific
            functionalities and data.
          </span>

          <div className="grid grid-rows-2 md:grid-cols-2 mt-8 gap-4">
            <div></div>
          </div>
        </div>
      </Modal>

      {/* TODO: Add a modal for deleting a custom layout */}
      <Modal
        title="Delete Layout"
        description="Are you sure you want to delete this layout?"
        showModal={openDeleteModal}
        closeModal={() => setOpenDeleteModal(false)}
        className="md:h-[480px] !overflow-scroll"
      >
        {/* a confirm or cancel button, and a warning saying this action is undoable */}
        <div className="flex flex-col gap-4">
          <span className="text-base font-semibold opacity-60">
            This action is irreversible.
          </span>
          <div className="flex gap-2">
            <Button
              className="w-full !text-base bg-white !text-[#1A1921] "
              onClick={() => setOpenDeleteModal(false)}
            >
              {" "}
              <ClearRoundedIcon sx={{ fontSize: 20 }} className="mr-2" />
              Cancel
            </Button>
            <Button
              className="w-full !text-base bg-red-600 !text-[#1A1921] "
              onClick={(e) => deleteCustomLayout(e)}
            >
              {" "}
              <CheckRoundedIcon sx={{ fontSize: 20 }} className="mr-2" />
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
