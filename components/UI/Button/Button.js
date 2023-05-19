import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, className, disableAnimation = false, endIcon = null}) => {

    const defaultClass = 'px-4 py-3 font-semibold text-white bg-[#21212A] rounded-lg hover:bg-opacity-70 w-fit flex select-none items-center';

    return (
        <motion.button
            onClick={onClick}
            className={`${defaultClass} ${className}`}
            whileTap={!disableAnimation ? { scale: 0.95 } : undefined}
            type="button"
        >
            {children}
            {endIcon && <motion.span layout className="ml-2 flex">{endIcon}</motion.span>}
        </motion.button>
    );
};

export default Button;
