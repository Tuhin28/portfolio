import { Cpu, Database, BarChart, FileSpreadsheet, Code, BrainCircuit } from 'lucide-react'

const skills = [
  { name: "Power BI", icon: BarChart },
  { name: "Business Intelligence", icon: BrainCircuit },
  { name: "DAX (Data Analysis Expression)", icon: Code },
  { name: "Power Query", icon: Database },
  { name: "Data Visualisation", icon: BarChart },
  { name: "SQL", icon: Database },
  { name: "MS Excel", icon: FileSpreadsheet },
  { name: "Data Analysis", icon: Cpu },
  { name: "Python", icon: Code },
  { name: "Problem Solving", icon: BrainCircuit }
]

export function Skills() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 font-outfit text-center">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {skills.map((skill, index) => (
            <div key={index} className="flex flex-col items-center p-4 bg-background rounded-lg shadow-md">
              <skill.icon className="w-12 h-12 mb-4 text-primary" />
              <span className="text-center font-medium font-plus-jakarta">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

