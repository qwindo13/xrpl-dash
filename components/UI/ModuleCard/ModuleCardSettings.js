import React from 'react';
import Button from '../Button/Button';
import Dropdown from '../Dropdown/Dropdown';
import Switch from '../Switch/Switch';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ModuleCardSettings = ({ children }) => {
    return (
        <div className='absolute bg-[#1B1B23] z-[3] p-4 w-2/3 min-w-fit max-w-full h-auto max-h-full top-0 right-0 rounded-2xl border border-white border-opacity-10 flex flex-col gap-4 justify-between items-start overflow-y-scroll'>
            <div className='w-full'>
                <h4 className='font-semibold text-xl'>Settings</h4>
            </div>
            <div className='w-full flex flex-col gap-4'> {children} </div>
        </div>
    );
};

export default ModuleCardSettings;