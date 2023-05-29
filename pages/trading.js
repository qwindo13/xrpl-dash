import React, { useState, useEffect, useRef } from 'react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import AppLayout from '@/components/Layouts/AppLayoutcomponents';
import TagInput from '@/components/UI/TagInput/TagInputcomponents';

import Loader from '@/components/UI/Loader/Loadercomponents';

export default function Trading() {
    const gridContainerRef = useRef(null); // Create a reference to the parent
    const xrplTokens = ['XRP', 'USD', 'BTC', 'ETH', 'LINK', 'UNI', 'YFI', 'DOT', 'DAI', 'USDT'].map(token => ({label: token, value: token}));
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
            { i: 'richList', x: 0, y: 0, w: 2, h: 2, minW: 2, maxW: 3, minH: 2, maxH: 3 },
            { i: 'quickswap', x: 3, y: 0, w: 3, h: 2, minW: 2, maxW: 3, minH: 2, maxH: 2 },
        ],
        md: [
            { i: 'priceInfo', x: 2, y: 0, w: 1, h: 1, minW: 1, maxW: 2, minH: 1, maxH: 1 },
            { i: 'priceInfo2', x: 3, y: 0, w: 1, h: 1, minW: 1, maxW: 2, minH: 1, maxH: 1 },
            { i: 'richList', x: 0, y: 0, w: 2, h: 3, minW: 2, maxW: 3, minH: 2, maxH: 3 },
            { i: 'quickswap', x: 2, y: 0, w: 2, h: 2, minW: 2, maxW: 3, minH: 2, maxH: 2 },
        ],
        sm: [
            { i: 'priceInfo', x: 0, y: 0, w: 1, h: 1, minW: 1, maxW: 2, minH: 1, maxH: 1 },
            { i: 'priceInfo2', x: 2, y: 0, w: 1, h: 1, minW: 1, maxW: 2, minH: 1, maxH: 1 },
            { i: 'richList', x: 0, y: 0, w: 2, h: 2, minW: 2, maxW: 2, minH: 2, maxH: 3 },
            { i: 'quickswap', x: 3, y: 0, w: 2, h: 2, minW: 2, maxW: 2, minH: 2, maxH: 2 },
        ]
        // Add other breakpoints here...
    });
    const handleLayoutChange = (currentLayout) => {
        console.log('Layout changed:', currentLayout);
    };


    return (
        <AppLayout>
            <div className='w-full justify-center align-middle flex p-16'>
            <TagInput options={['React', 'Vue', 'Angular', 'Svelte']} placeholder="Add a tag..." />                <Loader />
            </div>
        </AppLayout>
    );
}
