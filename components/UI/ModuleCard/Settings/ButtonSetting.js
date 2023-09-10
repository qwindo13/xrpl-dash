import React from 'react';
import Button from '../../Button/Button';

const ButtonSetting = ({title, description, value, onChange, disabled = false }) => {
    return (
        <div className='flex flex-row justify-between align-middle gap-2'>
            <div className='flex flex-col'>
                <span className='font-semibold text-base'>{title}</span>
                <span className='opacity-60 font-semibold text-xs'>{description}</span>
            </div>
            <div className='h-auto flex items-center'>
                <Button>Search</Button>
            </div>
        </div>
    );
};

export default ButtonSetting;
