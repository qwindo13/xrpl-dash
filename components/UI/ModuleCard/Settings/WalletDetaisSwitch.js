import React from 'react';
import Switch from '../../Switch/Switch';

const WalletDetailsSwitch = ({ value, onChange }) => {
    return (
        <div className='flex flex-row justify-between align-middle gap-2'>
            <div className='flex flex-col'>
                <span className='font-semibold text-base'>Wallet details</span>
                <span className='opacity-60 font-semibold text-xs'>Display wallet balance table</span>
            </div>
            <div className='h-auto flex items-center'>
                <Switch value={value} onChange={onChange} />
            </div>
        </div>
    );
};

export default WalletDetailsSwitch;
