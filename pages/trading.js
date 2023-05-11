import React, { useState, useEffect, useRef } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import AppLayout from '@/components/Layouts/AppLayoutcomponents';
import PriceInfo from '@/components/Modules/FungibleTokens/PriceInfo/PriceInfocomponents';
import RichList from '@/components/Modules/FungibleTokens/RichList/RichListcomponents';
import QuickSwap from '@/components/Modules/Trades/QuickSwap/QuickSwapcomponents';

export default function Trading() {
    const gridContainerRef = useRef(null); // Create a reference to the parent
    const [gridWidth, setGridWidth] = useState(null); // Initialize gridWidth with null
    const [cols, setCols] = useState(2);


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
    const layout = [
        { i: 'priceInfo', x: 1, y: 0, w: 0.5, h: 0.5, minW: 0.5, maxW: 1 },
        { i: 'priceInfo2', x: 3, y: 0, w: 0.5, h: 0.5, minW: 0.5, maxW: 1 },
        { i: 'richList', x: 0, y: 0, w: 1, h: 1, minW: 0.5, maxW: 2 },
        { i: 'quickswap', x: 1, y: 1, w: 1, h: 1, minW: 0.5, maxW: 2 },
        // Add other modules with their layout configuration
    ];

    return (
        <AppLayout setCols={setCols}>
            <div ref={gridContainerRef} className="w-full"> {/* Attach the reference to the parent */}
                <GridLayout
                    className="layout"
                    layout={layout}
                    cols={cols}
                    rowHeight={384}
                    width={gridWidth} // Pass the calculated gridWidth
                    margin={[0, 0]}
                    containerPadding={[0, 0]}
                    isResizable={false}
                    isDraggable={true}
                    preventCollision={false}
                    autoSize={true}
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
                </GridLayout>
            </div>
        </AppLayout>
    );
}
