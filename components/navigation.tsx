"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from "next-themes"

export function Navigation() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  return (
    <nav className="bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold font-unbounded">Mika</Link>
        <div className="flex items-center space-x-6">
          <Link href="/portfolio" className={`font-medium ${pathname === '/portfolio' ? 'text-primary' : 'text-foreground/80 hover:text-foreground'}`}>
            Portfolio
          </Link>
          <Link href="/aipod" className={`font-medium ${pathname === '/aipod' ? 'text-primary' : 'text-foreground/80 hover:text-foreground'}`}>
            AIPod
          </Link>
          <Link href="/hobbies" className={`font-medium ${pathname === '/hobbies' ? 'text-primary' : 'text-foreground/80 hover:text-foreground'}`}>
            Hobbies
          </Link>
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-2 rounded-full bg-background/80 backdrop-blur-sm border shadow-sm"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

