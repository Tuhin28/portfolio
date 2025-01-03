import { Navigation } from '@/components/navigation'

export function FloatingHeader() {
  return (
    <div className="fixed top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-50 w-[98%] sm:w-[90%] max-w-7xl">
      <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg rounded-2xl px-4 sm:px-8 py-3 sm:py-4 shadow-lg border border-white/20">
        <Navigation />
      </div>
    </div>
  )
} 