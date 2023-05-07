import Header from '../components/Header/Header';
import ControlPanel from '../components/ControlPanel/ControlPanel';
import { Inter } from 'next/font/google'

import PriceInfo from '@/components/Modules/FungibleTokens/PriceInfo/PriceInfocomponents';
import RichList from '@/components/Modules/FungibleTokens/RichList/RichListcomponents';
import QuickSwap from '@/components/Modules/Trades/QuickSwap/QuickSwapcomponents';


export default function Home() {


  return (

    <main>
      <Header />
      <ControlPanel />
      <div className='w-full flex flex-col md:flex-row gap-4 '>
        <div className='w-full lg:w-6/12'>
          <RichList />
        </div>
        <div className='w-full lg:w-6/12'>
          <QuickSwap />
        </div>
        <div className='w-full lg:w-3/12'>
          <PriceInfo />
        </div>
      </div>
    </main>
  )
}
