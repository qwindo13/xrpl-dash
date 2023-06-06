import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

const Accordion = ({ title, children, image }) => {
    const [isOpen, setIsOpen] = useState(false);
    const childCount = React.Children.count(children);

    const variants = {
        open: { opacity: 1, height: 'auto' },
        collapsed: { opacity: 0, height: 0 }
    };

    const iconVariants = {
        open: { rotate: 180 },
        collapsed: { rotate: 0 }
    }

    return (
        <div className="w-full border rounded-2xl p-4 border-white border-opacity-5">
            <div
                className="w-full cursor-pointer flex justify-between items-center py-2"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className='flex flex-row items-center'>
                    {image && <Image {...image} height={30} width={30} className="mr-4" />}
                    <h2 className="font-semibold text-xl">{title}</h2>
                </div>
                <div className="flex items-center">
                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-[#21212A] mr-4">
                        <span className="font-semibold text-xs">{childCount}</span>
                    </div>
                    <motion.div
                        variants={iconVariants}
                        initial="collapsed"
                        animate={isOpen ? "open" : "collapsed"}
                    >
                        <KeyboardArrowDownRoundedIcon />
                    </motion.div>
                </div>
            </div>
            <motion.div
                variants={variants}
                initial="collapsed"
                animate={isOpen ? "open" : "collapsed"}
                className="overflow-hidden "
            >
                <div className='pt-4 flex flex-col gap-4'>
                    {children}
                </div>

            </motion.div>
        </div>
    );
};

export default Accordion;
