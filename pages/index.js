import Header from '../components/Header/Header';
import ControlPanel from '../components/ControlPanel/ControlPanel';
import { Inter } from 'next/font/google'

import PriceInfo from '@/components/Modules/FungibleTokens/PriceInfo/PriceInfocomponents';
import RichList from '@/components/Modules/FungibleTokens/RichList/RichListcomponents';

import { Cookies } from 'react-cookie';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [xrpAddress, setXrpAddress] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      const cookies = new Cookies()
      const xrpAddress = cookies.get('xrpAddress')
      console.log(xrpAddress)
      if (xrpAddress) {
          setXrpAddress(xrpAddress)
          setLoading(false)
      } else {
          window.location.href = '/auth/login'
      }
    }, [])


  return (
    <>
      <>
        {loading ?
          (
            <div class="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
              <div class="flex items-center">
                <span class="text-3xl mr-4">Loading</span>
                <svg class="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                  </path>
                </svg>
              </div>
            </div>
          ) :
          <></>}
      </>
    <main>

        <Header />
        <ControlPanel />
        <div className='w-full flex flex-col md:flex-row gap-4 '>
          <div className='w-full lg:w-6/12'>
            <RichList />
          </div>
          <div className='w-full lg:w-3/12'>
            <PriceInfo />
          </div>
          <div className='w-full lg:w-3/12'>
            <PriceInfo />
          </div>
        </div>
      </main></>
  )
}
