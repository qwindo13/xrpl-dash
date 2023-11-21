import { motion } from 'framer-motion';

const Avatar = ({ className }) => {
    return (
        <motion.div
            className={`rounded-full bg-default-avatar h-12 w-12 aspect-square ${className}`}
            style={{
                backgroundImage: 'linear-gradient(to bottom right, #f280a3, #c86ba0, #9b569d, #75619a, #4f6c97, #85a8d8)',
            }}
        />
    );
};

export default Avatar;

