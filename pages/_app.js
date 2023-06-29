import '../styles/globals.css'
import {config} from '../config'
import { useCoinPrices } from '@/hooks/useCoinsPrices'

export default function App({ Component, pageProps }) {
  const { houndPrice, xrpPrice } = useCoinPrices();

  return( 
  <>
  <Component {...pageProps} api_url={config.api_url} houndPrice={houndPrice} xrpPrice={xrpPrice} />
  </>
  )
}
