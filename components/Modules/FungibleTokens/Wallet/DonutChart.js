import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '@mui/material';

const ChartTooltip = ({ content, isVisible, position }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          style={{ top: `${position.y}%`, left: `${position.x}%` }}
          className="absolute p-2 border rounded-xl border-[#fff] border-opacity-10 bg-opacity-60 backdrop-blur-xl z-[2] max-w-md"
        >
          <span className="text-xs font-semibold">{content}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const DonutChart = ({ data, colorScale, valueXRP, valueFiat, loading }) => {
  const [hoveredSlice, setHoveredSlice] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Sort data from highest to lowest
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  const total = sortedData.reduce((sum, entry) => sum + entry.value, 0);
  let startAngle = 0;

  // Use the provided color scale or fallback to default if not provided
  const sortedColorScale = colorScale || ['#f280a3', '#c86ba0', '#9b569d', '#75619a', '#4f6c97', '#85a8d8'];

  return (
    <motion.div className='relative flex justify-center h-full w-auto'>
     <svg className='w-full h-auto' viewBox="-5 -5 62 62">
        {sortedData.map((entry, index) => {
          const { value, token, change, balance } = entry;
          const color = sortedColorScale[index % sortedColorScale.length];
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

          const sliceCenter = {
            x: 26 + radius * Math.cos(Math.PI * ((startAngle + sliceAngle / 2) / 180)),
            y: 26 + radius * Math.sin(Math.PI * ((startAngle + sliceAngle / 2) / 180)),
          };

          const tooltipHeight = 24; // adjust this value to match the height of your tooltips

          startAngle += sliceAngle;

          const d = `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;

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
              onMouseEnter={() => {
                setPosition({ x: sliceCenter.x, y: sliceCenter.y + radius + tooltipHeight - 10 });
                setHoveredSlice({ token, change, balance });
              }}
              
              
              onMouseLeave={() => setHoveredSlice(null)}
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
      <ChartTooltip
        content={hoveredSlice ? `${hoveredSlice.token}: ${hoveredSlice.balance}` : ''}
        isVisible={!!hoveredSlice}
        position={position}
      />

    </motion.div>

  );
};

export default DonutChart;
