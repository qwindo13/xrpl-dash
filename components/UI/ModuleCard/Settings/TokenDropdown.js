import React from 'react';
import Button from '../../Button/Button';
import Dropdown from '../../Dropdown/Dropdown';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

const TokenDropdown = () => {
    return (
        <div className='flex flex-row justify-between align-middle gap-2'>
            <div className='flex flex-col gap-2 w-full'>
                <span className='font-semibold text-base'>Token</span>
                <Dropdown
                className={"w-full"}
                    trigger={
                        <Button className="text-sm w-full font-semibold justify-between" disableAnimation endIcon={<KeyboardArrowDownRoundedIcon />}>
                            HOUND
                        </Button>
                    }
                >
                    <p onClick={() => setPayWithToken("Dropdown item 1")}>Dropdown item 1</p>
                    <p onClick={() => setPayWithToken("Dropdown item 2")}>Dropdown item 2</p>
                    <p onClick={() => setPayWithToken("Dropdown item 3")}>Dropdown item 3</p>
                </Dropdown>
                <span className='opacity-60 font-semibold text-xs'>Select the XRPL token you want to display</span>
            </div>

        </div>
    );
};

export default TokenDropdown;
