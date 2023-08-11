import { useState, useEffect } from 'react';
import { config } from '../config';
const xrpl = require('xrpl');

export function useBalance() {
    const [xrpbalance, setXrpBalance] = useState(0);
    const api_url = config.api_url;

    useEffect(() => {
        //get xrp address from local storage
        const xrpAddress = localStorage.getItem('address');
        console.log(xrpAddress);
        if (xrpAddress) {
            //get xrp balance from api
            fetch(`${api_url}/walletinfo/${xrpAddress}`)
                .then(res => res.json())
                .then(data => {
                    console.log(xrpl.dropsToXrp(data.accData.result.account_data.Balance));
                    setXrpBalance(xrpl.dropsToXrp(data.accData.result.account_data.Balance));
                })
                .catch(err => console.log(err));
        }
    }, []);

    return { xrpbalance };
}