import React, { useState } from 'react';

const Dropdown = ({ trigger, children, className }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`relative inline-block h-full ${className}`} onClick={toggleDropdown}>
            {trigger}
            {isOpen && (
                <div className="absolute bg-[#21212A] left-0 mt-2 w-56 p-4 rounded-2xl border border-[#fff] border-opacity-10 bg-opacity-60 backdrop-blur-xl z-10">
                    {children}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
