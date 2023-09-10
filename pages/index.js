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
import SingleNft from "@/components/Modules/NonFungibleTokens/SingleNft/SingleNftcomponents";
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
  singleNftSize
} from "@/components/Utils/ModuleSizescomponents";
import { useCookies } from "react-cookie";
import { config } from "@/configcomponents";
import Loader from "@/components/UI/Loader/Loadercomponents";

export default function Home() {
  const gridContainerRef = useRef(null); // Create a reference to the parent
  const [gridWidth, setGridWidth] = useState(null); // Initialize gridWidth with null
  const [xrpAddress, setXrpAddress] = useState(null);
  const [modules, setModules] = useState([]);
  const [cookies] = useCookies(["token"]);
  const [loading, setLoading] = useState(false);
  const [changeCount, setChangeCount] = useState(0);
  const [nftIndexes, setNftIndexes] = useState({});
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
    ],
    md: [
    ],
    sm: [
    ],
  });

  const handleLayoutChange = (currentLayout) => {
    setChangeCount(changeCount + 1);
    if (currentLayout.length > 0) {
      const layout = localStorage.getItem("layout");
      if (layout !== null && layout !== undefined && layout !== "" && layout !== "null" && layout !== "undefined") {
        const layoutInStorage = JSON.parse(localStorage.getItem("layout"));
        if (layoutInStorage !== null) {
          layoutInStorage.lg = currentLayout;
          layoutInStorage.md = currentLayout;
          layoutInStorage.sm = currentLayout;
          localStorage.setItem("layout", JSON.stringify(layoutInStorage));
        } else {
          localStorage.setItem("layout", JSON.stringify({
            lg: currentLayout,
            md: currentLayout,
            sm: currentLayout,
          }));
        }
      } else {
        localStorage.setItem("layout", JSON.stringify({
          lg: currentLayout,
          md: currentLayout,
          sm: currentLayout,
        }));
      }
    }
  };

  useEffect(() => {
    const token = cookies.token;
    const layout = localStorage.getItem("layout");
    const modules = localStorage.getItem("modules");
    if (modules === undefined || modules === null || modules === "" || modules === "null" || modules === "undefined") {
      localStorage.removeItem("modules");
      localStorage.removeItem("layout");
    }
    if (layout === undefined || layout === null || layout === "" || layout === "null" || layout === "undefined") {
      localStorage.removeItem("modules");
      localStorage.removeItem("layout");
    }
    if (token === undefined || token === null || token === "") {
      localStorage.removeItem("address");

      //get the layout from local storage
      if (layout !== null && layout !== undefined && layout !== "" && layout !== "null" && layout !== "undefined") {
        setLayout(JSON.parse(localStorage.getItem("layout")));
      }
      if (modules !== null && modules !== undefined && modules !== "" && modules !== "null" && modules !== "undefined") { 
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
            if (data.hasOwnProperty("error")) {
              console.log("error from api");
              return;
            }

            if (data.data.layout.length === 2) {
                localStorage.removeItem("modules");
                localStorage.removeItem("layout");
                //set the layout in local storage
                if (data.data.layout[1].layout.length === 0) {
                  localStorage.setItem("layout", JSON.stringify({
                    lg: [],
                    md: [],
                    sm: [],
                  }));
                } else {
                  localStorage.setItem("layout", JSON.stringify(data.data.layout[1].layout[0]));
                  setLayout(data.data.layout[1].layout[0]);
                }
                if (data.data.layout[0].modules.length === 0) {
                  localStorage.setItem("modules", JSON.stringify([]));
                } else {
                  localStorage.setItem("modules", JSON.stringify(data.data.layout[0].modules));
                  setModules(data.data.layout[0].modules);
                }
            }
          });
      } else {
        // console.log("redirecting");
        //get the layout from local storage
        if (layout !== null && layout !== undefined && layout !== "" && layout !== "null" && layout !== "undefined") {
          setLayout(JSON.parse(localStorage.getItem("layout")));
        }
        if (modules !== null && modules !== undefined && modules !== "" && modules !== "null" && modules !== "undefined") {
          setModules(JSON.parse(localStorage.getItem("modules")));
        }
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //every 10 seconds, send the current layout to the api
  useEffect(() => {
    const interval = setInterval(() => {
      const token = cookies.token;
      const modules = [];
      const layout = [];
      const localModules = localStorage.getItem("modules");
      const localLayout = localStorage.getItem("layout");
      if (localModules !== null && localModules !== undefined && localModules !== "" && localModules !== "null" && localModules !== "undefined") {
        // modules = JSON.parse(localStorage.getItem("modules"));
        JSON.parse(localStorage.getItem("modules")).forEach((module) => {
          modules.push(module);
        });
      }
      if (localLayout !== null && localLayout !== undefined && localLayout !== "" && localLayout !== "null" && localLayout !== "undefined") {
        layout.push(JSON.parse(localStorage.getItem("layout")));
      }
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
                { "modules" : modules },
                { "layout" : layout },
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
                  : title === "singlenft"
                    ? singleNftSize
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

    setLayout(newLayout);
    localStorage.setItem("layout", JSON.stringify(newLayout));
    localStorage.setItem("modules", JSON.stringify([...modules, name]));
  };

  useEffect(() => {
    const indexes = {};
    var counter = 0;
    modules.forEach((module,index) => {
      if (module.startsWith("singlenft")) {
        indexes[index] = counter;
        counter++;
      }
    });
    setNftIndexes(indexes);
    //set modules so that the layout will update
    setModules(modules); 
  }, [modules]);

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
      {/* <Toast title={'target hit!'} message={'your target of 0.01 on solo was hit at 10:00!'} /> */}
      <div ref={gridContainerRef} className="w-full flex-grow">
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
            } else if (module.startsWith("singlenft")) {
              return (
                <div key={module}>
                  <SingleNft index={nftIndexes[modules.indexOf(module)]} />
                </div>
              );
            }
          })}

        </ResponsiveGridLayout>
      </div>
    </AppLayout>
  );
}
