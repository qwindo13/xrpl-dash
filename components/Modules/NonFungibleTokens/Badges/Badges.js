import React, { useEffect, useState } from "react";
import Image from 'next/image';
import ModuleCard from '@/components/UI/ModuleCard/ModuleCardcomponents';
import TitleSwitch from '@/components/UI/ModuleCard/Settings/TitleSwitchcomponents';
import BackgroundTabs from "@/components/UI/ModuleCard/Settings/BackgroundTabscomponents";
import SliderButton from "@/components/UI/SliderButton/SliderButtoncomponents";
import WalletPrompt from "@/components/UI/WalletPrompt/WalletPromptcomponents";
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';

const defaultSettings = {
    displayTitle: true,
    backgroundSetting: "Transparent",
};

const Badges = ({ nfts,onClickRemove, onClickStatic }) => {
    
    const [moduleSettings, setModuleSettings] = useState(defaultSettings);
    const updateSettings = (key, value) => {
        setModuleSettings((prevSettings) => ({
            ...prevSettings,
            [key]: value,
        }));
    };

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

    const [xrpAddress, setXrpAddress] = useState(null);

    useEffect(() => {
        const address = localStorage.getItem("address");
        setXrpAddress(address);
      }, []);


    const backgroundClass = moduleSettings.backgroundSetting === 'Solid' ? '' :
        moduleSettings.backgroundSetting === 'Highlight' ? 'bg-[#525567] ' :
            moduleSettings.backgroundSetting === 'Transparent' ? 'bg-transparent backdrop-blur-lg border border-white border-opacity-5' : '';

    const [badges, setBadges] = useState([])
    
    useEffect(() => {
        // console.log(nfts)
        //if nft.taxon === 2 and nft.Issuer === "rpZidWw84xGD3dp7F81ajM36NZnJFLpSZW", then add to badges
        const filteredBadges = nfts.filter(nft => nft.taxon === 2 && nft.issuer === "rpZidWw84xGD3dp7F81ajM36NZnJFLpSZW") || []
        setBadges(filteredBadges)
    }, [nfts])


    return (
        <ModuleCard
        onClickRemove={onClickRemove}
        onClickStatic={onClickStatic}
        title="My Badges"
        settings={
            <>
                <TitleSwitch
                    value={moduleSettings.displayTitle}
                    onChange={(value) => updateSettings("displayTitle", value)}
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
            <div className="relative w-full">
                <div ref={sliderRef} className="keen-slider w-full ">
                    {
                        badges.map((badge, index) => (
                            <div key={index} className="keen-slider__slide" style={{ maxWidth: '7rem', minWidth: '7rem' }}>
                                <Image src={badge.image} width={300} height={300} alt='Badge' />
                            </div>
                        ))
                    }
                </div>
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 flex flex-row justify-between">
                    {loaded && instanceRef.current && (
                        <>
                            <SliderButton
                                left
                                onClick={(e) => e.stopPropagation() || instanceRef.current?.prev()}
                                disabled={currentSlide === 0}
                            />
                        </>
                    )}
                </div>
                <div className="absolute top-1/2 right-0 transform -translate-y-1/2 flex flex-row justify-between">
                    {loaded && instanceRef.current && 'track' in instanceRef.current && 'details' in instanceRef.current.track && 'slides' in instanceRef.current.track.details && (
                        <>
                            <SliderButton
                                right
                                onClick={(e) => e.stopPropagation() || instanceRef.current?.next()}
                                disabled={currentSlide === instanceRef.current.track.details.slides.length - 3}
                            />
                        </>
                    )}
                </div>
            </div>
        ) : (
           <WalletPrompt />
        )}
    </ModuleCard>
    );
};

export default Badges;
