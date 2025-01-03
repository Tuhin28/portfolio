import { motion } from 'framer-motion';

export function WavingHand() {
  return (
    <motion.span
      className="inline-block"
      whileHover={{ rotate: [0, 14, -8, 14, -4, 10, 0], scale: 1.2 }}
      transition={{ duration: 0.5 }}
    >
      👋
    </motion.span>
  );
}

