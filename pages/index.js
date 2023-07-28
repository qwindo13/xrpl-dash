import React, { useState, useEffect, useRef } from 'react';
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
    const [layout, setLayout] = useState({
        lg: [
            { i: 'badges', x: 2, y: 0, ...badges.lg },
            { i: 'priceInfo', x: 2, y: 0, ...priceInfoSize.lg },
            { i: 'priceInfo2', x: 2, y: 1, ...priceInfoSize.lg },
            { i: 'richList', x: 0, y: 0, ...richListSize.lg },
            { i: 'quickswap', x: 3, y: 0, ...quickSwapSize.lg },
            { i: 'wallet', x: 0, y: 2, ...walletSize.lg },
            { i: 'feed', x: 2, y: 2, ...feedSize.lg },
        ],
        md: [
            { i: 'priceInfo', x: 2, y: 0, ...priceInfoSize.md },
            { i: 'priceInfo2', x: 3, y: 0, ...priceInfoSize.md },
            { i: 'richList', x: 0, y: 0, ...richListSize.md },
            { i: 'quickswap', x: 2, y: 0, ...walletSize.md },
            { i: 'feed', x: 0, y: 0, ...feedSize.md },
        ],
        sm: [
            { i: 'priceInfo', x: 0, y: 0, ...priceInfoSize.sm },
            { i: 'priceInfo2', x: 2, y: 0, ...priceInfoSize.sm },
            { i: 'richList', x: 0, y: 0, ...richListSize.sm },
            { i: 'quickswap', x: 3, y: 0, ...quickSwapSize.sm },
            { i: 'wallet', x: 0, y: 0, ...walletSize.sm },
            { i: 'feed', x: 0, y: 0, ...feedSize.sm },
        ]
    });

    const handleLayoutChange = (currentLayout) => {
        console.log('Layout changed:', currentLayout);
    };

    return (
        <AppLayout showControlPanel>
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
                    <div key="richList">
                        <RichList />
                    </div>
                    <div key="priceInfo">
                        <PriceInfo />
                    </div>
                    <div key="priceInfo2">
                        <PriceInfo />
                    </div>
                    <div key="quickswap">
                        <QuickSwap />
                    </div>
                    <div key="wallet">
                        <Wallet />
                    </div>
                    <div key="badges">
                        <Badges />
                    </div>
                    <div key="feed">
                        <Feed data={mockFeed}/>
                        </div>
                    {/* Add other modules wrapped in a <div> with their unique key */}
                </ResponsiveGridLayout>
            </div>
        </AppLayout>
    );
}
