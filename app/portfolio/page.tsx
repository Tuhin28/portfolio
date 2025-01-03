import { Navigation } from '@/components/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Download } from 'lucide-react'

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

      {/* Hero Section */}
      <section className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hi, I&apos;m Tuhin
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            I create user-focused, high-quality, scalable web solutions
          </p>
          <div className="flex gap-4">
            <Button>
              Work with me
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline">
              Download Resume
              <Download className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
          <Image
            src="/img_5342.jpg"
            alt="Tuhin's profile"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Experience Section */}
      <section className="container mx-auto px-6 py-20 border-t">
        <h2 className="text-3xl font-bold mb-12">Experience</h2>
        <div className="grid gap-8">
          <div className="grid md:grid-cols-[200px_1fr] gap-4">
            <div className="text-muted-foreground">2023 — Present</div>
            <div>
              <h3 className="font-semibold mb-2">Senior Web Developer — Freelance Web Solutions</h3>
              <p className="text-muted-foreground">Developing high-quality, scalable web solutions for clients across various industries.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-[200px_1fr] gap-4">
            <div className="text-muted-foreground">2021 — 2023</div>
            <div>
              <h3 className="font-semibold mb-2">Front-End Developer — Local First Digital Agency</h3>
              <p className="text-muted-foreground">Created responsive and performant web applications using modern frameworks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="container mx-auto px-6 py-20 border-t">
        <h2 className="text-3xl font-bold mb-12">Selected Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group">
              <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-muted-foreground">{project.description}</p>
            </div>
          ))}
        </div>
      </section>
      </main>
    </div>
  )
}

const projects = [
  {
    id: 1,
    title: "SUJAN P&L Report",
    description: "Comprehensive Power BI Profit and Loss report for Sujan Hotel Chain",
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    id: 2,
    title: "Pure Storage Documentation",
    description: "Technical documentation for internal Pure Storage project",
    image: "/placeholder.svg?height=400&width=600"
  }
]

