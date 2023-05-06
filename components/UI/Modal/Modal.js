import { motion, AnimatePresence } from 'framer-motion';

const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
};

const modalVariants = {
    visible: {
        opacity: 1, scale: 1, transition: {
            type: "spring",
            stiffness: 700,
            damping: 30,
        }
    },
    hidden: {
        opacity: 0, scale: 0.8, transition: {
            type: "spring",
            stiffness: 700,
            damping: 30,
        }
    },
};

const Modal = ({ children, showModal, closeModal }) => {
    return (
      <AnimatePresence mode="wait">
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-opacity-50 backdrop-blur-md"
            onClick={closeModal}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdropVariants}
            style={{ backgroundColor: 'rgba(33, 33, 42, 0.5)' }}
          >
            <motion.div
              className="m-4 md:m-0 relative w-full max-w-3xl p-8 bg-[#21212A] border-0 rounded-2xl shadow-lg"
              onClick={(e) => e.stopPropagation()}
              variants={modalVariants}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };
  
  export default Modal;