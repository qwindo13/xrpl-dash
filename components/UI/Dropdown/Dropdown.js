import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Dropdown = ({ trigger, children, className, position = 'left', onToggle, isBlurred, closeDropdown }) => {
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

    // This function will be called when an item inside the dropdown is clicked
    const handleItemClick = (event) => {
        // We call the closeDropdown function passed as a prop
        if (closeDropdown) {
            closeDropdown(event);
        }
    };

    return (
        <div ref={dropdownRef} className={`relative inline-block h-full w-full `} onClick={toggleDropdown}>
            {React.cloneElement(trigger, { isOpen })}
            {isOpen && (
                <motion.div
                    onClick={handleItemClick}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute flex flex-col gap-4 bg-[#21212A] mt-2 w-56 p-4 rounded-2xl border max-h-80 border-[#fff] border-opacity-10 z-10 overflow-y-scroll ${className} ${dropdownPosition[position]} ${isBlurred ? 'bg-opacity-60 backdrop-blur-xl' : ''}`}
                >
                    {children}
                </motion.div>
            )}
        </div>
    );
};

export default Dropdown;
