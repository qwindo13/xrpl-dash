import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
    const [isToggled, setToggle] = useState(false);

    const startPath = "M9 16.17 5.53 12.7a.9959.9959 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41a.9959.9959 0 0 0-1.41 0L9 16.17z";
    const endPath = "M17.59 3.59c-.38-.38-.89-.59-1.42-.59H5c-1.11 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7.83c0-.53-.21-1.04-.59-1.41l-2.82-2.83zM12 19c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm1-10H7c-1.1 0-2-.9-2-2s.9-2 2-2h6c1.1 0 2 .9 2 2s-.9 2-2 2z";

    return (
        <div onClick={() => setToggle(!isToggled)}>
            <motion.svg 
                width="24" 
                height="24" 
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-1om0hkc"
                focusable="false"
                aria-hidden="true"
            >
                <motion.path 
                    d={isToggled ? endPath : startPath}
                    fill="currentColor"
                    animate={{ 
                        d: isToggled ? endPath : startPath 
                    }}
                    transition={{ 
                        duration: 0.8, 
                        ease: "easeInOut" 
                    }}
                />
            </motion.svg>
        </div>
    );
};

export default Loader;
