import React from 'react';
import Button from '../Button/Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ModuleCardTitle = ({ title }) => {
    return (
        <div className='w-full flex flex-row justify-between items-start pb-4'>
            <h3 className='font-semibold text-xl'>{title}</h3>
            <Button className="!p-0 rounded-full" disableAnimation> <MoreVertIcon/> </Button>
        </div>
    );
};

export default ModuleCardTitle;