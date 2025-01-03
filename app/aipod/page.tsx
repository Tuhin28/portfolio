import { AIPod } from '@/components/aipod'
import { FloatingHeader } from '@/components/floating-header'

export default function AIPodPage() {
  return (
    <div className="min-h-screen bg-background">
      <FloatingHeader />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AIPod />
      </main>
    </div>
  )
}

