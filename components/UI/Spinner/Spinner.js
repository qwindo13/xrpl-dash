import { motion } from 'framer-motion';

const Spinner = () => {
  const spinTransition = {
    repeat: Infinity,
    ease: "linear",
    // width: ["100%", "50%"],
    duration: 0.6
  };

  return (

    <motion.span
      style={{
        display: "block",
        width: 24,
        height: 24,
        border: "4px solid rgba(166,176,207, 0.05)",
        borderTop: "4px solid #fff",
        borderRadius: "50%",
        boxSizing: "border-box",
        position: "absolute",
        top: 0,
        left: 0
      }}
      animate={{ rotate: 360 }}
      transition={spinTransition}
    />

  );
};

export default Spinner;
