import pizza from "../assets/pizza.png";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="loading-container bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="loading-logo flex flex-col items-center justify-center space-y-6 h-screen"
      >
        {/* Animated Pizza Logo */}
        <div className="relative">
          {/* Outer rotating ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 -m-6"
          >
            <div className="w-44 h-44 border-4 border-transparent border-t-primary border-r-primary rounded-full"></div>
          </motion.div>

          {/* Inner rotating ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 -m-4"
          >
            <div className="w-40 h-40 border-4 border-transparent border-b-red-600 border-l-red-600 rounded-full"></div>
          </motion.div>

          {/* Pizza Icon with Pulse */}
          <motion.img
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-32 h-32 relative z-10"
            src={pizza}
            alt="Loading"
          />
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-2">
          <motion.h3
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-2xl font-bold text-primary"
          >
            Lädt...
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-gray-600"
          >
            Unsere köstlichen Gerichte werden vorbereitet
          </motion.p>
        </div>

        {/* Animated Dots */}
        <div className="flex space-x-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: index * 0.15,
              }}
              className="w-3 h-3 bg-primary rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Loader;
