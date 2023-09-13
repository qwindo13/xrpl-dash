import { motion } from 'framer-motion';

const Loader = () => {
  const spinTransition = {
    loop: Infinity,
    ease: "linear",
    duration: 1
  };

  return (
    <motion.div
      style={{
        width: "48px",
        height: "48px",
        border: "5px solid #FFF",
        borderBottomColor: "#FF3D00",
        borderRadius: "50%",
        display: "inline-block",
        boxSizing: "border-box"
      }}
      animate={{ rotate: 360 }}
      transition={spinTransition}
    ></motion.div>
  );
};

export default Loader;
