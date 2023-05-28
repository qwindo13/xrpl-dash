import { motion } from "framer-motion";

const draw = {
  hidden: { pathLength: 0 },
  visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
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

const Loader = () => {
  return (
    <div className="w-[100px]">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 49.33 55.03"
        initial="hidden"
        animate="visible"
      >

        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <motion.path variants={draw} style={cls1Styles} class="cls-1" d="M40.86,30a.92.92,0,0,1-.43-.11.88.88,0,0,1-.45-.77V20.51a.85.85,0,0,1,.45-.78l7.46-4.29a.85.85,0,0,1,.87,0,.88.88,0,0,1,.44.77v8.64a.81.81,0,0,1-.45.77l-7.46,4.3A1,1,0,0,1,40.86,30Zm7.47-14.2a.41.41,0,0,0-.18.05l-7.48,4.3a.35.35,0,0,0-.18.33v8.64a.36.36,0,0,0,.19.32.32.32,0,0,0,.35,0h0l7.48-4.3a.34.34,0,0,0,.18-.32V16.21a.37.37,0,0,0-.19-.33A.37.37,0,0,0,48.33,15.83Z" />
            <motion.path variants={draw} style={cls1Styles}  class="cls-1" d="M26.48,54.93a.85.85,0,0,1-.43-.12.87.87,0,0,1-.44-.77V45.4a.81.81,0,0,1,.45-.77l7.46-4.33a.84.84,0,0,1,.85,0,.92.92,0,0,1,.46.81v8.64a.83.83,0,0,1-.45.77l-7.47,4.3A.82.82,0,0,1,26.48,54.93ZM34,40.69a.34.34,0,0,0-.17.05h0L26.3,45.08a.33.33,0,0,0-.18.32V54a.35.35,0,0,0,.19.32.32.32,0,0,0,.35,0l7.47-4.3a.33.33,0,0,0,.18-.32V41.1a.4.4,0,0,0-.19-.36A.37.37,0,0,0,34,40.69Z" />
            <motion.path variants={draw} style={cls1Styles}  class="cls-1" d="M40.89,46.66a1,1,0,0,1-.43-.11.87.87,0,0,1-.44-.77V40.22l-8.39-4.77-4.79,2.76a.83.83,0,0,1-.86,0,.86.86,0,0,1-.44-.77V28.81A.83.83,0,0,1,26,28l2.51-1.46,4.92-2.83a.85.85,0,0,1,.86,0,.87.87,0,0,1,.44.77V30l8.45,4.8,4.72-2.72a.85.85,0,0,1,.86,0,.93.93,0,0,1,.48.77v8.65a.83.83,0,0,1-.44.78l-7.47,4.29A.82.82,0,0,1,40.89,46.66Zm-9.26-11.8,8.9,5.06v5.86a.38.38,0,0,0,.18.32.32.32,0,0,0,.35,0l7.48-4.3a.35.35,0,0,0,.18-.33V32.84a.42.42,0,0,0-.21-.34.36.36,0,0,0-.36,0h0l-5,2.87-9-5.09V24.5a.37.37,0,0,0-.19-.32.32.32,0,0,0-.35,0l-7.44,4.3a.35.35,0,0,0-.18.33v8.63a.37.37,0,0,0,.19.33.36.36,0,0,0,.35,0Z" />
            <motion.path variants={draw} style={cls1Styles}  class="cls-1" d="M22.82,54.92a.81.81,0,0,1-.43-.11l-7.48-4.3a.94.94,0,0,1-.44-.77V41.1a.88.88,0,0,1,.45-.77.83.83,0,0,1,.86,0l7.48,4.3a.92.92,0,0,1,.43.77V54a.87.87,0,0,1-.44.77A.84.84,0,0,1,22.82,54.92ZM15.35,40.73a.39.39,0,0,0-.18,0,.39.39,0,0,0-.18.33v8.64a.4.4,0,0,0,.19.33l7.46,4.29a.32.32,0,0,0,.35,0,.35.35,0,0,0,.19-.32V45.4a.41.41,0,0,0-.18-.33l-7.47-4.3A.39.39,0,0,0,15.35,40.73Z" />
            <motion.path variants={draw} style={cls1Styles}  class="cls-1" d="M8.48,30a.82.82,0,0,1-.43-.12L.58,25.62a.81.81,0,0,1-.45-.74V16.24a.88.88,0,0,1,1.31-.77l7.48,4.27a.91.91,0,0,1,.43.77v8.64a.87.87,0,0,1-.44.77A1,1,0,0,1,8.48,30ZM1,15.87a.31.31,0,0,0-.18.05.36.36,0,0,0-.18.32v8.64a.31.31,0,0,0,.16.28h0l7.47,4.3a.32.32,0,0,0,.35,0,.36.36,0,0,0,.19-.32V20.51a.4.4,0,0,0-.19-.33L1.19,15.92A.31.31,0,0,0,1,15.87Z" />
            <motion.path variants={draw} style={cls1Styles}  class="cls-1" d="M8.44,46.66A.88.88,0,0,1,8,46.54L.54,42.24a.9.9,0,0,1-.44-.77V32.84a.88.88,0,0,1,.44-.77.85.85,0,0,1,.87,0l4.85,2.79,8.08-4.8V24.5a.87.87,0,0,1,1.31-.76L23.12,28a.92.92,0,0,1,.44.77v8.6a.88.88,0,0,1-.45.77.83.83,0,0,1-.86,0l-4.72-2.73L9.32,40.36v5.42a.88.88,0,0,1-.45.77A.92.92,0,0,1,8.44,46.66ZM1,32.46a.37.37,0,0,0-.17,0,.37.37,0,0,0-.19.33v8.63a.4.4,0,0,0,.2.34L8.27,46.1a.32.32,0,0,0,.35,0,.37.37,0,0,0,.19-.32V40.07l8.72-5.21,5,2.88a.36.36,0,0,0,.35,0,.37.37,0,0,0,.19-.33v-8.6a.42.42,0,0,0-.2-.34l-7.46-4.29a.32.32,0,0,0-.35,0,.37.37,0,0,0-.19.32v5.85l-8.58,5.1L1.15,32.51A.41.41,0,0,0,1,32.46Z" />
            <motion.path variants={draw} style={cls1Styles}  class="cls-1" d="M24.53,27a.94.94,0,0,1-.42-.11l-7.49-4.31a.84.84,0,0,1-.44-.75.85.85,0,0,1,.44-.75l4.79-2.72V8.74L16.75,6.05a.87.87,0,0,1,0-1.5L24.23.21a.9.9,0,0,1,.86,0l7.49,4.35a.86.86,0,0,1,0,1.5L27.69,8.88v9.43l4.75,2.76a.85.85,0,0,1,.44.75.84.84,0,0,1-.44.75L25,26.88A1.06,1.06,0,0,1,24.53,27ZM24.67.61a.53.53,0,0,0-.2.05L17,5a.36.36,0,0,0,0,.62l4.91,2.83v10.2l-5.05,2.88a.34.34,0,0,0-.18.3.37.37,0,0,0,.18.31l7.48,4.3a.4.4,0,0,0,.37,0l7.47-4.3a.37.37,0,0,0,.18-.31.34.34,0,0,0-.18-.3l-5-2.91v-10l5.14-3a.32.32,0,0,0,.18-.3A.34.34,0,0,0,32.32,5L24.85.65A.39.39,0,0,0,24.67.61Z" />
            <motion.path variants={draw} style={cls1Styles} class="cls-1" d="M39,18.72a.86.86,0,0,1-.41-.1L31.1,14.31a.85.85,0,0,1-.44-.75.86.86,0,0,1,.43-.75l7.48-4.3a.9.9,0,0,1,.86,0l7.46,4.31a.9.9,0,0,1,.44.75.91.91,0,0,1-.4.75l-7.49,4.3A.87.87,0,0,1,39,18.72Zm0-9.81a.34.34,0,0,0-.19.05l-7.47,4.29a.36.36,0,0,0,0,.62l7.48,4.3a.38.38,0,0,0,.37,0l7.47-4.29a.34.34,0,0,0,.14-.3.37.37,0,0,0-.18-.32L39.19,9A.39.39,0,0,0,39,8.91Z" />
            <motion.path variants={draw} style={cls1Styles}  class="cls-1" d="M10.32,18.72a.92.92,0,0,1-.42-.1L2.41,14.31a.87.87,0,0,1,0-1.5l7.48-4.3a.9.9,0,0,1,.86,0l7.49,4.31a.86.86,0,0,1,0,1.5l-7.48,4.3A.87.87,0,0,1,10.32,18.72Zm0-9.81a.39.39,0,0,0-.2.05L2.67,13.25a.36.36,0,0,0,0,.62l7.48,4.3a.38.38,0,0,0,.37,0L18,13.87a.36.36,0,0,0,0-.62L10.51,9A.39.39,0,0,0,10.33,8.91Z" />
          </g>
        </g>

      </motion.svg>
    </div>
  );
}

export default Loader;