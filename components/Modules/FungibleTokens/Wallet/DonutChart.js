import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '@mui/material';
import chroma from "chroma-js";

function formatNumber(num) {
  return new Intl.NumberFormat('en-US').format(num);
}

const DonutChart = ({ data, colorScale, valueXRP, valueFiat, loading }) => {
  const [hoveredSlice, setHoveredSlice] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false); // Tooltip hover state

  const sortedData = [...data].sort((a, b) => b.value - a.value);
  const total = sortedData.reduce((sum, entry) => sum + entry.value, 0);
  let startAngle = 0;

  const sortedColorScale = colorScale || ['#f280a3', '#c86ba0', '#9b569d', '#75619a', '#4f6c97', '#85a8d8'].reverse();

  const handleHoverStart = () => {
    setIsHovered(true);
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
  };

  return (
    <motion.div className='relative flex justify-center h-full w-auto overflow-visible'>
      <svg className='w-full h-auto' viewBox="-5 -5 62 62">
        {sortedData.map((entry, index) => {
          const { value, token, change, balance } = entry;
          const color = chroma(sortedColorScale[index % sortedColorScale.length]).alpha(0.5).css();
          const sliceAngle = (value / total) * 360;
          let endAngle = startAngle + sliceAngle;

          const gapAngle = 1;
          endAngle -= gapAngle;

          const largeArcFlag = sliceAngle <= 180 ? 0 : 1;
          const radius = 24;

          const start = {
            x: 26 + radius * Math.cos(Math.PI * startAngle / 180),
            y: 26 + radius * Math.sin(Math.PI * startAngle / 180),
          };

          const end = {
            x: 26 + radius * Math.cos(Math.PI * endAngle / 180),
            y: 26 + radius * Math.sin(Math.PI * endAngle / 180),
          };

          const d = `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;

          startAngle += sliceAngle;

          return (
            <motion.path
              key={index}
              d={d}
              fill="none"
              stroke={color}
              strokeWidth={8}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              onMouseEnter={(e) => { // Use onMouseEnter instead of onMouseOver
                const rect = e.currentTarget.getBoundingClientRect();
                setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                setHoveredSlice({ token, change, balance, color });
                handleHoverStart();
              }}
              onMouseMove={(e) => { // Add onMouseMove to update tooltip position
                const rect = e.currentTarget.getBoundingClientRect();
                setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              }}
              onMouseLeave={() => {
                setHoveredSlice(null);
                handleHoverEnd();
              }}
            />

          );
        })}
      </svg>

      <div className="absolute flex flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        {loading ? (
          <>
            <Skeleton variant="text" width={100} height={20} />
            <Skeleton variant="text" width={100} height={20} />
          </>
        ) : (
          <>
            <span className="font-semibold text-lg">
              {valueXRP}
              <i
                className="text-xs text-white text-opacity-50 cursor-pointer ml-1"
                title="Prices are calculated based on the last trade on the DEX. The actual value of your tokens might be different."
              >
                i
              </i>
            </span>
            <span className="font-semibold text-base opacity-80">{valueFiat}</span>
          </>
        )}
      </div>

      <AnimatePresence>
        {hoveredSlice && isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: position.y + 40, // Offset by 20 pixels downwards
              left: position.x + 40, // Offset by 20 pixels to the right
              transform: 'translate(20%, 20%)',
              zIndex: 9999,
            }}
            className="flex items-center px-4 py-2 border rounded-xl border-[#fff] border-opacity-10 bg-[#1A1921] backdrop-blur-xl z-10 cursor-pointer drop-shadow-md"
          >
            <div
            className='h-5 w-5 rounded-lg'
              style={{
                width: '20px', // Size of the color square
                height: '20px',
                backgroundColor: hoveredSlice.color, // Set the background color
                marginRight: '8px', // Some spacing between the square and the text
              }}
            ></div>
            <div className='flex flex-row'>
              <span className='font-semibold'>{hoveredSlice.token}</span>
              <span className='ml-2 opacity-60'>{formatNumber(hoveredSlice.balance)}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DonutChart;
