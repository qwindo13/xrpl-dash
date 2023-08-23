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
    title
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-8 right-8 p-4 rounded-2xl drop-shadow-md bg-[#21212A] ${noBackground ? 'bg-transparent' : ''} ${className}`}
        >
            <div className='flex flex-row items-center'>

                {icon && (
                    <div className="mr-3 inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:text-blue-300 dark:bg-blue-900">
                        {icon}
                        <span className="sr-only">Icon</span>
                    </div>
                )}

                <div className="text-sm font-normal">
                    {title && (
                        <span className="mb-1 text-sm font-semibold">{title}</span>
                    )}
                    <div className={`${title ? 'opacity-60' : 'opacity-100'} text-sm font-semibold`}>{message}</div>
                </div>
                <Button className="!px-0 !py-0 ml-3" onClick={onClose}>
                    <CloseRoundedIcon sx={{ fontSize: 18 }} />
                </Button>
            </div>
        </motion.div>
    );
}
