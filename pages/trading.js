import React, { useState, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import AppLayout from '@/components/Layouts/AppLayoutcomponents';
import PriceInfo from '@/components/Modules/FungibleTokens/PriceInfo/PriceInfocomponents';
import RichList from '@/components/Modules/FungibleTokens/RichList/RichListcomponents';


export default function Trading() {

    // State variable for the GridLayout width
    const [gridWidth, setGridWidth] = useState(1200); // Initialize with a default width

    // Update the gridWidth on window resize and component mount
    useEffect(() => {
        const handleResize = () => {
            setGridWidth(window.innerWidth);
        };

        // Set the initial width based on the actual window width
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Define the layout configuration
    const layout = [
        { i: 'priceInfo', x: 0, y: 0, w: 0.5, h: 0.5, minW: 0.5, maxW: 2 },
        { i: 'priceInfo2', x: 1, y: 0, w: 1, h: 0.5, minW: 0.5, maxW: 2 },
        { i: 'richList', x: 2, y: 0, w: 1, h: 1, minW: 2, maxW: 2 },
        // Add other modules with their layout configuration
    ];

    return (
        <AppLayout>
            <GridLayout
                className="layout w-full flex"
                layout={layout}
                cols={3}
                rowHeight={360}
                width={gridWidth}
                margin={[16, 16]}
                containerPadding={[0, 0]}
                isResizable={false}
                isDraggable={true}
                preventCollision={false}
            >
                <div key="priceInfo" >
                    <PriceInfo />
                </div>
                <div key="richList">
                    <RichList />
                </div>
                <div key="priceInfo2">
                    <PriceInfo />
                </div>
                {/* Add other modules wrapped in a <div> with their unique key */}
            </GridLayout>
        </AppLayout>
    );
}