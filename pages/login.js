import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import Button from "@/components/UI/Button/Buttoncomponents"

export default function Home() {
  return (
    <main className="p-0">
      <div className="w-full relative h-full flex items-center gap-8 md:gap-16 overflow-hidden">
        <div className="hidden md:block md:w-1/3 h-screen relative">
          <div className="absolute p-8 z-10">
            <Link href={"/"}>
              <Image src="/images/logo.svg" alt="" width={200} height={50} className="hidden md:block py-2 pr-4 mr-4" />
              <Image src="/images/logo-icon.svg" alt="" width={50} height={50} className=" md:hidden py-2 pr-4 mr-4" />
            </Link>
          </div>
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
            <Button className="w-full"><Image src="/images/xumm.png" height={30} width={30} className="mr-4"/> XUMM Wallet</Button>
            <Button className="w-full"><Image src="/images/solo-logo.svg" height={30} width={30} className="mr-4"/> Sologenic App </Button>
          </div>
        </div>
      </div>

    </main>
  )
}
