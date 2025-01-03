import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

interface CreateBlogPostInput {
  title: string
  excerpt: string
  thumbnail: string
  type: string
  date: Date
  readTime?: string
  author: string
  content: {
    type: string
    content: string
    caption?: string
    order: number
  }[]
  sources: {
    url: string
  }[]
}

interface CreateProjectInput {
  title: string
  description: string
  thumbnail: string
  type: string
  date: Date
  url?: string
}

// Blog Posts
export async function getAllBlogPosts() {
  return prisma.blogPost.findMany({
    include: {
      content: {
        orderBy: {
          order: 'asc'
        }
      },
      sources: true
    },
    orderBy: {
      date: 'desc'
    }
  })
}

export async function getBlogPost(id: string) {
  return prisma.blogPost.findUnique({
    where: { id },
    include: {
      content: {
        orderBy: {
          order: 'asc'
        }
      },
      sources: true
    }
  })
}

export async function createBlogPost(data: CreateBlogPostInput) {
  return prisma.blogPost.create({
    data: {
      title: data.title,
      excerpt: data.excerpt,
      thumbnail: data.thumbnail,
      type: data.type,
      date: data.date,
      readTime: data.readTime,
      author: data.author,
      content: {
        create: data.content
      },
      sources: {
        create: data.sources
      }
    },
    include: {
      content: true,
      sources: true
    }
  })
}

// Projects
export async function getAllProjects() {
  return prisma.project.findMany({
    orderBy: {
      date: 'desc'
    }
  })
}

export async function getProject(id: string) {
  return prisma.project.findUnique({
    where: { id }
  })
}

export async function createProject(data: CreateProjectInput) {
  return prisma.project.create({
    data
  })
}

// Initialize database with sample data
export async function seedDatabase() {
  const sampleBlogPost: CreateBlogPostInput = {
    title: 'Getting Started with Next.js',
    excerpt: 'Learn how to build modern web applications with Next.js',
    thumbnail: '/blog/nextjs.jpg',
    type: 'blog',
    date: new Date(),
    readTime: '5 min read',
    author: 'John Doe',
    content: [
      {
        type: 'text',
        content: 'Next.js is a powerful framework for building React applications...',
        order: 0
      }
    ],
    sources: [
      {
        url: 'https://nextjs.org'
      }
    ]
  }

  const sampleProject: CreateProjectInput = {
    title: 'Data Visualization Dashboard',
    description: 'Interactive dashboard built with Streamlit',
    thumbnail: '/projects/dashboard.jpg',
    type: 'streamlit',
    date: new Date(),
    url: 'http://localhost:8501'
  }

  try {
    await prisma.blogPost.create({
      data: {
        title: sampleBlogPost.title,
        excerpt: sampleBlogPost.excerpt,
        thumbnail: sampleBlogPost.thumbnail,
        type: sampleBlogPost.type,
        date: sampleBlogPost.date,
        readTime: sampleBlogPost.readTime,
        author: sampleBlogPost.author,
        content: {
          create: sampleBlogPost.content
        },
        sources: {
          create: sampleBlogPost.sources
        }
      }
    })

    await prisma.project.create({
      data: sampleProject
    })

    console.log('Database seeded successfully')
  } catch (error) {
    console.error('Error seeding database:', error)
  }
} 