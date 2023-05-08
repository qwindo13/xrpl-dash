import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Dropdown = ({ trigger, children, className, position = 'left', onToggle }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };
    const dropdownPosition = {
        left: 'left-0',
        right: 'right-0',
    };
    useEffect(() => {
        if (onToggle) {
            onToggle(isOpen);
        }
    }, [isOpen]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className={`relative inline-block h-full ${className}`} onClick={toggleDropdown}>
            {React.cloneElement(trigger, { isOpen })}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute bg-[#21212A] mt-2 w-56 p-4 rounded-2xl border border-[#fff] border-opacity-10 bg-opacity-60 backdrop-blur-xl z-10 ${dropdownPosition[position]}`}
                >
                    {children}
                </motion.div>
            )}
        </div>
    );
};

export default Dropdown;
