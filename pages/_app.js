import "../styles/globals.css";
import { config } from "../config";
import Toast from "@/components/UI/Toast/Toastcomponents";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function App({ Component, pageProps }) {
  const [cookies] = useCookies(["token"]);
  const [alerts, setAlerts] = useState([]);
  const [nfts2, setNfts2] = useState([]);
  const [refresh, setRefresh] = useState(false);

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

  const convertHexToString = (hex) => {
    let string = "";
    for (let i = 0; i < hex.length; i += 2) {
      string += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return string;
  };

  useEffect(() => {
    if (cookies.token) {
      //get alerts from api/getNotifiedAlerts
      fetch(`${config.api_url}/getNotifiedAlerts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: cookies.token,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log('Success:', data.data);
          // setAlerts(data.data); //type: array of objects, each object has: {alert:{type,value:{coin,issuer,price,img}},created_at,hit_at,notified} For now we group the same coin alerts together and put them in an array
          if (!data.hasOwnProperty("data")) {
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
        });
    }
  }, []);

  useEffect(() => {
    async function fetchNfts(nfts) {
      const nfts2 = [];

      for (const nft of nfts) {
        if (!nft.URI) continue;

        const decoded = convertHexToString(nft.URI);
        let image = "";
        let urlNft = "";

        if (decoded.startsWith("https://")) {
          image = await getImageFromUrl(decoded);
          urlNft = decoded;
        } else if (decoded.startsWith("ipfs://")) {
          const cid = decoded.replace("ipfs://", "https://ipfs.io/ipfs/");
          image = await getImageFromUrl(cid);
          urlNft = cid;
        } else {
          image = await getImageFromUrl(`https://ipfs.io/ipfs/${decoded}`);
          urlNft = `https://ipfs.io/ipfs/${decoded}`;
        }

        if (!image) continue;
        const { data: nftData } = await axios.get(urlNft);

        const videoFlag = isVideo(nftData);
        const imageSrc = getImageSrc(image);

        // setNfts2((nfts2) => [
        //   ...nfts2,
        //   {
        //     nftid: nft.NFTokenID,
        //     image: imageSrc,
        //     videoFlag,
        //     name: nftData.name,
        //     taxon: nft.NFTokenTaxon,
        //     issuer: nft.Issuer,
        //   },
        // ]);
        nfts2.push({
          nftid: nft.NFTokenID,
          image: imageSrc,
          videoFlag,
          name: nftData.name,
          taxon: nft.NFTokenTaxon,
          issuer: nft.Issuer,
        });
      }

      setNfts2(nfts2);
    }

    function convertHexToString(hex) {
      return hex.match(/.{1,2}/g).map((byte) => String.fromCharCode(parseInt(byte, 16))).join("");
    }

    async function getImageFromUrl(url) {
      try {
        const { data } = await axios.get(url);
        return data.image;
      } catch (error) {
        console.error(`Failed to fetch image from ${url}: ${error.message}`);
        return null;
      }
    }

    function isVideo(nftData) {
      return (
        "video" in nftData &&
        nftData.video !== undefined &&
        nftData.video !== "" &&
        !nftData.video.endsWith(".gif")
      ) || (
        "animation" in nftData &&
        nftData.animation !== undefined &&
        nftData.animation !== "" &&
        !nftData.animation.endsWith(".gif")
      );
    }

    function getImageSrc(image) {
      if (image.startsWith("ipfs://")) {
        return `https://ipfs.io/ipfs/${image.replace("ipfs://", "")}`;
      } else if (image.startsWith("https://")) {
        return image;
      } else {
        return `https://ipfs.io/ipfs/${image}`;
      }
    }

    if (cookies.token) {
      const xrpAddress = localStorage.getItem("address");
      if (xrpAddress) {
        const url = `${config.api_url}/walletnfts/${xrpAddress}`;
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            if (data && "nfts" in data) {
              fetchNfts(data.nfts);
            }
          });
      }
    }
  }, [refresh]);

    const refreshNfts = () => {
        setRefresh(!refresh);
    }

  const deleteAlert = (e, id) => {
    e.preventDefault();
    e.currentTarget.disabled = true;
    //send post req at api/deleteAlert, {token,alertId}
    fetch(`${config.api_url}/deleteAlert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: cookies.token,
        alertId: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.success) {
          //remove the alert from the alerts array
          const newAlerts = alerts.filter((alert) => alert.id !== id);
          setAlerts(newAlerts);
        }
      });
  };

  return (
    <>
      <Component {...pageProps} api_url={config.api_url} nfts={nfts2} refreshNfts={refreshNfts} />

      {/* ALERTS */}
      {alerts.length > 0 &&
        alerts.map((alert) => {
          return (
            <Toast
              key={alert.id}
              // message={`Your alert for ${alert.alert.value.coin} has been triggered at ${alert.hit_at}, The price just went ${alert.alert.type} ${alert.alert.value.price}!`}
              message={`${alert.alert.value.coin} is trading ${alert.alert.type} your specified price of ${alert.alert.value.price} XRP.`}
              icon={
                <img
                  src={alert.alert.value.img}
                  className="w-6 h-6 rounded-full"
                />
              }
              onClose={(e) => deleteAlert(e, alert.id)}
              title={`Price Alert - ${alert.alert.value.coin}`}
            />
          );
        })}
    </>
  );
}
