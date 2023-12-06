import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

const Tooltip = ({ children, className, copyContent, enableCopy = false, tooltipContent = 'Copy', position = 'bottom-right' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipText, setTooltipText] = useState(tooltipContent);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 400, damping: 30 });
  const springY = useSpring(y, { stiffness: 400, damping: 30 });

  const ref = useRef(null);

  const handleHoverStart = (event) => {
    setIsHovered(true);
  };

  const handleMouseMove = (event) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      x.set(event.clientX - rect.left);
      y.set(event.clientY - rect.top);
    }
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    setTooltipText(tooltipContent); // Reset tooltip text to initial value when not hovering
  };

  const handleTooltipClick = async () => {
    if (enableCopy) {
      await navigator.clipboard.writeText(copyContent);
      setTooltipText('Copied!');
    }
  };

  const getTransformStyle = () => {
    switch (position) {
      case 'bottom-left':
        return 'translate(-100%, 20%)';
      case 'top-right':
        return 'translate(20%, -100%)';
      case 'top-left':
        return 'translate(-100%, -100%)';
      case 'top-center':
        return 'translate(-50%, -120%)'; // Centered horizontally and above the cursor
      default:
        // default to 'bottom-right'
        return 'translate(20%, 20%)';
    }
  };
  

  return (
    <motion.div
      ref={ref}
      className="flex relative cursor-pointer w-fit"
      onMouseEnter={handleHoverStart}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleHoverEnd}
      onClick={enableCopy ? handleTooltipClick : undefined}
    >
      {children}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: springY,
              left: springX,
              transform: getTransformStyle(),
            }}
            className="flex px-4 py-2 border rounded-xl border-[#fff] border-opacity-10 bg-[#1A1921] backdrop-blur-xl z-10 cursor-pointer drop-shadow-md"
          >
            <span className={`text-sm font-semibold ${className}`}>{tooltipText}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Tooltip;
