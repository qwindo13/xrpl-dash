import React, { useState, useEffect } from 'react';
import Link from "next/link"
import Image from "next/image"
import Modal from "@/components/UI/Modal/Modalcomponents"
import Button from "@/components/UI/Button/Buttoncomponents"
import InputField from '@/components/UI/InputField/InputFieldcomponents';
import Stepper from '@/components/UI/Stepper/Steppercomponents';
import TagInput from '@/components/UI/TagInput/TagInputcomponents';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import mockTokens from '@/data/mockTokenscomponents';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [qrCode, setQrCode] = useState('')
  const [qrCodeUrl, setQrCodeUrl] = useState('')

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const getQrCode = async () => {
      const payload = await fetch('/api/xumm/createpayload');
      const data = await payload.json();

      setQrCode(data.payload.refs.qr_png);
      setQrCodeUrl(data.payload.next.always);

      const ws = new WebSocket(data.payload.refs.websocket_status);

      ws.onmessage = async (e) => {
        let responseObj = JSON.parse(e.data)
        if (responseObj.signed !== null && responseObj.signed !== undefined) {
          const payload = await fetch(`/api/xumm/getpayload?payloadId=${responseObj.payload_uuidv4}`)
          const payloadJson = await payload.json()

          const hex = payloadJson.payload.response.hex
          const checkSign = await fetch(`/api/xumm/checksign?hex=${hex}`)
          const checkSignJson = await checkSign.json()

          // setXrpAddress(checkSignJson.xrpAdress)
          //set cookie which expires in 1 hour
          const expires = new Date()
          expires.setHours(expires.getHours() + 1)
          document.cookie = `xrpAddress=${checkSignJson.xrpAdress}; expires=${expires.toUTCString()}; path=/`
          ws.close()

          //redirect to dashboard
          window.location.href = '/'

        }
      }
    }

    getQrCode()

  }, []);

  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (event) => setInputValue(event.target.value);

  const [currentStep, setCurrentStep] = useState(0);
  const steps = [0, 1]; // Add more steps as needed

  const goToNextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const goToPrevStep = () => setCurrentStep((prevStep) => prevStep - 1);



  return (
    <main className="p-0">
      <div className="w-full relative h-full flex flex-col md:flex-row items-center gap-8 md:gap-16 overflow-hidden">
        <div className="relative md:absolute p-4 md:p-8 z-10 top-0 l-0 w-full">
          <Link href={"/"}>
            <Image src="/images/logo.svg" alt="" width={200} height={50} className="md:block py-2 pr-4 mr-4" />
          </Link>
        </div>
        <div className="hidden md:block md:w-1/3 h-screen relative">
          <div className=" top-0 bottom-0 left-0 right-0 w-full h-screen" style={{ background: "linear-gradient(to bottom, rgba(26, 25, 33, 2) 0%, rgba(26, 25, 33, 0) 100%)" }}>
            <div className="w-full h-full !bg-cover bg-center	 ">
              <video autoPlay muted loop playsInline className="w-full h-full object-left object-cover" >
                <source src={`/videos/xrpl-city.webm`} type="video/webm" />
              </video>

            </div>
            <span
              style={{
                content: "",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                width: "100%",
                height: "100%",
                background: "linear-gradient(to bottom, rgba(26, 25, 33, 0.9) 0%, rgba(26, 25, 33, 0) 100%)"
              }}
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <div className="flex flex-col gap-4  p-4 md:p-8">
            <h1 className="font-semibold text-4xl">Connect wallet</h1>
            <span className="font-semibold text-lg opacity-60">Connect your wallet to XRPLDash quickly and easily by scanning the QR code with your XUMM app.</span>
          </div>
          <div className="flex flex-col gap-4  p-4 md:p-8">
            <Button className="w-full" onClick={openModal}><Image src="/images/xumm.png" height={30} width={30} className="mr-4" alt='xumm login' /> XUMM Wallet</Button>
            <Button className="w-full"><Image src="/images/solo-logo.svg" height={30} width={30} className="mr-4" alt='sologenic login' /> Sologenic App </Button>
          </div>
        </div>
      </div>

      <Modal showModal={showModal} closeModal={closeModal}>

        { /* Login */}
        <div >
          <Image className="absolute p-0 top-[-38px] left-0" src="/images/xumm-logo.svg" height={130} width={120} alt='XUMM' />
          <div className='w-full flex flex-row justify-between items-start pb-8 relative'>
            <h3 className='font-semibold text-xl'>Scan the QR code with XUMM app</h3>
            <button onClick={closeModal}> <CloseRoundedIcon /> </button>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-16 ">
            <div className='flex flex-col gap-16 w-full md:w-1/2 justify-between'>
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
                  <p>Follow the instructions on your app to complete the login process.</p>
                </div>
              </div>
              <div className='hidden md:flex p-4 bg-[#272832] rounded-xl'>
                <p>Don’t see a Scan option? <br></br>Update your XUMM app to the latest version and try again.</p>
              </div>
            </div>
            <div className='w-full md:w-1/2'>
              {/* <Image className="w-full blur-sm" src="/images/qr.png" height={200} width={200} alt='XUMM QR' /> */}
              {
                qrCode ?
                  <img className='w-full rounded-xl' src={qrCode} alt='XUMM QR' />
                  : <Image className="w-full blur-sm" src="/images/qr.png" height={200} width={200} alt='XUMM QR' />
              }
            </div>

          </div>
        </div>

        { /* First Time Login */}
        <div className='hidden'>
          { /* STEP 1*/}
          {currentStep === 0 &&
            <div>
              <div className='w-full flex flex-col text-center items-center pb-8 relative gap-8'>
                <h3 className='font-semibold text-2xl'>Welcome! First things first...</h3>
                <span className='text-lg opacity-60'>Get started with the XRPL Dash in seconds by following these simple steps to set up your account. </span>
                <div id="avatar" className="rounded-full bg-white p-1 bg-opacity-10">
                  <div className='w-40 h-40 aspect-square rounded-full bg-default-avatar border-4 border-[#1A1921]'></div>
                </div>
                <div className='w-full'>
                  <InputField value={inputValue} onChange={handleInputChange} isRequired label="Display name" placeholder="username123" icon="@" className="bg-[#A6B0CF] bg-opacity-5 rounded-xl" />
                </div>
              </div>
            </div>
          }
          { /* STEP 2*/}
          {currentStep === 1 &&
            <div>
              <div className='w-full flex flex-col text-center items-center pb-8 relative gap-8'>
                <h3 className='font-semibold text-2xl'>Select projects to follow</h3>
                <span className='text-lg opacity-60'>Choose which projects and tokens to follow and stay informed on the latest news and updates. </span>
                <TagInput options={mockTokens} placeholder="Insert XRPL token..." />
                <Button className='underline underline-offset-4 opacity-60	' disableAnimation>Skip this step</Button>
              </div>
            </div>
          }
          <Stepper
            currentStep={currentStep}
            steps={steps}
            onPrev={goToPrevStep}
            onNext={goToNextStep}
            canGoNext={inputValue.length > 0}
          />
        </div>

      </Modal>

    </main>
  )
}
