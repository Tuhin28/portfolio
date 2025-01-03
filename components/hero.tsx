"use client"

import { motion } from "framer-motion"
import { ArrowRight } from 'lucide-react'

const heroAnimation = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
}

export function Hero() {
  return (
    <section id="hero" className="min-h-screen bg-[#FF4820] dark:bg-gray-900 flex items-center">
      <div className="container mx-auto px-6">
        <motion.div 
          className="max-w-4xl"
          initial={heroAnimation.initial}
          animate={heroAnimation.animate}
          transition={heroAnimation.transition}
        >
          <div className="mb-8">
            <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 flex items-center gap-2 font-unbounded">
              Hi, I&apos;m Mika <span className="inline-block">👋</span>
            </h1>
            <div className="text-white/90 text-xl md:text-2xl flex items-center gap-3 font-inter">
              Designer <ArrowRight className="w-4 h-4" /> Developer
            </div>
          </div>
          
          <h2 className="text-white text-5xl md:text-8xl font-bold leading-tight tracking-tight font-unbounded">
            ALL-IN-ONE<br />
            WEBSITE<br />
            MAKER
          </h2>
        </motion.div>
      </div>
    </section>
  )
}

