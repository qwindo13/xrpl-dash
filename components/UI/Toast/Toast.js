import { motion } from 'framer-motion';
import Button from '../Button/Button';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


export default function Toast({ message, type = 'info', onClose, className }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-8 right-8 p-4 rounded-2xl drop-shadow-md ${type === 'info' ? 'bg-[#21212A]' : 'bg-[#21212A]'} text-white ${className}`}
        >
            <div className='flex flex-row items-center'>
                <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:text-blue-300 dark:bg-blue-900">
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97" />
                    </svg>
                    <span class="sr-only">Refresh icon</span>
                </div>
                <div class="ml-3 text-sm font-normal">
                    <span class="mb-1 text-sm font-semibold text-white">Update available</span>
                    <div class="text-sm font-normal opacity-60">{message}</div>  
                </div>
                <Button className="!px-0 !py-0 ml-3" onClick={onClose}>
                    <CloseRoundedIcon sx={{ fontSize: 18 }}/>
                </Button>
            </div>

            
           

            


        </motion.div>
    );
}
