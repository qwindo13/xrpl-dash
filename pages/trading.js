import React, { useState, useEffect, useRef } from 'react';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import AppLayout from '@/components/Layouts/AppLayoutcomponents';
import PriceInfo from '@/components/Modules/FungibleTokens/PriceInfo/PriceInfocomponents';
import RichList from '@/components/Modules/FungibleTokens/RichList/RichListcomponents';
import QuickSwap from '@/components/Modules/Trades/QuickSwap/QuickSwapcomponents';

export default function Trading() {
    const gridContainerRef = useRef(null); // Create a reference to the parent
    const [gridWidth, setGridWidth] = useState(null); // Initialize gridWidth with null
    const [cols, setCols] = useState(6);

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
            { i: 'priceInfo', x: 2, y: 0, w: 1, h: 1, minW: 1, maxW: 2, minH: 1, maxH: 1 },
            { i: 'priceInfo2', x: 2, y: 1, w: 1, h: 1, minW: 1, maxW: 2, minH: 1, maxH: 1 },
            { i: 'richList', x: 0, y: 0, w: 2, h: 2, minW: 2, maxW: 3, minH: 2, maxH: 3},
            { i: 'quickswap', x: 3, y: 0, w: 3, h: 2, minW: 2, maxW: 3, minH: 2, maxH: 2 },
        ],
        md: [
            { i: 'priceInfo', x: 2, y: 0, w: 1, h: 1, minW: 1, maxW: 2, minH: 1, maxH: 1 },
            { i: 'priceInfo2', x: 3, y: 0, w: 1, h: 1, minW: 1, maxW: 2, minH: 1, maxH: 1 },
            { i: 'richList', x: 0, y: 0, w: 2, h: 3, minW: 2, maxW: 3, minH: 2, maxH: 3},
            { i: 'quickswap', x: 2, y: 0, w: 2, h: 2, minW: 2, maxW: 3, minH: 2, maxH: 2 },
        ],
        sm: [
            { i: 'priceInfo', x: 0, y: 0, w: 1, h: 1, minW: 1, maxW: 2, minH: 1, maxH: 1 },
            { i: 'priceInfo2', x: 2, y: 0, w: 1, h: 1, minW: 1, maxW: 2, minH: 1, maxH: 1 },
            { i: 'richList', x: 0, y: 0, w: 2, h: 2, minW: 2, maxW: 2, minH: 2, maxH: 3},
            { i: 'quickswap', x: 3, y: 0, w: 2, h: 2, minW: 2, maxW: 2, minH: 2, maxH: 2 },
        ]
        // Add other breakpoints here...
    });
    const handleLayoutChange = (currentLayout) => {
        console.log('Layout changed:', currentLayout);
    };


    return (
        <AppLayout>
            <div ref={gridContainerRef} className="w-full"> {/* Attach the reference to the parent */}
                <ResponsiveGridLayout
                    className="layout"
                    layouts={layout}
                    breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                    cols={{ lg: 6, md: 4, sm: 4, xs: 2, xxs: 2 }}
                    width={gridWidth} // Pass the calculated gridWidth
                    rowHeight={180}
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
                    {/* Add other modules wrapped in a <div> with their unique key */}
                </ResponsiveGridLayout>
            </div>
        </AppLayout>
    );
}
