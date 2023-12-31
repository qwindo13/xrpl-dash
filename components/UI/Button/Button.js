import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, className, disableAnimation = false, endIcon = null, disabled = false }) => {

    const defaultClass = 'px-4 py-3 font-semibold text-white text-sm leading-normal bg-[#21212A] rounded-xl transition-all duration-300 hover:bg-opacity-70 w-fit flex select-none items-center h-fit max-h-full whitespace-nowrap';

    const disabledClass = disabled ? 'opacity-40 cursor-not-allowed hover:!bg-opacity-100' : '';

    return (
        <motion.button
            onClick={onClick}
            className={`${defaultClass} ${disabledClass} ${className}`}
            whileTap={!disableAnimation && !disabled ? { scale: 0.95 } : undefined}
            type="button"
            disabled={disabled}
        >
            {children}
            {endIcon && <motion.span className="ml-2 flex ">{endIcon}</motion.span>}
        </motion.button>
    );
};

export default Button;
