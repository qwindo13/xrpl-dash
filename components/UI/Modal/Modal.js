import { motion, AnimatePresence } from 'framer-motion';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
};

const modalVariants = {
    visible: {
        opacity: 1, scale: 1, 
    },
    hidden: {
        opacity: 0, scale: 0.8,
    },
};

const Modal = ({ children, showModal, closeModal, className }) => {
    return (
      <AnimatePresence mode="wait">
        {showModal && (
          <motion.div
            className={`fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-opacity-50 backdrop-blur-md `}
            onClick={closeModal}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdropVariants}
            style={{ backgroundColor: 'rgba(26, 25, 33, 0.5)' }}
          >
            <motion.div
              className={`m-0 h-full overflow-y-scroll md:h-auto relative w-full max-w-3xl p-4 md:p-8 bg-[#21212A]  md:rounded-2xl shadow-lg border border-white border-opacity-5 ${className}`}
              onClick={(e) => e.stopPropagation()}
              variants={modalVariants}
            >
              <div className='absolute top-4 right-4 md:hidden opacity-60' onClick={closeModal}>
                <CloseRoundedIcon />
              </div>
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };
  
  export default Modal;