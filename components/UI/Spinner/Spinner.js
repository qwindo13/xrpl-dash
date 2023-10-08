import { motion } from 'framer-motion';

const Spinner = () => {
    const spinTransition = {
        repeat: Infinity,
        ease: "linear",
        duration: 0.6
    };

    return (
        <div className='flex justify-center items-center h-full w-full'>
            <motion.span
                style={{
                    display: "block",
                    width: "calc(24px + 1vw)",
                    height: "calc(24px + 1vw)",
                    border: "calc(2px + 0.166vw) solid rgba(166,176,207, 0.05)",
                    borderTop: "calc(2px + 0.166vw) solid #fff",
                    borderRadius: "50%",
                    boxSizing: "border-box",
                    maxWidth: "50px",
                    maxHeight: "50px",
                    minWidth: "24px",
                    minHeight: "24px"
                }}
                animate={{ rotate: 360 }}
                transition={spinTransition}
            />
        </div>
    );
};

export default Spinner;
