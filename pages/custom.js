import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import AppLayout from '@/components/Layouts/AppLayoutcomponents';


import Loader from '@/components/UI/Spinner/Spinnercomponents';
import { priceInfoSize, richListSize, quickSwapSize, walletSize } from '@/components/Utils/ModuleSizescomponents';


export default function Home() {
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
            { i: 'richList', x: 0, y: 0, ...richListSize.lg },
            { i: 'quickswap', x: 3, y: 0, ...quickSwapSize.lg },
            { i: 'wallet', x: 0, y: 0, ...walletSize.lg },
        ],
        md: [
            { i: 'priceInfo', x: 2, y: 0, ...priceInfoSize.md },
            { i: 'priceInfo2', x: 3, y: 0, ...priceInfoSize.md },
            { i: 'richList', x: 0, y: 0, ...richListSize.md },
            { i: 'quickswap', x: 2, y: 0, ...walletSize.md },
        ],
        sm: [
            { i: 'priceInfo', x: 0, y: 0, ...priceInfoSize.sm },
            { i: 'priceInfo2', x: 2, y: 0, ...priceInfoSize.sm },
            { i: 'richList', x: 0, y: 0, ...richListSize.sm },
            { i: 'quickswap', x: 3, y: 0, ...quickSwapSize.sm },
            { i: 'wallet', x: 0, y: 0, ...walletSize.sm },
        ]
    });

    const handleLayoutChange = (currentLayout) => {
        console.log('Layout changed:', currentLayout);
    };

    return (
        <AppLayout showControlPanel>
            <div ref={gridContainerRef} className="w-full"> {/* Attach the reference to the parent */}

                <div>
                    <Loader />
                </div>
            </div>
        </AppLayout>
    );
}
