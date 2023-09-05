import { motion, AnimatePresence } from 'framer-motion';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useState, useEffect } from 'react';

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const Modal = ({ title, description, children, showModal, closeModal, className, allowBackgroundScroll = false }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);


  useEffect(() => {
    if (showModal && !allowBackgroundScroll) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal, allowBackgroundScroll]);

  let modalVariants = {
    visible: {
      opacity: 1,
      scale: 1,
      y: "0%",
      transition: isMobile ? { stiffness: 100 } : undefined

    },
    hidden: {
      opacity: 0,
      scale: isMobile ? 1 : 0.8,
      y: isMobile ? "100%" : "0%",
      transition: isMobile ? { stiffness: 100 } : undefined

    }
  };

  return (
    <AnimatePresence mode="wait">
      {showModal && (
        <motion.div
          className={`fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-hidden md:overflow-y-auto outline-none focus:outline-none bg-opacity-50 backdrop-blur-md`}
          onClick={closeModal}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          style={{ backgroundColor: 'rgba(26, 25, 33, 0.5)' }}
        >

          <div className='absolute top-8 right-8 md:hidden ' onClick={closeModal}>
            <CloseRoundedIcon />
          </div>

          <motion.div
            className={`absolute bottom-0 m-0 overflow-y-scroll h-auto max-h-[66%] md:max-h-full md:relative w-full max-w-3xl p-8 bg-[#21212A] rounded-2xl shadow-lg border border-white border-opacity-5 !overflow-visible ${className}`}
            onClick={(e) => e.stopPropagation()}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >

            {(title || description) && (
                <div className="pb-4 md:pb-8">
                  {title && <h2 className="text-xl font-semibold mb-2"> {title} </h2>}
                  {description && <span className="text-base font-semibold opacity-60 hidden md:block">{description}</span>}
                </div>
              )}

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
