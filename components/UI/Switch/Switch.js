import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./Switch.module.css";

const Switch = ({ value, onChange }) => {
    const [isOn, setIsOn] = useState(value);

    useEffect(() => {
        setIsOn(value);
    }, [value]);

    const toggleSwitch = () => {
        setIsOn(!isOn);
        if (onChange) {
            onChange(!isOn);
        }
    };

    return (
        <div
            className={styles.switch}
            data-isOn={isOn}
            onClick={toggleSwitch}
        >
            <motion.div className={styles.handle} layout transition={spring} />
        </div>
    );
};

const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
};

export default Switch;
