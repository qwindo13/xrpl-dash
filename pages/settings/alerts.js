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
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { config } from '@/configcomponents';
import { useCookies } from "react-cookie";
const xrpl = require('xrpl')

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
    const [tokenImg, setTokenImg] = useState('');
    const [alerts, setAlerts] = useState([]); 
    const [cookies] = useCookies(["token"]);
    const router = useRouter();

    useEffect(() => {
        if (!cookies.token) {
            router.push('/login');
        }

        //get alerts from api/getAlerts
        fetch(`${config.api_url}/getAlerts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: cookies.token
            }),
        })
            .then(response => response.json())
            .then(data => {
                // console.log('Success:', data.data);
                // setAlerts(data.data); //type: array of objects, each object has: {alert:{type,value:{coin,issuer,price,img}},created_at,hit_at,notified} For now we group the same coin alerts together and put them in an array
                if (!data.hasOwnProperty('data')) {
                    return;
                }
                const uniqueCoins = [...new Set(data.data.map(item => item.alert.value.coin))];
                let alertsArray = [];
                uniqueCoins.forEach(coin => {
                    let coinAlerts = data.data.filter(item => item.alert.value.coin === coin);
                    alertsArray.push(coinAlerts);
                });
                console.log(alertsArray);
                setAlerts(alertsArray);
            })
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
                if (data.hasOwnProperty('icon')) {
                    setTokenImg(data.icon);
                }
            });
    };

    useEffect(() => {
        setTargetPrice(currentPrice)
    }, [currentPrice]);

    const setAlert = (e) => {
        e.preventDefault();
        e.currentTarget.disabled = true;
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
                    price: targetPrice,
                    img: tokenImg
                }
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                closeModal();
                setDisabled(false);
                setToken('');
                setTokenImg('');
                setTargetPrice(0);
                setCurrentPrice(0);
                //get alerts from api/getAlerts
                fetch(`${config.api_url}/getAlerts`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: cookies.token
                    }),
                })
                    .then(response => response.json())
                    .then(data => {
                        if (!data.hasOwnProperty('data')) {
                            return;
                        }
                        const uniqueCoins = [...new Set(data.data.map(item => item.alert.value.coin))];
                        let alertsArray = [];
                        uniqueCoins.forEach(coin => {
                            let coinAlerts = data.data.filter(item => item.alert.value.coin === coin);
                            alertsArray.push(coinAlerts);
                        });
                        console.log(alertsArray);
                        setAlerts(alertsArray);
                    })
            })

    }

    const deleteAlert = (e) => {
        e.preventDefault();
        e.currentTarget.disabled = true;
        //send post req at api/deleteAlert, {token,alertId}
        fetch(`${config.api_url}/deleteAlert`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: cookies.token,
                alertId: e.currentTarget.id
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                //get alerts from api/getAlerts
                fetch(`${config.api_url}/getAlerts`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: cookies.token
                    }),
                })
                    .then(response => response.json())
                    .then(data => {
                        if (!data.hasOwnProperty('data')) {
                            return;
                        }
                        const uniqueCoins = [...new Set(data.data.map(item => item.alert.value.coin))];
                        let alertsArray = [];
                        uniqueCoins.forEach(coin => {
                            let coinAlerts = data.data.filter(item => item.alert.value.coin === coin);
                            alertsArray.push(coinAlerts);
                        });
                        console.log(alertsArray);
                        setAlerts(alertsArray);
                    })
            })
    }

    const hexToString = (hex) => {
        let string = "";
        for (let i = 0; i < hex.length; i += 2) {
            const code = parseInt(hex.substr(i, 2), 16);
            if (code !== 0) {
            string += String.fromCharCode(code);
            }
        }
        return string;
    };

    return (
        <>
            <SettingsLayout>
                <div className="w-full flex flex-col gap-8">
                    <div className="flex flex-col md:flex-row justify-between w-full items-center">
                        <div className="flex flex-col mb-4">
                            <span className="text-2xl font-semibold mb-2">Alerts</span>
                            <span className="text-base font-semibold opacity-60 w-full lg:w-2/3">Stay updated on the XRPL market by managing and creating new alerts about price changes, volume increases, or other significant events.</span>
                        </div>
                        <Button className='w-full md:w-auto' onClick={openModal} endIcon={<AddRoundedIcon sx={{ fontSize: 16 }}/>}>New alert</Button>
                    </div>
                    <div className="flex flex-col gap-4">
                        {/* {mockAlerts.map(project => (
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
                                        <Button className="!p-0 bg-transparent"><DeleteOutlineRoundedIcon /></Button>
                                    </div>
                                ))}
                            </Accordion>
                        ))} */}
                        {
                            alerts && alerts.map((project, index) => (
                                <Accordion
                                    key={index}
                                    // title={project[0].alert.value.coin} if its more than 3 letters, convert from hex to string
                                    title={project[0].alert.value.coin.length > 3 ? hexToString(project[0].alert.value.coin) : project[0].alert.value.coin}
                                    // image={{ src: project[0].alert.value.img, alt: project[0].alert.value.coin }} if image string is empty, use https://ui-avatars.com/api/?name='first letter of coin'
                                    image={{ src: project[0].alert.value.img ? project[0].alert.value.img : project[0].alert.value.coin.length > 3 ? `https://ui-avatars.com/api/?name=${hexToString(project[0].alert.value.coin)[0]}&rounded=true` : `https://ui-avatars.com/api/?name=${project[0].alert.value.coin[0]}&rounded=true`, alt: project[0].alert.value.coin }}
                                >
                                    {project.map(alert => (
                                        <div className="flex flex-row w-full justify-between items-center" key={alert.id}>
                                            <div className="flex flex-col">
                                                <span className="font-semibold">Price Alert</span>
                                                <span className="font-semibold opacity-60">{alert.alert.type} {alert.alert.value.price} XRP</span>
                                            </div>
                                            <Button className="!p-0 bg-transparent"><DeleteOutlineRoundedIcon id={alert.id} onClick={deleteAlert} /></Button>
                                        </div>
                                    ))}
                                </Accordion>
                            ))
                        }

                    </div>
                </div>
            </SettingsLayout>

            {/* CREATE ALERT MODAL */}
            <Modal
                showModal={showModal}
                closeModal={closeModal}
                title="New alert"
                description="Create an alert to stay informed about price changes, volume increases, or other significant events."
                className="max-h-[100%]"
            >

                <div className="flex flex-col gap-8 w-full ">
                    <div className="w-fit">
                        <TokenDropdown onSelect={onSelect} num={5} selectToken="Select token" />
                    </div>
                    <div className="flex flex-row gap-8 w-full items-start">
                       
                        <div className="w-1/2">
                            <InputField
                                className="bg-[#A6B0CF] bg-opacity-5 rounded-xl text-sm !h-12"
                                value={targetPrice}
                                // description={`Current Price ≈ ${currentPrice}`}
                                description={currentPrice ? `Current Price ≈ ${currentPrice} XRP` : ''}
                                onChange={(e) => setTargetPrice(e.target.value)}
                                label={'Set Target Price'}
                            />

                        </div>
                        <div className="w-1/2">
                            <Dropdown
                                trigger={
                                    <Button
                                        className="bg-[#A6B0CF] hover:bg-opacity-5 !bg-opacity-5 rounded-xl text-medium !h-12 w-full justify-between !mt-8"
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
                    </div>

                </div>
                <div className="flex justify-end pt-4 md:pt-8">
                    {/* <Button className="bg-white !text-[#1A1921] w-full md:w-auto justify-center" onClick={() => (setDisabled(true); setAlert())} disabled={disabled}> */}
                    <Button className="bg-white !text-[#1A1921] w-full md:w-auto justify-center" onClick={setAlert} disabled={disabled}>
                        Set alert
                    </Button>
                </div>
            </Modal>
        </>
    );
}

export default Alerts;