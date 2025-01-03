import { motion } from 'framer-motion';

export default function Logo() {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg"
      style={{
        transformStyle: 'preserve-3d',
        transform: 'perspective(1000px) rotateX(10deg) rotateY(-10deg)',
      }}
      whileHover={{
        scale: 1.05,
        rotateX: 0,
        rotateY: 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 10,
      }}
    >
      <span className="text-gray-900 dark:text-white font-medium">unbearable</span>
    </motion.div>
  );
}

