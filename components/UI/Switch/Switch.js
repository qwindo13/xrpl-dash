import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./Switch.module.css";

const Switch = ({ value, onChange, disabled = false, size = 'md' }) => {
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
            className={`${styles.switch} ${styles[size]} ${disabled ? styles.disabled : ""}`}
            data-isOn={isOn}
            onClick={toggleSwitch}
            layout
        >
            <motion.div className={`${styles.handle} ${styles[size]}`} layout transition={spring} />
        </motion.div>
    );
};


const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
};

export default Switch;
