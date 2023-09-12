import React from 'react';
import Button from '../../Button/Button';
import ImageSearchRoundedIcon from '@mui/icons-material/ImageSearchRounded';

const SearchNftButton = ({value, onChange, disabled = false }) => {
    return (
        <div className='flex flex-row justify-between align-middle gap-2'>
            <div className='flex flex-col'>
                <span className='font-semibold text-base'>Choose NFT</span>
                <span className='opacity-60 font-semibold text-xs'>Random NFT if none is selected</span>
            </div>
            <div className='h-auto flex items-center'>
                <Button className="aspect-square !rounded-full !p-3" disabled={disabled} onClick={() => onChange(!value)}>
                    <ImageSearchRoundedIcon sx={{ fontSize: 16 }}/>
                </Button>
            </div>
        </div>
    );
};

export default SearchNftButton;
