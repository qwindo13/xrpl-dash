import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../Button/Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ModuleCard = ({ children, className, title, disableAnimation = false, disableTitle }) => {
    const [isHovered, setIsHovered] = useState(false);
    const defaultClass = 'block relative items-start bg-[#21212A] flex flex-col w-full h-auto rounded-2xl relative justify-center items-center p-4';

    return (
        <div
            className={`${defaultClass} ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {!disableTitle && (
                <div className='w-full flex flex-row justify-between items-start pb-4 relative'>
                    <h3 className='font-semibold text-xl'>{title}</h3>
                </div>
            )}

            <AnimatePresence>
                {(!disableTitle || isHovered) && (
                    <motion.div
                        key="button"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Button className="!p-0 rounded-full absolute top-4 right-4" disableAnimation>
                            <MoreVertIcon />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className='w-full flex items-start'>
                {children}
            </div>
        </div>
    );
};

export default ModuleCard;
