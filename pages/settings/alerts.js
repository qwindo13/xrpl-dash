import { useState,useEffect} from "react";
import { useRouter } from 'next/router';
import Link from "next/link";
import { motion } from "framer-motion";
import SettingsLayout from "@/components/Layouts/SettingsLayoutcomponents";
import InputField from "@/components/UI/InputField/InputFieldcomponents";
import Switch from "@/components/UI/Switch/Switchcomponents";
import TextAreaInput from "@/components/UI/TextAreaInput/TextAreaInputcomponents";
import Button from "@/components/UI/Button/Buttoncomponents";
import Modal from "@/components/UI/Modal/Modalcomponents";
import Accordion from "@/components/UI/Accordion/Accordioncomponents";
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import mockAlerts from "@/data/mockAlertscomponents";

function Alerts({ children }) {

    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false);
    const openModal = () => setShowModal(true);
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

            <Modal showModal={showModal} closeModal={closeModal}>
                <h2 className="text-xl font-semibold mb-2">New alert</h2>
                <span className="text-base font-semibold opacity-60">Select an NFT from your wallet or buy a new one to use as your new banner.</span>
            </Modal>
        </>
    );
}

export default Alerts;