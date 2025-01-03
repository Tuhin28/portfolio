'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import images from '@/utils/images'

const Gallery = dynamic(() => import('./Gallery'), {
  loading: () => <div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg"></div>
})

const hobbies = [
  {
    title: "Digital Art",
    description: "Creating vibrant digital illustrations",
    image: images.placeholder(600, 400)
  },
  {
    title: "Manga Drawing",
    description: "Sketching manga-style characters",
    image: images.placeholder(600, 400)
  },
  {
    title: "Character Design",
    description: "Designing unique anime characters",
    image: images.placeholder(600, 400)
  },
  {
    title: "Concept Art",
    description: "Visualizing futuristic worlds and scenes",
    image: images.placeholder(600, 400)
  },
  {
    title: "Animation",
    description: "Bringing characters to life through motion",
    image: images.placeholder(600, 400)
  },
  {
    title: "Fan Art",
    description: "Recreating favorite anime scenes and characters",
    image: images.placeholder(600, 400)
  }
]

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  },
  exit: { opacity: 0, y: -20 }
}

const scrollAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

export function Hobbies() {
  const [filter, setFilter] = useState('all')
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', updateCursorPosition)
    return () => window.removeEventListener('mousemove', updateCursorPosition)
  }, [])

  return (
    <motion.section 
      className="min-h-screen bg-dark text-light overflow-hidden"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      <div className="custom-cursor" style={{ left: cursorPosition.x, top: cursorPosition.y }} />

      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ParticleBackground />
        </div>
        <div className="container mx-auto px-4 z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <motion.h1 
                className="heading text-6xl md:text-8xl mb-4 text-primary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Digital Arts & Creativity
              </motion.h1>
              <motion.p 
                className="body-text text-xl mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Explore the vibrant world of digital creativity
              </motion.p>
              <motion.button 
                className="bg-secondary text-light px-8 py-3 rounded-full text-lg font-bold hover:bg-opacity-80 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Exploring
              </motion.button>
            </div>
            <div className="md:w-1/2 relative">
              <FloatingArtwork />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="bg-dark py-4 sticky top-0 z-20">
        <div className="container mx-auto px-4">
          <ul className="flex justify-center space-x-6">
            {['Digital Art Gallery', 'Anime Collections', 'Creative Process', 'Inspiration Board'].map((item) => (
              <motion.li 
                key={item}
                className="text-light hover:text-neon cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Gallery Grid */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="heading text-4xl md:text-5xl mb-8 text-center text-primary">Art Gallery</h2>
        <div className="flex justify-center mb-8 space-x-4">
          {['all', 'Digital Art', 'Manga Style', 'Character Design', 'Concept Art'].map((category) => (
            <motion.button
              key={category}
              className={`px-4 py-2 rounded-full ${filter === category ? 'bg-secondary' : 'bg-dark'} text-light`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(category)}
            >
              {category}
            </motion.button>
          ))}
        </div>
        <Gallery hobbies={hobbies} filter={filter} />
      </div>
    </motion.section>
  )
}

function FloatingArtwork() {
  return (
    <div className="relative w-full h-96">
      {hobbies.slice(0, 3).map((hobby, index) => (
        <motion.div
          key={hobby.title}
          className="absolute w-40 h-40 rounded-lg overflow-hidden shadow-lg"
          initial={{ x: 0, y: 0 }}
          animate={{
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
            rotate: Math.random() * 20 - 10,
          }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 5 + index,
          }}
        >
          <Image
            src={hobby.image}
            alt={hobby.title}
            layout="fill"
            objectFit="cover"
          />
        </motion.div>
      ))}
    </div>
  )
}

function ParticleBackground() {
  return (
    <div className="absolute inset-0 bg-dark">
      {/* Add particle animation logic here */}
    </div>
  )
}

export default Hobbies

