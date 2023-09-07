import React from 'react';

const NftsSlider = ({ value, onChange }) => {
   
    return (

        <div className='flex flex-row justify-between align-middle gap-2'>
            <div className='flex flex-col'>
                <span className='font-semibold text-base'>Choose NFT</span>
                <span className='opacity-60 font-semibold text-xs'>Random NFT if none is selected</span>
            </div>

        </div>
    );
};

export default NftsSlider;
