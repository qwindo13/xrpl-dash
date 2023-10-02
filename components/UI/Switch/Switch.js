import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./Switch.module.css";

const Switch = ({ value, onChange, disabled = false }) => {
    const [isOn, setIsOn] = useState(value);

    useEffect(() => {
        setIsOn(value);
    }, [value]);

    const toggleSwitch = () => {
        if (disabled) return;
        setIsOn(!isOn);
        onChange(!isOn);
    }



    return (
        <motion.div
            className={`${styles.switch} ${disabled ? styles.disabled : ""}`} // Add the disabled class when disabled is true
            data-isOn={isOn}
            onClick={toggleSwitch}
            layout
        >
            <motion.div className={styles.handle} layout transition={spring} />
        </motion.div>
    );
};


const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
};

export default Switch;
