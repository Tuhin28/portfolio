import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Project } from './project-grid'

interface ProjectDetailProps {
  project: Project | null
  allProjects: Project[]
  onClose: () => void
  onProjectChange: (project: Project) => void
  isOpen: boolean
}

export function ProjectDetail({ project, allProjects, onClose, onProjectChange, isOpen }: ProjectDetailProps) {
  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            layoutId={`project-${project.id}`}
            className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-[95vw] h-[95vh] flex overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sidebar with all projects */}
            <div className="w-96 border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-6">All Projects</h3>
                <div className="space-y-4">
                  {[project, ...allProjects.filter(p => p.id !== project.id)].map((proj) => (
                    <motion.div
                      key={proj.id}
                      onClick={() => onProjectChange(proj)}
                      className={`p-4 rounded-xl cursor-pointer transition-colors duration-200
                        ${project.id === proj.id 
                          ? 'bg-primary/10 dark:bg-primary/20' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                      whileHover={{ x: 5 }}
                    >
                      <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                        <Image
                          src={proj.thumbnail}
                          alt={proj.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs 
                                    bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm">
                          {proj.type}
                        </div>
                      </div>
                      <h4 className="font-medium line-clamp-2 mb-2">{proj.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {proj.description}
                      </p>
                      <div className="text-xs text-muted-foreground">
                        <span>{proj.date}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="sticky top-0 bg-white dark:bg-gray-900 z-10 p-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
                  <div className="text-sm text-muted-foreground">
                    <span>{project.date}</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="p-8">
                {project.type === 'streamlit' && project.url ? (
                  <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-white">
                    <iframe
                      src={project.url}
                      className="w-full h-full"
                      allow="fullscreen"
                    />
                  </div>
                ) : (
                  <div className="max-w-4xl mx-auto">
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-8">
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="text-lg leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 