import React, { useEffect, useState } from "react";
import Image from "next/image";
import ModuleCard from "@/components/UI/ModuleCard/ModuleCardcomponents";
import NftNameSwitch from "@/components/UI/ModuleCard/Settings/NftNameSwitchcomponents";
import NftPriceSwitch from "@/components/UI/ModuleCard/Settings/NftPriceSwitchcomponents";
import SearchNftButton from "@/components/UI/ModuleCard/Settings/SearchNftButtoncomponents";
import RandomSwitch from "@/components/UI/ModuleCard/Settings/RandomSwitchcomponents";
import BackgroundTabs from "@/components/UI/ModuleCard/Settings/BackgroundTabscomponents";
import Nft from "@/components/UI/Nft/Nftcomponents";
import Modal from "@/components/UI/Modal/Modalcomponents";
import Button from "@/components/UI/Button/Buttoncomponents";
import WalletPrompt from "@/components/UI/WalletPrompt/WalletPromptcomponents";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import SliderButton from "@/components/UI/SliderButton/SliderButtoncomponents";

const defaultSettings = {
  RandomSwitch: true,
  displayNftName: true,
  displayNftPrice: false,
  backgroundSetting: "Solid",
  nft: false
};

const SingleNft = ({ data, index, changeModal, setIndex}) => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    mode: "snap",
    rtl: false,
    slides: { perView: "auto", spacing: 16 },
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

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

  const openModal = () => setShowModal(true);

  const backgroundClass =
    moduleSettings.backgroundSetting === "Solid"
      ? ""
      : moduleSettings.backgroundSetting === "Highlight"
      ? "bg-[#525567] "
      : moduleSettings.backgroundSetting === "Transparent"
      ? "bg-transparent backdrop-blur-lg border border-white border-opacity-5"
      : "";


    useEffect(() => {
        // console.log(moduleSettings)
        if (moduleSettings.nft === true) {
            // openModal()
            changeModal(true)
            setIndex(index)
        } else {
            // closeModal()
            changeModal(false)
            setIndex(null)
        }
    }, [moduleSettings])
    
  return (
    <>
      <ModuleCard
        title="NFT - #23123"
        settings={
          <>
            <RandomSwitch
              value={moduleSettings.randomNFT}
              onChange={(value) => updateSettings("randomNFT", value)}
            />
            {!moduleSettings.randomNFT && (
              <SearchNftButton
                value={moduleSettings.nft}
                onChange={(value) => updateSettings("nft", value)}
              />
            )}

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
        disableTitle="true"
        className={`${backgroundClass} !p-0`}
      >
        <Nft
          imageSize="object-cover !w-full !h-full min-h-0"
          className="w-full h-full border-none"
          // src="/images/nft.webp"
          src={data && data[index] && data[index].image ? data[index].image : "/images/nft.webp"}
          displayName={moduleSettings.displayNftName}
          displayPrice={moduleSettings.displayNftPrice}
        />
      </ModuleCard>
    </>
  );
};

export default SingleNft;
