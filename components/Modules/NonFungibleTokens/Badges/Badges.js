import React, { useEffect, useState } from "react";
import Image from 'next/image';
import ModuleCard from '@/components/UI/ModuleCard/ModuleCardcomponents';
import TitleSwitch from '@/components/UI/ModuleCard/Settings/TitleSwitchcomponents';
import BackgroundTabs from "@/components/UI/ModuleCard/Settings/BackgroundTabscomponents";
import SliderButton from "@/components/UI/SliderButton/SliderButtoncomponents";
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';


const defaultSettings = {
    displayTitle: true,
    backgroundSetting: "Transparent",
};



const Badges = ({ data }) => {
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

    const [address, setAddress] = useState(null)
    const [blurClass, setBlurClass] = useState("w-full h-full flex flex-col justify-center")
    useEffect(() => {
        const add = localStorage.getItem('address')
        if (add) {
            setAddress(add)
        } else {
            setBlurClass("w-full h-full flex flex-col justify-center blur-sm")
        }
    }, [])

    const backgroundClass = moduleSettings.backgroundSetting === 'Solid' ? '' :
        moduleSettings.backgroundSetting === 'Highlight' ? 'bg-[#525567] ' :
            moduleSettings.backgroundSetting === 'Transparent' ? 'bg-transparent backdrop-blur-lg border border-white border-opacity-5' : '';

    return (
        <ModuleCard
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

            {
                !address && (
                    <div className="w-full h-full justify-center">
                        <div className="items-center">
                            <div className="text-sm font-semibold text-white">Connect your wallet to view your badges</div>
                        </div>
                    </div>
                )
            }
            <div className={blurClass}>        
            <div className="relative">
                    <div ref={sliderRef} className="keen-slider ">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} className="keen-slider__slide" style={{ maxWidth: '7rem', minWidth: '7rem' }}>
                                <Image src='/images/badge.webp' width={300} height={300} alt='asdasd'/>
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
            </div>

        </ModuleCard>
    );
};

export default Badges;
