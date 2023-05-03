import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ trigger, children, className, position = 'left' }) => {
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
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className={`relative inline-block h-full ${className}`} onClick={toggleDropdown}>
            {React.cloneElement(trigger, { isOpen })}
            {isOpen && (
                <div className={`absolute bg-[#21212A] mt-2 w-56 p-4 rounded-2xl border border-[#fff] border-opacity-10 bg-opacity-60 backdrop-blur-xl z-10 ${dropdownPosition[position]}`}>
                    {children}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
