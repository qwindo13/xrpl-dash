import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from 'framer-motion';
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import AppLayout from "@/components/Layouts/AppLayoutcomponents";
import PriceInfo from "@/components/Modules/FungibleTokens/PriceInfo/PriceInfocomponents";
import Feed from "@/components/Modules/Feeds/Feed/Feedcomponents";
import RichList from "@/components/Modules/FungibleTokens/RichList/RichListcomponents";
import QuickSwap from "@/components/Modules/Trades/QuickSwap/QuickSwapcomponents";
import Wallet from "@/components/Modules/FungibleTokens/Wallet/Walletcomponents";
import Badges from "@/components/Modules/NonFungibleTokens/Badges/Badgescomponents";
import ProfitnLose from "@/components/Modules/Trades/ProfitnLoss/ProfitnLosscomponents";
import mockFeed from "@/data/mockFeedcomponents";
import SaveIcon from '@mui/icons-material/Save';
import {
  priceInfoSize,
  richListSize,
  quickSwapSize,
  walletSize,
  feedSize,
  badges,
  profitnLose,
} from "@/components/Utils/ModuleSizescomponents";
import { useCookies } from "react-cookie";
import { config } from "@/configcomponents";
import Loader from "@/components/UI/Loader/Loadercomponents";
import Toast from "@/components/UI/Toast/Toastcomponents";

