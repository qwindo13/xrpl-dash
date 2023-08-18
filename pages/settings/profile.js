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
import axios from "axios";

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
  const [nfts, setNfts] = useState([]);
  const [nfts2, setNfts2] = useState([]);
  const [selectedNft, setSelectedNft] = useState("");
  const [selectedNftImage, setSelectedNftImage] = useState("");
  const [selectedNft2, setSelectedNft2] = useState("");
  const [selectedNftImage2, setSelectedNftImage2] = useState("");
  const [selectedBanner, setSelectedBanner] = useState("");
  const [selectedBannerImage, setSelectedBannerImage] = useState("");
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

  const convertHexToString = (hex) => {
    let string = "";
    for (let i = 0; i < hex.length; i += 2) {
      string += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return string;
  };

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
      console.log("matched");
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
      fetch(`${api_url}/checkUserExists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: localStorage.getItem("address"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.exists) {
            console.log("exists");
            setUserName(data.username);
            setBio(data.bio);
            setTwitter(data.twitter);
            setTelegram(data.telegram);
            setSelectedNft(data.pfp_nft_id);
            setSelectedNftImage(data.pfp_nft_url);
            setSelectedBanner(data.banner_nft_id);
            setSelectedBannerImage(data.banner_nft_url);
          } else {
            // setLoggedin(false);
            console.log("failed");
            // router.push("/auth/login");
          }
        });
    }
  }, []);

  useEffect(() => {
    if (xrpAddress) {
      const url = `${api_url}/walletnfts/${xrpAddress}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data.nfts);
          setNfts(data.nfts);
        });
    }
  }, [xrpAddress]);

  useEffect(() => {
    console.log(nfts.length);
    if (nfts.length > 0) {
      fetchNfts()
    }

    async function fetchNfts() {
      nfts.forEach(async (nft) => {
        //if URI field is not present, then skip
        if (nft.URI) {
          const decoded = convertHexToString(nft.URI);
          if (decoded.startsWith('https://')) {
            const data = await axios.get(decoded);
            decodeImage(data, nft);
          } else if (decoded.startsWith('ipfs://')) {
            //detect the cid from the decoded string
            const cid = decoded.replace('ipfs://', 'https://ipfs.io/ipfs/');
            const data = await axios.get(cid);
            decodeImage(data, nft);
          } else {
            // finalNfts.push(`https://ipfs.io/ipfs/${decoded}`);
            const data = await axios.get(`https://ipfs.io/ipfs/${decoded}`);
            decodeImage(data, nft);
          }
        }
      });

      function decodeImage(data, nft) {
        if (data.data.image === undefined) {
          return
        }
        if (!('video' in data.data) && data.data.video === undefined && data.data.video === '' && !('animation' in data.data) && data.data.animation === undefined && data.data.animation === '') {
          if (data.data.image.startsWith('ipfs://')) {
            const image = data.data.image.replace('ipfs://', 'https://ipfs.io/ipfs/');
            setNfts2((nfts2) => [...nfts2, { nftid: nft.NFTokenID, image: image, videoFlag: false }]);
          } else if (data.data.image.startsWith('https://')) {
            setNfts2((nfts2) => [...nfts2, { nftid: nft.NFTokenID, image: data.data.image, videoFlag: false }]);
          } else {
            setNfts2((nfts2) => [...nfts2, { nftid: nft.NFTokenID, image: `https://ipfs.io/ipfs/${data.data.image}`, videoFlag: false }]);
          }
        } else {
          if ('video' in data.data && data.data.video !== undefined && data.data.video !== '') {
            if (data.data.video.startsWith('ipfs://')) {
              const image = data.data.video.replace('ipfs://', 'https://ipfs.io/ipfs/');
              setNfts2((nfts2) => [...nfts2, { nftid: nft.NFTokenID, image: image, videoFlag: (data.data.video.substr(data.data.video.length - 3) === 'gif') ? false : true }]);
            } else if (data.data.video.startsWith('https://')) {
              setNfts2((nfts2) => [...nfts2, { nftid: nft.NFTokenID, image: data.data.video, videoFlag: (data.data.video.substr(data.data.video.length - 3) === 'gif') ? false : true }]);
            } else {
              setNfts2((nfts2) => [...nfts2, { nftid: nft.NFTokenID, image: `https://ipfs.io/ipfs/${data.data.video}`, videoFlag: (data.data.video.substr(data.data.video.length - 3) === 'gif') ? false : true }]);
            }
          } else if ('animation' in data.data && data.data.animation !== undefined && data.data.animation !== '') {
            console.log(`Animation: ${data.data.animation}\n${data.data.animation.substr(data.data.animation.length - 3)}`)
            if (data.data.animation.startsWith('ipfs://')) {
              const image = data.data.animation.replace('ipfs://', 'https://ipfs.io/ipfs/');
              setNfts2((nfts2) => [...nfts2, { nftid: nft.NFTokenID, image: image, videoFlag: (data.data.animation.substr(data.data.animation.length - 3) === 'gif') ? false : true }]);
            } else if (data.data.animation.startsWith('https://')) {
              setNfts2((nfts2) => [...nfts2, { nftid: nft.NFTokenID, image: data.data.animation, videoFlag: (data.data.animation.substr(data.data.animation.length - 3) === 'gif') ? false : true }]);
            } else {
              setNfts2((nfts2) => [...nfts2, { nftid: nft.NFTokenID, image: `https://ipfs.io/ipfs/${data.data.animation}`, videoFlag: (data.data.animation.substr(data.data.animation.length - 3) === 'gif') ? false : true }]);
            }
          } else {
            //use image
            if (data.data.image.startsWith('ipfs://')) {
              const image = data.data.image.replace('ipfs://', 'https://ipfs.io/ipfs/');
              setNfts2((nfts2) => [...nfts2, { nftid: nft.NFTokenID, image: image, videoFlag: false }]);
            } else if (data.data.image.startsWith('https://')) {
              setNfts2((nfts2) => [...nfts2, { nftid: nft.NFTokenID, image: data.data.image, videoFlag: false }]);
            } else {
              setNfts2((nfts2) => [...nfts2, { nftid: nft.NFTokenID, image: `https://ipfs.io/ipfs/${data.data.image}`, videoFlag: false }]);
            }
          }
        }
      }
    }
  }, [nfts]);

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
          } else {
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
          <div className="relative w-full h-40 md:h-72 rounded-2xl bg-[#21212A] p-2" style={selectedBanner ? { backgroundImage: `url(${selectedBannerImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
            {nfts2.length > 0 && (
              <motion.div
                onClick={openBannerModal}
                variants={variants}
                initial="hidden"
                whileHover="visible"
                className="w-full h-full rounded-xl bg-[#1A1921] cursor-pointer bg-opacity-60 backdrop-blur-md flex items-center justify-center"
              >
                <ImageSearchRoundedIcon />
              </motion.div>
            )}
            <div className="absolute left-4 md:left-8 -bottom-8">
              {/* set image as https://ipfs.io/ipfs/bafybeiek4j6yn3p3jvoxxsmfttzprfn7en3togmslm6yjloolajcoqpzju/3436.png */}
              <div className="w-32 h-32 md:w-36 md:h-36 p-2 rounded-full border-2 border-[#1A1921] bg-default-avatar" style={selectedNft ? { backgroundImage: `url(${selectedNftImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
                {nfts2.length > 0 && (
                  <motion.div
                    onClick={openAvatarModal}
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
              onClick={() => setXummButtonClicked(true)}
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
            {Array.from({ length: nfts2.length }).map((_, index) => (
              <div
                key={index}
                className="keen-slider__slide"
                style={{ maxWidth: "11.1rem", minWidth: "11.1rem" }}
              >
                {/* { nfts.length > 0 && <Nft src={nfts2[index].image} /> } */}
                {nfts2.length > 0 && (
                  <Nft
                    src={nfts2[index].image}
                    onClick={() => {
                      // console.log(nfts2[index].nftid);
                      setSelectedNft2(nfts2[index].nftid);
                      setSelectedNftImage2(nfts2[index].image);
                    }}
                    selected={nfts2[index].nftid === selectedNft2}
                    videoFlag={nfts2[index].videoFlag}
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
            {Array.from({ length: nfts2.length }).map((_, index) => (
              <div
                key={index}
                className="keen-slider__slide"
                style={{ maxWidth: "11.1rem", minWidth: "11.1rem" }}
              >
                {/* { nfts.length > 0 && <Nft src={nfts2[index].image} /> } */}
                {nfts2.length > 0 && (
                  <Nft
                    src={nfts2[index].image}
                    onClick={() => {
                      // console.log(nfts2[index].nftid);
                      setSelectedBanner(nfts2[index].nftid);
                      setSelectedBannerImage(nfts2[index].image);
                    }}
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


      <Modal showModal={showModal} closeModal={closeModal}>
        {/* verify */}
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
              Scan the QR code with XUMM app to verify your account
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
                    Follow the instructions on your app to complete the verification process.
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
