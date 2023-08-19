import React from "react";
import Image from "next/image";
import Modal from "@/components/UI/Modal/Modalcomponents";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function TxModal({ showModal, closeModal, qrCode, qrCodeUrl, text='transaction' }) {

  return (
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
          <button onClick={closeModal}>
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
                  Follow the instructions on your app to complete the {text}.
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
          <div className="w-full h-full md:w-1/2">
            {/* <Image className="w-full blur-sm" src="/images/qr.png" height={200} width={200} alt='XUMM QR' /> */}
            {qrCode ? (
              <a href={qrCodeUrl} target="_blank" rel="noreferrer">
                <Image
                  className="w-full rounded-xl"
                  src={qrCode}
                  alt="XUMM QR"
                  height={500}
                  width={500}
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
  );
}
