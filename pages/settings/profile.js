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

function ProfileSettings({ children }) {
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
  const [qrCode, setQrCode] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [xummButtonClicked, setXummButtonClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [closeModal, setCloseModal] = useState(true);
  const api_url = config.api_url;

  const closeAvatarModal = () => setShowAvatarModal(false);
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
  }, []);

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const getQrCode = async () => {
      const payload = await fetch("/api/xumm/createpayload");
      const data = await payload.json();

      setQrCode(data.payload.refs.qr_png);
      setQrCodeUrl(data.payload.next.always);

      if (isMobile) {
        //open in new tab
        window.open(data.payload.next.always, "_blank");
      }

      const ws = new WebSocket(data.payload.refs.websocket_status);

      ws.onmessage = async (e) => {
        let responseObj = JSON.parse(e.data);
        if (responseObj.signed !== null && responseObj.signed !== undefined) {
          const payload = await fetch(
            `/api/xumm/getpayload?payloadId=${responseObj.payload_uuidv4}`
          );
          const payloadJson = await payload.json();

          const hex = payloadJson.payload.response.hex;
          const checkSign = await fetch(`/api/xumm/checksign?hex=${hex}`);
          const checkSignJson = await checkSign.json();

          if (checkSignJson.xrpAddress === xrpAddress) {
            // setLoggedin(true);
            console.log("success");
            const updateUser = await fetch(`${api_url}/updateUser`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                address: xrpAddress,
                username: userName,
                bio: bio,
                twitter: twitter,
                telegram: telegram
              }),
            });

            const updateUserJson = await updateUser.json();
            console.log(updateUserJson);
            if (updateUserJson.success) {
              router.push("/profile");
            } else {
              // setLoggedin(false);
              console.log("failed");
              //refresh page
              router.push("/settings/profile");
            }
          } else {
            console.log(checkSignJson.xrpAddress);
            console.log(xrpAddress);
            console.log(checkSignJson.xrpAddress === xrpAddress);
            // setLoggedin(false);
            console.log("failed");
          }
        }
      };
    };

    // getQrCode()
    if (xummButtonClicked) {
      setShowModal(true);
      setCloseModal(false);
      getQrCode();
    } else {
      setShowModal(false);
      setCloseModal(true);
    }
  }, [xummButtonClicked]);

  return (
    <>
      <SettingsLayout>
        <div className="w-full flex flex-col gap-16">
          <div className="relative w-full h-40 md:h-72 rounded-2xl bg-[#21212A] p-2">
            <motion.div
              onClick={openBannerModal}
              variants={variants}
              initial="hidden"
              whileHover="visible"
              className="w-full h-full rounded-xl bg-[#1A1921] cursor-pointer bg-opacity-60 backdrop-blur-md flex items-center justify-center"
            >
              <ImageSearchRoundedIcon />
            </motion.div>
            <div className="absolute left-4 md:left-8 -bottom-8">
              <div className="w-32 h-32 md:w-36 md:h-36 p-2 rounded-full bg-default-avatar border-2 border-[#1A1921] ">
                <motion.div
                  onClick={openAvatarModal}
                  variants={variants}
                  initial="hidden"
                  whileHover="visible"
                  className="w-full h-full rounded-full bg-[#1A1921] bg-opacity-60 backdrop-blur-md flex items-center justify-center cursor-pointer"
                >
                  <ImageSearchRoundedIcon />
                </motion.div>
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
          <Button
            className="bg-white !text-[#1A1921]"
            onClick={() => setXummButtonClicked(true)}
          >
            Save settings
          </Button>
        </div>
      </SettingsLayout>

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
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="keen-slider__slide"
                style={{ maxWidth: "11.1rem", minWidth: "11.1rem" }}
              >
                <Nft />
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
                    currentSlide ===
                    instanceRef.current.track.details.slides.length - 3
                  }
                />
              </>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <Button className="bg-white !text-[#1A1921]">Save</Button>
        </div>
      </Modal>

      <Modal showModal={showBannerModal} closeModal={closeBannerModal}>
        <h2 className="text-xl font-semibold mb-2">Change banner</h2>
        <span className="text-base font-semibold opacity-60">
          Select an NFT from your wallet or buy a new one to use as your new
          banner.
        </span>
      </Modal>
      <Modal showModal={showModal} closeModal={closeModal}>
        {/* Login */}
        <div>
          <Image
            className="absolute p-0 top-[-38px] left-0"
            src="/images/xumm-logo.svg"
            height={130}
            width={120}
            alt="XUMM"
          />
          <div className="w-full flex flex-row justify-between items-start pb-8 relative">
            <h3 className="font-semibold text-xl">
              Scan the QR code with XUMM app
            </h3>
            <button onClick={() => setXummButtonClicked(false)}>
              {" "}
              <CloseRoundedIcon />{" "}
            </button>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-16 ">
            <div className="flex flex-col gap-16 w-full md:w-1/2 justify-between">
              <div className="flex flex-col gap-4">
                <div className="flex items-center">
                  <div className="w-6 h-6 flex items-center justify-center rounded-full aspect-square bg-[#1A1921]  mr-2">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <p>Open your XUMM app on your phone.</p>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 flex items-center justify-center rounded-full aspect-square bg-[#1A1921]  mr-2">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <p>Scan the QR code below.</p>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 flex items-center justify-center rounded-full aspect-square bg-[#1A1921] mr-2">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <p>
                    Follow the instructions on your app to complete the login
                    process.
                  </p>
                </div>
              </div>
              <div className="hidden md:flex p-4 bg-[#272832] rounded-xl">
                <p>
                  Don’t see a Scan option? <br></br>Update your XUMM app to the
                  latest version and try again.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              {/* <Image className="w-full blur-sm" src="/images/qr.png" height={200} width={200} alt='XUMM QR' /> */}
              {qrCode ? (
                <a href={qrCodeUrl} target="_blank" rel="noreferrer">
                  <img
                    className="w-full rounded-xl"
                    src={qrCode}
                    alt="XUMM QR"
                  />
                </a>
              ) : (
                <Image
                  className="w-full blur-sm"
                  src="/images/qr.png"
                  height={200}
                  width={200}
                  alt="XUMM QR"
                />
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ProfileSettings;
