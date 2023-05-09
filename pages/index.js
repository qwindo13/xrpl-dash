import AppLayout from '@/components/Layouts/AppLayoutcomponents';
import PriceInfo from '@/components/Modules/FungibleTokens/PriceInfo/PriceInfocomponents';
import RichList from '@/components/Modules/FungibleTokens/RichList/RichListcomponents';
import QuickSwap from '@/components/Modules/Trades/QuickSwap/QuickSwapcomponents';


export default function Home() {


  return (

    <AppLayout>
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
    </AppLayout>
  )
}
