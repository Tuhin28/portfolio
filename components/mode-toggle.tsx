"use client"

import { Moon, Sun } from 'lucide-react'
import { useTheme } from "next-themes"
import { motion } from 'framer-motion'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 shadow-md overflow-hidden"
      style={{
        perspective: '1000px',
      }}
    >
      <motion.div
        initial={false}
        animate={{
          rotateY: theme === "light" ? 0 : 180,
        }}
        transition={{
          duration: 0.5,
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
        style={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
        }}
      >
        <Sun className="absolute inset-0 h-full w-full p-2 text-yellow-500" style={{ backfaceVisibility: 'hidden' }} />
        <Moon className="absolute inset-0 h-full w-full p-2 text-blue-500" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }} />
      </motion.div>
    </motion.button>
  )
}

