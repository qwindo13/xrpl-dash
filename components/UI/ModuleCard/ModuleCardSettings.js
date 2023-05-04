import React from 'react';
import Button from '../Button/Button';
import Dropdown from '../Dropdown/Dropdown';
import Switch from '../Switch/Switch';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ModuleCardSettings = ({ children }) => {
    return (
        <div className='absolute bg-[#111015] bg-opacity-60 backdrop-blur-xl p-4 w-2/3 h-auto top-0 right-0 rounded-2xl border border-white border-opacity-10 flex flex-col gap-4 justify-between items-start'>
            <div className='w-full'>
                <h4 className='font-semibold text-xl'>Settings</h4>
            </div>
            <div className='w-full flex flex-col gap-4'> {children} </div>
        </div>
    );
};

export default ModuleCardSettings;