import { motion } from 'framer-motion'
import Image from 'next/image'

const cardHoverAnimation = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    rotate: -2,
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    transition: {
      type: "spring",
      stiffness: 300
    }
  }
}

function ArtCard({ artwork }: { artwork: any }) {
  return (
    <motion.div
      className="bg-light rounded-lg overflow-hidden shadow-lg"
      variants={cardHoverAnimation}
      initial="initial"
      whileHover="hover"
    >
      <div className="relative h-48">
        <Image
          src={artwork.image}
          alt={artwork.title}
          layout="fill"
          objectFit="cover"
          className="art-image"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 text-dark">{artwork.title}</h3>
        <p className="text-gray-600">{artwork.description}</p>
      </div>
    </motion.div>
  )
}

export default function Gallery({ hobbies, filter }: { hobbies: any, filter: any }) {
  const filteredHobbies = filter === 'all' ? hobbies : hobbies.filter(hobby => hobby.title === filter)

  return (
    <div className="gallery-grid">
      {filteredHobbies.map((hobby: any, index: any) => (
        <motion.div
          key={hobby.title}
          variants={scrollAnimation}
          initial="hidden"
          animate="visible"
          transition={{ delay: index * 0.1 }}
        >
          <ArtCard artwork={hobby} />
        </motion.div>
      ))}
    </div>
  )
}

