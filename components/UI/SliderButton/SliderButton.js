import React from 'react';
import { motion } from 'framer-motion';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';

const SliderButton = ({ children, onClick, className, disableAnimation = false, left, right, disabled }) => {

    const defaultClass = 'p-2 text-white bg-[#21212A] bg-opacity-90 backdrop-blur-md rounded-full w-fit flex select-none items-center h-fit max-h-full whitespace-nowrap border border-white border-opacity-5';

    return (
        <motion.button
            onClick={onClick}
            className={`${defaultClass} ${className} ${disabled ? 'hidden' : ''}`}
            whileTap={!disableAnimation ? { scale: 0.95 } : undefined}
            type="button"
        >
            {left &&
                <KeyboardArrowLeftRoundedIcon />
            }
            {right &&
                <KeyboardArrowRightRoundedIcon />
            }
        </motion.button>
    );
};

export default SliderButton;
