import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";
import SettingsLayout from "@/components/Layouts/SettingsLayoutcomponents";
import InputField from "@/components/UI/InputField/InputFieldcomponents";
import TextAreaInput from "@/components/UI/TextAreaInput/TextAreaInputcomponents";
import Button from "@/components/UI/Button/Buttoncomponents";
import SliderButton from "@/components/UI/SliderButton/SliderButtoncomponents";
import Modal from "@/components/UI/Modal/Modalcomponents";
import Nft from "@/components/UI/Nft/Nftcomponents";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import ImageSearchRoundedIcon from "@mui/icons-material/ImageSearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { config } from "@/configcomponents";
import TxModal from "@/components/Modals/TxModal/TxModalcomponents";
import { useCookies } from "react-cookie";

function ProfileSettings({ children, nfts }) {
  const variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  };
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [twitter, setTwitter] = useState("");
  const [telegram, setTelegram] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [selectedNft, setSelectedNft] = useState("");
  const [selectedNftImage, setSelectedNftImage] = useState("");
  const [selectedNft2, setSelectedNft2] = useState("");
  const [selectedNftImage2, setSelectedNftImage2] = useState("");
  const [selectedBanner, setSelectedBanner] = useState("");
  const [selectedBannerImage, setSelectedBannerImage] = useState("");
  const [cookies] = useCookies(["token"]);
  const api_url = config.api_url;

  const closeAvatarModal = () => {
    setShowAvatarModal(false);
    setSelectedNft(selectedNft2);
    setSelectedNftImage(selectedNftImage2);
  }
  const closeBannerModal = () => setShowBannerModal(false);

  const openAvatarModal = () => setShowAvatarModal(true);
  const openBannerModal = () => setShowBannerModal(true);

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
  const [xrpAddress, setXrpAddress] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("address")) {
      setXrpAddress(localStorage.getItem("address"));
    } else {
      // setLoggedin(false);
      router.push("/auth/login");
    }
    let userData = sessionStorage.getItem("userData");
    let compare = 1;
    if (userData !== null) {
      const userDataJson = JSON.parse(userData);
      compare = userDataJson.address.localeCompare(localStorage.getItem("address"));
    }
    if (compare === 0) {
      const userDataJson = JSON.parse(userData);
      setUserName(userDataJson.username);
      setBio(userDataJson.bio);
      setTwitter(userDataJson.twitter);
      setTelegram(userDataJson.telegram);
      setSelectedNft(userDataJson.pfp_nft_id);
      setSelectedNftImage(userDataJson.pfp_nft_url);
      setSelectedBanner(userDataJson.banner_nft_id);
      setSelectedBannerImage(userDataJson.banner_nft_url);
    } else {
      // fetch(`${api_url}/checkUserExists`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Authorization": "Bearer " + cookies.token,
      //   },
      //   body: JSON.stringify({
      //     address: xrpAddress,
      //   }),
      // })
      // .then((res) => res.json())
      // .then((data) => {
      //   if (data.exists) {
      //     setUserName(data.username);
      //     setBio(data.bio);
      //     setTwitter(data.twitter);
      //     setTelegram(data.telegram);
      //     setSelectedNft(data.pfp_nft_id);
      //     setSelectedNftImage(data.pfp_nft_url);
      //     setSelectedBanner(data.banner_nft_id);
      //     setSelectedBannerImage(data.banner_nft_url);
      //     sessionStorage.setItem("userData", JSON.stringify(data));
      //   } else {
      //     console.log("failed");
      //   }
      // });

      async function getUserData() {
        const userData = await fetch(`${api_url}/checkUserExists`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + cookies.token,
          },
          body: JSON.stringify({
            address: xrpAddress,
          }),
        });
        const userDataJson = await userData.json();
        if (userDataJson.exists) {
          setUserName(userDataJson.username);
          setBio(userDataJson.bio);
          setTwitter(userDataJson.twitter);
          setTelegram(userDataJson.telegram);
          setSelectedNft(userDataJson.pfp_nft_id);
          setSelectedNftImage(userDataJson.pfp_nft_url);
          setSelectedBanner(userDataJson.banner_nft_id);
          setSelectedBannerImage(userDataJson.banner_nft_url);
          sessionStorage.setItem("userData", JSON.stringify(userDataJson.data));
          window.location.reload();
        }
      }

      getUserData();
    }
  }, []);

  useEffect(() => {
    const getQrCode = async () => {
      // setLoggedin(true);
      const updateUser = await fetch(`${api_url}/updateUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + cookies.token,
        },
        body: JSON.stringify({
          address: xrpAddress,
          username: userName,
          bio: bio,
          twitter: twitter,
          telegram: telegram,
          pfp_id: selectedNft,
          pfp_img: selectedNftImage,
          banner_id: selectedBanner,
          banner_img: selectedBannerImage,
        }),
      });

      const updateUserJson = await updateUser.json();
      if (updateUserJson.success) {
        //delete session storage
        sessionStorage.removeItem("userData");
        router.push("/user/" + xrpAddress);
      } else {
        // setLoggedin(false);
        console.log("failed");
        //refresh page
        router.push("/settings/profile");
      }
    }

    if (buttonClicked) {
      getQrCode();
    }

  }, [buttonClicked]);

  return (
    <>
      <SettingsLayout>
        <div className="w-full flex flex-col gap-16">
          <div className="relative w-full h-40 md:h-72 rounded-2xl bg-[#21212A] p-1" style={selectedBanner ? { backgroundImage: `url(${selectedBannerImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
            {nfts.length > 0 && (
              <motion.div
                onClick={openBannerModal}
                whileTap={{ scale: 0.95 }}
                variants={variants}
                initial="hidden"
                whileHover="visible"
                className="w-full h-full rounded-xl bg-[#1A1921] cursor-pointer bg-opacity-60 backdrop-blur-md flex items-center justify-center"
              >
                <ImageSearchRoundedIcon />
              </motion.div>
            )}
            <div className="absolute left-4 md:left-8 -bottom-8">
              <div className="w-32 h-32 md:w-36 md:h-36 p-1 rounded-full border-2 border-[#1A1921] bg-default-avatar" style={selectedNft ? { backgroundImage: `url(${selectedNftImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
                {nfts.length > 0 && (
                  <motion.div
                    onClick={openAvatarModal}
                    whileTap={{ scale: 0.95 }}
                    variants={variants}
                    initial="hidden"
                    whileHover="visible"
                    className="w-full h-full rounded-full bg-[#1A1921] bg-opacity-60 backdrop-blur-md flex items-center justify-center cursor-pointer"
                  >
                    <ImageSearchRoundedIcon />
                  </motion.div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 lg:w-2/3">
            <InputField
              label="Username"
              placeholder="Insert your username"
              icon="@"
              className="bg-[#A6B0CF] bg-opacity-5 rounded-xl"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextAreaInput
              maxLength={250}
              label="Bio"
              placeholder="Write something about yourself"
              className="bg-[#A6B0CF] bg-opacity-5 rounded-xl"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-5 lg:w-2/3">
            <div className="flex flex-col">
              <span className="text-2xl font-semibold">Social Links</span>
              <span className="text-base font-semibold opacity-60">
                Connect your social media profiles to let people know more about
                you.
              </span>
            </div>
            <InputField
              label="Twitter"
              placeholder="Your Twitter handle, e.g., @username"
              icon={<TwitterIcon />}
              className="bg-[#A6B0CF] bg-opacity-5 rounded-xl"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />
            <InputField
              label="Telegram"
              placeholder="Your Telegram username, e.g., @username"
              icon={<TelegramIcon />}
              className="bg-[#A6B0CF] bg-opacity-5 rounded-xl"
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
            />
          </div>
          <div className="flex w-full lg:w-2/3 justify-end">
            <Button
              className="bg-white !text-[#1A1921]"
              onClick={() => setButtonClicked(true)}
            >
              Save settings
            </Button>
          </div>
        </div>
      </SettingsLayout>

      {/* AVATAR MODAL */}
      <Modal showModal={showAvatarModal} closeModal={closeAvatarModal}>
        <div className="pb-4 md:pb-8">
          <h2 className="text-xl font-semibold mb-2">Change avatar</h2>
          <span className="text-base font-semibold opacity-60">
            Select an NFT from your wallet or buy a new one to use as your new
            avatar.
          </span>
        </div>
        <div className="relative mb-4 md:mb-8">
          <div ref={sliderRef} className="keen-slider ">
            {Array.from({ length: nfts.length }).map((_, index) => (
              <div
                key={index}
                className="keen-slider__slide"
                style={{ maxWidth: "11.1rem", minWidth: "11.1rem" }}
              >
                {/* { nfts.length > 0 && <Nft src={nfts[index].image} /> } */}
                {nfts.length > 0 && (
                  <Nft
                    src={nfts[index].image}
                    onClick={() => {
                      // console.log(nfts[index].nftid);
                      setSelectedNft2(nfts[index].nftid);
                      setSelectedNftImage2(nfts[index].image);
                    }}
                    imageSize="!w-full !h-full object-cover"
                    className=" w-full h-auto"
                    selected={nfts[index].nftid === selectedNft2}
                    videoFlag={nfts[index].videoFlag}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2  flex flex-row justify-between">
            {loaded && instanceRef.current && (
              <>
                <SliderButton
                  left
                  onClick={(e) =>
                    e.stopPropagation() || instanceRef.current?.prev()
                  }
                  disabled={currentSlide === 0}
                />
              </>
            )}
          </div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2  flex flex-row justify-between">
            {loaded && instanceRef.current && (
              <>
                <SliderButton
                  right
                  onClick={(e) =>
                    e.stopPropagation() || instanceRef.current?.next()
                  }
                  disabled={
                    currentSlide === instanceRef.current.track.details.slides.length - 3
                  }
                />
              </>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <Button className="bg-white !text-[#1A1921]" onClick={closeAvatarModal}>
            Save
          </Button>
        </div>
      </Modal>

      {/* BANNER MODAL */}
      <Modal showModal={showBannerModal} closeModal={closeBannerModal}>
        <div className="pb-4 md:pb-8">
          <h2 className="text-xl font-semibold mb-2">Change banner</h2>
          <span className="text-base font-semibold opacity-60">
            Select an NFT from your wallet or buy a new one to use as your new
            banner.
          </span>
        </div>
        <div className="relative mb-4 md:mb-8">
          <div ref={sliderRef} className="keen-slider ">
            {Array.from({ length: nfts.length }).map((_, index) => (
              <div
                key={index}
                className="keen-slider__slide"
                style={{ maxWidth: "11.1rem", minWidth: "11.1rem" }}
              >
                {/* { nfts.length > 0 && <Nft src={nfts[index].image} /> } */}
                {nfts.length > 0 && (
                  <Nft
                    src={nfts[index].image}
                    onClick={() => {
                      // console.log(nfts[index].nftid);
                      setSelectedBanner(nfts[index].nftid);
                      setSelectedBannerImage(nfts[index].image);
                    }}
                    selected={nfts[index].nftid === selectedBanner}
                    videoFlag={nfts[index].videoFlag}
                    imageSize="!w-full !h-full object-cover"
                    className=" w-full h-auto"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2  flex flex-row justify-between">
            {loaded && instanceRef.current && (
              <>
                <SliderButton
                  left
                  onClick={(e) =>
                    e.stopPropagation() || instanceRef.current?.prev()
                  }
                  disabled={currentSlide === 0}
                />
              </>
            )}
          </div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2  flex flex-row justify-between">
            {loaded && instanceRef.current && (
              <>
                <SliderButton
                  right
                  onClick={(e) =>
                    e.stopPropagation() || instanceRef.current?.next()
                  }
                  disabled={
                    currentSlide === instanceRef.current.track.details.slides.length - 3
                  }
                />
              </>
            )}
          </div>
        </div>

      </Modal>

    </>
  );
}

export default ProfileSettings;
