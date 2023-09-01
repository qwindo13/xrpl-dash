import '../styles/globals.css'
import {config} from '../config'
import Toast from "@/components/UI/Toast/Toastcomponents";
import { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";

export default function App({ Component, pageProps }) {
  const [cookies] = useCookies(["token"]);
  const [alerts, setAlerts] = useState([]);

  const hexToString = (hex) => {
    let string = "";
    for (let i = 0; i < hex.length; i += 2) {
        const code = parseInt(hex.substr(i, 2), 16);
        if (code !== 0) {
        string += String.fromCharCode(code);
        }
    }
    return string;
  };

  useEffect(() => {
    //get alerts from api/getNotifiedAlerts
    fetch(`${config.api_url}/getNotifiedAlerts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: cookies.token
        }),
    })
        .then(response => response.json())
        .then(data => {
            // console.log('Success:', data.data);
            // setAlerts(data.data); //type: array of objects, each object has: {alert:{type,value:{coin,issuer,price,img}},created_at,hit_at,notified} For now we group the same coin alerts together and put them in an array
            if (!data.hasOwnProperty('data')) {
                return;
            }
            const alerts = data.data;
            const alertsArray = [];
            for (let i = 0; i < alerts.length; i++) {
                const alert = alerts[i];
                //if currency.length > 3, then convert it to string
                if (alert.alert.value.coin.length > 3) {
                    alert.alert.value.coin = hexToString(alert.alert.value.coin);
                }
                //if img = "", then set it to https://ui-avatars.com/api/?name=G&rounded=true (first letter of coin)
                if (alert.alert.value.img === "") {
                    alert.alert.value.img = `https://ui-avatars.com/api/?name=${alert.alert.value.coin[0]}&rounded=true`;
                }
                //convert hit_at from unix timestamp to date
                const date = new Date(alert.hit_at * 1000);
                alert.hit_at = date.toLocaleString();
                //append the alert to the alertsArray
                alertsArray.push(alert);
            }
            setAlerts(alertsArray);
            console.log(alertsArray);
        })
}, []);

  const deleteAlert = (e, id) => {
    e.preventDefault();
    e.currentTarget.disabled = true;
    //send post req at api/deleteAlert, {token,alertId}
    fetch(`${config.api_url}/deleteAlert`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: cookies.token,
            alertId: id
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            if (data.success) {
                //remove the alert from the alerts array
                const newAlerts = alerts.filter(alert => alert.id !== id);
                setAlerts(newAlerts);
            }
        })
  }

  return( 
  <>
    <Component {...pageProps} api_url={config.api_url}/>
    {/* <Toast /> */}
    {alerts.length > 0 && alerts.map(alert => {
        return (
            <Toast
                key={alert.id}
                // message={`Your alert for ${alert.alert.value.coin} has been triggered at ${alert.hit_at}, The price just went ${alert.alert.type} ${alert.alert.value.price}!`}
                message={`Alert for ${alert.alert.value.coin} triggered at ${alert.hit_at}, The price just went ${alert.alert.type} ${alert.alert.value.price}!`}
                icon={<img src={alert.alert.value.img} className="w-6 h-6 rounded-full" />}
                onClose={(e) => deleteAlert(e, alert.id) }
                title={`${alert.alert.value.coin} Alert`}
            />
        )
    })}
  </>
  )
}
