import React from 'react';
import Button from '../Button/Button';
import Dropdown from '../Dropdown/Dropdown';
import Switch from '../Switch/Switch';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ModuleCardSettings = ({ }) => {
    return (
        <div className='absolute bg-[#111015] bg-opacity-60 backdrop-blur-xl p-4 w-1/2 h-auto top-0 right-0 rounded-2xl border border-white border-opacity-10 flex flex-col gap-4 justify-between items-start'>
            <div className='w-full'>
                <h4 className='font-semibold text-xl'>Settings</h4>
            </div>
            <div className='w-full flex flex-col gap-4'>

                {/* DISPLAY TITLE */}
                <div className='flex flex-row justify-between align-middle gap-2'>
                    <div className='flex flex-col'>
                        <span className='font-semibold text-base'>Title</span>
                        <span className='opacity-60 font-semibold text-xs'>Display title on top of the module</span>
                    </div>
                    <div className='h-auto flex items-center'>
                    <Switch />
                    </div>
                </div>
                {/* DISPLAY SEARCHBAR */}
                <div className='flex flex-row justify-between align-middle gap-2'>
                    <div className='flex flex-col'>
                        <span className='font-semibold text-base'>Searchbar</span>
                        <span className='opacity-60 font-semibold text-xs'>Display searchbar</span>
                    </div>
                    <div className='h-auto flex items-center'>
                    <Switch />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ModuleCardSettings;