import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, className, disableAnimation = false, endIcon = null}) => {

    const defaultClass = 'px-4 py-3 font-semibold text-white text-sm bg-[#21212A] rounded-xl hover:bg-opacity-70 justify-center w-fit flex select-none items-center h-fit max-h-full whitespace-nowrap	';

    return (
        <motion.button
            onClick={onClick}
            className={`${defaultClass} ${className}`}
            whileTap={!disableAnimation ? { scale: 0.95 } : undefined}
            type="button"
        >
            {children}
            {endIcon && <motion.span className="ml-2 flex">{endIcon}</motion.span>}
        </motion.button>
    );
};

export default Button;
