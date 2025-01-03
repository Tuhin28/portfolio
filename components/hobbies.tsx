"use client"

import { useState } from 'react'
import { ProjectGrid, Project } from './hobbies/project-grid'
import { ProjectDetail } from './hobbies/project-detail'

// Sample data - replace with your actual data
const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'Data Analysis Dashboard',
    description: 'Interactive dashboard for analyzing sales data with various visualizations and filters.',
    thumbnail: '/projects/dashboard.jpg',
    type: 'streamlit',
    date: 'Jan 2024',
    url: 'http://localhost:8501' // Replace with your Streamlit app URL
  },
  {
    id: '2',
    title: 'Machine Learning Model',
    description: 'A predictive model for forecasting market trends using historical data.',
    thumbnail: '/projects/ml-model.jpg',
    type: 'project',
    date: 'Dec 2023'
  },
  // Add more projects...
]

export function Hobbies() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setIsDetailOpen(true)
  }

  const handleClose = () => {
    setIsDetailOpen(false)
    setTimeout(() => setSelectedProject(null), 300) // Wait for exit animation
  }

  const handleProjectChange = (project: Project) => {
    setSelectedProject(project)
  }

  return (
    <div className="min-h-screen pt-20">
      <ProjectGrid 
        projects={sampleProjects} 
        onProjectClick={handleProjectClick} 
      />
      <ProjectDetail
        project={selectedProject}
        allProjects={sampleProjects}
        onClose={handleClose}
        onProjectChange={handleProjectChange}
        isOpen={isDetailOpen}
      />
    </div>
  )
}

