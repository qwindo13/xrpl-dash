import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../Button/Button";
import ModuleCardSettings from "./ModuleCardSettings";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PushPinRoundedIcon from '@mui/icons-material/PushPinRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const ModuleCard = ({ children, className, contentClassName, style, title, settings, disableTitle, onClickRemove, onClickStatic, isPinned = false,callToggleSettings = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const defaultClass =
    "block relative overflow-hidden items-start bg-[#21212A] flex flex-col w-full h-full rounded-2xl relative items-center p-4 border-white border-opacity-0 transition-colors duration-300 ";

  const toggleSettings = useCallback(() => {
    setIsSettingsVisible((prevIsSettingsVisible) => !prevIsSettingsVisible);
  }, []);

  useEffect(() => {
    if (callToggleSettings) {
      toggleSettings();
    }
  }, [callToggleSettings, toggleSettings]);

  const settingsCard = useMemo(() => (
    <motion.div
      key="settings"
      initial={{ opacity: 0 }}
      animate={{ opacity: isSettingsVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <ModuleCardSettings>
        {settings}

    <div className="border-t border-white border-opacity-5">
        <div className="w-full flex flex-row items-center gap-4 mt-4">
          <span className="font-semibold text-base mb-2 md:mb-0">Drag & Drop Settings</span>
          <Button className="!p-0 bg-[transparent] opacity-60 hover:opacity-100">
            <PushPinRoundedIcon onClick={onClickStatic} />
          </Button>
          <Button className="!p-0 bg-[transparent] opacity-60 hover:opacity-100">
            <DeleteRoundedIcon onClick={onClickRemove} />
          </Button>
        </div>
        </div>
      </ModuleCardSettings>
    </motion.div>
  ), [isSettingsVisible, settings]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <motion.div
      className={`${defaultClass} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={style}
    >
      {/* CARD TITLE */}
      {!disableTitle && (
        <div className="w-full flex flex-row justify-between items-start pb-4 relative">
          <h3 className="font-semibold text-xl">{title}</h3>
        </div>
      )}

      <div className="absolute top-4 right-4 z-20 flex gap-2">

        {/* PINNED ICON */}

        <AnimatePresence>
          <motion.div
            key="button"
            initial={{ opacity: 0 }}
            animate={{
              opacity: isSettingsVisible ? 1 : isHovered ? 1 : 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              className="!p-0 bg-[transparent] rounded-full "
              disableAnimation
              onClick={onClickStatic}
            >
              {
                !isPinned && isHovered &&
                <PushPinRoundedIcon className="opacity-60 hover:opacity-100" />
              }
              {
                isPinned && isHovered &&
                <PushPinRoundedIcon className="opacity-100" />
              }
            </Button>
          </motion.div>
        </AnimatePresence>

        {/* CARD SETTINGS ICON */}
        <AnimatePresence>
          <motion.div
            key="button"
            initial={{ opacity: 0 }}
            animate={{
              opacity: isSettingsVisible ? 1 : isHovered || !disableTitle ? 1 : 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              className="!p-0 bg-[transparent] rounded-full "
              disableAnimation
              onClick={toggleSettings}
            >
              <MoreVertIcon />
            </Button>
          </motion.div>
        </AnimatePresence>

      </div>

      {/* CARD CONTENT */}
      <div className={`w-full h-full flex items-start overflow-x-hidden ${contentClassName}`}>
        {children}
      </div>

      {
        isSettingsVisible &&
        <AnimatePresence> {settingsCard} </AnimatePresence>
      }
    </motion.div>
  );
};

export default ModuleCard;
