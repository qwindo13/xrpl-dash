import { motion } from "framer-motion";

const draw = {
  hidden: { pathLength: 0, pathOffset: 1 },
  visible: {
    pathLength: 1,
    pathOffset: 0,
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror",
      repeatDelay: 0,
    }
  }
};


const cls1Styles = {
  fill: 'transparent',
  stroke: '#ffffff',
  strokeMiterlimit: 10,
  strokeWidth: 0.5,
};

const Loader = ({text="Loading..."}) => {
  return (
    <div className="w-[100px]">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 49.33 55.03"
        initial="hidden"
        animate="visible"
      >

        <g id="Layer_2" data-name="Layer 2">
            <motion.path
              id="path9"
              style={cls1Styles}
              variants={draw}
              class="cls-1"
              d="M 10.32,18.72 A 0.92,0.92 0 0 1 9.9,18.62 L 2.41,14.31 a 0.87,0.87 0 0 1 0,-1.5 l 7.48,-4.3 a 0.9,0.9 0 0 1 0.86,0 l 7.49,4.31 a 0.86,0.86 0 0 1 0,1.5 l -7.48,4.3 a 0.87,0.87 0 0 1 -0.44,0.1 z m 0,-9.81 a 0.39,0.39 0 0 0 -0.2,0.05 l -7.45,4.29 a 0.36,0.36 0 0 0 0,0.62 l 7.48,4.3 a 0.38,0.38 0 0 0 0.37,0 L 18,13.87 a 0.36,0.36 0 0 0 0,-0.62 L 10.51,9 A 0.39,0.39 0 0 0 10.33,8.91 Z M 39,18.72 a 0.86,0.86 0 0 1 -0.41,-0.1 L 31.1,14.31 a 0.85,0.85 0 0 1 -0.44,-0.75 0.86,0.86 0 0 1 0.43,-0.75 l 7.48,-4.3 a 0.9,0.9 0 0 1 0.86,0 l 7.46,4.31 a 0.9,0.9 0 0 1 0.44,0.75 0.91,0.91 0 0 1 -0.4,0.75 l -7.49,4.3 A 0.87,0.87 0 0 1 39,18.72 Z m 0,-9.81 a 0.34,0.34 0 0 0 -0.19,0.05 l -7.47,4.29 a 0.36,0.36 0 0 0 0,0.62 l 7.48,4.3 a 0.38,0.38 0 0 0 0.37,0 l 7.47,-4.29 a 0.34,0.34 0 0 0 0.14,-0.3 0.37,0.37 0 0 0 -0.18,-0.32 L 39.19,9 A 0.39,0.39 0 0 0 39,8.91 Z M 24.53,27 a 0.94,0.94 0 0 1 -0.42,-0.11 l -7.49,-4.31 a 0.84,0.84 0 0 1 -0.44,-0.75 0.85,0.85 0 0 1 0.44,-0.75 l 4.79,-2.72 V 8.74 L 16.75,6.05 a 0.87,0.87 0 0 1 0,-1.5 l 7.48,-4.34 a 0.9,0.9 0 0 1 0.86,0 l 7.49,4.35 a 0.86,0.86 0 0 1 0,1.5 l -4.89,2.82 v 9.43 l 4.75,2.76 a 0.85,0.85 0 0 1 0.44,0.75 0.84,0.84 0 0 1 -0.44,0.75 L 25,26.88 A 1.06,1.06 0 0 1 24.53,27 Z M 24.67,0.61 a 0.53,0.53 0 0 0 -0.2,0.05 L 17,5 a 0.36,0.36 0 0 0 0,0.62 l 4.91,2.83 v 10.2 l -5.05,2.88 a 0.34,0.34 0 0 0 -0.18,0.3 0.37,0.37 0 0 0 0.18,0.31 l 7.48,4.3 a 0.4,0.4 0 0 0 0.37,0 l 7.47,-4.3 a 0.37,0.37 0 0 0 0.18,-0.31 0.34,0.34 0 0 0 -0.18,-0.3 l -5,-2.91 v -10 l 5.14,-3 A 0.32,0.32 0 0 0 32.5,5.32 0.34,0.34 0 0 0 32.32,5 L 24.85,0.65 A 0.39,0.39 0 0 0 24.67,0.61 Z M 8.44,46.66 A 0.88,0.88 0 0 1 8,46.54 L 0.54,42.24 A 0.9,0.9 0 0 1 0.1,41.47 v -8.63 a 0.88,0.88 0 0 1 0.44,-0.77 0.85,0.85 0 0 1 0.87,0 l 4.85,2.79 8.08,-4.8 V 24.5 a 0.87,0.87 0 0 1 1.31,-0.76 L 23.12,28 a 0.92,0.92 0 0 1 0.44,0.77 v 8.6 a 0.88,0.88 0 0 1 -0.45,0.77 0.83,0.83 0 0 1 -0.86,0 l -4.72,-2.73 -8.21,4.95 v 5.42 A 0.88,0.88 0 0 1 8.87,46.55 0.92,0.92 0 0 1 8.44,46.66 Z M 1,32.46 a 0.37,0.37 0 0 0 -0.17,0 0.37,0.37 0 0 0 -0.19,0.33 v 8.63 a 0.4,0.4 0 0 0 0.2,0.34 l 7.43,4.34 a 0.32,0.32 0 0 0 0.35,0 0.37,0.37 0 0 0 0.19,-0.32 v -5.71 l 8.72,-5.21 5,2.88 a 0.36,0.36 0 0 0 0.35,0 0.37,0.37 0 0 0 0.19,-0.33 v -8.6 a 0.42,0.42 0 0 0 -0.2,-0.34 l -7.46,-4.29 a 0.32,0.32 0 0 0 -0.35,0 0.37,0.37 0 0 0 -0.19,0.32 v 5.85 L 6.29,35.45 1.15,32.51 A 0.41,0.41 0 0 0 1,32.46 Z M 8.48,30 A 0.82,0.82 0 0 1 8.05,29.88 L 0.58,25.62 A 0.81,0.81 0 0 1 0.13,24.88 v -8.64 a 0.88,0.88 0 0 1 1.31,-0.77 l 7.48,4.27 a 0.91,0.91 0 0 1 0.43,0.77 v 8.64 A 0.87,0.87 0 0 1 8.91,29.92 1,1 0 0 1 8.48,30 Z M 1,15.87 a 0.31,0.31 0 0 0 -0.18,0.05 0.36,0.36 0 0 0 -0.18,0.32 v 8.64 a 0.31,0.31 0 0 0 0.16,0.28 v 0 l 7.47,4.3 a 0.32,0.32 0 0 0 0.35,0 0.36,0.36 0 0 0 0.19,-0.32 V 20.51 A 0.4,0.4 0 0 0 8.62,20.18 L 1.19,15.92 A 0.31,0.31 0 0 0 1,15.87 Z m 21.82,39.05 a 0.81,0.81 0 0 1 -0.43,-0.11 l -7.48,-4.3 A 0.94,0.94 0 0 1 14.47,49.74 V 41.1 a 0.88,0.88 0 0 1 0.45,-0.77 0.83,0.83 0 0 1 0.86,0 l 7.48,4.3 a 0.92,0.92 0 0 1 0.43,0.77 V 54 a 0.87,0.87 0 0 1 -0.44,0.77 0.84,0.84 0 0 1 -0.43,0.15 z M 15.35,40.73 a 0.39,0.39 0 0 0 -0.18,0 0.39,0.39 0 0 0 -0.18,0.33 v 8.64 a 0.4,0.4 0 0 0 0.19,0.33 l 7.46,4.29 a 0.32,0.32 0 0 0 0.35,0 A 0.35,0.35 0 0 0 23.18,54 V 45.4 A 0.41,0.41 0 0 0 23,45.07 l -7.47,-4.3 a 0.39,0.39 0 0 0 -0.18,-0.04 z m 25.54,5.93 a 1,1 0 0 1 -0.43,-0.11 0.87,0.87 0 0 1 -0.44,-0.77 v -5.56 l -8.39,-4.77 -4.79,2.76 a 0.83,0.83 0 0 1 -0.86,0 0.86,0.86 0 0 1 -0.44,-0.77 V 28.81 A 0.83,0.83 0 0 1 26,28 l 2.51,-1.46 4.92,-2.83 a 0.85,0.85 0 0 1 0.86,0 0.87,0.87 0 0 1 0.44,0.77 V 30 l 8.45,4.8 4.72,-2.72 a 0.85,0.85 0 0 1 0.86,0 0.93,0.93 0 0 1 0.48,0.77 v 8.65 a 0.83,0.83 0 0 1 -0.44,0.78 l -7.47,4.29 a 0.82,0.82 0 0 1 -0.44,0.09 z m -9.26,-11.8 8.9,5.06 v 5.86 a 0.38,0.38 0 0 0 0.18,0.32 0.32,0.32 0 0 0 0.35,0 l 7.48,-4.3 a 0.35,0.35 0 0 0 0.18,-0.33 v -8.63 a 0.42,0.42 0 0 0 -0.21,-0.34 0.36,0.36 0 0 0 -0.36,0 v 0 l -5,2.87 -9,-5.09 V 24.5 a 0.37,0.37 0 0 0 -0.19,-0.32 0.32,0.32 0 0 0 -0.35,0 l -7.44,4.3 a 0.35,0.35 0 0 0 -0.18,0.33 v 8.63 a 0.37,0.37 0 0 0 0.19,0.33 0.36,0.36 0 0 0 0.35,0 z M 26.48,54.93 A 0.85,0.85 0 0 1 26.05,54.81 0.87,0.87 0 0 1 25.61,54.04 V 45.4 a 0.81,0.81 0 0 1 0.45,-0.77 l 7.46,-4.33 a 0.84,0.84 0 0 1 0.85,0 0.92,0.92 0 0 1 0.46,0.81 v 8.64 a 0.83,0.83 0 0 1 -0.45,0.77 l -7.47,4.3 a 0.82,0.82 0 0 1 -0.43,0.11 z M 34,40.69 a 0.34,0.34 0 0 0 -0.17,0.05 v 0 L 26.3,45.08 A 0.33,0.33 0 0 0 26.12,45.4 V 54 a 0.35,0.35 0 0 0 0.19,0.32 0.32,0.32 0 0 0 0.35,0 l 7.47,-4.3 A 0.33,0.33 0 0 0 34.31,49.7 V 41.1 A 0.4,0.4 0 0 0 34.12,40.74 0.37,0.37 0 0 0 34,40.69 Z M 40.86,30 a 0.92,0.92 0 0 1 -0.43,-0.11 0.88,0.88 0 0 1 -0.45,-0.77 v -8.61 a 0.85,0.85 0 0 1 0.45,-0.78 l 7.46,-4.29 a 0.85,0.85 0 0 1 0.87,0 0.88,0.88 0 0 1 0.44,0.77 v 8.64 a 0.81,0.81 0 0 1 -0.45,0.77 l -7.46,4.3 A 1,1 0 0 1 40.86,30 Z m 7.47,-14.2 a 0.41,0.41 0 0 0 -0.18,0.05 l -7.48,4.3 a 0.35,0.35 0 0 0 -0.18,0.33 v 8.64 a 0.36,0.36 0 0 0 0.19,0.32 0.32,0.32 0 0 0 0.35,0 v 0 l 7.48,-4.3 a 0.34,0.34 0 0 0 0.18,-0.32 V 16.21 A 0.37,0.37 0 0 0 48.5,15.88 0.37,0.37 0 0 0 48.33,15.83 Z"
             />
        </g>

      </motion.svg>
      <div className="text-center text-white mt-2">
        {text}
      </div>
    </div>
  );
}

export default Loader;
