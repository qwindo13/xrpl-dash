import { motion } from "framer-motion";
import React from "react";

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 },
};

const Stepper = ({ currentStep, steps, onPrev, onNext, canGoNext }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="flex justify-center">
        {steps.map((_, index) => {
          let style = "bg-[#A6B0CF] bg-opacity-5"; // Default style for remaining steps
          if (index < currentStep) style = "bg-white"; // Style for completed steps
          if (index === currentStep) style = "bg-white border-2 border-[#A6B0CF] border-opacity-5"; // Style for current step

          return (
            <motion.div
              key={index}
              className={`w-4 h-4 mr-2 rounded-full ${style}`}
              variants={variants}
              initial="initial"
              animate="animate"
              transition="transition"
            />
          );
        })}
      </div>
      <div className="flex justify-between w-full">
        {currentStep > 0 && <button onClick={onPrev}>Previous</button>}
        <div></div> {/* This empty div ensures that buttons are on the sides when there's only one button */}
        {currentStep < steps.length - 1 && canGoNext && <button onClick={onNext}>Next</button>}
      </div>
    </div>
  );
};

export default Stepper;
