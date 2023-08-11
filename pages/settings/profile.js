import React, { useState,useEffect } from "react";
import { useRouter } from 'next/router';
import Link from "next/link";
import { motion } from "framer-motion";
import SettingsLayout from "@/components/Layouts/SettingsLayoutcomponents";
import InputField from "@/components/UI/InputField/InputFieldcomponents";
import TextAreaInput from "@/components/UI/TextAreaInput/TextAreaInputcomponents";
import Button from "@/components/UI/Button/Buttoncomponents";
import SliderButton from "@/components/UI/SliderButton/SliderButtoncomponents";
import Modal from "@/components/UI/Modal/Modalcomponents";
import Nft from "@/components/UI/Nft/Nftcomponents";
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import ImageSearchRoundedIcon from '@mui/icons-material/ImageSearchRounded';

function ProfileSettings({ children }) {


    const variants = {
        hidden: { opacity: 0, scale: 0.8, transition: { duration: 0.2, ease: 'easeInOut' } },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: 'easeInOut' } },
    };
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const [showBannerModal, setShowBannerModal] = useState(false);

    const closeAvatarModal = () => setShowAvatarModal(false);
    const closeBannerModal = () => setShowBannerModal(false);

    const openAvatarModal = () => setShowAvatarModal(true);
    const openBannerModal = () => setShowBannerModal(true);

    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [sliderRef, instanceRef] = useKeenSlider({
        mode: "snap",
        rtl: false,
        slides: { perView: "auto", spacing: 16, },
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
    })
    const [xrpAddress, setXrpAddress] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem('address')) {
            setXrpAddress(localStorage.getItem('address'));
        } else {
            // setLoggedin(false);
            router.push('/auth/login');
        }
    }, []);

    return (
        <>
            <SettingsLayout>
                <div className="w-full flex flex-col gap-16">
                    <div className='relative w-full h-40 md:h-72 rounded-2xl bg-[#21212A] p-2'>
                        <motion.div
                            onClick={openBannerModal}
                            variants={variants}
                            initial="hidden"
                            whileHover="visible"
                            className="w-full h-full rounded-xl bg-[#1A1921] cursor-pointer bg-opacity-60 backdrop-blur-md flex items-center justify-center"
                        >
                            <ImageSearchRoundedIcon />
                        </motion.div>
                        <div className='absolute left-4 md:left-8 -bottom-8'>
                            <div className='w-32 h-32 md:w-36 md:h-36 p-2 rounded-full bg-default-avatar border-2 border-[#1A1921] '>
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
                        <InputField label="Username" placeholder="Insert your username" icon="@" className="bg-[#A6B0CF] bg-opacity-5 rounded-xl" />
                        <TextAreaInput maxLength={250} label="Bio" placeholder="Write something about yourself" className="bg-[#A6B0CF] bg-opacity-5 rounded-xl" />
                    </div>
                    <div className="flex flex-col gap-5 lg:w-2/3">
                        <div className="flex flex-col">
                            <span className="text-2xl font-semibold">Social Links</span>
                            <span className="text-base font-semibold opacity-60">Connect your social media profiles to let people know more about you.</span>
                        </div>
                        <InputField label="Twitter" placeholder="Your Twitter handle, e.g., @username" icon={<TwitterIcon />} className="bg-[#A6B0CF] bg-opacity-5 rounded-xl" />
                        <InputField label="Telegram" placeholder="Your Telegram username, e.g., @username" icon={<TelegramIcon />} className="bg-[#A6B0CF] bg-opacity-5 rounded-xl" />

                    </div>
                    <Button className="bg-white !text-[#1A1921]">Save settings</Button>
                </div>
            </SettingsLayout>

            <Modal showModal={showAvatarModal} closeModal={closeAvatarModal}>
                <div className="pb-4 md:pb-8">
                    <h2 className="text-xl font-semibold mb-2">Change avatar</h2>
                    <span className="text-base font-semibold opacity-60">Select an NFT from your wallet or buy a new one to use as your new avatar.</span>
                </div>
                <div className="relative mb-4 md:mb-8">
                    <div ref={sliderRef} className="keen-slider ">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div key={index} className="keen-slider__slide" style={{ maxWidth: '11.1rem', minWidth: '11.1rem' }}>
                                <Nft />
                            </div>
                        ))
                        }
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

            </Modal >

            <Modal showModal={showBannerModal} closeModal={closeBannerModal}>
                <h2 className="text-xl font-semibold mb-2">Change banner</h2>
                <span className="text-base font-semibold opacity-60">Select an NFT from your wallet or buy a new one to use as your new banner.</span>
            </Modal>

        </>
    );
}

export default ProfileSettings;