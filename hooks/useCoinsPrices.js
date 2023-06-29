import { useState, useEffect } from 'react';
import { config } from '../config';

export function useCoinPrices() {
  const [houndPrice, setHoundPrice] = useState(0);
  const [xrpPrice, setXrpPrice] = useState(0);

  useEffect(() => {
    const fetchData1 = async () => {
      const res = await fetch(`${config.api_url}/tokenprice/47726579686F756E640000000000000000000000:rJWBaKCpQw47vF4rr7XUNqr34i4CoXqhKJ`);
      const data = await res.json();
      const houndPrice = data.metrics.price;
      setHoundPrice(houndPrice);
    };
    const fetchData2 = async () => {
      const res = await fetch(`${config.api_url}/tokenprice/USD:rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B`);
      const data = await res.json();
      const xrpPrice = 1/data.metrics.price;
      setXrpPrice(xrpPrice);
    };

    //fetch both prices
    Promise.all([fetchData1(), fetchData2()]);
  }, []);

  return { houndPrice, xrpPrice };
}