import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../Button/Button';
import ModuleCardSettings from './ModuleCardSettings';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ModuleCard = ({ children, className, title, settings, disableAnimation = false, disableTitle }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const defaultClass = 'block relative items-start bg-[#21212A] flex flex-col w-full h-auto rounded-2xl relative justify-center items-center p-4';

  const toggleSettings = () => {
    setIsSettingsVisible(!isSettingsVisible);
  };

  return (
    <div
      className={`${defaultClass} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* CARD TITLE */}
      {!disableTitle && (
        <div className='w-full flex flex-row justify-between items-start pb-4 relative'>
          <h3 className='font-semibold text-xl'>{title}</h3>
        </div>
      )}

      {/* CARD SETTINGS ICON */}
      <AnimatePresence>
        <motion.div
          key="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: isSettingsVisible ? 1 : isHovered || !disableTitle ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            className="!p-0 bg-transparent rounded-full absolute top-4 right-4 z-10"
            disableAnimation
            onClick={toggleSettings}
          >
            <MoreVertIcon />
          </Button>
        </motion.div>
      </AnimatePresence>

      {/* CARD CONTENT */}
      <div className='w-full flex items-start'>{children}</div>

      {/* CARD SETTINGS */}
      <AnimatePresence>
        {isSettingsVisible && (
          <motion.div
            key="settings"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ModuleCardSettings> {settings} </ModuleCardSettings>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModuleCard;
