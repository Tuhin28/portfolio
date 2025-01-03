import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Basic validation
    if (!data.title || !data.excerpt || !data.thumbnail || !data.author) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create the blog post
    const blogPost = await prisma.blogPost.create({
      data: {
        title: data.title,
        excerpt: data.excerpt,
        thumbnail: data.thumbnail,
        type: data.type,
        date: data.date,
        readTime: data.readTime,
        author: data.author,
        content: JSON.stringify(data.content),
        sources: JSON.stringify(data.sources || []),
        tags: JSON.stringify(data.tags || []),
      },
    })

    return NextResponse.json(blogPost)
  } catch (error) {
    console.error('Failed to create blog post:', error)
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: {
        date: 'desc',
      },
    })

    // Parse JSON strings back to arrays/objects
    const formattedPosts = posts.map(post => ({
      ...post,
      content: JSON.parse(post.content),
      sources: JSON.parse(post.sources),
      tags: JSON.parse(post.tags),
    }))

    return NextResponse.json(formattedPosts)
  } catch (error) {
    console.error('Failed to fetch blog posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
} 