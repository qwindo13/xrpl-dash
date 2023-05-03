import React from 'react';
import { motion } from 'framer-motion';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const SearchBar = ({ children, onClick, className, placeholder }) => {

    return (
        <div className={`relative w-full ${className}`}>
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <SearchOutlinedIcon />
            </div>
            <input type="search" className="bg-[#21212A] h-full block w-full p-4 pl-12 text-medium border border-transparent hover:border-white hover:border-opacity-5 active:border active:border-opacity-70 placeholder:text-white placeholder:opacity-60 rounded-2xl transition-all duration-300" placeholder={placeholder} required />
        </div>
    );
};

export default SearchBar;
