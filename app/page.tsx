"use client"

import { useState } from 'react'
import { Unbounded } from 'next/font/google'
import { ArrowRight, Mail } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ModeToggle } from '@/components/mode-toggle'
import { ContactForm } from '@/components/contact-form'
import Logo from '@/components/logo'
import { WavingHand } from '@/components/waving-hand'

const unbounded = Unbounded({ 
  subsets: ['latin'],
  variable: '--font-unbounded'
})

export default function Home() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)

  return (
    <div className={`min-h-screen ${unbounded.variable}`} style={{
      background: 'linear-gradient(81deg, rgba(125,120,212,1) 0%, rgba(250,255,160,1) 49%, rgba(245,146,77,1) 100%)'
    }}>
      <div className="relative min-h-screen">
        {/* Header */}
        <header className="flex justify-between items-center p-6 bg-transparent">
          <Logo />
          <ModeToggle />
        </header>

        {/* Hero Section */}
        <main className="container mx-auto px-6 py-12 min-h-screen flex items-center justify-center">
          <div className="relative w-full max-w-6xl">
            <motion.div 
              className="w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-[#FF4820] dark:bg-[#D93A1A] p-6 lg:p-8 flex flex-col lg:flex-row items-center relative overflow-visible rounded-3xl" style={{
                transform: 'rotateX(3deg) rotateY(-3deg)',
                transformStyle: 'preserve-3d',
              }}>
                <div className="lg:w-2/3 z-10">
                  {/* Open to Work Label */}
                  <div className="absolute -left-2 top-1.5 bg-black text-white text-xs py-1 px-4 rounded-full shadow-lg z-20">
                    OPEN TO WORK
                  </div>

                  {/* Main Content */}
                  <div className="mb-8">
                    <h1 className="text-white text-4xl md:text-5xl font-bold mb-4 flex items-center gap-2 font-unbounded">
                      Hi, I'm <span className="bg-white text-[#FF4820] dark:text-[#D93A1A] px-2 py-1 rounded-lg transform hover:scale-110 transition-transform duration-200">Tuhin</span> <WavingHand />
                    </h1>
                    <div className="text-white/90 text-xl flex items-center gap-6 font-unbounded mb-6">
                      Designer 
                      <span className="inline-flex items-center">
                        <span className="mx-2 h-px w-12 bg-white/40"></span>
                        <ArrowRight className="w-4 h-4" />
                      </span>
                      Developer
                    </div>
                  </div>
                  
                  <h2 className="text-white text-5xl md:text-7xl font-bold leading-tight tracking-tight font-unbounded mb-12">
                    ALL-IN-ONE<br />
                    WEBSITE<br />
                    MAKER
                  </h2>

                  {/* Skills and Blog */}
                  <div className="flex flex-wrap items-center gap-3 mb-8">
                    {['Design', 'Development', 'Animation', 'User Interface', '3D'].map((skill) => (
                      <span 
                        key={skill}
                        className="px-4 py-2 bg-white/10 rounded-full text-white text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                    <Link href="/skills" className="px-4 py-2 bg-[#E8FBE7] rounded-full text-sm flex items-center gap-2 text-[#FF4820] dark:text-[#D93A1A] hover:bg-[#D1F4CF] hover:scale-110 transition-all duration-200">
                      More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                      <h4 className="text-[#FF4820] dark:text-[#D93A1A] font-semibold mb-2">Featured Blog</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Short excerpt from the blog post...</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Profile Picture - Now completely outside both containers */}
            <div className="absolute top-0 right-0 lg:w-1/3 h-full z-30">
              <div className="absolute top-[-70px] right-[30px] w-[calc(100%+40px)] h-[450px]">
                <div 
                  className="relative w-full h-full bg-white dark:bg-gray-700 rounded-xl shadow-2xl overflow-hidden"
                  style={{ 
                    transform: 'rotate3d(1, -1, 0, 20deg)',
                    transformStyle: 'preserve-3d',
                    perspective: '1000px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2), 0 0 20px rgba(0,0,0,0.1)',
                  }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={'/IMG_5342(1).jpg'}
                      alt="Profile"
                      fill
                      priority
                      className="object-cover object-center rounded-xl"
                      style={{ 
                        transform: 'scale(1.05)',
                      }}
                    />
                  </div>
                  <div 
                    className="absolute inset-0 border-8 border-white dark:border-gray-200 rounded-xl"
                    style={{ 
                      boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Testimonial */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-white dark:bg-gray-800 rounded-full p-2 pr-6 shadow-lg">
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="Testimonial"
            width={40}
            height={40}
            className="rounded-full"
          />
          <p className="text-sm text-gray-600 dark:text-gray-300">
            "Tuhin is head and shoulders above the crowd, he took my rough design ideas..."
          </p>
          <Link href="/portfolio" className="text-sm text-black dark:text-white font-medium hover:underline hover:scale-110 transition-all duration-200">
            Learn more
          </Link>
        </div>

        {/* Contact Button */}
        <div className="fixed bottom-8 right-8 flex flex-col items-center">
          <div className="mb-2 text-gray-600 dark:text-gray-300 uppercase tracking-wide text-xs" style={{ transform: 'translateY(10px)' }}>
            <span className="bg-transparent px-3 py-1 rounded-t-full">Get in touch</span>
          </div>
          <button
            onClick={() => setIsContactFormOpen(true)}
            className="w-16 h-16 bg-[#E8FBE7] dark:bg-[#2A4E2F] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200"
          >
            <Mail className="w-6 h-6 text-[#FF4820] dark:text-[#D93A1A]" />
          </button>
        </div>

        {/* Contact Form Modal */}
        {isContactFormOpen && (
          <ContactForm onClose={() => setIsContactFormOpen(false)} />
        )}
      </div>
    </div>
  )
}

