import { useState } from 'react';
import { motion } from "framer-motion";


function Checkbox({ label }) {
    const [isChecked, setIsChecked] = useState(false);
    const tickVariants = {
        checked: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration: 0.2,
            },
        },
        unchecked: {
            pathLength: 0,
            opacity: 0,
            transition: {
                duration: 0.2,
            },
        },
    };

    return (
        <label className="flex items-center space-x-3">
            <button className="relative flex items-center">
                <input
                    type="checkbox"
                    className="border-white border-opacity-5 relative h-5 w-5 cursor-pointer appearance-none rounded-md border-2 transition-all duration-300 checked:border-opacity-100 checked:bg-white"
                    onChange={() => setIsChecked(!isChecked)}
                />
                <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#1A1921]">
                    <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        className="h-3.5 w-3.5"
                        initial={false}
                        animate={isChecked ? "checked" : "unchecked"}
                    >
                        <motion.path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                            variants={tickVariants}
                        />
                    </motion.svg>
                </div>
            </button>
            <span className="text-white font-semibold">{label}</span>
        </label>
    );
}

export default Checkbox;
