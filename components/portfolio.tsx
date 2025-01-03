"use client"

import { motion } from "framer-motion"
import { Project } from "@/types/project"

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
    images: ["/placeholder.svg?height=400&width=600"]
  },
  {
    id: "2",
    title: "Pure Storage - Internal Project",
    description: "Led documentation efforts for an internal Pure Storage project, focusing on KPI reports, data sources, and SQL queries.",
    duration: "Oct 2023 - Dec 2023",
    role: "Documentation Lead",
    technologies: ["SQL", "KPI Reporting", "Technical Documentation"],
    achievements: [
      "Created KPI sheets for 5 projects, detailing over 150 KPIs within a 2-week timeframe",
      "Documented more than 200 SQL queries in clear and concise English",
      "Simplified intricate DAX queries for better understanding",
      "Achieved project summarization to ensure critical information clarity"
    ],
    images: ["/placeholder.svg?height=400&width=600"]
  },
  {
    id: "3",
    title: "Hydrogen Production Analysis",
    description: "Exhaustive analysis of hydrogen production from fossil fuel and renewable energy sources, including carbon footprint analysis.",
    duration: "Jun 2022 - Aug 2023",
    role: "Research Team Member",
    technologies: ["ASPEN-Plus", "ASPEN-Hysis", "Simulation"],
    achievements: [
      "Explored biomass, coal gasification, steam methane reforming, and other hydrogen production methods",
      "Developed sophisticated simulation environments on ASPEN-Plus and ASPEN-Hysis",
      "Created a simulation for biomass gasification to extract 99% pure hydrogen, reducing carbon footprint"
    ],
    images: ["/placeholder.svg?height=400&width=600"]
  },
  {
    id: "4",
    title: "Aqueous Retarded Acid Formulation",
    description: "R&D project on aqueous retarded acid formulation for stimulation in carbonate reservoirs.",
    duration: "Jun 2022 - Aug 2023",
    role: "Research Team Member",
    technologies: ["Chemical Engineering", "Oil and Gas Industry"],
    achievements: [
      "Collaborated with a team of 6 at IEOT & IOGPT, ONGC, Mumbai",
      "Analyzed research papers to optimize the reaction rate between limestone and hydrochloric acid",
      "Gained working knowledge of Surface Christmas tree and Stimulation techniques in oil and gas production"
    ],
    images: ["/placeholder.svg?height=400&width=600"]
  }
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

