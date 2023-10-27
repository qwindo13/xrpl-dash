import { motion, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

function Countdown(props) {

    // Calculate the difference between the start date and the current date
    const getTimeDifference = (date) => {
        const now = new Date();
        const difference = date.getTime() - now.getTime();

        const secondsInADay = 86400;
        const secondsInAnHour = 3600;
        const secondsInAMinute = 60;

        const days = Math.floor(difference / 1000 / secondsInADay);
        const hours = Math.floor((difference / 1000 - days * secondsInADay) / secondsInAnHour);
        const minutes = Math.floor((difference / 1000 - days * secondsInADay - hours * secondsInAnHour) / secondsInAMinute);
        const seconds = Math.floor(difference / 1000) % secondsInAMinute;

        return { days, hours, minutes, seconds };
    };

    const [timeLeft, setTimeLeft] = useState(getTimeDifference(new Date(props.startDate)));
    const [isMounted, setIsMounted] = useState(false);

    // Use this useEffect to set the component as mounted
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Separate useEffect for the countdown logic
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(getTimeDifference(new Date(props.startDate)));
        }, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, [props.startDate]);

    if (!isMounted) {
        return null;  // or you can return a placeholder/loading state here if you prefer
    }

    const TimeBlock = ({ value, label, className }) => (
        <div className={`flex flex-col border border-white border-opacity-5 rounded-lg grow items-center py-4 transition-all duration-300 ${className}`}>
            <motion.span className="text-4xl">{value}</motion.span>
            <span className="opacity-60 text-xs uppercase">{label}</span>
        </div>
    );

    return (
        <div className="flex flex-row gap-2 w-full ">
            <TimeBlock value={timeLeft.days} label="Days" className={props.className} />
            <TimeBlock value={timeLeft.hours} label="Hours" className={props.className} />
            <TimeBlock value={timeLeft.minutes} label="Minutes" className={props.className} />
            <TimeBlock value={timeLeft.seconds} label="Seconds" className={props.className} />
        </div>
    );
}

export default Countdown;
