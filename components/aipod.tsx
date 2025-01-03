"use client"

import { useState } from 'react'
import { BlogGrid } from './aipod/blog-grid'
import { BlogDetail } from './aipod/blog-detail'
import { AdminDialog } from './aipod/admin-dialog'
import { BlogPost } from '@/types/blog'

// Sample data - replace with your actual data
const samplePosts: BlogPost[] = [
  {
    id: '1',
    title: 'Understanding AI: A Deep Dive into Neural Networks',
    excerpt: 'Explore the fascinating world of neural networks and how they power modern AI systems.',
    thumbnail: '/blog/neural-networks.jpg',
    type: 'blog',
    date: 'Dec 15, 2023',
    readTime: '5 min read',
    content: [
      {
        type: 'text',
        content: 'Neural networks are the backbone of modern artificial intelligence...',
        order: 0
      },
      {
        type: 'image',
        content: '/blog/neural-network-diagram.jpg',
        caption: 'Neural Network Architecture',
        order: 1
      },
      {
        type: 'video',
        content: 'https://www.youtube.com/embed/example',
        caption: 'Visual explanation of neural networks',
        order: 2
      }
    ],
    author: 'John Doe',
    sources: [
      {
        url: 'https://example.com/source1'
      }
    ]
  }
]

export function AIPod() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post)
    setIsDetailOpen(true)
  }

  const handleClose = () => {
    setIsDetailOpen(false)
    setTimeout(() => setSelectedPost(null), 300) // Wait for exit animation
  }

  const handlePostChange = (post: BlogPost) => {
    setSelectedPost(post)
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="px-6 mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <AdminDialog />
      </div>
      <BlogGrid 
        posts={samplePosts} 
        onPostClick={handlePostClick} 
      />
      <BlogDetail
        post={selectedPost}
        relatedPosts={samplePosts.filter(p => p.id !== selectedPost?.id)}
        onClose={handleClose}
        onPostChange={handlePostChange}
        isOpen={isDetailOpen}
      />
    </div>
  )
}

