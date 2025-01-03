"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { BlogPost } from '@/types/blog'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BlogDetailProps {
  post: BlogPost | null
  onClose: () => void
}

export function BlogDetail({ post, onClose }: BlogDetailProps) {
  if (!post) return null

  const content = typeof post.content === 'string' ? JSON.parse(post.content) : post.content

  const renderContent = (section: any) => {
    if (!section) return null
    switch (section.type) {
      case 'subheading':
        return (
          <h2 className="text-2xl font-semibold mt-8 mb-4">
            {section.content}
          </h2>
        )
      case 'text':
        return (
          <p className="text-muted-foreground mb-4 whitespace-pre-wrap">
            {section.content}
          </p>
        )
      case 'image':
        return (
          <figure className="my-6">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={section.content}
                alt={section.caption || ''}
                fill
                className="object-cover"
              />
            </div>
            {section.caption && (
              <figcaption className="text-sm text-muted-foreground mt-2 text-center">
                {section.caption}
              </figcaption>
            )}
          </figure>
        )
      case 'video':
        return (
          <figure className="my-6">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <iframe
                src={section.content}
                title={section.caption || 'Video content'}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
              />
            </div>
            {section.caption && (
              <figcaption className="text-sm text-muted-foreground mt-2 text-center">
                {section.caption}
              </figcaption>
            )}
          </figure>
        )
      case 'podcast':
        return (
          <div className="my-6">
            <audio
              src={section.content}
              controls
              className="w-full"
            />
            {section.caption && (
              <p className="text-sm text-muted-foreground mt-2">
                {section.caption}
              </p>
            )}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <motion.div
      layoutId={`post-${post.id}`}
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
    >
      <div className="container max-w-4xl mx-auto h-full overflow-auto py-8">
        <div className="bg-card rounded-xl p-6 relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{new Date(post.date).toLocaleDateString()}</span>
              {post.readTime && <span>{post.readTime}</span>}
              <span>By {post.author}</span>
            </div>

            <p className="text-lg text-muted-foreground">{post.excerpt}</p>

            <div className="mt-8">
              {content.map((section: any, index: number) => (
                <div key={index}>
                  {renderContent(section)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 