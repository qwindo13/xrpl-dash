import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import AppLayout from '@/components/Layouts/AppLayoutcomponents';
import PriceInfo from '@/components/Modules/FungibleTokens/PriceInfo/PriceInfocomponents';
import Feed from '@/components/Modules/Feeds/Feed/Feedcomponents';
import RichList from '@/components/Modules/FungibleTokens/RichList/RichListcomponents';
import QuickSwap from '@/components/Modules/Trades/QuickSwap/QuickSwapcomponents';
import Wallet from '@/components/Modules/FungibleTokens/Wallet/Walletcomponents';
import Badges from '@/components/Modules/NonFungibleTokens/Badges/Badgescomponents';
import mockFeed from '@/data/mockFeedcomponents';
import { priceInfoSize, richListSize, quickSwapSize, walletSize, feedSize, badges } from '@/components/Utils/ModuleSizescomponents';

export default function Home( {houndPrice, xrpPrice} ) {
    const gridContainerRef = useRef(null); // Create a reference to the parent
    const [gridWidth, setGridWidth] = useState(null); // Initialize gridWidth with null
    const [xrpAddress, setXrpAddress] = useState(null);
    // const [modules, setModules] = useState(['wallet', 'priceinfo', 'quickswap', 'badges']);
    const [modules, setModules] = useState([]);
    const router = useRouter();

    // Update the gridWidth on window resize and component mount
    useEffect(() => {
        const handleResize = () => {
            if (gridContainerRef.current) {
                setGridWidth(gridContainerRef.current.offsetWidth);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Define the layout configuration
    const [layout, setLayout] = useState(
            {
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
            ]
        }
    );

    const handleLayoutChange = (currentLayout) => {
        console.log('Layout changed:', currentLayout);
        if (currentLayout.length > 0) {
            const layoutInStorage = JSON.parse(localStorage.getItem('layout'));
            if (layoutInStorage !== null) {
                layoutInStorage.lg = currentLayout;
                layoutInStorage.md = currentLayout;
                layoutInStorage.sm = currentLayout;
                localStorage.setItem('layout', JSON.stringify(layoutInStorage));
            }
        }
    };

    useEffect(() => {
        console.log(`${localStorage.getItem('address')} - address`);
        const addy = localStorage.getItem('address');
        if (addy !== null) {
            console.log('setting address')
            setXrpAddress(localStorage.getItem('address'));
        } else {
            console.log('redirecting')
            // router.push('/auth/login');
        }
    }, []);

    const onClickTitle = (title) => {
        console.log(title);
        const name = `${title.toLowerCase().replace(/\s/g, '')}_${Date.now()}`;
        setModules([...modules, name]);
        const size = (title === 'Price Info') ? priceInfoSize : (title === 'Richlist') ? richListSize : (title === 'Quick Swap') ? quickSwapSize : (title === 'Wallet') ? walletSize : (title === 'Feed') ? feedSize : badges;
        const newLayout = {
            lg: [...layout.lg, { i: name, x: 0, y: 0, ...size.lg }],
            md: [...layout.md, { i: name, x: 0, y: 0, ...size.md }],
            sm: [...layout.sm, { i: name, x: 0, y: 0, ...size.sm }],
        };

        setLayout(newLayout);
        localStorage.setItem('layout', JSON.stringify(newLayout));
        localStorage.setItem('modules', JSON.stringify([...modules, name]));
    };

    useEffect(() => {
        console.log(modules);
    }, [modules]);

    useEffect(() => {
        const layout = localStorage.getItem('layout');
        console.log(`layout: ${layout}`)
        if (layout !== null && layout.length > 0) {
            setLayout(JSON.parse(layout));
        }

        const modules = localStorage.getItem('modules');
        console.log(`modules: ${modules}`)
        if (modules !== null && modules.length > 0) {
            setModules(JSON.parse(modules));
        }

        if (modules !== undefined && layout.lg !== undefined) {
            if (modules.length>0 && layout.lg.length>0 && layout.lg.length !== modules.length) {
                console.log('modules and layout length mismatch');
                //clear local storage
                localStorage.removeItem('layout');
                localStorage.removeItem('modules');
            }
        }
    }, []);

    return (
        <AppLayout showControlPanel onClickTitle={onClickTitle}>
            <div ref={gridContainerRef} className="w-full"> {/* Attach the reference to the parent */}
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
                        if (module.startsWith('priceinfo')) {
                            return (
                                <div key={module}>
                                    <PriceInfo />
                                </div>
                            );
                        } else if (module.startsWith('feed')) {
                            return (
                                <div key={module}>
                                    <Feed feed={mockFeed} />
                                </div>
                            );
                        } else if (module.startsWith('richlist')) {
                            return (
                                <div key={module}>
                                    <RichList />
                                </div>
                            );
                        } else if (module.startsWith('quickswap')) {
                            return (
                                <div key={module}>
                                    <QuickSwap />
                                </div>
                            );
                        } else if (module.startsWith('wallet')) {
                            return (
                                <div key={module}>
                                    <Wallet />
                                </div>
                            );
                        } else if (module.startsWith('badges')) {
                            return (
                                <div key={module}>
                                    <Badges />
                                </div>
                            );
                        }
                    })}
                </ResponsiveGridLayout>
            </div>
        </AppLayout>
    );
}