export default function Home({ houndPrice, xrpPrice }) {
  const gridContainerRef = useRef(null); // Create a reference to the parent
  const [gridWidth, setGridWidth] = useState(null); // Initialize gridWidth with null
  const [xrpAddress, setXrpAddress] = useState(null);
  // const [modules, setModules] = useState(['wallet', 'priceinfo', 'quickswap', 'badges']);
  const [modules, setModules] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [loading, setLoading] = useState(false);
  const [changeCount, setChangeCount] = useState(0);
  const router = useRouter();
  const api_url = config.api_url;

  // Update the gridWidth on window resize and component mount
  useEffect(() => {
    const handleResize = () => {
      if (gridContainerRef.current) {
        setGridWidth(gridContainerRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Define the layout configuration
  const [layout, setLayout] = useState({
    lg: [
      // { i: 'badges', x: 2, y: 0, ...badges.lg },
      // { i: 'priceinfo', x: 2, y: 0, ...priceInfoSize.lg },
      // { i: 'richlist', x: 0, y: 0, ...richListSize.lg },
      // { i: 'quickswap', x: 3, y: 0, ...quickSwapSize.lg },
      // { i: 'wallet', x: 0, y: 2, ...walletSize.lg },
      // { i: 'feed', x: 2, y: 2, ...feedSize.lg },
    ],
    md: [
      //     { i: 'priceinfo', x: 2, y: 0, ...priceInfoSize.md },
      //     { i: 'richlist', x: 0, y: 0, ...richListSize.md },
      //     { i: 'quickswap', x: 2, y: 0, ...walletSize.md },
      //     { i: 'feed', x: 0, y: 0, ...feedSize.md },
    ],
    sm: [
      // { i: 'priceinfo', x: 0, y: 0, ...priceInfoSize.sm },
      // { i: 'richlist', x: 0, y: 0, ...richListSize.sm },
      // { i: 'quickswap', x: 3, y: 0, ...quickSwapSize.sm },
      // { i: 'wallet', x: 0, y: 0, ...walletSize.sm },
      // { i: 'feed', x: 0, y: 0, ...feedSize.sm },
    ],
  });

  const handleLayoutChange = (currentLayout) => {
    console.log("Layout changed:", currentLayout);
    setChangeCount(changeCount + 1);
    if (currentLayout.length > 0) {
      const layoutInStorage = JSON.parse(localStorage.getItem("layout"));
      if (layoutInStorage !== null) {
        layoutInStorage.lg = currentLayout;
        layoutInStorage.md = currentLayout;
        layoutInStorage.sm = currentLayout;
        localStorage.setItem("layout", JSON.stringify(layoutInStorage));
      }
    }
  };

  useEffect(() => {
    const token = cookies.token;
    const layout = localStorage.getItem("layout");
    const modules = localStorage.getItem("modules");
    if (token === undefined || token === null || token === "") {
      localStorage.removeItem("address");

      //get the layout from local storage
      if (layout !== null && layout !== undefined) {
        setLayout(JSON.parse(localStorage.getItem("layout")));
      }
      if (modules !== null && modules !== undefined) {
        setModules(JSON.parse(localStorage.getItem("modules")));
      }
    } else {
      const addy = localStorage.getItem("address");
      if (addy !== null) {
        // console.log("setting address");
        setXrpAddress(addy);
        //getLayout from api
        fetch(`${api_url}/getLayout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.data.layout[0].hasOwnProperty("modules")) {
              console.log(`hit modules`)
              if (
                data.data.layout[0].modules !== null &&
                data.data.layout[0].modules !== undefined
              ) {
                setModules(data.data.layout[0].modules);
                localStorage.setItem("modules", JSON.stringify(data.data.layout[0].modules));
              }
            }
            if (data.data.layout[1].hasOwnProperty("layout")) {
              console.log(`hit layout`)
              if (
                data.data.layout[1].layout !== null &&
                data.data.layout[1].layout !== undefined
              ) {
                setLayout(data.data.layout[1].layout);
                localStorage.setItem("layout", JSON.stringify(data.data.layout[1].layout));
              }
            }
          });
      } else {
        // console.log("redirecting");
        //get the layout from local storage
        if (layout !== null && layout !== undefined) {
          setLayout(JSON.parse(localStorage.getItem("layout")));
        }
        if (modules !== null && modules !== undefined) {
          setModules(JSON.parse(localStorage.getItem("modules")));
        }
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //every 10 seconds, send the current layout to the api
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("sending layout to api");
      const token = cookies.token;
      if (token === undefined || token === null || token === "") {
        console.log("no token");
      } else {
        if (changeCount > 0) {
          //update the layout in the api
          fetch(`${api_url}/updateLayout`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: token,
              layout: [
                { modules: JSON.parse(localStorage.getItem("modules")) },
                { layout: JSON.parse(localStorage.getItem("layout")) },
              ],
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
            })
            .catch((err) => {
              console.log(err);
            });
          setChangeCount(0);
          //set loading to true for 3 seconds
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 3000);
        }
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [changeCount]); // eslint-disable-line react-hooks/exhaustive-deps

  const onClickTitle = (title) => {
    const name = `${title.toLowerCase().replace(/\s/g, "")}_${Date.now()}`;
    console.log(name);
    setModules([...modules, name]);
    const size =
      title === "Price Info"
        ? priceInfoSize
        : title === "Richlist"
          ? richListSize
          : title === "Quick Swap"
            ? quickSwapSize
            : title === "Wallet"
              ? walletSize
              : title === "Feed"
                ? feedSize
                : title === "Badges"
                  ? badges
                  : profitnLose;
    const layout = JSON.parse(localStorage.getItem("layout")) || {
      lg: [],
      md: [],
      sm: [],
    };
    const newLayout = {
      lg: [...layout.lg, { i: name, x: 0, y: 0, ...size.lg }],
      md: [...layout.md, { i: name, x: 0, y: 0, ...size.md }],
      sm: [...layout.sm, { i: name, x: 0, y: 0, ...size.sm }],
    };
    console.log(`newLayout: ${JSON.stringify(newLayout)}`)

    setLayout(newLayout);
    localStorage.setItem("layout", JSON.stringify(newLayout));
    localStorage.setItem("modules", JSON.stringify([...modules, name]));
  };

  return (

    <AppLayout
      showControlPanel
      onClickTitle={onClickTitle}
      className="overflow-hidden"
    >
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{
              opacity: { duration: 0.3 },
              scale: { type: 'spring', stiffness: 500, damping: 30 }
            }}
            className={`fixed bottom-8 right-8`}
          >
            <span className="animate-pulse"><SaveIcon sx={{ fontSize: 40 }} /></span>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={gridContainerRef} className="w-full">
        {" "}
        {/* Attach the reference to the parent */}
        <ResponsiveGridLayout
          className="layout"
          layouts={layout}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 6, md: 4, sm: 4, xs: 2, xxs: 2 }}
          width={gridWidth} // Pass the calculated gridWidth
          rowHeight={198}
          margin={[16, 16]}
          containerPadding={[0, 0]}
          isResizable={true}
          isDraggable={true}
          preventCollision={false}
          autoSize={true}
          onLayoutChange={handleLayoutChange}
        >
          {modules.map((module) => {
            if (module.startsWith("priceinfo")) {
              return (
                <div key={module}>
                  <PriceInfo />
                </div>
              );
            } else if (module.startsWith("feed")) {
              return (
                <div key={module}>
                  <Feed feed={mockFeed} />
                </div>
              );
            } else if (module.startsWith("richlist")) {
              return (
                <div key={module}>
                  <RichList />
                </div>
              );
            } else if (module.startsWith("quickswap")) {
              return (
                <div key={module}>
                  <QuickSwap />
                </div>
              );
            } else if (module.startsWith("wallet")) {
              return (
                <div key={module}>
                  <Wallet />
                </div>
              );
            } else if (module.startsWith("badges")) {
              return (
                <div key={module}>
                  <Badges />
                </div>
              );
            } else if (module.startsWith("profitandloss")) {
              return (
                <div key={module}>
                  <ProfitnLose />
                </div>
              );
            }
          })}
        </ResponsiveGridLayout>
      </div>
    </AppLayout>
  );
}
