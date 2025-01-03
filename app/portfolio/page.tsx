"use client"

import { Navigation } from '@/components/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function PortfolioPage() {
  const [currentSection, setCurrentSection] = useState(0)
  const sections = ['hero', 'about', 'experience', 'projects']
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleScroll = (e: React.WheelEvent) => {
    if (e.deltaY > 0) {
      setCurrentSection(prev => Math.min(prev + 1, sections.length - 1))
    } else {
      setCurrentSection(prev => Math.max(prev - 1, 0))
    }
  }

  return (
    <div 
      className="min-h-screen bg-background relative overflow-hidden touch-none select-none" 
      onWheel={handleScroll}
    >
      {/* Floating Header */}
      <div className="fixed top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-50 w-[98%] sm:w-[90%] max-w-7xl">
        <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg rounded-2xl px-4 sm:px-8 py-3 sm:py-4 shadow-lg border border-white/20">
          <Navigation />
        </div>
      </div>

      {/* 3D Container */}
      <div className="fixed top-20 sm:top-28 left-1/2 transform -translate-x-1/2 w-[98%] sm:w-[95%] max-w-7xl">
        <div 
          className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-3xl p-6 sm:p-12 shadow-2xl border border-white/20 min-h-[80vh] sm:min-h-[70vh]"
          style={{
            transform: isMobile ? 'none' : 'perspective(1000px) rotateX(2deg)',
            transformOrigin: 'center top',
          }}
        >
          <AnimatePresence mode="wait">
            {currentSection === 0 && (
              <motion.section 
                key="hero"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-center h-[70vh] sm:h-[65vh]"
              >
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="order-2 lg:order-1"
                >
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                    Hi, I&apos;m Tuhin
                  </h1>
                  <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8">
                    I create user-focused, high-quality, scalable web solutions
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="hover:scale-105 transition-transform">
                      Work with me
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="hover:scale-105 transition-transform">
                      Download Resume
                      <Download className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="relative aspect-square rounded-2xl overflow-hidden shadow-xl order-1 lg:order-2 w-full max-w-[300px] lg:max-w-none mx-auto"
                >
                  <Image
                    src="/IMG_5342(1).jpg"
                    alt="Tuhin's profile"
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </motion.section>
            )}

            {currentSection === 1 && (
              <motion.section 
                key="about"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-center h-[70vh] sm:h-[65vh]"
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl w-full max-w-[500px] mx-auto">
                  <Image
                    src="/placeholder.jpg"
                    alt="About Me"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4 sm:space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-bold">About Me</h2>
                  <p className="text-base sm:text-lg text-muted-foreground">
                    I'm a passionate web developer and designer with a keen eye for detail and a love for creating beautiful, functional websites. With years of experience in both design and development, I bring a unique perspective to every project.
                  </p>
                  <p className="text-base sm:text-lg text-muted-foreground">
                    My expertise includes front-end development, UI/UX design, and creating scalable web solutions. I'm always eager to take on new challenges and push the boundaries of what's possible on the web.
                  </p>
                </div>
              </motion.section>
            )}

            {currentSection === 2 && (
              <motion.section 
                key="experience"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="h-[70vh] sm:h-[65vh] overflow-y-auto scrollbar-hide"
              >
                <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12">Experience</h2>
                <div className="grid gap-6 sm:gap-8">
                  {experiences.map((experience, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="grid md:grid-cols-[150px_1fr] gap-4"
                    >
                      <div className="text-sm sm:text-base text-muted-foreground">{experience.period}</div>
                      <div>
                        <h3 className="font-semibold mb-2">{experience.title}</h3>
                        <p className="text-sm sm:text-base text-muted-foreground">{experience.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {currentSection === 3 && (
              <motion.section 
                key="projects"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="h-[70vh] sm:h-[65vh] overflow-y-auto scrollbar-hide"
              >
                <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12">Selected Projects</h2>
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                  {projects.map((project, index) => (
                    <motion.div 
                      key={project.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      className="group"
                    >
                      <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-sm sm:text-base text-muted-foreground">{project.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* Section Indicators */}
          <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
            {sections.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSection(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSection === index 
                    ? 'bg-primary w-6 sm:w-8' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 768px) {
          .touch-none {
            touch-action: none;
          }
        }
      `}</style>
    </div>
  )
}

const experiences = [
  {
    period: "2023 — Present",
    title: "Senior Web Developer — Freelance Web Solutions",
    description: "Developing high-quality, scalable web solutions for clients across various industries."
  },
  {
    period: "2021 — 2023",
    title: "Front-End Developer — Local First Digital Agency",
    description: "Created responsive and performant web applications using modern frameworks."
  }
]

const projects = [
  {
    id: 1,
    title: "SUJAN P&L Report",
    description: "Comprehensive Power BI Profit and Loss report for Sujan Hotel Chain",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Pure Storage Documentation",
    description: "Technical documentation for internal Pure Storage project",
    image: "/placeholder.svg"
  }
]

