import { motion } from 'framer-motion';
import Button from '../Button/Button';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export default function Toast({
    message,
    type = 'info',
    onClose,
    className,
    icon,
    noBackground = false,
    title,
    key
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-8 right-8 p-4 rounded-2xl drop-shadow-md bg-[#21212A] z-10 ${noBackground ? 'bg-transparent' : ''} ${className}`}
            id={key}
        >
            <div className='flex flex-row items-start'>

                {icon && (
                    <div className="mr-3 inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-[#A6B0CF] bg-opacity-5 rounded-xl">
                        {icon}
                    </div>
                )}

                <div className="text-sm font-normal break-normal">
                    {title && (
                        <span className="mb-1 text-sm font-semibold">{title}</span>
                    )}
                    <p className={`${title ? 'opacity-60' : 'opacity-100'} text-sm font-semibold break-normal max-w-xs`}>{message}</p>
                </div>
                <Button className="!px-0 !py-0 ml-3" onClick={onClose}>
                    <CloseRoundedIcon sx={{ fontSize: 18 }} />
                </Button>
            </div>
        </motion.div>
    );
}
