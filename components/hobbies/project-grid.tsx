import { motion } from 'framer-motion'
import Image from 'next/image'

export interface Project {
  id: string
  title: string
  description: string
  thumbnail: string
  type: 'streamlit' | 'project'
  date: string
  url?: string
}

interface ProjectGridProps {
  projects: Project[]
  onProjectClick: (project: Project) => void
}

export function ProjectGrid({ projects, onProjectClick }: ProjectGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {projects.map((project) => (
        <motion.div
          key={project.id}
          layoutId={`project-${project.id}`}
          onClick={() => onProjectClick(project)}
          className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 cursor-pointer 
                   hover:shadow-lg transition-shadow duration-300 border border-white/20"
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs 
                          bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm">
              {project.type}
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{project.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{project.description}</p>
          <div className="text-xs text-muted-foreground">
            <span>{project.date}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
} 