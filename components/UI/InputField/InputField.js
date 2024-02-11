import React, { useState } from 'react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

const InputField = ({ children, onClick, className, label, placeholder, icon, isRequired, value, onChange, description, sendIcon = false }) => {
    const [inputValue, setInputValue] = useState(value);
    // Update state on input change
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        onChange && onChange(e); // Propagate the change to parent component
    }
    return (
        <div className='w-full text-left'>
            {label &&
                <label for="default-input" className="block mb-2 text-base font-semibold dark:text-white">
                    {label}
                    {isRequired && <span className="text-xs font-semibold opacity-60 ml-1">(required)</span>}
                </label>
            }

            <div className={`relative w-full `}>
                {icon &&
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <span className='text-white font-semibold'>{icon}</span>
                    </div>
                }
                <input
                    type="text"
                    value={value}
                    onChange={handleInputChange}
                    className={`bg-[#21212A] font-normal h-full block w-full p-4 ${icon ? 'pl-12' : 'pl-4'} ${sendIcon ? 'pr-12' : 'pr-4'} text-medium border border-transparent hover:border-white hover:border-opacity-5  focus:border-white focus:border-opacity-70 active:border active:border-opacity-70 placeholder:text-white placeholder:opacity-40 rounded-2xl transition-all duration-300 ${className}`}
                    placeholder={placeholder}
                    required={isRequired}
                    maxLength={40}
                    onKeyPress={(e) => e.key === 'Enter' && inputValue && onClick && onClick(inputValue)}
                />
                {sendIcon &&
                    <div className={`absolute inset-y-0 right-0 flex items-center pr-4 ${inputValue ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
                        <SendRoundedIcon className={`text-white font-semibold ${inputValue ? 'opacity-100' : 'opacity-40'}`} sx={{ fontSize: 18 }}/>
                    </div>
                }
            </div>
            {description &&
                <span className='opacity-60 font-semibold text-xs'>{description}</span>
            }
        </div>
    );
};

export default InputField;
