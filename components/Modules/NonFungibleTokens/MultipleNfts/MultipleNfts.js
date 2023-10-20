import React, { useEffect, useState } from "react";
import ModuleCard from "@/components/UI/ModuleCard/ModuleCardcomponents";
import Button from "@/components/UI/Button/Buttoncomponents";
import SearchBar from "@/components/UI/SearchBar/SearchBarcomponents";
import Accordion from "@/components/UI/Accordion/Accordioncomponents";
import Dropdown from "@/components/UI/Dropdown/Dropdowncomponents";
import Checkbox from "@/components/UI/Checkbox/Checkboxcomponents";
import Switch from "@/components/UI/Switch/Switchcomponents";
import InputField from "@/components/UI/InputField/InputFieldcomponents";
import TitleSwitch from "@/components/UI/ModuleCard/Settings/TitleSwitchcomponents";
import NftNameSwitch from "@/components/UI/ModuleCard/Settings/NftNameSwitchcomponents";
import NftPriceSwitch from "@/components/UI/ModuleCard/Settings/NftPriceSwitchcomponents";
import BackgroundTabs from "@/components/UI/ModuleCard/Settings/BackgroundTabscomponents";
import SearchBarSwitch from "@/components/UI/ModuleCard/Settings/SearchBarSwitchcomponents";
import Nft from "@/components/UI/Nft/Nftcomponents";
import WalletPrompt from "@/components/UI/WalletPrompt/WalletPromptcomponents";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import { config } from "@/configcomponents";

const defaultSettings = {
  displayTitle: true,
  displaySearchBar: true,
  backgroundSetting: "Transparent",
};

const api_url = config.api_url;

