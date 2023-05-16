import React from 'react';
import { motion } from 'framer-motion';
import chroma from 'chroma-js';

const DonutChart = ({ data, colorScale, valueXRP, valueFiat}) => {
  // Sort data from highest to lowest
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  const total = sortedData.reduce((sum, entry) => sum + entry.value, 0);
  let startAngle = 0;

  // Use the provided color scale or fallback to default if not provided
  const sortedColorScale = colorScale || ['#f280a3', '#c86ba0', '#9b569d', '#75619a', '#4f6c97', '#85a8d8'];

  return (
    <div className='relative flex justify-center overflow-hidden'>
      <svg width="100%" viewBox="-5 -5 62 62">
        {sortedData.map((entry, index) => {
          const { value } = entry;
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
            />
          );
        })}
      </svg>
      <div className="absolute flex flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <span className='font-semibold text-lg'>{valueXRP}</span>
        <span className='font-semibold text-base opacity-60'>{valueFiat}</span>
      </div>

    </div>

  );
};

export default DonutChart;
