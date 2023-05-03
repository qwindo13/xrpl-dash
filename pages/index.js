import Header from '../components/Header/Header';
import ControlPanel from '../components/ControlPanel/ControlPanel';
import Image from 'next/image'
import { Inter } from 'next/font/google'

import PriceInfo from '@/components/Modules/FungibleTokens/PriceInfo/PriceInfocomponents';
import RichList from '@/components/Modules/FungibleTokens/RichList/RichListcomponents';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center gap-16 p-8`}>
      <Header />
      <ControlPanel />
      <div className='w-full flex flex-row gap-4'>
        <div className='w-12/12 lg:w-6/12'>
          <RichList />
        </div>
        <div className='w-12/12 lg:w-3/12'>
          <PriceInfo />
        </div>
        <div className='w-12/12 lg:w-3/12'>
          <PriceInfo />
        </div>
      </div>


    </main>
  )
}
