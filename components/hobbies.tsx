import Image from 'next/image'

const hobbies = [
  {
    title: "Photography",
    description: "Capturing moments and scenes through the lens",
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    title: "Cooking",
    description: "Experimenting with flavors and cuisines from around the world",
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    title: "Hiking",
    description: "Exploring nature trails and enjoying scenic views",
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    title: "Reading",
    description: "Diving into books across various genres",
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    title: "Painting",
    description: "Expressing creativity through colors and brushstrokes",
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    title: "Gardening",
    description: "Nurturing plants and creating green spaces",
    image: "/placeholder.svg?height=400&width=600"
  }
]

export function Hobbies() {
  return (
    <section className="space-y-12">
      <h1 className="text-4xl font-bold">Hobbies & Interests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hobbies.map((hobby, index) => (
          <div key={index} className="group">
            <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
              <Image
                src={hobby.image}
                alt={hobby.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">{hobby.title}</h3>
            <p className="text-muted-foreground">{hobby.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

