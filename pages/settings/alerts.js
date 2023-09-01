import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Link from "next/link";
import { motion } from "framer-motion";
import SettingsLayout from "@/components/Layouts/SettingsLayoutcomponents";
import InputField from "@/components/UI/InputField/InputFieldcomponents";
import Dropdown from "@/components/UI/Dropdown/Dropdowncomponents";
import TokenDropdown from "@/components/UI/ModuleCard/Settings/TokenDropdowncomponents";
import Switch from "@/components/UI/Switch/Switchcomponents";
import TextAreaInput from "@/components/UI/TextAreaInput/TextAreaInputcomponents";
import Button from "@/components/UI/Button/Buttoncomponents";
import Modal from "@/components/UI/Modal/Modalcomponents";
import Accordion from "@/components/UI/Accordion/Accordioncomponents";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { config } from '@/configcomponents';
import { useCookies } from "react-cookie";

import mockAlerts from "@/data/mockAlertscomponents";

function Alerts({ children }) {

    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false);
    const openModal = () => setShowModal(true);
    const [xrpAddress, setXrpAddress] = useState('');
    const [alertType, setAlertType] = useState('Above');
    const [targetPrice, setTargetPrice] = useState(0);
    const [currentPrice, setCurrentPrice] = useState(0);
    const [disabled, setDisabled] = useState(true);
    const [token, setToken] = useState('');
    const [cookies] = useCookies(["token"]);
    const router = useRouter();

    useEffect(() => {
        if (!cookies.token) {
            router.push('/login');
        }
    }, []);

    const onSelect = (token) => {
        setToken(token);
        setCurrentPrice(null)
        const url = `${config.api_url}/token/${token}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                let priceString = data.price.toString().split('.')[1];
                if (priceString[0] === '0') {
                    //after decimal, there can be multiple digits, check for 0s and get the number of 0s, should be from start of string and not in between
                    let numberOfZeros = 0;
                    for (let i = 0; i < priceString.length; i++) {
                        if (priceString[i] === '0') {
                            numberOfZeros++;
                        } else {
                            break;
                        }
                    }
                    //round the number according to the number of 0s, if 0s are 2, round to 3 decimal places so that 0s are not lost
                    let roundedPrice = Math.round(data.price * Math.pow(10, numberOfZeros + 2)) / Math.pow(10, numberOfZeros + 2);
                    setCurrentPrice(roundedPrice.toFixed(numberOfZeros + 3));
                } else {
                    //round to 3 decimal places
                    setCurrentPrice(Math.round(data.price * 1000) / 1000);
                }
            });
    };

    useEffect(() => {
        setTargetPrice(currentPrice)
    }, [currentPrice]);

    const setAlert = () => {
        setDisabled(true);
        // console.log('set alert'); send post request to api/setAlert, {token,alertType,alertValue:{coin,issuer,price}}
        fetch(`${config.api_url}/setAlert`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: cookies.token,
                alertType: alertType,
                alertValue: {
                    coin: token.split(':')[0],
                    issuer: token.split(':')[1],
                    price: targetPrice
                }
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                closeModal();
                setDisabled(false);
            })

    }

    return (
        <>
            <SettingsLayout>
                <div className="w-full flex flex-col gap-8">
                    <div className="flex flex-col md:flex-row justify-between w-full items-center">
                        <div className="flex flex-col">
                            <span className="text-2xl font-semibold">Alerts</span>
                            <span className="text-base font-semibold opacity-60 w-full lg:w-2/3">Stay updated on the XRPL market by managing and creating new alerts about price changes, volume increases, or other significant events.</span>
                        </div>
                        <Button onClick={openModal} endIcon={<AddRoundedIcon />}>New alert</Button>
                    </div>
                    <div className="flex flex-col gap-4">
                        {mockAlerts.map(project => (
                            <Accordion
                                key={project.id}
                                title={project.token}
                                image={{ src: project.symbol, alt: project.title }}
                            >
                                {project.alerts.map(alert => (
                                    <div className="flex flex-row w-full justify-between items-center" key={alert.id}>
                                        <div className="flex flex-col">
                                            <span className="font-semibold">{alert.type}</span>
                                            <span className="font-semibold opacity-60">{alert.description}</span>
                                        </div>
                                        <Switch checked={alert.active} />
                                    </div>
                                ))}
                            </Accordion>
                        ))}
                    </div>
                </div>
            </SettingsLayout>

            <Modal
                showModal={showModal}
                closeModal={closeModal}
                title="New alert"
                description="Create an alert to stay informed about price changes, volume increases, or other significant events."
                className="max-h-[100%]"
            >

                <div className="flex flex-col gap-8 w-full ">
                    <div className="w-fit">
                        <TokenDropdown onSelect={onSelect} num={5}/>
                    </div>
                    <div className="flex flex-col md:flex-row gap-8 w-full ">
                        <div className="w-1/2">
                            <Dropdown
                                trigger={
                                    <Button
                                        className="bg-[#A6B0CF] hover:bg-opacity-5 bg-opacity-5 rounded-xl text-medium py-4 w-full justify-between "
                                        disableAnimation
                                        endIcon={<KeyboardArrowDownRoundedIcon />}
                                    >
                                        {alertType}
                                    </Button>
                                }
                                className="w-full"
                            >
                                <button onClick={() => setAlertType('Above')} className="w-full text-left">
                                    Above</button>
                                <button onClick={() => setAlertType('Below')} className="w-full text-left">
                                    Below</button>
                            </Dropdown>
                        </div>
                        <div className="w-full md:w-1/2">
                            <InputField
                                className="bg-[#A6B0CF] bg-opacity-5 rounded-xl text-sm "
                                value={targetPrice}
                                // description={`Current Price ≈ ${currentPrice}`}
                                description={currentPrice ? `Current Price ≈ ${currentPrice} XRP` : ''}
                                onChange={(e) => setTargetPrice(e.target.value)}
                                label={'Set Target Price'}
                            />

                        </div>
                    </div>

                </div>
                <div className="flex justify-end pt-4 md:pt-8">
                    <Button className="bg-white !text-[#1A1921] w-full md:w-auto justify-center" onClick={setAlert} disabled={disabled}>
                        Set alert
                    </Button>
                </div>
            </Modal>
        </>
    );
}

export default Alerts;