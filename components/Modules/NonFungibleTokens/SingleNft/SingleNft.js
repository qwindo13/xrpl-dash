import React, { useEffect, useState } from "react";
import ModuleCard from "@/components/UI/ModuleCard/ModuleCardcomponents";
import NftNameSwitch from "@/components/UI/ModuleCard/Settings/NftNameSwitchcomponents";
import NftPriceSwitch from "@/components/UI/ModuleCard/Settings/NftPriceSwitchcomponents";
import SearchNftButton from "@/components/UI/ModuleCard/Settings/SearchNftButtoncomponents";
import RandomSwitch from "@/components/UI/ModuleCard/Settings/RandomSwitchcomponents";
import BackgroundTabs from "@/components/UI/ModuleCard/Settings/BackgroundTabscomponents";
import Nft from "@/components/UI/Nft/Nftcomponents";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { config } from "@/configcomponents";
import { useCookies } from "react-cookie";

const defaultSettings = {
  displayNftName: true,
  displayNftPrice: false,
  backgroundSetting: "Solid",
  randomNFT: false,
};

const SingleNft = ({ changeModal, keyy, refresh, nfts }) => {

  const [cookies] = useCookies(["token"]);
  const [nftData, setNftData] = useState(null);
  const [price, setPrice] = useState(null);
  const [moduleSettings, setModuleSettings] = useState(defaultSettings);
  const [dis, setDis] = useState(false);
  const updateSettings = (key, value) => {
    setModuleSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value,
    }));
  };
  const api_url = config.api_url;
  const [xrpAddress, setXrpAddress] = useState(null);

  useEffect(() => {
    const address = localStorage.getItem("address");
    setXrpAddress(address);
    if (keyy && cookies.token) {
      const api_url = `${config.api_url}/getNftById`;
      const data = {
        token: cookies.token,
        div_id: keyy,
      };
      fetch(api_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
            // setNftData(data.data); if its random nft, then set random nft
            if (data.data.nft_id === 'random') {
              const randNft = nfts[Math.floor(Math.random() * nfts.length)];
              console.log(randNft);
              setNftData({
                nft_id: randNft.nftid,
                nft_image: randNft.image,
                nft_name: randNft.name,
              });
              updateSettings("randomNFT", true);
            } else {
              setNftData(data.data);
            }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [refresh]);

  //get price
  useEffect(() => {
    if (nftData && nftData.nft_id) {
      const api_url = `${config.api_url}/nft_price/${nftData.nft_id}`;
      fetch(api_url)
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          setPrice(data.price);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [nftData]);

  const backgroundClass =
    moduleSettings.backgroundSetting === "Solid"
      ? ""
      : moduleSettings.backgroundSetting === "Highlight"
      ? "relative bg-transparent w-full h-full before:absolute before:w-full before:h-full before:scale-120	before:opacity-80 before:bg-[url('/images/nft.webp')] before:bg-cover before:bg-center before:blur-[80px] before:z-[-1] "
      : moduleSettings.backgroundSetting === "Transparent"
      ? "bg-transparent backdrop-blur-lg border border-white border-opacity-5"
      : "";

  const setRandomNFT = () => {
    fetch(`${api_url}/addNftMod`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: cookies.token,
        nft_data: {
          id: 'random',
          image: 'random',
          name: 'random',
          div_id: keyy,
        },
      }),
    })

      .then((response) => response.json())
      .then((dataReq) => {
        console.log("Success:", dataReq);
        //select random nft and update
        const randNft = nfts[Math.floor(Math.random() * nfts.length)];
        setNftData({
          nft_id: randNft.nftid,
          nft_image: randNft.image,
          nft_name: randNft.name,
        });
      })
    };

  return (
    <>
      <ModuleCard
        title= "NFT"
        settings={
          <>
            <RandomSwitch
              value={moduleSettings.randomNFT}
              // onChange={(value) => updateSettings("randomNFT", value)}
              onChange={(value) => {
                setRandomNFT();
                updateSettings("randomNFT", value);
                //disabling the button for 2 seconds, then enabling it again
                setDis(true);
                setTimeout(() => {
                  setDis(false);
                }, 20000);
              }}
              disabled={dis}
            />
            { !moduleSettings.randomNFT && xrpAddress && (
            <SearchNftButton
              onChange={() => changeModal(true, keyy)}
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
              hasHighlight
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
          src={nftData && nftData.nft_image ? nftData.nft_image : "/images/nft.webp"}
          displayName={moduleSettings.displayNftName}
          displayPrice={moduleSettings.displayNftPrice}
          name={nftData && nftData.nft_name ? nftData.nft_name : "Select NFT"}
          price={price}
        />
      </ModuleCard>
    </>
  );
};

export default SingleNft;
