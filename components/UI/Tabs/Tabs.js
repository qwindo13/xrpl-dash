import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Tabs = ({ options, onChange, className, tabsId, bgColor = "#1A1921", borderRadius = 12, value, setSelectedTab }) => {
  const [selectedOption, setSelectedOption] = useState(`${tabsId}-${value || options[0].value}`);

  const handleOptionClick = (value) => {
    setSelectedOption(`${tabsId}-${value}`);
    if (onChange) {
      onChange(value);
    }

    if (setSelectedTab) {
      setSelectedTab(value);
    }
  };

  useEffect(() => {
    if (value) {
      setSelectedOption(`${tabsId}-${value}`);
    }
  }, [value]);

  return (
    <div className={`flex flex-row md:flex-row gap-4 justify-center items-center rounded-2xl ${className}`}>
      {options.map((option) => (
        <motion.div
          key={option.value}
          // onClick={() => handleOptionClick(option.value)}
          //only allow click if the option is not selected
          onClick={() => selectedOption !== `${tabsId}-${option.value}` && handleOptionClick(option.value)}
          className={`text-lg font-semibold cursor-pointer px-2 py-2 rounded-xl transition-all duration-300 hover:opacity-100 !no-select ${selectedOption === `${tabsId}-${option.value}` ? '' : 'opacity-70'
            } relative`}
          whileHover={{ scale: 1 }}
          whileTap={{ scale: 0.95 }}
        >
          {selectedOption === `${tabsId}-${option.value}` && (
            <motion.span
              layoutId={`bubble-${tabsId}`}
              className="absolute inset-0 z-0"
              style={{ backgroundColor: bgColor, borderRadius: borderRadius }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
            />
          )}
          <motion.span className="relative z-[1]">{option.label}</motion.span>
        </motion.div>
      ))}
    </div>
  );
};

export default Tabs;
