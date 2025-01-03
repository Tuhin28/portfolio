"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { BlogPost } from '@/types/blog'

interface BlogGridProps {
  onPostClick: (post: BlogPost) => void
}

export function BlogGrid({ onPostClick }: BlogGridProps) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog/posts')
        if (!response.ok) {
          throw new Error('Failed to fetch posts')
        }
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        setError('Failed to load blog posts')
        console.error('Error fetching posts:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4
                     animate-pulse h-[300px]"
          />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        {error}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        No blog posts yet.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {posts.map((post) => (
        <motion.div
          key={post.id}
          layoutId={`post-${post.id}`}
          onClick={() => onPostClick(post)}
          className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 cursor-pointer 
                   hover:shadow-lg transition-shadow duration-300 border border-white/20"
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs 
                          bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm">
              {post.type}
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{post.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>{new Date(post.date).toLocaleDateString()}</span>
            {post.readTime && <span>{post.readTime}</span>}
          </div>
        </motion.div>
      ))}
    </div>
  )
} 