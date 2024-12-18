import React from 'react';

const TextAreaInput = ({ children, onClick, className, label, placeholder, icon, isRequired, value, onChange, maxLength }) => {

    return (
        <div className='w-full text-left'>
            <label for="default-input" className="block mb-2 text-base font-semibold dark:text-white">
                {label}
                {isRequired && <span className="text-xs font-semibold opacity-60 ml-1">(required)</span>}
            </label>

            <div className={`relative w-full `}>
                {icon &&
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <span className='text-white font-semibold'>{icon}</span>
                    </div>
                }
                <textarea
                    value={value}
                    onChange={onChange}
                    className={`resize-none bg-[#21212A] h-auto block w-full p-4 ${icon ? 'pl-12' : 'pl-4'} text-medium border border-transparent hover:border-white hover:border-opacity-5  focus:border-white focus:border-opacity-70 active:border active:border-opacity-70 placeholder:text-white placeholder:opacity-60 rounded-2xl transition-all duration-300 ${className}`}
                    placeholder={placeholder}
                    required={isRequired}
                    maxLength={maxLength}
                />
            </div>
        </div>
    );
};


export default TextAreaInput;
