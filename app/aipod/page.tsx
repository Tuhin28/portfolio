import { AIPod } from '@/components/aipod'
import { Navigation } from '@/components/navigation'

export default function AIPodPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AIPod />
      </main>
    </div>
  )
}

