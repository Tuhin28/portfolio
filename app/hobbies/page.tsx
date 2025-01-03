import { FloatingHeader } from '@/components/floating-header'
import { Hobbies } from '@/components/hobbies'

export default function HobbiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <FloatingHeader />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Hobbies />
      </main>
    </div>
  )
}

