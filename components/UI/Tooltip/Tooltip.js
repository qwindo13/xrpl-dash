import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Tooltip = ({ children, copyContent }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipText, setTooltipText] = useState('Copy');

  const handleHoverStart = () => {
    setIsHovered(true);
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    setTooltipText('Copy'); // Reset tooltip text when not hovering
  };

  const handleTooltipClick = async () => {
    await navigator.clipboard.writeText(copyContent);
    setTooltipText('Copied!');
  };

  return (
    <motion.div
      className="relative inline-block cursor-pointer"
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      onClick={handleTooltipClick}
    >
      {children}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="absolute flex px-4 py-2 border rounded-xl border-[#fff] border-opacity-10 bg-[#A6B0CF] bg-opacity-5 backdrop-blur-xl z-10 cursor-pointer"
          >
            <span className="text-sm font-semibold ">{tooltipText}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Tooltip;
