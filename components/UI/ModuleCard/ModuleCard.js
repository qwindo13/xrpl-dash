import React from 'react';
import { motion } from 'framer-motion';
import ModuleCardTitle from './ModuleCardTitle';

const ModuleCard = ({ children, className, title, disableAnimation = false, disableTitle }) => {

    const defaultClass = 'block items-start bg-[#21212A] flex flex-col w-full h-auto rounded-2xl relative justify-center items-center p-4';

    return (
        <div className={`${defaultClass} ${className}`}>
             {!disableTitle && <ModuleCardTitle title={title} />}
            <div className='w-full flex items-start'>
                {children}
            </div>

        </div>
    );
};

export default ModuleCard;
