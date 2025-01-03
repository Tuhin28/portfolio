import { motion } from "framer-motion"
import { Project } from "@/types/project"
import images from '@/utils/images'

const projects: Project[] = [
  {
    id: "1",
    title: "SUJAN P&L Report - Celebal Technologies",
    description: "Developed a comprehensive Power BI Profit and Loss (P&L) report for Sujan Hotel Chain under the Anand Group.",
    duration: "Aug 2023 - Nov 2023",
    role: "Team Lead",
    technologies: ["Power BI", "DAX", "SQL", "PB Matrix"],
    achievements: [
      "Led a team of 4 professionals in developing a 54-page Power BI P&L report",
      "Integrated over 300 measures for insightful financial analysis",
      "Enhanced UI with custom visuals, slicers, bookmarks, and page navigation",
      "Implemented YTD, MTD, QTD, and FTY measures for comprehensive performance analysis",
      "Optimized query loading times by 40% for over 10 queries using Performance Analyzer",
      "Implemented restricted visual interaction strategies for streamlined data presentation"
    ],
    images: [images.placeholder(600, 400)]
  },
  // ... other projects
]

const projectCardAnimation = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.3 }
  }
}

export function Portfolio() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 font-outfit">Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="rounded-lg overflow-hidden border bg-card"
              whileHover={projectCardAnimation.hover}
            >
              <img 
                src={project.images?.[0]} 
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 font-outfit">{project.title}</h3>
                <p className="text-muted-foreground font-plus-jakarta mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="px-2 py-1 bg-primary/10 rounded-full text-sm font-plus-jakarta"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground font-plus-jakarta mb-2">
                  <strong>Duration:</strong> {project.duration}
                </div>
                {project.role && (
                  <div className="text-sm text-muted-foreground font-plus-jakarta mb-4">
                    <strong>Role:</strong> {project.role}
                  </div>
                )}
                <div className="mt-4">
                  <strong className="font-outfit">Key Achievements:</strong>
                  <ul className="list-disc list-inside text-sm text-muted-foreground font-plus-jakarta mt-2">
                    {project.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

