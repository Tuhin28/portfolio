import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface WordPressPost {
  id: number
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
  featured_media: number
  featured_media_url?: string
  date: string
  author: number
  _embedded?: {
    author?: Array<{ name: string }>
    'wp:featuredmedia'?: Array<{
      source_url: string
    }>
  }
}

export async function syncWordPressPosts(wpUrl: string = 'https://karmaaipod.wordpress.com') {
  try {
    // Create or update sync status
    await prisma.wordPressSyncState.upsert({
      where: { id: 'wp-sync' },
      create: {
        id: 'wp-sync',
        lastSyncedAt: new Date(),
        syncStatus: 'in_progress',
        errorMessage: null
      },
      update: {
        lastSyncedAt: new Date(),
        syncStatus: 'in_progress',
        errorMessage: null
      }
    })

    // Fetch posts from WordPress
    const response = await fetch(
      `${wpUrl}/wp-json/wp/v2/posts?_embed&per_page=100`
    )
    
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`)
    }
    
    const posts: WordPressPost[] = await response.json()

    // Process each post
    for (const post of posts) {
      const existingPost = await prisma.blogPost.findFirst({
        where: { title: post.title.rendered }
      })

      if (!existingPost) {
        // Get featured image URL from _embedded data
        const featuredImageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg'

        await prisma.blogPost.create({
          data: {
            title: post.title.rendered,
            excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, ''), // Remove HTML tags
            thumbnail: featuredImageUrl,
            type: 'blog',
            date: new Date(post.date).toISOString(),
            author: post._embedded?.author?.[0]?.name || 'Unknown',
            content: {
              create: [
                {
                  type: 'text',
                  content: post.content.rendered,
                  order: 0
                }
              ]
            },
            sources: {
              create: [
                {
                  url: `${wpUrl}/?p=${post.id}`
                }
              ]
            }
          }
        })
      }
    }

    // Update sync status
    await prisma.wordPressSyncState.update({
      where: { id: 'wp-sync' },
      data: {
        lastSyncedAt: new Date(),
        syncStatus: 'success',
        errorMessage: null
      }
    })
  } catch (error) {
    console.error('WordPress sync error:', error)
    // Update sync status with error
    await prisma.wordPressSyncState.update({
      where: { id: 'wp-sync' },
      data: {
        lastSyncedAt: new Date(),
        syncStatus: 'failed',
        errorMessage: error instanceof Error ? error.message : 'Unknown error'
      }
    })
    throw error
  }
}

export async function getLastSyncStatus() {
  const status = await prisma.wordPressSyncState.findFirst({
    orderBy: { lastSyncedAt: 'desc' }
  })
  return status
} 