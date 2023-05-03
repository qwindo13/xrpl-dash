import React from 'react';
import Button from '../Button/Button';
import Dropdown from '../Dropdown/Dropdown';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ModuleCardSettings = ({ }) => {
    return (
        <div className='absolute bg-[#111015] bg-opacity-60 backdrop-blur-xl p-4 w-1/2 h-auto top-0 right-0 rounded-2xl border border-white border-opacity-10 flex flex-row justify-between items-start'>
            <div className='w-full'>
                <h4 className='font-semibold text-xl'>Settings</h4>
            </div>
        </div>
    );
};

export default ModuleCardSettings;