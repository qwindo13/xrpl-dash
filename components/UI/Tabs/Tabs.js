import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Tabs = ({ options, onClick, className }) => {
  const [selectedOption, setSelectedOption] = useState(options[0].value);

  const handleOptionClick = (value) => {
    setSelectedOption(value);
    if (onClick) {
      onClick(value);
    }
  };

  return (
    <div className={`flex flex-row md:flex-row gap-4 justify-center items-center rounded-2xl ${className}`}>
      {options.map((option) => (
        <motion.div
          key={option.value}
          onClick={() => handleOptionClick(option.value)}
          className={`text-lg font-semibold cursor-pointer px-2 py-2 rounded-xl transition-all duration-300 hover:opacity-100 !no-select ${selectedOption === option.value ? '' : 'opacity-70'
            } relative`}
          whileHover={{ scale: 1 }}
          whileTap={{ scale: 0.95 }}
        >
          {selectedOption === option.value && (
            <motion.span
              layoutId="bubble"
              className="absolute inset-0 z-0 bg-[#1A1921] rounded-2xl"
              style={{ borderRadius: 12 }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <motion.span className="relative z-10">{option.label}</motion.span>
        </motion.div>
      ))}
    </div>
  );
};

export default Tabs;
