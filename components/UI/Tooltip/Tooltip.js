import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Tooltip = ({ content, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHoverStart = () => {
    setIsHovered(true);
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
  };

  return (
    <motion.div
      className="relative inline-block cursor-default	"
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {children}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute p-2 border rounded-xl border-[#fff] border-opacity-10 bg-opacity-60 backdrop-blur-xl z-10 max-w-md	"
          >
            <span className="text-xs font-semibold">{content}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Tooltip;
