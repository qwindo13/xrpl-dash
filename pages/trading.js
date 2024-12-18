import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import TestLayout from '@/components/Layouts/TestLayoutcomponents';
import Nfts from '@/components/Modules/NonFungibleTokens/MultipleNfts/MultipleNftscomponents';
import PriceChart from '@/components/Modules/Trades/Chart/Chartcomponents';
import Messages from '@/components/Modules/Misc/Messages/Messagescomponents';
import OrderBook from '@/components/Modules/Trades/OrderBook/OrderBookcomponents';
import BitcoinHalving from '@/components/Modules/Misc/BitcoinHalving/BitcoinHalvingcomponents';
import Airdrops from '@/components/Modules/Misc/Airdrops/Airdropscomponents';
import { priceInfoSize, richListSize, quickSwapSize, walletSize, feedSize, nftsSize, singleNftSize, fearGreedSize } from '@/components/Utils/ModuleSizescomponents';

export default function Home({customLayout,refreshCustomLayouts }) {
    const gridContainerRef = useRef(null); // Create a reference to the parent
    const [gridWidth, setGridWidth] = useState(null); // Initialize gridWidth with null
    const [xrpAddress, setXrpAddress] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem('address')) {
            setXrpAddress(localStorage.getItem('address'));
        } else {
            // setLoggedin(false);
            // router.push('/auth/login');
        }
    }, []);
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
            { i: 'priceInfo', x: 2, y: 0, ...priceInfoSize.lg },
            { i: 'priceInfo2', x: 2, y: 1, ...priceInfoSize.lg },
            { i: 'nfts', x: 0, y: 0, ...nftsSize.lg },
            { i: 'singleNft', x: 0, y: 0, ...singleNftSize.lg },
            { i: 'quickswap', x: 3, y: 0, ...quickSwapSize.lg },
            { i: 'wallet', x: 0, y: 2, ...walletSize.lg },
            { i: 'feed', x: 2, y: 2, ...feedSize.lg },
            { i: 'feargreed', x: 2, y: 2, ...fearGreedSize.lg },

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
        <TestLayout showControlPanel className='w-1/2' customLayout={customLayout} refreshCustomLayouts={refreshCustomLayouts}>
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
                    <div key="airdrop">
                        <Airdrops />
                    </div>
                    <div key="richlist">
                        {/* <PriceChart /> */}
                    </div>
                    <div key="richlist2">
                        <PriceChart title='Marketcap' type='marketcap'/>
                    </div>
                    {/* <div key="richlist3">
                        <PriceChart title='Volume' type='volume'/>
                    </div> */}
                    <div key="feargreed">
                        <OrderBook />
                    </div>
                    <div key="nfts">
                        <Nfts />
                    </div>
                    <div key="bitcoinHalving">
                        <BitcoinHalving />
                    </div>

                    
                    {/* Add other modules wrapped in a <div> with their unique key */}
                </ResponsiveGridLayout>
            </div>
        </TestLayout>
    );
}