const Nfts = ({onClickRemove, onClickStatic, isPinned=false}) => {
  const [moduleSettings, setModuleSettings] = useState(defaultSettings);
  const updateSettings = (key, value) => {
    setModuleSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value,
    }));
  };

  const [xrpAddress, setXrpAddress] = useState(null);

  useEffect(() => {
    const address = localStorage.getItem("address");
    setXrpAddress(address);
  }, []);

  const [filterVisible, setFilterVisible] = useState(false);

  const backgroundClass =
    moduleSettings.backgroundSetting === "Solid"
      ? ""
      : moduleSettings.backgroundSetting === "Highlight"
      ? "bg-[#525567] "
      : moduleSettings.backgroundSetting === "Transparent"
      ? "bg-transparent backdrop-blur-lg border border-white border-opacity-5"
      : "";

  const [data, setData] = useState([]);

  useEffect(() => {
    //send request to api_url/nfts/:number (12)
    fetch(api_url + "/nfts/12")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const [searchBarText, setSearchBarText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const filterNFTs = () => {
    if (!searchBarText || searchBarText === "") {
      // If search input is empty, display all NFTs
      setFilteredData(data);
    } else {
      // Filter NFTs based on search input (you can customize your filter logic)
      const filteredNFTs = data.filter((nft) =>
        nft.metadata.name.toLowerCase().includes(searchBarText.toLowerCase())
      );
      setFilteredData(filteredNFTs);
    }
  };

  useEffect(() => {
    filterNFTs();
  }, [searchBarText, data]);
  return (
    <ModuleCard
      onClickRemove={onClickRemove}
      onClickStatic={onClickStatic}
      isPinned={isPinned}
      title="Explore NFTs"
      settings={
        <>
          <TitleSwitch
            value={moduleSettings.displayTitle}
            onChange={(value) => updateSettings("displayTitle", value)}
          />
          <SearchBarSwitch
            value={moduleSettings.displaySearchBar}
            onChange={(value) => updateSettings("displaySearchBar", value)}
          />
          <NftNameSwitch
            value={moduleSettings.displayNftName}
            onChange={(value) => updateSettings("displayNftName", value)}
          />
          <NftPriceSwitch
            value={moduleSettings.displayNftPrice}
            onChange={(value) => updateSettings("displayNftPrice", value)}
          />
          <BackgroundTabs
            value={moduleSettings.backgroundSetting}
            onChange={(value) => updateSettings("backgroundSetting", value)}
          />
        </>
      }
      disableTitle={!moduleSettings.displayTitle}
      className={`${backgroundClass}`}
    >
      {xrpAddress !== null ? (
        <div className="w-full flex flex-col gap-4">
          {moduleSettings.displaySearchBar && (
            <div className="w-full flex flex-row gap-4">
              <div className="relative inline-block h-full aspect-square">
                <Button
                  className="flex justify-center h-full !rounded-xl !bg-[#A6B0CF] !bg-opacity-5"
                  onClick={() => setFilterVisible(!filterVisible)}
                >
                  <TuneRoundedIcon sx={{ fontSize: 18 }} />
                </Button>
              </div>

              <SearchBar
                className="!bg-[#A6B0CF] !bg-opacity-5 rounded-xl w-full"
                placeholder={"Search by NFTs"}
                onChange={(e) => setSearchBarText(e.target.value)}
              />
              <div className="w-fit">
                <Dropdown
                  trigger={
                    <Button
                      className="bg-[#A6B0CF] hover:bg-opacity-5 !bg-opacity-5 rounded-xl text-medium w-fit h-full justify-between "
                      disableAnimation
                      endIcon={
                        <KeyboardArrowDownRoundedIcon sx={{ fontSize: 16 }} />
                      }
                    >
                      Trending
                    </Button>
                  }
                  position="right"
                  className="!w-fit"
                >
                  <span className="font-semibold text-sm">Recently listed</span>
                  <span className="font-semibold text-sm">
                    Price: low to high
                  </span>
                  <span className="font-semibold text-sm">
                    Price: high to low
                  </span>
                </Dropdown>
              </div>
            </div>
          )}

          <div className="flex flex-row w-full gap-2">
            {filterVisible && moduleSettings.displaySearchBar && (
              <div className="w-1/3 h-fit bg-[#A6B0CF] bg-opacity-5 rounded-xl p-4">
                <ul className="flex flex-col gap-4">
                  <li className="border-b last:border-b-0 border-white border-opacity-5">
                    <Accordion title="Price" className="border-none !p-0 !pb-2">
                      <div className="flex flex-row gap-4 items-center">
                        <InputField
                          className="bg-[#A6B0CF] bg-opacity-5 rounded-xl text-sm !h-12"
                          placeholder="Min"
                        />
                        <span className="opacity-60">to</span>
                        <InputField
                          className="bg-[#A6B0CF] bg-opacity-5 rounded-xl text-sm !h-12"
                          placeholder="Max"
                        />
                      </div>
                      <Button className="w-full justify-center bg-[#A6B0CF] bg-opacity-5 !hover:bg-opacity-5">
                        Apply
                      </Button>
                    </Accordion>
                  </li>
                  <li className="border-b last:border-b-0 border-white border-opacity-5">
                    <Accordion
                      title="Marketplace"
                      className="border-none !p-0 !pb-2"
                    >
                      <div className="flex flex-col gap-2 ">
                        <Checkbox label="XRPCafe" />
                        <Checkbox label="Sologenic" />
                        <Checkbox label="onXRP" />
                        <Checkbox label="XRMarket" />
                        <Checkbox label="XRPNFT" />
                      </div>
                    </Accordion>
                  </li>
                  <li className="border-b last:border-b-0 border-white border-opacity-5">
                    <Accordion
                      title="File Type"
                      className="border-none !p-0 !pb-2"
                    >
                      <div className="flex flex-col gap-2 ">
                        <Checkbox label="PNG" />
                        <Checkbox label="MP4" />
                      </div>
                    </Accordion>
                  </li>
                  <li className="border-b last:border-b-0 border-white border-opacity-5">
                    <div className="flex flex-row justify-between">
                      <span className="font-semibold text-xl">On sale</span>
                      <Switch />
                    </div>
                  </li>
                </ul>
              </div>
            )}

            <div className="@container w-full ">
              <div className="grid @sm:grid-cols-2 @md:grid-cols-2 @xl:grid-cols-3 @2xl:grid-cols-4 @5xl:grid-cols-5 gap-4 ">
                {Array.from({ length: filteredData.length }).map((_, index) => (
                  <Nft
                    imageSize="!w-full"
                    className="w-full"
                    // src='/images/nft.webp'
                    src={filteredData[index].metadata.image.replace(
                      "ipfs://",
                      "https://ipfs.io/ipfs/"
                    )}
                    key={index}
                    displayName={moduleSettings.displayNftName}
                    displayPrice={moduleSettings.displayNftPrice}
                    name={filteredData[index].metadata.name}
                    onClick={() => {
                      //open new page to https://xrp.cafe/nft/:id
                        window.open(
                            "https://xrp.cafe/nft/" + filteredData[index].nft_id,
                            "_blank"
                        );
                    }}
                    issuer={filteredData[index].issuer}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <WalletPrompt />
      )}
    </ModuleCard>
  );
};

export default Nfts;
